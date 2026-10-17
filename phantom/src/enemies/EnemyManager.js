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
    this.enemies = [];
    this.projectiles = [];
    this.missionCompleteFired = false;
    this.totalEnemies = world.enemySpawns.length;

    this._raycaster = new THREE.Raycaster();
    this._tmp = new THREE.Vector3();
    this._tmp2 = new THREE.Vector3();
    this._prev = new THREE.Vector3();
    this._dir = new THREE.Vector3();

    this._createEnemies();
    this._createProjectiles();
  }

  _createEnemies() {
    this.world.enemySpawns.forEach((spawn, index) => {
      const enemy = new Enemy({
        scene: this.scene,
        spawn,
        assets: this.assets,
        world: this.world,
        nav: this.nav,
        effects: this.effects,
        audio: this.audio,
        manager: this,
        index,
      });
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
      if (!enemy.alive) continue;
      this.hitMeshes.push(...enemy.hitMeshes);
    }
  }

  get remaining() {
    return this.enemies.reduce((count, enemy) => count + (enemy.alive ? 1 : 0), 0);
  }

  get killed() {
    return this.totalEnemies - this.remaining;
  }

  update(dt, player) {
    if (this.remaining > 0) {
      for (const enemy of this.enemies) {
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
      if (!enemy.alive) continue;
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
    const spread = 0.022 + (player.sprinting ? 0.018 : 0);
    direction.x += randomRange(-spread, spread);
    direction.y += randomRange(-spread, spread);
    direction.z += randomRange(-spread, spread);
    direction.normalize();

    projectile.group.position.copy(origin);
    projectile.group.visible = true;
    projectile.active = true;
    projectile.life = 4.5;
    projectile.damage = randomRange(7.5, 11.5);
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

    if (this.remaining === 0 && !this.missionCompleteFired) {
      this.missionCompleteFired = true;
      if (this.callbacks.onMissionComplete) {
        this.callbacks.onMissionComplete();
      }
    }
  }

  reset() {
    this.missionCompleteFired = false;
    for (const enemy of this.enemies) enemy.reset();
    for (const projectile of this.projectiles) {
      projectile.active = false;
      projectile.group.visible = false;
    }
    this._refreshHitMeshes();
  }

  dispose() {
    for (const enemy of this.enemies) enemy.dispose();
    for (const projectile of this.projectiles) {
      projectile.group.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
      });
      this.scene.remove(projectile.group);
    }
  }
}
