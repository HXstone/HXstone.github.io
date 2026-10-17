import * as THREE from 'three';
import { clamp, damp, randomRange } from '../utils/math.js';
import { WeaponModel } from './WeaponModel.js';

const DEG = Math.PI / 180;

const WEAPONS = {
  rifle: {
    id: 'rifle',
    name: 'VK-7 SPECTER',
    category: 'PULSE RIFLE',
    slot: 1,
    mode: 'FULL AUTO',
    ammo: 30,
    reserve: 210,
    rpm: 660,
    damage: 17,
    headMultiplier: 2.25,
    reloadTime: 1.7,
    spreadHip: 1.15,
    spreadAds: 0.34,
    bloomPerShot: 0.19,
    maxBloom: 1.8,
    recoilPitch: 0.0068,
    recoilYaw: 0.0023,
    range: 140,
    adsSpreadMultiplier: 1,
  },
  pistol: {
    id: 'pistol',
    name: 'M9 WRAITH',
    category: 'ARC SIDEARM',
    slot: 2,
    mode: 'SEMI AUTO',
    ammo: 12,
    reserve: 96,
    rpm: 300,
    damage: 34,
    headMultiplier: 2.55,
    reloadTime: 1.35,
    spreadHip: 0.76,
    spreadAds: 0.18,
    bloomPerShot: 0.34,
    maxBloom: 1.6,
    recoilPitch: 0.012,
    recoilYaw: 0.0035,
    range: 90,
    adsSpreadMultiplier: 1,
  },
};

/**
 * WeaponSystem owns weapon state, rate limiting, spread, reloading, hit-scan
 * resolution and all shot feedback. Rendering of the first-person model is
 * delegated to WeaponModel.
 */
export class WeaponSystem {
  constructor({ camera, player, world, input, audio, effects, callbacks = {} }) {
    this.camera = camera;
    this.player = player;
    this.world = world;
    this.input = input;
    this.audio = audio;
    this.effects = effects;
    this.callbacks = callbacks;
    this.enemyManager = null;

    this.model = new WeaponModel(window.innerWidth / Math.max(1, window.innerHeight));
    this.currentId = 'rifle';
    this.magazines = {
      rifle: WEAPONS.rifle.ammo,
      pistol: WEAPONS.pistol.ammo,
    };
    this.reserves = {
      rifle: WEAPONS.rifle.reserve,
      pistol: WEAPONS.pistol.reserve,
    };

    this.cooldown = 0;
    this.reloadTimer = 0;
    this.reloading = false;
    this.magInserted = false;
    this.switchTimer = 0;
    this.switchProgress = 0;
    this.aiming = false;
    this.adsProgress = 0;
    this.bloom = 0;
    this.lastShotAt = -100;
    this.dryFireCooldown = 0;

    this.shotsFired = 0;
    this.shotsHit = 0;
    this.headshots = 0;
    this.damageDealt = 0;

    this._raycaster = new THREE.Raycaster();
    this._direction = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._up = new THREE.Vector3();
    this._origin = new THREE.Vector3();
    this._muzzle = new THREE.Vector3();
    this._end = new THREE.Vector3();
    this._tmp = new THREE.Vector3();

    this._emitAmmo();
    this._emitWeapon();
  }

  get weapon() {
    return WEAPONS[this.currentId];
  }

  get currentAmmo() {
    return this.magazines[this.currentId];
  }

  get currentReserve() {
    return this.reserves[this.currentId];
  }

  get weaponModel() {
    return this.model;
  }

  setEnemyManager(manager) {
    this.enemyManager = manager;
  }

  reset() {
    this.currentId = 'rifle';
    this.magazines.rifle = WEAPONS.rifle.ammo;
    this.magazines.pistol = WEAPONS.pistol.ammo;
    this.reserves.rifle = WEAPONS.rifle.reserve;
    this.reserves.pistol = WEAPONS.pistol.reserve;
    this.cooldown = 0;
    this.reloadTimer = 0;
    this.reloading = false;
    this.magInserted = false;
    this.switchTimer = 0;
    this.switchProgress = 0;
    this.aiming = false;
    this.adsProgress = 0;
    this.bloom = 0;
    this.shotsFired = 0;
    this.shotsHit = 0;
    this.headshots = 0;
    this.damageDealt = 0;
    this.model.setWeapon('rifle');
    this.model.adsProgress = 0;
    this._emitAmmo();
    this._emitWeapon();
  }

  update(dt, active) {
    const wasReloading = this.reloading;

    if (!active || this.player.dead) {
      this.aiming = false;
      this.adsProgress = damp(this.adsProgress, 0, 10, dt);
      this.model.update(dt, this._modelState());
      return;
    }

    this.cooldown = Math.max(0, this.cooldown - dt);
    this.dryFireCooldown = Math.max(0, this.dryFireCooldown - dt);
    this.switchTimer = Math.max(0, this.switchTimer - dt);
    this.switchProgress = 1 - this.switchTimer / 0.5;
    this.bloom = damp(this.bloom, 0, 5.5, dt);

    this.aiming = this.input.mouse.right && !this.player.sprinting;
    this.adsProgress = damp(this.adsProgress, this.aiming ? 1 : 0, 12, dt);

    this._handleSwitch();
    this._handleReload(dt);

    if (!this.reloading && this.switchTimer <= 0) {
      this._handleFire();
    }

    if (wasReloading && !this.reloading) {
      this._emitAmmo();
    }

    if (this.reloading) {
      const progress = 1 - this.reloadTimer / this.weapon.reloadTime;
      if (this.callbacks.onReloadProgress) this.callbacks.onReloadProgress(progress);
    }

    this.model.update(dt, this._modelState());
  }

  _modelState() {
    return {
      aiming: this.aiming,
      lookDX: this.player.lookDX,
      lookDY: this.player.lookDY,
      speedRatio: this.player.speedRatio,
      bobPhase: this.player.bobPhase,
      grounded: this.player.grounded,
      reloading: this.reloading,
      reloadProgress: this.reloading ? 1 - this.reloadTimer / this.weapon.reloadTime : 0,
      switchProgress: this.switchProgress,
      reducedMotion: this.player.settings.get('reducedMotion'),
    };
  }

  _handleSwitch() {
    const wheel = this.input.consumeWheel();
    let target = null;

    if (this.input.wasPressed('Digit1')) target = 'rifle';
    else if (this.input.wasPressed('Digit2')) target = 'pistol';
    else if (this.input.wasPressed('KeyQ')) target = this.currentId === 'rifle' ? 'pistol' : 'rifle';
    else if (wheel !== 0) target = this.currentId === 'rifle' ? 'pistol' : 'rifle';

    if (target && target !== this.currentId && this.switchTimer <= 0) {
      this._cancelReload();
      this.currentId = target;
      this.switchTimer = 0.5;
      this.switchProgress = 0;
      this.cooldown = Math.max(this.cooldown, 0.28);
      this.model.setWeapon(target);
      this.audio.reloadStart();
      this._emitAmmo();
      this._emitWeapon();
      if (this.callbacks.onWeaponSwitch) this.callbacks.onWeaponSwitch(WEAPONS[target]);
    }
  }

  _handleReload(dt) {
    if (this.reloading) {
      this.reloadTimer -= dt;
      const elapsed = this.weapon.reloadTime - this.reloadTimer;

      if (!this.magInserted && elapsed >= this.weapon.reloadTime * 0.52) {
        this.magInserted = true;
        this.audio.reloadMag();
      }

      if (this.reloadTimer <= 0) {
        const needed = this.weapon.ammo - this.magazines[this.currentId];
        const available = Math.min(needed, this.reserves[this.currentId]);
        this.magazines[this.currentId] += available;
        this.reserves[this.currentId] -= available;
        this.reloading = false;
        this.reloadTimer = 0;
        this.audio.reloadEnd();
        this._emitAmmo();
        if (this.callbacks.onReloadEnd) this.callbacks.onReloadEnd();
      }
      return;
    }

    if (this.input.wasPressed('KeyR')) {
      this.startReload();
    }

    if (this.magazines[this.currentId] === 0 && this.reserves[this.currentId] > 0 && this.input.mouse.leftPressed) {
      this.audio._click(0.025, 240, 0.03);
    }
  }

  startReload() {
    const weapon = this.weapon;
    if (this.reloading || this.currentAmmo >= weapon.ammo || this.currentReserve <= 0) return false;
    this.reloading = true;
    this.magInserted = false;
    this.reloadTimer = weapon.reloadTime;
    this.audio.reloadStart();
    if (this.callbacks.onReloadStart) this.callbacks.onReloadStart(weapon.reloadTime);
    return true;
  }

  _cancelReload() {
    if (!this.reloading) return;
    this.reloading = false;
    this.reloadTimer = 0;
    this.magInserted = false;
    if (this.callbacks.onReloadEnd) this.callbacks.onReloadEnd();
  }

  _handleFire() {
    const weapon = this.weapon;
    const trigger = weapon.mode === 'FULL AUTO' ? this.input.mouse.left : this.input.mouse.leftPressed;
    if (!trigger || this.cooldown > 0) return;

    if (this.currentAmmo <= 0) {
      if (this.dryFireCooldown <= 0) {
        this.audio._click(0.03, 220, 0.04);
        this.dryFireCooldown = 0.28;
        if (this.callbacks.onEmpty) this.callbacks.onEmpty();
      }
      return;
    }

    this._shoot();
  }

  _shoot() {
    const weapon = this.weapon;
    const now = performance.now();

    this.magazines[this.currentId] -= 1;
    this.cooldown = 60 / weapon.rpm;
    this.lastShotAt = now;
    this.shotsFired += 1;

    this.player.camera.updateMatrixWorld();
    const camera = this.player.camera;
    this._origin.copy(camera.position);
    camera.getWorldDirection(this._direction);

    this._right.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    this._up.setFromMatrixColumn(camera.matrixWorld, 1).normalize();

    const movementSpread = (this.player.speedRatio * 0.9 + (this.player.grounded ? 0 : 0.7)) * DEG;
    const baseSpread = (this.aiming ? weapon.spreadAds : weapon.spreadHip) * DEG;
    const spread = baseSpread + movementSpread + this.bloom * 0.0045;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * spread;
    this._direction
      .addScaledVector(this._right, Math.cos(angle) * radius)
      .addScaledVector(this._up, Math.sin(angle) * radius)
      .normalize();

    this._raycaster.set(this._origin, this._direction);
    this._raycaster.far = weapon.range;

    const enemyMeshes = this.enemyManager ? this.enemyManager.getHitMeshes() : [];
    const enemyHits = enemyMeshes.length
      ? this._raycaster.intersectObjects(enemyMeshes, false)
      : [];
    const worldHits = this._raycaster.intersectObjects(this.world.collisionMeshes, false);

    let bestEnemy = null;
    let bestWorld = null;
    if (enemyHits.length) bestEnemy = enemyHits[0];
    if (worldHits.length) bestWorld = worldHits[0];

    const enemyDistance = bestEnemy ? bestEnemy.distance : Infinity;
    const worldDistance = bestWorld ? bestWorld.distance : Infinity;

    this._end
      .copy(this._origin)
      .addScaledVector(this._direction, Math.min(Math.min(enemyDistance, worldDistance), weapon.range));

    if (bestEnemy && enemyDistance < worldDistance) {
      this._resolveEnemyHit(bestEnemy, weapon);
    } else if (bestWorld) {
      this._resolveWorldHit(bestWorld, weapon);
    }

    this.model.getMuzzleWorldPosition(camera, this._muzzle);
    this.effects.tracer(this._muzzle, this._end, weapon.id);
    this.effects.playerMuzzleFlash(this._muzzle, weapon.id);
    this.effects.ejectShell(camera, weapon.id);

    this.audio.shoot(weapon.id);
    this.player.addRecoil(
      weapon.recoilPitch * randomRange(0.75, 1.25),
      weapon.recoilYaw * randomRange(-1, 1),
    );

    this.bloom = clamp(this.bloom + weapon.bloomPerShot, 0, weapon.maxBloom);

    if (this.callbacks.onShot) this.callbacks.onShot(weapon);
    this._emitAmmo();
  }

  _resolveEnemyHit(hit, weapon) {
    const enemy = hit.object.userData.enemy;
    if (!enemy || !enemy.alive) return;

    const hitZone = hit.object.userData.hitZone || 'body';
    const isHead = hitZone === 'head';
    const damage = weapon.damage * (isHead ? weapon.headMultiplier : 1);

    this.shotsHit += 1;
    if (isHead) this.headshots += 1;

    const point = hit.point;
    const normal = this._tmp.copy(this._direction).negate();
    this.effects.enemyImpact(point, normal, isHead);
    this.effects.damagePulse();
    this.audio.hit(isHead);

    const result = enemy.takeDamage(damage, {
      headshot: isHead,
      point: point.clone(),
      direction: this._direction.clone(),
      weapon: weapon.id,
    });

    this.damageDealt += damage;

    if (this.callbacks.onHit) {
      this.callbacks.onHit({
        headshot: isHead,
        killed: Boolean(result?.killed),
        damage,
        weapon: weapon.id,
      });
    }

    if (result?.killed && this.callbacks.onKill) {
      this.callbacks.onKill(enemy, { headshot: isHead, weapon: weapon.id });
    }
  }

  _resolveWorldHit(hit, weapon) {
    const normal = hit.face
      ? hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
      : this._tmp.copy(this._direction).negate().clone();
    this.effects.impact(hit.point, normal, weapon.id);
    this.audio.impact(this._panForPosition(hit.point));
    if (this.callbacks.onWorldHit) this.callbacks.onWorldHit(hit);
  }

  _panForPosition(position) {
    const relative = this._tmp.copy(position).sub(this.camera.position);
    const local = relative.applyQuaternion(this.camera.quaternion.clone().invert());
    return clamp(local.x / (Math.abs(local.z) + 0.001), -1, 1) * 0.7;
  }

  getSpreadNormalized() {
    const weapon = this.weapon;
    const movementSpread = this.player.speedRatio * 0.9 + (this.player.grounded ? 0 : 0.7);
    const base = this.aiming ? weapon.spreadAds : weapon.spreadHip;
    const total = base + movementSpread + this.bloom * 3.6;
    return clamp(total / 5.2, 0.08, 1);
  }

  getFov(baseFov, sprinting) {
    const sprintBoost = sprinting ? 4.5 : 0;
    const adsFov = this.currentId === 'pistol' ? 58 : 52;
    return baseFov + sprintBoost - (baseFov + sprintBoost - adsFov) * this.adsProgress;
  }

  getStats() {
    return {
      shotsFired: this.shotsFired,
      shotsHit: this.shotsHit,
      headshots: this.headshots,
      accuracy: this.shotsFired > 0 ? this.shotsHit / this.shotsFired : 0,
      damageDealt: this.damageDealt,
    };
  }

  _emitAmmo() {
    if (!this.callbacks.onAmmoChange) return;
    this.callbacks.onAmmoChange({
      current: this.currentAmmo,
      reserve: this.currentReserve,
      max: this.weapon.ammo,
      reloading: this.reloading,
      id: this.currentId,
    });
  }

  _emitWeapon() {
    if (!this.callbacks.onWeaponChange) return;
    this.callbacks.onWeaponChange(this.weapon);
  }

  resize(aspect) {
    this.model.resize(aspect);
  }

  dispose() {
    this.model.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (material.map) material.map.dispose();
          material.dispose();
        }
      }
    });
  }
}

export { WEAPONS };
