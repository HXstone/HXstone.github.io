import * as THREE from 'three';
import { clamp, randomRange } from '../utils/math.js';

function makeSoftTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeImpactTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  const gradient = ctx.createRadialGradient(64, 64, 2, 64, 64, 60);
  gradient.addColorStop(0, 'rgba(2,5,7,0.95)');
  gradient.addColorStop(0.35, 'rgba(5,9,11,0.8)');
  gradient.addColorStop(0.62, 'rgba(20,28,32,0.35)');
  gradient.addColorStop(1, 'rgba(20,28,32,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = 'rgba(170,205,214,0.18)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(64, 64, 34, 0, Math.PI * 2);
  ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

class ParticlePool {
  constructor(scene, count, blending, additive = true) {
    this.count = count;
    this.cursor = 0;
    this.particles = new Array(count);
    this.positions = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);
    this.sizes = new Float32Array(count);
    this.alphas = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      this.particles[i] = {
        life: 0,
        maxLife: 1,
        vx: 0,
        vy: 0,
        vz: 0,
        gravity: 0,
        drag: 0,
        baseSize: 0,
        grow: 0,
      };
      this.positions[i * 3 + 1] = -1000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizes, 1));
    geometry.setAttribute('aAlpha', new THREE.BufferAttribute(this.alphas, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending,
      toneMapped: false,
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3 aColor;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(aSize * (420.0 / max(0.2, -mv.z)), 0.0, 56.0);
          gl_Position = projectionMatrix * mv;
          vAlpha = aAlpha;
          vColor = aColor;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.03, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    });

    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 8;
    scene.add(this.points);
    this.geometry = geometry;
    this.material = material;
    this._additive = additive;
  }

  spawn(x, y, z, vx, vy, vz, color, size, life, gravity = 0, drag = 0, grow = 0) {
    const index = this.cursor;
    this.cursor = (this.cursor + 1) % this.count;
    const p = this.particles[index];

    p.life = life;
    p.maxLife = life;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.gravity = gravity;
    p.drag = drag;
    p.baseSize = size;
    p.grow = grow;

    const i3 = index * 3;
    this.positions[i3] = x;
    this.positions[i3 + 1] = y;
    this.positions[i3 + 2] = z;
    this.colors[i3] = color.r;
    this.colors[i3 + 1] = color.g;
    this.colors[i3 + 2] = color.b;
    this.sizes[index] = size;
    this.alphas[index] = 1;
    this.geometry.attributes.aColor.needsUpdate = true;
  }

  update(dt) {
    const { positions, alphas, sizes, particles } = this;
    for (let i = 0; i < this.count; i += 1) {
      const p = particles[i];
      if (p.life <= 0) {
        if (alphas[i] !== 0) alphas[i] = 0;
        continue;
      }
      p.life -= dt;
      if (p.life <= 0) {
        alphas[i] = 0;
        continue;
      }
      p.vy += p.gravity * dt;
      const drag = Math.max(0, 1 - p.drag * dt);
      p.vx *= drag;
      p.vz *= drag;
      const i3 = i * 3;
      positions[i3] += p.vx * dt;
      positions[i3 + 1] += p.vy * dt;
      positions[i3 + 2] += p.vz * dt;
      if (positions[i3 + 1] < 0.02 && p.gravity < 0) {
        positions[i3 + 1] = 0.02;
        p.vy *= -0.28;
        p.vx *= 0.55;
        p.vz *= 0.55;
      }
      const t = p.life / p.maxLife;
      alphas[i] = Math.min(1, t * 2.2) * 0.9;
      sizes[i] = p.baseSize + (1 - t) * p.grow;
    }
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.aSize.needsUpdate = true;
    this.geometry.attributes.aAlpha.needsUpdate = true;
  }

  reset() {
    for (let i = 0; i < this.count; i += 1) {
      this.particles[i].life = 0;
      this.alphas[i] = 0;
    }
    this.geometry.attributes.aAlpha.needsUpdate = true;
  }
}

/**
 * Visual feedback layer: pooled particles, tracers, decals, shell casings and
 * one-shot light flashes. All hot paths reuse preallocated objects.
 */
export class Effects {
  constructor(scene, camera, quality = 'high') {
    this.scene = scene;
    this.camera = camera;
    this.quality = quality;
    this.time = 0;

    const sparkCount = quality === 'low' ? 260 : 620;
    const smokeCount = quality === 'low' ? 90 : 180;
    this.sparks = new ParticlePool(scene, sparkCount, THREE.AdditiveBlending, true);
    this.smoke = new ParticlePool(scene, smokeCount, THREE.NormalBlending, false);

    this._color = new THREE.Color();
    this._color2 = new THREE.Color();
    this._tmp = new THREE.Vector3();
    this._tmp2 = new THREE.Vector3();
    this._quat = new THREE.Quaternion();

    this._createTracers();
    this._createDecals();
    this._createShells();
    this._createShockwaves();
    this._createMuzzleEffects();
  }

  _createTracers() {
    this.tracers = [];
    for (let i = 0; i < 22; i += 1) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: 0x7feeff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      });
      const line = new THREE.Line(geometry, material);
      line.frustumCulled = false;
      line.visible = false;
      this.scene.add(line);
      this.tracers.push({ line, life: 0, maxLife: 0.09, material });
    }
    this._tracerCursor = 0;
  }

  tracer(from, to, weapon = 'rifle') {
    const tracer = this.tracers[this._tracerCursor];
    this._tracerCursor = (this._tracerCursor + 1) % this.tracers.length;
    const attr = tracer.line.geometry.attributes.position;
    attr.setXYZ(0, from.x, from.y, from.z);
    attr.setXYZ(1, to.x, to.y, to.z);
    attr.needsUpdate = true;
    tracer.line.visible = true;
    tracer.material.color.setHex(weapon === 'pistol' ? 0xffc06b : 0x8cefff);
    tracer.material.opacity = weapon === 'pistol' ? 0.95 : 0.8;
    tracer.life = tracer.maxLife;
    tracer.line.geometry.computeBoundingSphere();
  }

  _createDecals() {
    const texture = makeImpactTexture();
    const geometry = new THREE.PlaneGeometry(1, 1);
    this.decals = [];
    for (let i = 0; i < 36; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.renderOrder = 2;
      this.scene.add(mesh);
      this.decals.push({ mesh, life: 0, maxLife: 26, material });
    }
    this._decalCursor = 0;
  }

  impact(point, normal, weapon = 'rifle') {
    const n = normal.clone();
    this._color.setHex(0xffb066);
    this._color2.setHex(0x9fefff);

    // Hot sparks.
    for (let i = 0; i < 8; i += 1) {
      const spread = 3.2;
      this.sparks.spawn(
        point.x + n.x * 0.04,
        point.y + n.y * 0.04,
        point.z + n.z * 0.04,
        n.x * randomRange(0.6, 2.8) + randomRange(-spread, spread),
        n.y * randomRange(0.6, 2.6) + randomRange(-1.4, spread),
        n.z * randomRange(0.6, 2.8) + randomRange(-spread, spread),
        Math.random() > 0.55 ? this._color2 : this._color,
        randomRange(0.012, 0.034),
        randomRange(0.18, 0.5),
        -7,
        1.5,
      );
    }

    // A little dust/smoke puff.
    this._color.setRGB(0.24, 0.28, 0.3);
    for (let i = 0; i < 3; i += 1) {
      this.smoke.spawn(
        point.x + n.x * 0.08,
        point.y + n.y * 0.08,
        point.z + n.z * 0.08,
        n.x * randomRange(0.05, 0.4) + randomRange(-0.25, 0.25),
        randomRange(0.1, 0.5),
        n.z * randomRange(0.05, 0.4) + randomRange(-0.25, 0.25),
        this._color,
        randomRange(0.07, 0.12),
        randomRange(0.55, 1.1),
        0.2,
        2.1,
        0.26,
      );
    }

    this._placeDecal(point, n);
  }

  _placeDecal(point, normal) {
    const decal = this.decals[this._decalCursor];
    this._decalCursor = (this._decalCursor + 1) % this.decals.length;
    decal.mesh.visible = true;
    decal.mesh.position.copy(point).addScaledVector(normal, 0.012);
    this._tmp.copy(decal.mesh.position).add(normal);
    decal.mesh.lookAt(this._tmp);
    const scale = randomRange(0.055, 0.1);
    decal.mesh.scale.set(scale, scale, scale);
    decal.mesh.rotation.z = Math.random() * Math.PI;
    decal.material.opacity = 0.88;
    decal.life = decal.maxLife;
  }

  enemyImpact(point, normal, headshot = false) {
    this._color.setHex(headshot ? 0xffd36e : 0xff7c5c);
    this._color2.setHex(0x9af4ff);
    for (let i = 0; i < 12; i += 1) {
      this.sparks.spawn(
        point.x,
        point.y,
        point.z,
        normal.x * randomRange(0.2, 1.9) + randomRange(-3.2, 3.2),
        normal.y * randomRange(0.2, 1.6) + randomRange(-0.8, 3.3),
        normal.z * randomRange(0.2, 1.9) + randomRange(-3.2, 3.2),
        Math.random() > 0.35 ? this._color : this._color2,
        randomRange(0.015, 0.04),
        randomRange(0.2, 0.55),
        -7,
        1.8,
      );
    }
    // Short-lived cyan bloom to sell a robotic hit.
    this._color.setRGB(0.05, 0.45, 0.5);
    for (let i = 0; i < 2; i += 1) {
      this.smoke.spawn(
        point.x,
        point.y,
        point.z,
        randomRange(-0.2, 0.2),
        randomRange(0.2, 0.7),
        randomRange(-0.2, 0.2),
        this._color,
        0.08,
        0.3,
        0,
        2.5,
        0.24,
      );
    }
  }

  deathBurst(point, color = 0xff6f55) {
    this._color.setHex(color);
    this._color2.setHex(0x9df6ff);
    for (let i = 0; i < 34; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomRange(1.2, 7);
      this.sparks.spawn(
        point.x,
        point.y + randomRange(0.4, 1.5),
        point.z,
        Math.cos(angle) * speed,
        randomRange(0.4, 5),
        Math.sin(angle) * speed,
        Math.random() > 0.35 ? this._color : this._color2,
        randomRange(0.02, 0.06),
        randomRange(0.45, 1.15),
        -8,
        1.1,
      );
    }
    for (let i = 0; i < 8; i += 1) {
      this.smoke.spawn(
        point.x,
        point.y + randomRange(0.3, 1.6),
        point.z,
        randomRange(-1.2, 1.2),
        randomRange(0.2, 1.2),
        randomRange(-1.2, 1.2),
        new THREE.Color(0x1c272c),
        randomRange(0.18, 0.32),
        randomRange(0.8, 1.7),
        -0.2,
        1.1,
        0.4,
      );
    }
    this._spawnShockwave(point, color);
    this._flashLight(point, color, 16, 0.16);
  }

  _createShockwaves() {
    this.shockwaves = [];
    for (let i = 0; i < 4; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.RingGeometry(0.2, 0.24, 32),
        new THREE.MeshBasicMaterial({
          color: 0xff7a5f,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        }),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.visible = false;
      this.scene.add(mesh);
      this.shockwaves.push({ mesh, life: 0, maxLife: 0.42, material: mesh.material });
    }
    this._waveCursor = 0;
  }

  _spawnShockwave(point, color) {
    const wave = this.shockwaves[this._waveCursor];
    this._waveCursor = (this._waveCursor + 1) % this.shockwaves.length;
    wave.mesh.position.copy(point);
    wave.mesh.position.y = Math.max(0.04, point.y);
    wave.mesh.visible = true;
    wave.mesh.material.color.setHex(color);
    wave.mesh.material.opacity = 0.6;
    wave.mesh.scale.setScalar(0.6);
    wave.life = wave.maxLife;
  }

  _createShells() {
    const geometry = new THREE.CylinderGeometry(0.007, 0.008, 0.028, 6);
    const material = new THREE.MeshStandardMaterial({
      color: 0xa98b52,
      metalness: 0.9,
      roughness: 0.34,
    });
    this.shells = [];
    for (let i = 0; i < 20; i += 1) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      mesh.castShadow = false;
      this.scene.add(mesh);
      this.shells.push({
        mesh,
        life: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        rx: 0,
        ry: 0,
        rz: 0,
      });
    }
    this._shellCursor = 0;
  }

  ejectShell(camera, weapon = 'rifle') {
    const shell = this.shells[this._shellCursor];
    this._shellCursor = (this._shellCursor + 1) % this.shells.length;
    const pos = this._tmp.set(0.3, -0.22, -0.48).applyMatrix4(camera.matrixWorld);
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    const forward = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 2);
    shell.mesh.position.copy(pos);
    shell.mesh.visible = true;
    const power = weapon === 'pistol' ? 1.7 : 2.2;
    shell.vx = right.x * power + up.x * randomRange(0.8, 1.5) + forward.x * randomRange(-0.4, 0.2);
    shell.vy = right.y * power + up.y * randomRange(0.8, 1.5) + 1.2;
    shell.vz = right.z * power + up.z * randomRange(0.8, 1.5) + forward.z * randomRange(-0.4, 0.2);
    shell.rx = randomRange(-12, 12);
    shell.ry = randomRange(-12, 12);
    shell.rz = randomRange(-12, 12);
    shell.life = 2.6;
  }

  _createMuzzleEffects() {
    const texture = makeSoftTexture('rgba(210,250,255,1)', 'rgba(80,220,255,0)');
    this.muzzleSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        color: 0xa8f0ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    this.muzzleSprite.scale.set(0.4, 0.4, 1);
    this.scene.add(this.muzzleSprite);

    this.muzzleLight = new THREE.PointLight(0x8ceaff, 0, 7, 2);
    this.scene.add(this.muzzleLight);
    this._muzzleLife = 0;

    this.flashLight = new THREE.PointLight(0xff8764, 0, 10, 2);
    this.scene.add(this.flashLight);
    this._flashLife = 0;
    this._flashMaxLife = 0.2;
  }

  playerMuzzleFlash(position, weapon = 'rifle') {
    this.muzzleSprite.position.copy(position);
    this.muzzleSprite.material.color.setHex(weapon === 'pistol' ? 0xffd09b : 0xa8f0ff);
    const scale = weapon === 'pistol' ? 0.34 : 0.48;
    this.muzzleSprite.scale.set(scale, scale, 1);
    this.muzzleSprite.material.rotation = Math.random() * Math.PI * 2;
    this.muzzleSprite.material.opacity = 0.95;
    this.muzzleLight.position.copy(position);
    this.muzzleLight.color.setHex(weapon === 'pistol' ? 0xffbf8a : 0x8ceaff);
    this.muzzleLight.intensity = weapon === 'pistol' ? 7 : 10;
    this._muzzleLife = 0.065;

    this._color.setRGB(0.38, 0.48, 0.5);
    for (let i = 0; i < 2; i += 1) {
      this.smoke.spawn(
        position.x,
        position.y,
        position.z,
        randomRange(-0.16, 0.16),
        randomRange(0.06, 0.3),
        randomRange(-0.16, 0.16),
        this._color,
        randomRange(0.03, 0.05),
        randomRange(0.3, 0.6),
        -0.3,
        1.2,
        0.1,
      );
    }
  }

  _flashLight(position, color, intensity, duration) {
    this.flashLight.position.copy(position);
    this.flashLight.color.setHex(color);
    this.flashLight.intensity = intensity;
    this._flashLife = duration;
    this._flashMaxLife = duration;
  }

  damagePulse() {
    // Reserved for future world-space feedback; hit marker is handled by UI.
  }

  update(dt) {
    this.time += dt;
    this.sparks.update(dt);
    this.smoke.update(dt);

    for (const tracer of this.tracers) {
      if (tracer.life <= 0) continue;
      tracer.life -= dt;
      if (tracer.life <= 0) {
        tracer.line.visible = false;
        continue;
      }
      tracer.material.opacity = clamp(tracer.life / tracer.maxLife, 0, 1) * 0.9;
    }

    for (const decal of this.decals) {
      if (decal.life <= 0) continue;
      decal.life -= dt;
      if (decal.life <= 0) {
        decal.mesh.visible = false;
        continue;
      }
      if (decal.life < 3) decal.material.opacity = (decal.life / 3) * 0.88;
    }

    for (const shell of this.shells) {
      if (shell.life <= 0) continue;
      shell.life -= dt;
      shell.vy -= 12 * dt;
      shell.mesh.position.x += shell.vx * dt;
      shell.mesh.position.y += shell.vy * dt;
      shell.mesh.position.z += shell.vz * dt;
      shell.mesh.rotation.x += shell.rx * dt;
      shell.mesh.rotation.y += shell.ry * dt;
      shell.mesh.rotation.z += shell.rz * dt;
      if (shell.mesh.position.y < 0.02) {
        shell.mesh.position.y = 0.02;
        shell.vy *= -0.42;
        shell.vx *= 0.7;
        shell.vz *= 0.7;
        shell.rx *= 0.65;
        shell.rz *= 0.65;
      }
      if (shell.life <= 0) shell.mesh.visible = false;
    }

    for (const wave of this.shockwaves) {
      if (wave.life <= 0) continue;
      wave.life -= dt;
      if (wave.life <= 0) {
        wave.mesh.visible = false;
        continue;
      }
      const progress = 1 - wave.life / wave.maxLife;
      wave.mesh.scale.setScalar(0.6 + progress * 9);
      wave.material.opacity = (1 - progress) * 0.55;
    }

    if (this._muzzleLife > 0) {
      this._muzzleLife -= dt;
      const t = clamp(this._muzzleLife / 0.065, 0, 1);
      this.muzzleSprite.material.opacity = t * 0.95;
      this.muzzleLight.intensity = t * 10;
      if (this._muzzleLife <= 0) {
        this.muzzleSprite.material.opacity = 0;
        this.muzzleLight.intensity = 0;
      }
    }

    if (this._flashLife > 0) {
      this._flashLife -= dt;
      const t = clamp(this._flashLife / this._flashMaxLife, 0, 1);
      this.flashLight.intensity = t * 16;
    }
  }

  reset() {
    this.sparks.reset();
    this.smoke.reset();
    for (const tracer of this.tracers) {
      tracer.life = 0;
      tracer.line.visible = false;
    }
    for (const decal of this.decals) {
      decal.life = 0;
      decal.mesh.visible = false;
    }
    for (const shell of this.shells) {
      shell.life = 0;
      shell.mesh.visible = false;
    }
    for (const wave of this.shockwaves) {
      wave.life = 0;
      wave.mesh.visible = false;
    }
    this._muzzleLife = 0;
    this.muzzleSprite.material.opacity = 0;
    this.muzzleLight.intensity = 0;
    this._flashLife = 0;
    this.flashLight.intensity = 0;
  }
}
