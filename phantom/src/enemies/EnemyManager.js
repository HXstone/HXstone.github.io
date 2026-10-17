import * as THREE from 'three';
import { randomRange } from '../utils/math.js';
import { createGlowTexture } from '../world/TextureFactory.js';
import { createEnemyAssets, Enemy, ENEMY_STATE } from './Enemy.js';
import { NavigationGrid } from './NavigationGrid.js';

/**
 * Owns all hostiles, their shared navigation grid and hostile plasma
 * projectiles. The game loop only needs `update` and `reset`.
 */
export class EnemyManager {
  constructor({ scene, world, effects, audio, callbacks = {}, quality = 'high' }) {
    this.scene = scene;
    this.world = world;
    this.effects = effects;
    this.audio = audio;
    this.callbacks = callbacks;
    this.quality = quality;

    this.assets = createEnemyAssets();
    this.nav = new NavigationGrid(world);
    this.navs = new Map([['ground', this.nav]]);
    this.enemies = [];
    this.projectiles = [];
    this.combatEnabled = true;
    this.missionCompleteFired = false;
    this.deferred = new Set();
    this.deferTimer = 0;
    this.playerReference = null;
    this.totalEnemies = world.enemySpawns.length;
    this.waves = [...new Set(world.enemySpawns.map((spawn) => spawn.wave || 1))].sort((a, b) => a - b);
    this.currentWave = this.waves[0] || 1;
    this.maxWave = this.waves[this.waves.length - 1] || 1;

    this._raycaster = new THREE.Raycaster();
    this._tmp = new THREE.Vector3();
    this._tmp2 = new THREE.Vector3();
    this._prev = new THREE.Vector3();
    this._dir = new THREE.Vector3();

    this._createEnemies();
    this._createProjectiles();
  }

  _getNavForSpawn(spawn) {
    if (!spawn.floorY && !spawn.navBounds) return this.nav;
    const key = spawn.navBounds
      ? `${spawn.floorY}:${spawn.navBounds.minX},${spawn.navBounds.minZ},${spawn.navBounds.maxX},${spawn.navBounds.maxZ}`
      : `floor:${spawn.floorY}`;
    if (!this.navs.has(key)) {
      this.navs.set(
        key,
        new NavigationGrid(this.world, 1.1, 0.46, {
          floorY: spawn.floorY || 0,
          bounds: spawn.navBounds || null,
        }),
      );
    }
    return this.navs.get(key);
  }

  _createEnemies() {
    this.world.enemySpawns.forEach((spawn, index) => {
      const enemy = new Enemy({
        scene: this.scene,
        spawn,
        assets: this.assets,
        world: this.world,
        nav: this._getNavForSpawn(spawn),
        effects: this.effects,
        audio: this.audio,
        manager: this,
        index,
      });
      if ((spawn.wave || 1) > this.currentWave) enemy.setDormant(true);
      this.enemies.push(enemy);
    });
    this._refreshHitMeshes();
  }

  _createProjectiles() {
    const glowTexture = createGlowTexture();
    const coreGeo = new THREE.SphereGeometry(0.095, 10, 8);
    const auraGeo = new THREE.SphereGeometry(0.2, 12, 8);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffb28a, toneMapped: false });
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xff5f4a,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const spriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xff8b68,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });

    for (let i = 0; i < 36; i += 1) {
      const group = new THREE.Group();
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
      const aura = new THREE.Mesh(auraGeo, auraMat);
      group.add(aura);
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.62, 0.62, 1);
      group.add(sprite);
      group.visible = false;
      this.scene.add(group);
      this.projectiles.push({
        group,
        active: false,
        life: 0,
        damage: 0,
        velocity: new THREE.Vector3(),
        origin: new THREE.Vector3(),
        pulse: 0,
      });
    }
    this._projectileCursor = 0;
  }

  getHitMeshes() {
    return this.hitMeshes;
  }

  _refreshHitMeshes() {
    this.hitMeshes = [];
    for (const enemy of this.enemies) {
      if (!enemy.alive || enemy.dormant) continue;
      this.hitMeshes.push(...enemy.hitMeshes);
    }
  }

  /** Hostiles currently deployed; later waves stay dormant until called in. */
  get remaining() {
    return this.enemies.reduce((count, enemy) => count + (enemy.alive && !enemy.dormant ? 1 : 0), 0);
  }

  /** Every hostile still alive, including unreleased waves. */
  get totalRemaining() {
    return this.enemies.reduce((count, enemy) => count + (enemy.alive ? 1 : 0), 0);
  }

  get killed() {
    return this.totalEnemies - this.totalRemaining;
  }

  setCombatEnabled(enabled) {
    this.combatEnabled = Boolean(enabled);
    if (!this.combatEnabled) {
      for (const projectile of this.projectiles) {
        projectile.active = false;
        projectile.group.visible = false;
      }
    }
  }

  update(dt, player) {
    this.playerReference = player;
    this._processDeferred(dt);
    if (!this.combatEnabled) {
      for (const enemy of this.enemies) {
        if (!enemy.alive || enemy.dormant) continue;
        enemy.updatePassive(dt);
      }
      return;
    }

    if (this.totalRemaining > 0) {
      for (const enemy of this.enemies) {
        if (enemy.dormant) continue;
        enemy.update(dt, player, this.enemies);
      }
    } else {
      for (const enemy of this.enemies) {
        if (!enemy.alive) enemy.update(dt, player, this.enemies);
      }
    }

    this._updateProjectiles(dt, player);
  }

  alertNearby(position, radius) {
    for (const enemy of this.enemies) {
      if (!enemy.alive || enemy.dormant) continue;
      if (enemy.state === ENEMY_STATE.PATROL) {
        const distance = enemy.position.distanceTo(position);
        if (distance < radius) {
          enemy.setState(ENEMY_STATE.ALERT);
          enemy.alertMarker.visible = true;
          enemy.alertMarkerTimer = 0.85;
        }
      }
    }
  }

  fireProjectile(enemy, player) {
    const projectile = this.projectiles[this._projectileCursor];
    this._projectileCursor = (this._projectileCursor + 1) % this.projectiles.length;

    enemy.root.updateMatrixWorld(true);
    const origin = enemy.getMuzzleWorldPosition(this._tmp);
    const target = player.getEyePosition(this._tmp2);
    const direction = new THREE.Vector3().subVectors(target, origin);
    const distance = direction.length();
    direction.normalize();
    const roleSpread = enemy.role === 'marksman' ? 0.01 : enemy.role === 'elite' || enemy.role === 'commander' ? 0.017 : 0.024;
    const spread = roleSpread + (player.sprinting ? 0.018 : 0);
    direction.x += randomRange(-spread, spread);
    direction.y += randomRange(-spread, spread);
    direction.z += randomRange(-spread, spread);
    direction.normalize();

    projectile.group.position.copy(origin);
    projectile.group.visible = true;
    projectile.active = true;
    projectile.life = 4.5;
    projectile.damage = randomRange(7.5, 11.5) * (enemy.damageScale || 1);
    projectile.velocity.copy(direction).multiplyScalar(25);
    projectile.origin.copy(origin);
    projectile.pulse = Math.random() * Math.PI * 2;
    projectile.distanceToPlayer = distance;
  }

  _updateProjectiles(dt, player) {
    for (const projectile of this.projectiles) {
      if (!projectile.active) continue;

      projectile.life -= dt;
      if (projectile.life <= 0) {
        projectile.active = false;
        projectile.group.visible = false;
        continue;
      }

      const previous = this._prev.copy(projectile.group.position);
      const step = this._tmp.copy(projectile.velocity).multiplyScalar(dt);
      const next = this._tmp2.copy(previous).add(step);
      const distance = step.length();

      // Static world blocking.
      this._raycaster.set(previous, this._dir.copy(step).normalize());
      this._raycaster.far = distance + 0.05;
      const hits = this._raycaster.intersectObjects(this.world.collisionMeshes, false);
      if (hits.length > 0) {
        this.effects.impact(hits[0].point, hits[0].face ? hits[0].face.normal.clone().transformDirection(hits[0].object.matrixWorld) : new THREE.Vector3(0, 1, 0), 'pistol');
        this.audio.impact(0);
        projectile.active = false;
        projectile.group.visible = false;
        continue;
      }

      // Player body capsule approximated by two spheres.
      const center = this._tmp.set(player.position.x, player.position.y + 1.05, player.position.z);
      if (this._pointSegmentDistance(center, previous, next) < 0.48) {
        this._hitPlayer(projectile, player, center);
        continue;
      }
      const head = this._tmp.set(player.position.x, player.position.y + 1.62, player.position.z);
      if (this._pointSegmentDistance(head, previous, next) < 0.32) {
        this._hitPlayer(projectile, player, head);
        continue;
      }

      projectile.group.position.copy(next);
      projectile.pulse += dt * 14;
      const pulse = 0.85 + Math.sin(projectile.pulse) * 0.18;
      projectile.group.scale.setScalar(pulse);
      projectile.group.rotation.x += dt * 4;
      projectile.group.rotation.z += dt * 2.5;
    }
  }

  _pointSegmentDistance(point, start, end) {
    const abx = end.x - start.x;
    const aby = end.y - start.y;
    const abz = end.z - start.z;
    const apx = point.x - start.x;
    const apy = point.y - start.y;
    const apz = point.z - start.z;
    const abLengthSq = abx * abx + aby * aby + abz * abz;
    let t = 0;
    if (abLengthSq > 0.00001) {
      t = (apx * abx + apy * aby + apz * abz) / abLengthSq;
      t = Math.max(0, Math.min(1, t));
    }
    const dx = apx - abx * t;
    const dy = apy - aby * t;
    const dz = apz - abz * t;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  _hitPlayer(projectile, player, point) {
    projectile.active = false;
    projectile.group.visible = false;
    this.effects.enemyImpact(point, new THREE.Vector3(0, 0.2, 1), false);
    player.takeDamage(projectile.damage, projectile.origin);
  }

  onEnemyKilled(enemy, info = {}) {
    const chest = new THREE.Vector3(enemy.position.x, 1.1, enemy.position.z);
    this.effects.deathBurst(chest, 0xff6f55);
    this.audio.explosion(0);
    this._refreshHitMeshes();

    if (this.callbacks.onKill) {
      this.callbacks.onKill(enemy, {
        ...info,
        remaining: this.remaining,
        killed: this.killed,
        total: this.totalEnemies,
      });
    }

    if (this.totalRemaining === 0 && !this.missionCompleteFired) {
      this.missionCompleteFired = true;
      if (this.callbacks.onMissionComplete) {
        this.callbacks.onMissionComplete();
      }
    } else if (this.remaining === 0 && this.currentWave < this.maxWave) {
      this._activateNextWave();
    }
  }

  /**
   * Story-triggered deployment. Unlike the automatic clear-to-clear wave
   * transition, this can call in a reserve while the player is still fighting.
   * It deliberately does not emit onWave; the campaign director owns that line.
   */
  /**
   * Release an authored reserve. If its spawn point is too close to the
   * player, it stays deferred until the player has moved away instead of
   * popping into view at arm's length.
   */
  _releaseReserve(enemy) {
    const player = this.playerReference;
    if (player) {
      const distance = enemy.position.distanceTo(player.position);
      // Do not pop a dormant sentinel in at arm's length, or in an unobstructed
      // line of sight inside normal engagement range.
      let visible = false;
      if (distance < 30) {
        const eye = player.getEyePosition(new THREE.Vector3());
        visible = !this.world.isLineBlocked(eye, enemy.eyePosition, this._raycaster);
      }
      if (distance < 13 || visible) {
        this.deferred.add(enemy);
        return false;
      }
    }
    this.deferred.delete(enemy);
    enemy.setDormant(false);
    enemy.path = [];
    enemy.waitTimer = 0.3;
    return true;
  }

  _processDeferred(dt) {
    if (this.deferred.size === 0) return;
    this.deferTimer -= dt;
    if (this.deferTimer > 0) return;
    this.deferTimer = 0.65;
    const player = this.playerReference;
    if (!player) return;
    for (const enemy of [...this.deferred]) {
      if (!enemy.alive) {
        this.deferred.delete(enemy);
        continue;
      }
      if (enemy.position.distanceTo(player.position) < 13) continue;
      this._releaseReserve(enemy);
    }
    this._refreshHitMeshes();
  }

  deployWave(waveNumber) {
    if (!this.waves.includes(waveNumber) || waveNumber <= this.currentWave) return 0;
    this.currentWave = waveNumber;
    let deployed = 0;
    for (const enemy of this.enemies) {
      if (!enemy.alive || !enemy.dormant || (enemy.spawn.wave || 1) !== waveNumber) continue;
      if (this._releaseReserve(enemy)) deployed += 1;
    }
    this._refreshHitMeshes();
    return deployed;
  }

  /** Called when the primary objective is secured and the escape begins. */
  deployRemainingReserves() {
    let deployed = 0;
    for (const enemy of this.enemies) {
      if (!enemy.alive || !enemy.dormant) continue;
      if (this._releaseReserve(enemy)) deployed += 1;
      enemy.waitTimer = 0.35 + Math.random() * 0.6;
    }
    this.currentWave = this.maxWave;
    this._refreshHitMeshes();
    return deployed;
  }

  _activateNextWave() {
    const nextWave = this.waves.find((wave) => wave > this.currentWave);
    if (nextWave === undefined) return;
    this.currentWave = nextWave;
    let deployed = 0;
    for (const enemy of this.enemies) {
      if (!enemy.alive || (enemy.spawn.wave || 1) !== nextWave) continue;
      enemy.setDormant(false);
      enemy.path = [];
      enemy.waitTimer = 0.35;
      deployed += 1;
    }
    this._refreshHitMeshes();
    if (this.callbacks.onWave) {
      this.callbacks.onWave({
        wave: this.currentWave,
        totalWaves: this.waves.length,
        deployed,
        remaining: this.remaining,
        total: this.totalEnemies,
      });
    }
  }

  reset() {
    this.missionCompleteFired = false;
    this.combatEnabled = false;
    this.deferred.clear();
    this.deferTimer = 0;
    this.currentWave = this.waves[0] || 1;
    for (const enemy of this.enemies) {
      enemy.reset();
      if ((enemy.spawn.wave || 1) > this.currentWave) enemy.setDormant(true);
    }
    for (const projectile of this.projectiles) {
      projectile.active = false;
      projectile.group.visible = false;
    }
    this._refreshHitMeshes();
  }

  dispose() {
    for (const enemy of this.enemies) enemy.dispose();

    const disposedMaterials = new Set();
    for (const projectile of this.projectiles) {
      projectile.group.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material && !disposedMaterials.has(object.material)) {
          disposedMaterials.add(object.material);
          object.material.map?.dispose();
          object.material.dispose();
        }
      });
      this.scene.remove(projectile.group);
    }

    // Sentinel geometry and armor materials are shared across the whole
    // squad, so they can only be released once the manager is torn down.
    for (const geometry of Object.values(this.assets.geos || {})) geometry.dispose();
    for (const material of [
      this.assets.armor,
      this.assets.armorLight,
      this.assets.joint,
      this.assets.polymer,
      this.assets.red,
      this.assets.cyan,
      this.assets.gunmetal,
      this.assets.blobMaterial,
    ]) {
      material?.dispose();
    }
    this.assets.alertMaterial?.map?.dispose();
    this.assets.alertMaterial?.dispose();
    this.assets.blobGeometry?.dispose();
  }
}
