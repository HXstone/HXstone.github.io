import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clamp, damp, dampAngle, randomRange } from '../utils/math.js';

const STATE = {
  PATROL: 'patrol',
  ALERT: 'alert',
  CHASE: 'chase',
  ATTACK: 'attack',
  STAGGER: 'stagger',
  DEAD: 'dead',
};

const MAX_HEALTH = 100;
const DETECT_RANGE = 27;
const ATTACK_RANGE = 19;

function makeAlertTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);
  ctx.translate(32, 32);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = 'rgba(255,55,72,0.9)';
  ctx.fillRect(-9, -9, 18, 18);
  ctx.strokeStyle = 'rgba(255,160,170,0.8)';
  ctx.lineWidth = 2;
  ctx.strokeRect(-12, -12, 24, 24);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createEnemyAssets() {
  const armor = new THREE.MeshStandardMaterial({
    color: 0x3f484e,
    roughness: 0.42,
    metalness: 0.78,
  });
  const armorLight = new THREE.MeshStandardMaterial({
    color: 0x7f898f,
    roughness: 0.32,
    metalness: 0.88,
  });
  const joint = new THREE.MeshStandardMaterial({
    color: 0x161c20,
    roughness: 0.58,
    metalness: 0.58,
  });
  const polymer = new THREE.MeshStandardMaterial({
    color: 0x242c31,
    roughness: 0.78,
    metalness: 0.2,
  });
  const red = new THREE.MeshStandardMaterial({
    color: 0x1a0406,
    emissive: 0xff3345,
    emissiveIntensity: 3.4,
    roughness: 0.22,
    metalness: 0.2,
    toneMapped: false,
  });
  const cyan = new THREE.MeshStandardMaterial({
    color: 0x041014,
    emissive: 0x54cfe8,
    emissiveIntensity: 1.8,
    roughness: 0.3,
    metalness: 0.2,
    toneMapped: false,
  });
  const gunmetal = new THREE.MeshStandardMaterial({
    color: 0x353d42,
    roughness: 0.34,
    metalness: 0.9,
  });
  const alertTexture = makeAlertTexture();
  const alertMaterial = new THREE.SpriteMaterial({
    map: alertTexture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    toneMapped: false,
  });
  const blobMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const box = (w, h, d, radius = 0.02) =>
    new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, Math.min(w, h, d) * 0.2));

  const geos = {
    pelvis: box(0.42, 0.22, 0.28, 0.04),
    torso: box(0.56, 0.5, 0.34, 0.05),
    chest: box(0.46, 0.3, 0.12, 0.03),
    head: box(0.29, 0.24, 0.3, 0.05),
    visor: new THREE.BoxGeometry(0.23, 0.055, 0.02),
    visorDot: new THREE.CylinderGeometry(0.014, 0.014, 0.01, 8),
    shoulder: box(0.17, 0.17, 0.28, 0.035),
    upperArm: box(0.1, 0.32, 0.12, 0.025),
    forearm: box(0.105, 0.28, 0.12, 0.025),
    hand: box(0.08, 0.1, 0.1, 0.02),
    upperLeg: box(0.135, 0.4, 0.15, 0.025),
    lowerLeg: box(0.12, 0.38, 0.13, 0.02),
    foot: box(0.16, 0.1, 0.28, 0.02),
    knee: new THREE.SphereGeometry(0.065, 8, 6),
    core: new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12),
    backpack: box(0.36, 0.36, 0.16, 0.03),
    antenna: new THREE.CylinderGeometry(0.008, 0.012, 0.32, 5),
    gunBody: box(0.08, 0.1, 0.44, 0.015),
    gunBarrel: new THREE.CylinderGeometry(0.012, 0.012, 0.26, 8),
    vent: new THREE.BoxGeometry(0.16, 0.028, 0.02),
    accent: new THREE.BoxGeometry(0.02, 0.18, 0.02),
  };

  return {
    armor,
    armorLight,
    joint,
    polymer,
    red,
    cyan,
    gunmetal,
    alertMaterial,
    blobMaterial,
    blobGeometry: new THREE.CircleGeometry(0.47, 16),
    geos,
  };
}

export class Enemy {
  constructor({ scene, spawn, assets, world, nav, effects, audio, manager, index = 0 }) {
    this.scene = scene;
    this.spawn = spawn;
    this.assets = assets;
    this.world = world;
    this.nav = nav;
    this.effects = effects;
    this.audio = audio;
    this.manager = manager;
    this.index = index;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.forward = new THREE.Vector3(0, 0, -1);
    this.eye = new THREE.Vector3();
    this.playerEye = new THREE.Vector3();
    this.lastKnown = new THREE.Vector3();
    this.lastSeenAt = -100;
    this.raycaster = new THREE.Raycaster();

    this.maxHealth = MAX_HEALTH;
    this.health = MAX_HEALTH;
    this.alive = true;
    this.state = STATE.PATROL;
    this.stateTime = 0;
    this.path = [];
    this.pathTimer = 0;
    this.patrolIndex = 0;
    this.waitTimer = randomRange(0.4, 2.2);
    this.yaw = Math.random() * Math.PI * 2;
    this.speed = 1.4;
    this.verticalBob = 0;
    this.walkPhase = Math.random() * Math.PI * 2;
    this.detectionTimer = Math.random() * 0.2;
    this.hasSight = false;
    this.lostSightTime = 0;
    this.shootCooldown = randomRange(0.6, 1.8);
    this.chargeTimer = 0;
    this.charging = false;
    this.strafeDirection = Math.random() > 0.5 ? 1 : -1;
    this.strafeTimer = randomRange(1.2, 2.4);
    this.hitFlash = 0;
    this.flinch = 0;
    this.deathTimer = 0;
    this.alertMarkerTimer = 0;
    this._tmp = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._strafe = new THREE.Vector3();
    this._move = new THREE.Vector3();

    // Materials that must flash independently per unit.
    this.visorMaterial = this.assets.red.clone();
    this.coreMaterial = this.assets.red.clone();
    this.muzzleMaterial = new THREE.SpriteMaterial({
      color: 0xffc28a,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });

    this.root = this._buildModel();
    // Flat contact shadows are far cheaper than eight animated shadow casters
    // and keep the sentinels visually grounded on the dark floor.
    this.blobShadow = new THREE.Mesh(this.assets.blobGeometry, this.assets.blobMaterial);
    this.blobShadow.rotation.x = -Math.PI / 2;
    this.blobShadow.position.y = 0.025;
    this.blobShadow.renderOrder = 1;
    this.root.add(this.blobShadow);
    this.root.traverse((object) => {
      if (object.isMesh) object.castShadow = false;
    });
    this.scene.add(this.root);

    this.healthBar = this._buildHealthBar();
    this.alertMarker = new THREE.Sprite(this.assets.alertMaterial.clone());
    this.alertMarker.scale.set(0.18, 0.18, 1);
    this.alertMarker.position.y = 2.3;
    this.alertMarker.visible = false;
    this.root.add(this.alertMarker);

    this.hitMeshes = [];
    this.root.traverse((object) => {
      if (object.isMesh && object.userData.hitZone) {
        object.userData.enemy = this;
        this.hitMeshes.push(object);
      }
    });

    this.reset();
  }

  _buildModel() {
    const { armor, armorLight, joint, polymer, cyan, gunmetal, geos } = this.assets;
    const root = new THREE.Group();
    root.name = `SENTINEL-${this.spawn.id}`;
    root.scale.setScalar(1.04);

    const visual = new THREE.Group();
    root.add(visual);
    this.visual = visual;

    const pelvis = new THREE.Mesh(geos.pelvis, armor);
    pelvis.position.y = 0.94;
    pelvis.castShadow = true;
    pelvis.userData.hitZone = 'body';
    visual.add(pelvis);

    const torso = new THREE.Mesh(geos.torso, armor);
    torso.position.y = 1.28;
    torso.castShadow = true;
    torso.userData.hitZone = 'body';
    visual.add(torso);

    const chest = new THREE.Mesh(geos.chest, armorLight);
    chest.position.set(0, 1.34, -0.17);
    chest.castShadow = true;
    chest.userData.hitZone = 'body';
    visual.add(chest);

    const chestVent = new THREE.Mesh(geos.vent, joint);
    chestVent.position.set(0, 1.45, -0.235);
    visual.add(chestVent);

    const core = new THREE.Mesh(geos.core, this.coreMaterial);
    core.rotation.x = Math.PI / 2;
    core.position.set(0, 1.28, -0.24);
    visual.add(core);

    for (const x of [-0.21, 0.21]) {
      const accent = new THREE.Mesh(geos.accent, cyan);
      accent.position.set(x, 1.29, -0.18);
      visual.add(accent);
    }

    const backpack = new THREE.Mesh(geos.backpack, joint);
    backpack.position.set(0, 1.33, 0.23);
    backpack.castShadow = true;
    backpack.userData.hitZone = 'body';
    visual.add(backpack);

    const antenna = new THREE.Mesh(geos.antenna, armorLight);
    antenna.position.set(0.14, 1.64, 0.18);
    antenna.rotation.z = -0.18;
    visual.add(antenna);
    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 5), this.visorMaterial);
    antennaTip.position.set(0.17, 1.8, 0.18);
    visual.add(antennaTip);

    // Head group can track independently.
    const head = new THREE.Group();
    head.position.y = 1.69;
    visual.add(head);
    this.head = head;

    const skull = new THREE.Mesh(geos.head, armor);
    skull.castShadow = true;
    skull.userData.hitZone = 'head';
    head.add(skull);

    const visor = new THREE.Mesh(geos.visor, this.visorMaterial);
    visor.position.set(0, 0.01, -0.155);
    visor.userData.hitZone = 'head';
    head.add(visor);

    for (const x of [-0.065, 0.065]) {
      const eye = new THREE.Mesh(geos.visorDot, this.visorMaterial);
      eye.rotation.x = Math.PI / 2;
      eye.position.set(x, 0.012, -0.17);
      eye.userData.hitZone = 'head';
      head.add(eye);
    }

    // Shoulders and arms.
    for (const side of [-1, 1]) {
      const shoulder = new THREE.Mesh(geos.shoulder, armorLight);
      shoulder.position.set(side * 0.35, 1.45, 0);
      shoulder.castShadow = true;
      shoulder.userData.hitZone = 'limb';
      visual.add(shoulder);

      const arm = new THREE.Group();
      arm.position.set(side * 0.36, 1.38, 0);
      visual.add(arm);
      const upper = new THREE.Mesh(geos.upperArm, polymer);
      upper.position.y = -0.18;
      upper.castShadow = true;
      upper.userData.hitZone = 'limb';
      arm.add(upper);
      const elbow = new THREE.Mesh(geos.knee, joint);
      elbow.position.y = -0.36;
      arm.add(elbow);
      const forearm = new THREE.Mesh(geos.forearm, armor);
      forearm.position.y = -0.51;
      forearm.castShadow = true;
      forearm.userData.hitZone = 'limb';
      arm.add(forearm);
      const hand = new THREE.Mesh(geos.hand, joint);
      hand.position.y = -0.69;
      arm.add(hand);

      // A narrow luminous seam breaks the dark silhouette and communicates
      // the machine's facing even in unlit corners.
      const seam = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.2, 0.01), cyan);
      seam.position.set(side * 0.06, -0.18, -0.065);
      arm.add(seam);

      if (side === 1) this.rightArm = arm;
      else this.leftArm = arm;
    }

    // Combat rifle held in both hands.
    const gun = new THREE.Group();
    gun.position.set(0.3, 1.17, -0.3);
    gun.rotation.x = 0.05;
    visual.add(gun);
    const body = new THREE.Mesh(geos.gunBody, gunmetal);
    body.castShadow = true;
    gun.add(body);
    const barrel = new THREE.Mesh(geos.gunBarrel, gunmetal);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = -0.34;
    gun.add(barrel);
    const barrelTip = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.08, 8), armorLight);
    barrelTip.rotation.x = Math.PI / 2;
    barrelTip.position.z = -0.49;
    gun.add(barrelTip);
    const gunLight = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.2), this.visorMaterial);
    gunLight.position.set(0.05, 0.065, -0.06);
    gun.add(gunLight);
    this.gun = gun;

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0, -0.55);
    gun.add(muzzle);
    this.muzzle = muzzle;
    const flash = new THREE.Sprite(this.muzzleMaterial);
    flash.scale.set(0.28, 0.28, 1);
    flash.position.copy(muzzle.position);
    gun.add(flash);
    this.muzzleFlash = flash;

    // Legs with pivots for a readable walk cycle.
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.16, 0.94, 0);
      visual.add(leg);
      const upper = new THREE.Mesh(geos.upperLeg, polymer);
      upper.position.y = -0.2;
      upper.castShadow = true;
      upper.userData.hitZone = 'limb';
      leg.add(upper);
      const knee = new THREE.Mesh(geos.knee, joint);
      knee.position.y = -0.41;
      knee.userData.hitZone = 'limb';
      leg.add(knee);
      const lower = new THREE.Mesh(geos.lowerLeg, armor);
      lower.position.y = -0.61;
      lower.castShadow = true;
      lower.userData.hitZone = 'limb';
      leg.add(lower);
      const foot = new THREE.Mesh(geos.foot, joint);
      foot.position.set(0, -0.84, -0.055);
      foot.castShadow = true;
      foot.userData.hitZone = 'limb';
      leg.add(foot);

      if (side === 1) this.rightLeg = leg;
      else this.leftLeg = leg;
    }

    return root;
  }

  _buildHealthBar() {
    const group = new THREE.Group();
    group.position.y = 2.16;
    this.root.add(group);

    const bgMat = new THREE.SpriteMaterial({
      color: 0x070b0e,
      transparent: true,
      opacity: 0.72,
      depthTest: true,
      depthWrite: false,
    });
    const bg = new THREE.Sprite(bgMat);
    bg.scale.set(0.82, 0.075, 1);
    group.add(bg);

    const fillMat = new THREE.SpriteMaterial({
      color: 0xff4756,
      transparent: true,
      opacity: 0.95,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });
    const fill = new THREE.Sprite(fillMat);
    fill.center.set(0, 0.5);
    fill.position.x = -0.39;
    fill.position.z = 0.002;
    fill.scale.set(0.78, 0.032, 1);
    group.add(fill);

    group.visible = false;
    this.healthBarGroup = group;
    this.healthFill = fill;
    this.healthFillMat = fillMat;
    return group;
  }

  reset() {
    this.position.set(this.spawn.pos.x, 0, this.spawn.pos.z);
    this.velocity.set(0, 0, 0);
    this.health = this.maxHealth;
    this.alive = true;
    this.state = STATE.PATROL;
    this.stateTime = 0;
    this.path = [];
    this.pathTimer = 0;
    this.patrolIndex = 0;
    this.waitTimer = randomRange(0.5, 2);
    this.yaw = Math.atan2(
      -(this.spawn.route[0].x - this.spawn.pos.x),
      -(this.spawn.route[0].z - this.spawn.pos.z),
    );
    this.hasSight = false;
    this.lostSightTime = 0;
    this.shootCooldown = randomRange(0.8, 2);
    this.chargeTimer = 0;
    this.charging = false;
    this.hitFlash = 0;
    this.flinch = 0;
    this.deathTimer = 0;
    this.alertMarkerTimer = 0;
    this.root.position.copy(this.position);
    this.root.rotation.set(0, this.yaw, 0);
    this.root.visible = true;
    this.visual.visible = true;
    this.blobShadow.visible = true;
    this.visual.rotation.set(0, 0, 0);
    this.visual.position.set(0, 0, 0);
    this.visual.scale.set(1, 1, 1);
    this.healthBarGroup.visible = false;
    this.alertMarker.visible = false;
    this.muzzleFlash.material.opacity = 0;
    this.visorMaterial.emissiveIntensity = 3.4;
    this.coreMaterial.emissiveIntensity = 2.2;
    this.head.rotation.set(0, 0, 0);
    for (const mesh of this.hitMeshes) mesh.visible = true;
  }

  get eyePosition() {
    return this.eye.set(this.position.x, this.position.y + 1.55, this.position.z);
  }

  getMuzzleWorldPosition(target = new THREE.Vector3()) {
    return this.muzzle.getWorldPosition(target);
  }

  setState(state) {
    if (this.state === state) return;
    this.state = state;
    this.stateTime = 0;
    if (state === STATE.ALERT) {
      this.alertMarkerTimer = 0.8;
      this.alertMarker.visible = true;
    }
    if (state === STATE.PATROL) {
      this.healthBarGroup.visible = false;
    }
  }

  update(dt, player, allEnemies) {
    if (!this.alive) {
      this.deathTimer += dt;
      this._updateDeath(dt);
      return;
    }

    this.stateTime += dt;
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.flinch = damp(this.flinch, 0, 8, dt);
    this.alertMarkerTimer = Math.max(0, this.alertMarkerTimer - dt);
    if (this.alertMarkerTimer <= 0 && this.state !== STATE.ALERT) {
      this.alertMarker.visible = false;
    }

    this.detectionTimer -= dt;
    if (this.detectionTimer <= 0) {
      this.detectionTimer = 0.16 + Math.random() * 0.06;
      this._updatePerception(player);
    }

    const playerDistance = this.position.distanceTo(player.position);
    this._updateAnimation(dt, playerDistance);
    this._updateMaterials(dt);

    switch (this.state) {
      case STATE.PATROL:
        this._updatePatrol(dt, player);
        break;
      case STATE.ALERT:
        this._updateAlert(dt, player);
        break;
      case STATE.CHASE:
        this._updateChase(dt, player, allEnemies, playerDistance);
        break;
      case STATE.ATTACK:
        this._updateAttack(dt, player, allEnemies, playerDistance);
        break;
      case STATE.STAGGER:
        if (this.stateTime > 0.2) this.setState(STATE.CHASE);
        break;
      default:
        break;
    }

    this.root.position.copy(this.position);
    this.root.rotation.y = dampAngle(this.root.rotation.y, this.yaw, 10, dt);

    if (this.healthBarGroup.visible) {
      const ratio = clamp(this.health / this.maxHealth, 0, 1);
      this.healthFill.scale.x = 0.78 * ratio;
      this.healthFillMat.color.setHex(ratio < 0.35 ? 0xff2e3f : 0xff5c68);
    }
  }

  _updatePerception(player) {
    const eye = this.eyePosition;
    const playerEye = player.getEyePosition(this.playerEye);
    const distance = eye.distanceTo(playerEye);
    const direction = this._tmp.copy(player.position).sub(this.position);
    direction.y = 0;
    const dist2d = direction.length();
    if (dist2d > 0.001) direction.normalize();

    const facing = this._desired.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const dot = facing.dot(direction);
    const close = dist2d < 8.5;
    const inCone = dot > 0.28;
    const visible = distance < DETECT_RANGE && (close || inCone);

    let blocked = true;
    if (visible) {
      blocked = this.world.isLineBlocked(eye, playerEye, this.raycaster);
    }

    this.hasSight = visible && !blocked;
    if (this.hasSight) {
      this.lastKnown.copy(player.position);
      this.lastSeenAt = performance.now();
      this.lostSightTime = 0;

      if (this.state === STATE.PATROL) {
        this.setState(STATE.ALERT);
        this.alertMarkerTimer = 0.85;
        this.alertMarker.visible = true;
        if (this.manager) this.manager.alertNearby(this.position, 11);
      }
    } else if (this.state === STATE.CHASE || this.state === STATE.ATTACK) {
      this.lostSightTime += 0.18;
    }
  }

  _updatePatrol(dt, player) {
    const route = this.spawn.route;
    if (!route || route.length === 0) return;

    if (this.path.length === 0) {
      if (this.waitTimer > 0) {
        this.waitTimer -= dt;
        this._idleAnimation(dt);
        return;
      }
      const target = route[this.patrolIndex % route.length];
      this.path = this.nav.findPath(this.position, target);
      this.pathTimer = 0;
      if (this.path.length === 0) {
        this.waitTimer = 1.2;
        this.patrolIndex = (this.patrolIndex + 1) % route.length;
        return;
      }
    }

    const arrived = this._followPath(dt, 1.35, null);
    if (arrived) {
      this.path = [];
      this.waitTimer = randomRange(1.1, 2.6);
      this.patrolIndex = (this.patrolIndex + 1) % route.length;
    }
  }

  _updateAlert(dt, player) {
    this._facePosition(player.position, dt, 14);
    this.healthBarGroup.visible = true;
    if (this.stateTime > 0.42) {
      this.setState(this.hasSight ? STATE.ATTACK : STATE.CHASE);
      if (this.hasSight) this.shootCooldown = Math.min(this.shootCooldown, 0.35);
    }
  }

  _updateChase(dt, player, allEnemies, distance) {
    this.healthBarGroup.visible = true;
    if (this.hasSight) {
      this._facePosition(player.position, dt, 9);
      if (distance < ATTACK_RANGE) {
        this.setState(STATE.ATTACK);
        return;
      }
    }

    this.pathTimer -= dt;
    if (this.pathTimer <= 0) {
      this.pathTimer = 0.65 + Math.random() * 0.25;
      this.path = this.nav.findPath(this.position, this.lastKnown.lengthSq() > 0 ? this.lastKnown : player.position);
    }

    const arrived = this._followPath(dt, 2.85, allEnemies);
    if (arrived && this.lostSightTime > 5.5) {
      this.setState(STATE.PATROL);
      this.path = [];
      this.waitTimer = 0.4;
    }
  }

  _updateAttack(dt, player, allEnemies, distance) {
    this.healthBarGroup.visible = true;
    this._facePosition(player.position, dt, 12);

    if (!this.hasSight) {
      this.lostSightTime += dt;
      if (this.lostSightTime > 0.8) {
        this.setState(STATE.CHASE);
        this.path = [];
        return;
      }
    }

    if (distance > ATTACK_RANGE) {
      this.setState(STATE.CHASE);
      return;
    }

    // Light strafing keeps engagements dynamic without letting the unit
    // phase through cover. Movement is validated per axis.
    this.strafeTimer -= dt;
    if (this.strafeTimer <= 0) {
      this.strafeDirection *= -1;
      this.strafeTimer = randomRange(1.3, 2.6);
    }

    const strafe = this._strafe.set(
      Math.cos(this.yaw) * this.strafeDirection,
      0,
      -Math.sin(this.yaw) * this.strafeDirection,
    );
    const move = this._move.copy(strafe).multiplyScalar(distance < 9 ? 0.8 : 0.5);
    if (distance > 15.5) {
      move.x += -Math.sin(this.yaw) * 0.9;
      move.z += -Math.cos(this.yaw) * 0.9;
    }
    this._moveWithCollision(move.x * dt, move.z * dt, allEnemies);

    // Keep shoot cooldown running only while sighted.
    this.shootCooldown -= dt;

    if (this.charging) {
      this.chargeTimer -= dt;
      this.visorMaterial.emissiveIntensity = 5 + Math.sin(performance.now() * 0.04) * 2;
      if (this.chargeTimer <= 0) {
        this.charging = false;
        if (this.hasSight) {
          this.manager.fireProjectile(this, player);
          this.audio.enemyShoot(this._panTo(player.position));
          this.muzzleFlash.material.opacity = 1;
        }
        this.shootCooldown = randomRange(1.55, 2.25);
      }
    } else if (this.shootCooldown <= 0 && this.hasSight) {
      this.charging = true;
      this.chargeTimer = 0.42;
      this.muzzleFlash.material.opacity = 0.35;
    }
  }

  _facePosition(position, dt, speed) {
    const dx = position.x - this.position.x;
    const dz = position.z - this.position.z;
    const targetYaw = Math.atan2(-dx, -dz);
    this.yaw = dampAngle(this.yaw, targetYaw, speed, dt);
  }

  _followPath(dt, speed, allEnemies) {
    if (this.path.length === 0) return true;
    const target = this.path[0];
    const dx = target.x - this.position.x;
    const dz = target.z - this.position.z;
    const distance = Math.hypot(dx, dz);
    if (distance < 0.42) {
      this.path.shift();
      if (this.path.length === 0) return true;
    }

    if (distance > 0.001) {
      this.yaw = dampAngle(this.yaw, Math.atan2(-dx, -dz), 10, dt);
      const step = Math.min(distance, speed * dt);
      this._moveWithCollision((dx / distance) * step, (dz / distance) * step, allEnemies);
    }
    this._walkPhaseUpdate(dt, speed);
    return false;
  }

  _moveWithCollision(dx, dz, allEnemies) {
    if (allEnemies) {
      // Soft separation prevents sentinels from stacking in doorways.
      for (const other of allEnemies) {
        if (other === this || !other.alive) continue;
        const ox = this.position.x - other.position.x;
        const oz = this.position.z - other.position.z;
        const distSq = ox * ox + oz * oz;
        if (distSq > 0.001 && distSq < 1.7 * 1.7) {
          const dist = Math.sqrt(distSq);
          const strength = (1.7 - dist) / 1.7;
          dx += (ox / dist) * strength * 0.9 * Math.max(0.016, Math.abs(dx) + Math.abs(dz)) * 5;
          dz += (oz / dist) * strength * 0.9 * Math.max(0.016, Math.abs(dx) + Math.abs(dz)) * 5;
        }
      }
    }

    const radius = 0.44;
    // X axis.
    const nextX = this.position.x + dx;
    if (this._canOccupy(nextX, this.position.z, radius)) {
      this.position.x = nextX;
    }
    // Z axis.
    const nextZ = this.position.z + dz;
    if (this._canOccupy(this.position.x, nextZ, radius)) {
      this.position.z = nextZ;
    }
  }

  _canOccupy(x, z, radius) {
    if (
      x < this.world.navBounds.minX + radius ||
      x > this.world.navBounds.maxX - radius ||
      z < this.world.navBounds.minZ + radius ||
      z > this.world.navBounds.maxZ - radius
    ) {
      return false;
    }
    for (const collider of this.world.colliders) {
      const box = collider.box;
      if (box.max.y < 0.35) continue;
      if (
        x + radius > box.min.x &&
        x - radius < box.max.x &&
        z + radius > box.min.z &&
        z - radius < box.max.z
      ) {
        return false;
      }
    }
    return true;
  }

  _walkPhaseUpdate(dt, speed) {
    this.walkPhase += dt * (4.5 + speed * 1.2);
  }

  _idleAnimation(dt) {
    this.walkPhase += dt * 1.2;
  }

  _updateAnimation(dt, playerDistance) {
    const moving = this.state === STATE.CHASE || this.state === STATE.PATROL;
    const speed = this.state === STATE.CHASE ? 2.85 : this.state === STATE.PATROL ? 1.35 : 0;
    if (moving) this._walkPhaseUpdate(dt, speed);

    const stride = moving ? Math.sin(this.walkPhase) * (speed > 2 ? 0.62 : 0.42) : 0;
    this.leftLeg.rotation.x = damp(this.leftLeg.rotation.x, stride, 12, dt);
    this.rightLeg.rotation.x = damp(this.rightLeg.rotation.x, -stride, 12, dt);
    this.leftArm.rotation.x = damp(this.leftArm.rotation.x, this.state === STATE.ATTACK ? -1.18 : -0.55 - stride * 0.25, 9, dt);
    this.rightArm.rotation.x = damp(this.rightArm.rotation.x, this.state === STATE.ATTACK ? -1.35 : -0.88, 9, dt);

    if (this.state === STATE.ATTACK) {
      this.head.rotation.x = damp(this.head.rotation.x, -0.08, 9, dt);
    } else {
      this.head.rotation.x = damp(this.head.rotation.x, 0, 5, dt);
    }

    const bob = moving ? Math.abs(Math.sin(this.walkPhase * 2)) * 0.02 : Math.sin(this.walkPhase) * 0.006;
    this.visual.position.y = damp(this.visual.position.y, bob - this.flinch * 0.04, 14, dt);
    this.visual.rotation.z = damp(this.visual.rotation.z, -this.flinch * 0.16 + stride * 0.015, 10, dt);

    this.muzzleFlash.material.opacity = Math.max(0, this.muzzleFlash.material.opacity - dt * 7);
    if (this.charging) {
      const pulse = 0.3 + (1 - this.chargeTimer / 0.42) * 0.7;
      this.muzzleFlash.scale.setScalar(0.18 + pulse * 0.18);
    } else {
      this.muzzleFlash.scale.setScalar(0.28);
    }
  }

  _updateMaterials(dt) {
    if (this.hitFlash > 0) {
      this.visorMaterial.emissiveIntensity = 8;
      this.coreMaterial.emissiveIntensity = 6;
    } else if (!this.charging) {
      this.visorMaterial.emissiveIntensity = 3.2 + Math.sin(performance.now() * 0.003 + this.index) * 0.4;
      this.coreMaterial.emissiveIntensity = 2.0 + Math.sin(performance.now() * 0.0025 + this.index) * 0.25;
    }
  }

  _panTo(position) {
    const dx = position.x - this.position.x;
    const dz = position.z - this.position.z;
    return clamp(dx / (Math.abs(dz) + 1), -0.7, 0.7);
  }

  takeDamage(amount, info = {}) {
    if (!this.alive) return { killed: false, damage: 0 };
    this.health = Math.max(0, this.health - amount);
    this.hitFlash = 0.16;
    this.flinch = Math.min(1, this.flinch + 0.5);
    this.healthBarGroup.visible = true;
    this.alertMarker.visible = true;
    this.alertMarkerTimer = 0.8;

    if (this.state === STATE.PATROL || this.state === STATE.ALERT) {
      this.state = STATE.CHASE;
      this.stateTime = 0;
    }
    if (this.manager) this.manager.alertNearby(this.position, 14);

    if (this.health <= 0) {
      this._die(info);
      return { killed: true, damage: amount, health: 0 };
    }
    return { killed: false, damage: amount, health: this.health };
  }

  _die(info = {}) {
    this.alive = false;
    this.state = STATE.DEAD;
    this.deathTimer = 0;
    this.healthBarGroup.visible = false;
    this.alertMarker.visible = false;
    this.blobShadow.visible = false;
    this.charging = false;
    this.muzzleFlash.material.opacity = 0;
    this.path = [];
    this.velocity.set(0, 0, 0);
    if (this.manager) this.manager.onEnemyKilled(this, info);
  }

  _updateDeath(dt) {
    const t = clamp(this.deathTimer / 0.9, 0, 1);
    this.visual.rotation.x = damp(this.visual.rotation.x, 1.38, 4.2, dt);
    this.visual.rotation.z = damp(this.visual.rotation.z, 0.34, 3.2, dt);
    this.visual.position.y = damp(this.visual.position.y, -0.14, 3.5, dt);
    this.visorMaterial.emissiveIntensity = Math.max(0, 3.4 * (1 - t));
    this.coreMaterial.emissiveIntensity = Math.max(0, 2.2 * (1 - t));
    if (this.deathTimer > 2.1) {
      this.root.visible = false;
    }
  }

  dispose() {
    this.scene.remove(this.root);
    this.visorMaterial.dispose();
    this.coreMaterial.dispose();
    this.muzzleMaterial.dispose();
    if (this.alertMarker) this.alertMarker.material.dispose();
    if (this.healthFillMat) this.healthFillMat.dispose();
    if (this.healthBarGroup) {
      this.healthBarGroup.traverse((object) => {
        if (object.material) object.material.dispose();
      });
    }
  }
}

export { STATE as ENEMY_STATE };
