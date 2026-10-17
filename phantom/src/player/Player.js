import * as THREE from 'three';
import { clamp, damp, formatTime } from '../utils/math.js';

const PLAYER_RADIUS = 0.36;
const PLAYER_HEIGHT = 1.78;
const EYE_HEIGHT = 1.64;
const STEP_HEIGHT = 0.52;
const GRAVITY = 20;
const WALK_SPEED = 5.1;
const SPRINT_SPEED = 8.55;
const JUMP_SPEED = 6.35;

/**
 * Player: pointer-look, acceleration-based movement, AABB collision with
 * step-up support, jumping and a regenerating barrier.
 */
export class Player {
  constructor({ camera, world, input, audio, settings, callbacks = {} }) {
    this.camera = camera;
    this.world = world;
    this.input = input;
    this.audio = audio;
    this.settings = settings;
    this.callbacks = callbacks;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.cameraOffset = new THREE.Vector3();
    this.eyePosition = new THREE.Vector3();

    this.yaw = 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.shake = 0;
    this.shakeTime = 0;
    this.bobPhase = 0;
    this.bobAmount = 0;
    this.landDip = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.shield = 50;
    this.maxShield = 50;
    this.grounded = true;
    this.dead = false;
    this.sprinting = false;
    this.aiming = false;
    this.lastDamageAt = -100;
    this.lastFootstep = 0;
    this.accumulatedTime = 0;

    this.walkSpeed = WALK_SPEED;
    this.sprintSpeed = SPRINT_SPEED;
    this.jumpSpeed = JUMP_SPEED;
    this.gravity = GRAVITY;
    this.radius = PLAYER_RADIUS;
    this.height = PLAYER_HEIGHT;
    this.eyeHeight = EYE_HEIGHT;

    this.lookDX = 0;
    this.lookDY = 0;
    this.speedRatio = 0;

    this._tmpForward = new THREE.Vector3();
    this._tmpRight = new THREE.Vector3();
    this._tmpDesired = new THREE.Vector3();

    this.reset();
  }

  reset() {
    this.position.copy(this.world.playerSpawn);
    this.position.y = 0;
    this.velocity.set(0, 0, 0);
    this.yaw = this.world.playerYaw || 0;
    this.pitch = 0;
    this.recoilPitch = 0;
    this.recoilYaw = 0;
    this.health = this.maxHealth;
    this.shield = this.maxShield;
    this.grounded = true;
    this.dead = false;
    this.invulnerable = false;
    this.sprinting = false;
    this.aiming = false;
    this.lastDamageAt = -100;
    this.bobPhase = 0;
    this.bobAmount = 0;
    this.landDip = 0;
    this.shake = 0;
    this.shakeTime = 0;
    this.accumulatedTime = 0;
    this.cameraOffset.set(0, 0, 0);
    this._applyCamera();
  }

  get isAlive() {
    return !this.dead && this.health > 0;
  }

  getEyePosition(target = new THREE.Vector3()) {
    return target.set(this.position.x, this.position.y + this.eyeHeight, this.position.z);
  }

  getForward(target = new THREE.Vector3()) {
    return target.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
  }

  getAimDirection(target = new THREE.Vector3()) {
    return this.camera.getWorldDirection(target);
  }

  update(dt) {
    if (this.dead) {
      this._updateDeath(dt);
      return;
    }

    this.accumulatedTime += dt;
    this.aiming = this.input.mouse.right && !this.sprinting;

    this._updateLook(dt);
    this._updateMovement(dt);
    this._updateShield(dt);
    this._updateCameraEffects(dt);
    this._applyCamera();
  }

  _updateLook(dt) {
    const sensitivity = (this.settings.get('sensitivity') || 1) * 0.00195;
    const raw = this.input.consumeMouseDelta();
    this.lookDX = damp(this.lookDX, clamp(raw.x, -80, 80), 18, dt);
    this.lookDY = damp(this.lookDY, clamp(raw.y, -80, 80), 18, dt);

    if (raw.x === 0 && raw.y === 0) {
      this.lookDX = damp(this.lookDX, 0, 7, dt);
      this.lookDY = damp(this.lookDY, 0, 7, dt);
    }

    const aimMultiplier = this.aiming ? 0.64 : 1;
    const invert = this.settings.get('invertY') ? -1 : 1;
    this.yaw -= raw.x * sensitivity * aimMultiplier;
    this.pitch -= raw.y * sensitivity * aimMultiplier * invert;
    this.pitch = clamp(this.pitch, -1.49, 1.49);

    // Recoil recovers toward the true aim point rather than accumulating
    // into the player's permanent look direction.
    this.recoilPitch = damp(this.recoilPitch, 0, 12, dt);
    this.recoilYaw = damp(this.recoilYaw, 0, 12, dt);
  }

  _updateMovement(dt) {
    const forwardInput = (this.input.isDown('KeyW') ? 1 : 0) - (this.input.isDown('KeyS') ? 1 : 0);
    const rightInput = (this.input.isDown('KeyD') ? 1 : 0) - (this.input.isDown('KeyA') ? 1 : 0);
    const wantsSprint = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
    const hasInput = forwardInput !== 0 || rightInput !== 0;

    this.sprinting = wantsSprint && hasInput && !this.input.mouse.right && forwardInput > -0.1;

    let speed = this.sprinting ? this.sprintSpeed : this.walkSpeed;
    if (this.aiming) speed *= 0.62;

    const forward = this._tmpForward.set(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = this._tmpRight.set(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const desired = this._tmpDesired.set(0, 0, 0);
    desired.addScaledVector(forward, forwardInput);
    desired.addScaledVector(right, rightInput);
    if (desired.lengthSq() > 1) desired.normalize();
    desired.multiplyScalar(speed);

    const acceleration = this.grounded ? 14 : 3.4;
    this.velocity.x = damp(this.velocity.x, desired.x, acceleration, dt);
    this.velocity.z = damp(this.velocity.z, desired.z, acceleration, dt);

    if (this.grounded && this.input.wasPressed('Space')) {
      this.velocity.y = this.jumpSpeed;
      this.grounded = false;
      this.audio.jump();
      if (this.callbacks.onJump) this.callbacks.onJump();
    }

    const wasGrounded = this.grounded;
    const fallSpeed = this.velocity.y;
    this.grounded = false;
    this.velocity.y -= this.gravity * dt;

    // Horizontal sweep is separated by axis so sliding along walls is smooth.
    this._moveHorizontal(dt);
    this._moveVertical(dt);

    if (!wasGrounded && this.grounded && fallSpeed < -4) {
      this.audio.land();
      this.landDip = clamp(-fallSpeed * 0.022, 0.035, 0.16);
      if (this.callbacks.onLand) this.callbacks.onLand(fallSpeed);
    }

    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.speedRatio = clamp(horizontalSpeed / this.sprintSpeed, 0, 1);

    if (this.grounded && horizontalSpeed > 0.6) {
      const stepInterval = this.sprinting ? 0.34 : 0.48;
      if (this.accumulatedTime - this.lastFootstep > stepInterval) {
        this.lastFootstep = this.accumulatedTime;
        this.audio.footstep(this.sprinting);
      }
    }

    // Safety net: the perimeter is solid, but never let a bad collision send
    // the player into the void.
    if (this.position.y < -2.5) {
      this.position.copy(this.world.playerSpawn);
      this.velocity.set(0, 0, 0);
      this.health = Math.max(1, this.health - 10);
      if (this.callbacks.onOutOfBounds) this.callbacks.onOutOfBounds();
    }
  }

  _moveHorizontal(dt) {
    const dx = this.velocity.x * dt;
    const dz = this.velocity.z * dt;
    if (dx !== 0) this._moveAxis('x', dx);
    if (dz !== 0) this._moveAxis('z', dz);
  }

  _moveAxis(axis, delta) {
    const original = this.position[axis];
    this.position[axis] += delta;

    for (const collider of this.world.colliders) {
      const box = collider.box;
      if (
        this.position.x + this.radius <= box.min.x ||
        this.position.x - this.radius >= box.max.x ||
        this.position.z + this.radius <= box.min.z ||
        this.position.z - this.radius >= box.max.z
      ) {
        continue;
      }

      const top = box.max.y;
      const bottom = box.min.y;
      const verticalOverlap = this.position.y + 0.08 < top && this.position.y + this.height > bottom;
      if (!verticalOverlap) continue;

      const canStep = top - this.position.y <= STEP_HEIGHT && top > this.position.y && this.velocity.y <= 0.1;
      if (canStep) {
        // Raise the player onto low geometry (stairs, kerbs) when moving.
        if (this._hasHeadroom(this.position.x, top, this.position.z, box)) {
          this.position.y = top;
          this.grounded = true;
          this.velocity.y = 0;
          continue;
        }
      }

      this.position[axis] = original;
      if (axis === 'x') this.velocity.x = 0;
      else this.velocity.z = 0;
      return;
    }
  }

  _hasHeadroom(x, feetY, z, ignoreBox) {
    for (const collider of this.world.colliders) {
      if (collider.box === ignoreBox) continue;
      const box = collider.box;
      if (
        x + this.radius <= box.min.x ||
        x - this.radius >= box.max.x ||
        z + this.radius <= box.min.z ||
        z - this.radius >= box.max.z
      ) {
        continue;
      }
      if (feetY + 0.05 < box.max.y && feetY + this.height > box.min.y) return false;
    }
    return true;
  }

  _moveVertical(dt) {
    const previousFeet = this.position.y;
    let nextFeet = previousFeet + this.velocity.y * dt;

    // Floor slab.
    if (nextFeet <= 0) {
      nextFeet = 0;
      this.velocity.y = 0;
      this.grounded = true;
    }

    if (this.velocity.y <= 0) {
      let highest = this.grounded ? 0 : -Infinity;
      for (const collider of this.world.colliders) {
        const box = collider.box;
        if (
          this.position.x + this.radius * 0.86 <= box.min.x ||
          this.position.x - this.radius * 0.86 >= box.max.x ||
          this.position.z + this.radius * 0.86 <= box.min.z ||
          this.position.z - this.radius * 0.86 >= box.max.z
        ) {
          continue;
        }
        const top = box.max.y;
        // Treat the top surface as support when the feet crossed it this frame.
        if (previousFeet >= top - 0.06 && nextFeet <= top + 0.001) {
          highest = Math.max(highest, top);
        }
      }
      if (highest > nextFeet) {
        nextFeet = highest;
        this.velocity.y = 0;
        this.grounded = true;
      }
    } else {
      // Ceiling collision.
      for (const collider of this.world.colliders) {
        const box = collider.box;
        if (
          this.position.x + this.radius * 0.8 <= box.min.x ||
          this.position.x - this.radius * 0.8 >= box.max.x ||
          this.position.z + this.radius * 0.8 <= box.min.z ||
          this.position.z - this.radius * 0.8 >= box.max.z
        ) {
          continue;
        }
        const headPrev = previousFeet + this.height;
        const headNext = nextFeet + this.height;
        if (headPrev <= box.min.y + 0.02 && headNext >= box.min.y) {
          nextFeet = box.min.y - this.height;
          this.velocity.y = 0;
        }
      }
    }

    this.position.y = nextFeet;
  }

  _updateShield(dt) {
    if (this.health <= 0) return;
    const sinceDamage = this.accumulatedTime - this.lastDamageAt;
    if (sinceDamage > 4.2 && this.shield < this.maxShield) {
      this.shield = Math.min(this.maxShield, this.shield + 11 * dt);
      if (this.callbacks.onShieldChange) this.callbacks.onShieldChange(this.shield);
    }
  }

  _updateCameraEffects(dt) {
    const motionScale = this.settings.get('reducedMotion') ? 0.3 : 1;
    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    const targetBob = this.grounded && horizontalSpeed > 0.4 ? this.speedRatio : 0;
    this.bobAmount = damp(this.bobAmount, targetBob, 8, dt);
    if (this.grounded) this.bobPhase += dt * (7.2 + this.speedRatio * 3.2);
    this.landDip = damp(this.landDip, 0, 9, dt);
    this.shake = damp(this.shake, 0, 7, dt);
    this.shakeTime += dt;

    const bobY = Math.sin(this.bobPhase * 2) * 0.015 * this.bobAmount * motionScale;
    const bobX = Math.cos(this.bobPhase) * 0.018 * this.bobAmount * motionScale;
    const shakeX = Math.sin(this.shakeTime * 47) * this.shake * 0.8;
    const shakeY = Math.cos(this.shakeTime * 39) * this.shake * 0.55;

    this.cameraOffset.set(bobX + shakeX, bobY + shakeY - this.landDip, 0);
  }

  _applyCamera() {
    this.camera.position.set(
      this.position.x + this.cameraOffset.x,
      this.position.y + this.eyeHeight + this.cameraOffset.y,
      this.position.z + this.cameraOffset.z,
    );
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.pitch + this.recoilPitch, this.yaw + this.recoilYaw, 0);
  }

  addRecoil(pitch, yaw) {
    this.recoilPitch = clamp(this.recoilPitch + pitch, -0.15, 0.22);
    this.recoilYaw = clamp(this.recoilYaw + yaw, -0.12, 0.12);
    this.shake = clamp(this.shake + 0.01, 0, 0.05);
  }

  takeDamage(amount, sourcePosition = null) {
    if (this.dead || this.invulnerable || amount <= 0) return 0;

    const shieldBefore = this.shield;
    let remaining = amount;
    if (this.shield > 0) {
      const absorbed = Math.min(this.shield, remaining);
      this.shield -= absorbed;
      remaining -= absorbed;
    }
    if (remaining > 0) {
      this.health = Math.max(0, this.health - remaining);
    }

    this.lastDamageAt = this.accumulatedTime;
    this.shake = clamp(this.shake + Math.min(0.3, amount * 0.014), 0, 0.2);

    if (this.callbacks.onDamage) {
      this.callbacks.onDamage({
        amount,
        health: this.health,
        shield: this.shield,
        shieldAbsorbed: shieldBefore - this.shield,
        sourcePosition,
      });
    }

    this.audio.hurt(clamp(amount / 12, 0.5, 1.8));

    if (this.health <= 0) {
      this.dead = true;
      this.velocity.set(0, 0, 0);
      if (this.callbacks.onDeath) this.callbacks.onDeath();
    }

    return amount;
  }

  heal(amount) {
    const before = this.health;
    this.health = Math.min(this.maxHealth, this.health + amount);
    if (this.callbacks.onHeal) this.callbacks.onHeal(this.health - before);
    return this.health - before;
  }

  _updateDeath(dt) {
    // A short, heavy fall away from the aim direction keeps the camera
    // readable while the defeat screen transitions in.
    this.landDip = damp(this.landDip, 0.85, 2.2, dt);
    this.pitch = damp(this.pitch, -0.32, 2.4, dt);
    this.yaw += dt * 0.18;
    this.camera.position.set(
      this.position.x,
      this.position.y + this.eyeHeight - this.landDip,
      this.position.z,
    );
    this.camera.rotation.set(this.pitch, this.yaw, damp(this.camera.rotation.z, 0.32, 2, dt));
  }

  getDebugState() {
    return {
      position: this.position.toArray().map((v) => Number(v.toFixed(2))),
      yaw: Number(this.yaw.toFixed(3)),
      pitch: Number(this.pitch.toFixed(3)),
      health: Number(this.health.toFixed(1)),
      shield: Number(this.shield.toFixed(1)),
      grounded: this.grounded,
      time: formatTime(this.accumulatedTime),
    };
  }
}
