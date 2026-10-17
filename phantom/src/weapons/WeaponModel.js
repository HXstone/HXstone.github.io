import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clamp, damp, lerp } from '../utils/math.js';

function makeStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.translate(64, 64);

  const radial = ctx.createRadialGradient(0, 0, 0, 0, 0, 58);
  radial.addColorStop(0, 'rgba(255,255,255,1)');
  radial.addColorStop(0.08, 'rgba(220,250,255,0.95)');
  radial.addColorStop(0.3, 'rgba(120,230,255,0.5)');
  radial.addColorStop(1, 'rgba(30,120,180,0)');
  ctx.fillStyle = radial;
  ctx.fillRect(-64, -64, 128, 128);

  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 4; i += 1) {
    ctx.save();
    ctx.rotate((i / 4) * Math.PI * 2 + Math.PI / 4);
    const grad = ctx.createLinearGradient(0, 0, 0, -62);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, 'rgba(80,220,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(0, -58);
    ctx.lineTo(4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeLabelTexture(title, sub) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.fillStyle = 'rgba(4,7,9,0.55)';
  ctx.fillRect(0, 0, 256, 64);
  ctx.strokeStyle = 'rgba(107,231,255,0.55)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 62);
  ctx.fillStyle = '#dff8ff';
  ctx.font = '600 25px monospace';
  ctx.fillText(title, 13, 30);
  ctx.fillStyle = 'rgba(107,231,255,0.8)';
  ctx.font = '11px monospace';
  ctx.fillText(sub, 14, 48);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * First-person weapon is rendered in its own scene after post-processing.
 * This gives crisp, consistent gun detail and prevents clipping through
 * nearby level geometry. Both weapons are entirely procedural.
 */
export class WeaponModel {
  constructor(aspect) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(68, aspect, 0.01, 12);
    this.camera.position.set(0, 0, 0);

    this.time = 0;
    this.adsProgress = 0;
    this.kick = 0;
    this.swayX = 0;
    this.swayY = 0;
    this.flashTimer = 0;
    this.current = 'rifle';

    this._tmpMuzzle = new THREE.Vector3();
    this._lookX = 0;
    this._lookY = 0;

    this._createLights();
    this._createMaterials();

    this.rig = new THREE.Group();
    this.rig.position.set(0.46, -0.35, -0.7);
    this.rig.scale.setScalar(0.88);
    this.scene.add(this.rig);

    this.rifle = this._buildRifle();
    this.pistol = this._buildPistol();
    this.pistol.visible = false;
    this.rig.add(this.rifle, this.pistol);

    this.groups = { rifle: this.rifle, pistol: this.pistol };
    this._batchWeapon(this.rifle);
    this._batchWeapon(this.pistol);
    this.models = {
      rifle: {
        hip: new THREE.Vector3(0.46, -0.35, -0.7),
        ads: new THREE.Vector3(0.0, -0.167, -0.56),
        hipRot: new THREE.Euler(-0.015, -0.065, 0.02),
        adsRot: new THREE.Euler(0, 0, 0),
        muzzle: this.rifle.userData.muzzle,
        magazine: this.rifle.userData.magazine,
        sightDot: this.rifle.userData.sightDot,
      },
      pistol: {
        hip: new THREE.Vector3(0.36, -0.31, -0.6),
        ads: new THREE.Vector3(0.0, -0.101, -0.47),
        hipRot: new THREE.Euler(-0.01, -0.09, 0.02),
        adsRot: new THREE.Euler(0, 0, 0),
        muzzle: this.pistol.userData.muzzle,
        magazine: this.pistol.userData.magazine,
        sightDot: this.pistol.userData.sightDot,
      },
    };

    this._flashMaterials = [];
    this._muzzleFlash = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeStarTexture(),
        color: 0xbaf6ff,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    this._muzzleFlash.visible = false;
    this._muzzleFlash.scale.set(0.36, 0.36, 1);
    this.scene.add(this._muzzleFlash);

    this.flashLight = new THREE.PointLight(0x8fe9ff, 0, 1.6, 2);
    this.scene.add(this.flashLight);
  }

  /**
   * Merge the static opaque parts of each weapon by material. The magazine,
   * moving sight dot and transparent lens stay separate because they animate
   * or need independent depth sorting.
   */
  _batchWeapon(group) {
    if (!group) return;
    group.updateMatrixWorld(true);
    const excluded = new Set();
    const excludeTree = (node) => {
      if (!node) return;
      node.traverse((child) => excluded.add(child));
    };
    excludeTree(group.userData.magazine);
    excludeTree(group.userData.sightDot);

    const inverseGroup = group.matrixWorld.clone().invert();
    const batches = new Map();
    group.traverse((object) => {
      if (!object.isMesh || excluded.has(object)) return;
      const material = object.material;
      if (!material || Array.isArray(material) || material.transparent || material.opacity < 1) return;
      if (!object.geometry?.attributes?.position) return;
      if (!batches.has(material.uuid)) batches.set(material.uuid, { material, meshes: [] });
      batches.get(material.uuid).meshes.push(object);
    });

    for (const { material, meshes } of batches.values()) {
      if (meshes.length < 2) continue;
      const geometries = [];
      for (const mesh of meshes) {
        try {
          const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
          for (const attribute of Object.keys(geometry.attributes)) {
            if (!['position', 'normal', 'uv'].includes(attribute)) geometry.deleteAttribute(attribute);
          }
          if (!geometry.getAttribute('uv')) {
            const count = geometry.getAttribute('position').count;
            geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
          }
          const relative = new THREE.Matrix4().multiplyMatrices(inverseGroup, mesh.matrixWorld);
          geometry.applyMatrix4(relative);
          geometries.push(geometry);
        } catch {
          geometries.length = 0;
          break;
        }
      }
      if (geometries.length !== meshes.length) continue;

      let merged = null;
      try {
        merged = mergeGeometries(geometries, false);
      } catch {
        merged = null;
      }
      if (!merged) continue;

      const batch = new THREE.Mesh(merged, material);
      group.add(batch);
      for (const mesh of meshes) mesh.visible = false;
      for (const geometry of geometries) geometry.dispose();
    }
  }

  _createLights() {
    const ambient = new THREE.AmbientLight(0x81909a, 0.95);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xd7edf4, 3.1);
    key.position.set(-1.3, 2, 1.2);
    this.scene.add(key);

    const rim = new THREE.PointLight(0x62d9f2, 12, 3.2, 2);
    rim.position.set(0.9, 0.4, -0.6);
    this.scene.add(rim);

    const fill = new THREE.PointLight(0xa9c2cc, 3.4, 2.8, 2);
    fill.position.set(-0.8, -0.4, -0.5);
    this.scene.add(fill);
  }

  _createMaterials() {
    this.mat = {
      body: new THREE.MeshStandardMaterial({ color: 0x343c42, roughness: 0.36, metalness: 0.82 }),
      bodyDark: new THREE.MeshStandardMaterial({ color: 0x1a2025, roughness: 0.46, metalness: 0.7 }),
      polymer: new THREE.MeshStandardMaterial({ color: 0x171d22, roughness: 0.76, metalness: 0.18 }),
      brushed: new THREE.MeshStandardMaterial({ color: 0x515b61, roughness: 0.38, metalness: 0.86 }),
      cyan: new THREE.MeshStandardMaterial({
        color: 0x071217,
        emissive: 0x65e9ff,
        emissiveIntensity: 3,
        roughness: 0.22,
        metalness: 0.2,
        toneMapped: false,
      }),
      amber: new THREE.MeshStandardMaterial({
        color: 0x120c04,
        emissive: 0xffa33b,
        emissiveIntensity: 2.5,
        roughness: 0.3,
        metalness: 0.1,
        toneMapped: false,
      }),
      glass: new THREE.MeshBasicMaterial({
        color: 0x72e6ff,
        transparent: true,
        opacity: 0.28,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
      dot: new THREE.MeshBasicMaterial({ color: 0xff4d58, toneMapped: false }),
      label: new THREE.MeshBasicMaterial({
        map: makeLabelTexture('VK-7', 'SPECTER / PULSE'),
        transparent: true,
        toneMapped: false,
      }),
      labelPistol: new THREE.MeshBasicMaterial({
        map: makeLabelTexture('M9', 'WRAITH / ARC'),
        transparent: true,
        toneMapped: false,
      }),
    };
  }

  _box(w, h, d, material, x, y, z, radius = 0.01) {
    const geometry = radius > 0
      ? new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, Math.min(w, h, d) * 0.22))
      : new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
  }

  _cylinder(rt, rb, h, material, x, y, z, segments = 12) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segments), material);
    mesh.position.set(x, y, z);
    return mesh;
  }

  _buildRifle() {
    const group = new THREE.Group();
    group.name = 'VK-7 SPECTER';

    const receiver = this._box(0.13, 0.135, 0.42, this.mat.body, 0, 0, -0.2, 0.018);
    group.add(receiver);

    const upper = this._box(0.115, 0.045, 0.44, this.mat.bodyDark, 0, 0.083, -0.22, 0.012);
    group.add(upper);

    // Picatinny rail sections.
    for (let i = 0; i < 10; i += 1) {
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.008, 0.018), this.mat.bodyDark);
      tooth.position.set(0, 0.109, -0.41 + i * 0.036);
      group.add(tooth);
    }

    const handguard = this._box(0.1, 0.1, 0.28, this.mat.polymer, 0, -0.01, -0.5, 0.02);
    group.add(handguard);
    for (let i = 0; i < 4; i += 1) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.034, 0.04), this.mat.bodyDark);
      vent.position.set(0.052, -0.004, -0.43 - i * 0.052);
      group.add(vent);
    }

    const barrel = this._cylinder(0.016, 0.017, 0.31, this.mat.brushed, 0, 0.002, -0.7, 10);
    barrel.rotation.x = Math.PI / 2;
    group.add(barrel);

    const shroud = this._cylinder(0.027, 0.032, 0.1, this.mat.bodyDark, 0, 0.002, -0.63, 10);
    shroud.rotation.x = Math.PI / 2;
    group.add(shroud);

    const brake = this._cylinder(0.031, 0.026, 0.09, this.mat.body, 0, 0.002, -0.815, 8);
    brake.rotation.x = Math.PI / 2;
    group.add(brake);
    for (let i = 0; i < 3; i += 1) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.008, 0.012), this.mat.cyan);
      slot.position.set(0, 0.002, -0.84 + i * 0.018);
      group.add(slot);
    }

    // Stock and cheek rest.
    const stock = this._box(0.105, 0.115, 0.25, this.mat.polymer, 0, -0.01, 0.12, 0.02);
    group.add(stock);
    const butt = this._box(0.12, 0.14, 0.045, this.mat.bodyDark, 0, -0.012, 0.26, 0.012);
    group.add(butt);
    const cheek = this._box(0.09, 0.04, 0.14, this.mat.body, 0, 0.06, 0.13, 0.01);
    group.add(cheek);

    // Pistol grip.
    const grip = this._box(0.062, 0.16, 0.085, this.mat.polymer, 0, -0.135, -0.015, 0.02);
    grip.rotation.x = -0.22;
    group.add(grip);
    const gripRidge = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.012, 0.07), this.mat.bodyDark);
    gripRidge.position.set(0, -0.11, -0.01);
    gripRidge.rotation.x = -0.22;
    group.add(gripRidge);

    // Magazine assembly.
    const magazine = new THREE.Group();
    magazine.position.set(0, -0.16, -0.18);
    magazine.rotation.x = -0.1;
    group.add(magazine);
    const magBody = this._box(0.072, 0.22, 0.115, this.mat.bodyDark, 0, 0, 0, 0.015);
    magazine.add(magBody);
    const magPlate = this._box(0.078, 0.028, 0.12, this.mat.polymer, 0, -0.12, 0, 0.008);
    magazine.add(magPlate);
    const magLight = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.14, 0.006), this.mat.cyan);
    magLight.position.set(0.038, 0.01, 0.06);
    magazine.add(magLight);

    // Trigger guard.
    const guard = this._box(0.07, 0.012, 0.09, this.mat.bodyDark, 0, -0.09, -0.1, 0.005);
    group.add(guard);
    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.045, 0.016), this.mat.brushed);
    trigger.position.set(0, -0.075, -0.1);
    trigger.rotation.x = 0.2;
    group.add(trigger);

    // Holo sight.
    const sightBase = this._box(0.075, 0.028, 0.12, this.mat.bodyDark, 0, 0.132, -0.13, 0.006);
    group.add(sightBase);
    const sightFrame = new THREE.Group();
    sightFrame.position.set(0, 0.19, -0.13);
    group.add(sightFrame);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.095, 0.016), this.mat.brushed);
    left.position.x = -0.052;
    sightFrame.add(left);
    const right = left.clone();
    right.position.x = 0.052;
    sightFrame.add(right);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.117, 0.013, 0.016), this.mat.brushed);
    top.position.y = 0.052;
    sightFrame.add(top);
    for (const side of [-1, 1]) {
      const outline = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.088, 0.005), this.mat.cyan);
      outline.position.set(side * 0.062, 0, 0.002);
      sightFrame.add(outline);
    }
    const topOutline = new THREE.Mesh(new THREE.BoxGeometry(0.118, 0.005, 0.005), this.mat.cyan);
    topOutline.position.set(0, 0.061, 0.002);
    sightFrame.add(topOutline);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.084, 0.084), this.mat.glass);
    glass.position.set(0, 0, 0.002);
    sightFrame.add(glass);
    const sightDot = new THREE.Mesh(new THREE.CircleGeometry(0.005, 12), this.mat.dot);
    sightDot.position.set(0, 0, 0.006);
    sightFrame.add(sightDot);

    // Side identification plate and luminous accents.
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.155, 0.039), this.mat.label);
    label.position.set(0.0665, -0.026, -0.16);
    label.rotation.y = Math.PI / 2;
    group.add(label);

    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.018, 0.18), this.mat.cyan);
      strip.position.set(side * 0.066, -0.038, -0.3);
      group.add(strip);
    }

    // Charging handle and ejection port.
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.02, 0.07), this.mat.brushed);
    handle.position.set(-0.08, 0.04, -0.05);
    group.add(handle);
    const port = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.036, 0.095), this.mat.bodyDark);
    port.position.set(0.066, 0.035, -0.08);
    group.add(port);

    // Angular fore-grip.
    const foregrip = this._box(0.055, 0.12, 0.07, this.mat.polymer, 0, -0.1, -0.48, 0.012);
    foregrip.rotation.x = 0.15;
    group.add(foregrip);

    // A few screw heads add scale.
    for (let i = 0; i < 4; i += 1) {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.004, 6), this.mat.brushed);
      screw.rotation.z = Math.PI / 2;
      screw.position.set(0.067, -0.02 + (i % 2) * 0.035, -0.35 + Math.floor(i / 2) * 0.15);
      group.add(screw);
    }

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0.002, -0.865);
    group.add(muzzle);

    group.userData = { muzzle, magazine, sightDot };
    return group;
  }

  _buildPistol() {
    const group = new THREE.Group();
    group.name = 'M9 WRAITH';

    const slide = this._box(0.075, 0.08, 0.34, this.mat.body, 0, 0.03, -0.15, 0.012);
    group.add(slide);
    const frame = this._box(0.068, 0.055, 0.27, this.mat.polymer, 0, -0.045, -0.13, 0.012);
    group.add(frame);

    const barrel = this._cylinder(0.012, 0.012, 0.07, this.mat.brushed, 0, 0.03, -0.33, 10);
    barrel.rotation.x = Math.PI / 2;
    group.add(barrel);

    // Slide cuts.
    for (let i = 0; i < 3; i += 1) {
      const cut = new THREE.Mesh(new THREE.BoxGeometry(0.078, 0.018, 0.022), this.mat.bodyDark);
      cut.position.set(0, 0.055, -0.22 + i * 0.045);
      group.add(cut);
    }

    // Grip and magazine.
    const grip = this._box(0.065, 0.18, 0.085, this.mat.polymer, 0, -0.145, 0.01, 0.016);
    grip.rotation.x = -0.14;
    group.add(grip);

    const magazine = new THREE.Group();
    magazine.position.set(0, -0.18, 0.012);
    group.add(magazine);
    const magBody = this._box(0.056, 0.15, 0.07, this.mat.bodyDark, 0, 0, 0, 0.008);
    magazine.add(magBody);
    const magBase = this._box(0.067, 0.018, 0.08, this.mat.brushed, 0, -0.082, 0, 0.006);
    magazine.add(magBase);

    const guard = this._box(0.052, 0.01, 0.075, this.mat.bodyDark, 0, -0.082, -0.065, 0.004);
    group.add(guard);
    const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.036, 0.012), this.mat.brushed);
    trigger.position.set(0, -0.072, -0.07);
    group.add(trigger);

    // Compact optic.
    const sightBase = this._box(0.05, 0.02, 0.08, this.mat.bodyDark, 0, 0.08, -0.14, 0.004);
    group.add(sightBase);
    const sightFrame = new THREE.Group();
    sightFrame.position.set(0, 0.115, -0.14);
    group.add(sightFrame);
    const left = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.06, 0.014), this.mat.brushed);
    left.position.x = -0.035;
    sightFrame.add(left);
    const right = left.clone();
    right.position.x = 0.035;
    sightFrame.add(right);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.01, 0.014), this.mat.brushed);
    top.position.y = 0.03;
    sightFrame.add(top);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.05), this.mat.glass);
    glass.position.z = 0.001;
    sightFrame.add(glass);
    const sightDot = new THREE.Mesh(new THREE.CircleGeometry(0.0038, 10), this.mat.dot);
    sightDot.position.z = 0.006;
    sightFrame.add(sightDot);

    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.028), this.mat.labelPistol);
    label.position.set(0.0405, -0.02, -0.11);
    label.rotation.y = Math.PI / 2;
    group.add(label);

    const accent = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.012, 0.11), this.mat.cyan);
    accent.position.set(0.0405, -0.05, -0.14);
    group.add(accent);

    const muzzle = new THREE.Object3D();
    muzzle.position.set(0, 0.03, -0.365);
    group.add(muzzle);

    group.userData = { muzzle, magazine, sightDot };
    return group;
  }

  setWeapon(name) {
    if (!this.groups[name]) return;
    this.current = name;
    this.rifle.visible = name === 'rifle';
    this.pistol.visible = name === 'pistol';
  }

  triggerShot(kind) {
    this.kick = Math.min(1.5, this.kick + (kind === 'pistol' ? 0.9 : 0.55));
    this.flashTimer = 0.055;
    const muzzle = this.models[this.current].muzzle;
    muzzle.getWorldPosition(this._tmpMuzzle);
    this._muzzleFlash.position.copy(this._tmpMuzzle);
    this._muzzleFlash.material.rotation = Math.random() * Math.PI * 2;
    const scale = kind === 'pistol' ? 0.26 : 0.36;
    this._muzzleFlash.scale.set(scale * (0.8 + Math.random() * 0.6), scale * (0.8 + Math.random() * 0.6), 1);
    this._muzzleFlash.visible = true;
    this.flashLight.position.copy(this._tmpMuzzle);
    this.flashLight.intensity = 5;
  }

  /**
   * Muzzle position in main-camera local space. The overlay camera and the
   * gameplay camera share orientation, so applying the camera's world matrix
   * yields a correct world-space origin for tracers and lighting.
   */
  getMuzzleWorldPosition(gameCamera, target = new THREE.Vector3()) {
    const muzzle = this.models[this.current].muzzle;
    muzzle.getWorldPosition(target);
    return target.applyMatrix4(gameCamera.matrixWorld);
  }

  getCurrentGroup() {
    return this.groups[this.current];
  }

  update(dt, state) {
    this.time += dt;
    const motionScale = state.reducedMotion ? 0.25 : 1;
    const aimTarget = state.aiming ? 1 : 0;
    this.adsProgress = damp(this.adsProgress, aimTarget, 14, dt);
    const conf = this.models[this.current];

    const hip = conf.hip;
    const ads = conf.ads;
    const targetX = lerp(hip.x, ads.x, this.adsProgress);
    const targetY = lerp(hip.y, ads.y, this.adsProgress);
    const targetZ = lerp(hip.z, ads.z, this.adsProgress);

    // Look lag adds physicality to the weapon without affecting aim.
    this.swayX = damp(this.swayX, clamp(state.lookDX || 0, -30, 30), 10, dt);
    this.swayY = damp(this.swayY, clamp(state.lookDY || 0, -30, 30), 10, dt);
    const adsDamp = 1 - this.adsProgress * 0.72;
    const lookSwayX = -this.swayX * 0.00042 * adsDamp * motionScale;
    const lookSwayY = this.swayY * 0.00036 * adsDamp * motionScale;

    const bob = state.speedRatio * motionScale;
    const bobX = Math.cos(state.bobPhase || this.time * 6) * 0.0085 * bob;
    const bobY = Math.sin((state.bobPhase || this.time * 6) * 2) * 0.0065 * bob;
    const idle = this.adsProgress < 0.4 ? Math.sin(this.time * 1.2) * 0.0022 : 0.0008;

    // Recoil kick is an impulse with a fast settle.
    this.kick = damp(this.kick, 0, 18, dt);
    const kickBack = this.kick * 0.045;
    const kickRot = this.kick * 0.055;

    // Reload motion.
    const reload = state.reloadProgress ?? 0;
    const reloadAmount = state.reloading ? Math.sin(clamp(reload, 0, 1) * Math.PI) : 0;
    const reloadTilt = -reloadAmount * 0.58;
    const reloadDrop = -reloadAmount * 0.08;
    const reloadRoll = reloadAmount * 0.36;

    // Weapon swap dip.
    const swap = state.switchProgress ?? 0;
    const swapAmount = Math.sin(clamp(swap, 0, 1) * Math.PI);
    const swapDrop = -swapAmount * 0.28;

    this.rig.position.x = damp(this.rig.position.x, targetX + lookSwayX + bobX, 18, dt);
    this.rig.position.y = damp(
      this.rig.position.y,
      targetY + lookSwayY + bobY + idle + reloadDrop + swapDrop,
      18,
      dt,
    );
    this.rig.position.z = damp(this.rig.position.z, targetZ + kickBack, 22, dt);

    this.rig.rotation.x = damp(
      this.rig.rotation.x,
      lerp(conf.hipRot.x, conf.adsRot.x, this.adsProgress) + reloadTilt + kickRot,
      16,
      dt,
    );
    this.rig.rotation.y = damp(
      this.rig.rotation.y,
      lerp(conf.hipRot.y, conf.adsRot.y, this.adsProgress) - lookSwayX * 2.2,
      16,
      dt,
    );
    this.rig.rotation.z = damp(
      this.rig.rotation.z,
      lerp(conf.hipRot.z, conf.adsRot.z, this.adsProgress) + reloadRoll,
      16,
      dt,
    );

    if (conf.magazine) {
      const magPhase = reloadAmount;
      conf.magazine.position.y = conf.magazine.userData.baseY ?? (conf.magazine.userData.baseY = conf.magazine.position.y);
      conf.magazine.position.y = (conf.magazine.userData.baseY || 0) - magPhase * 0.28;
      conf.magazine.rotation.z = magPhase * 0.18;
    }

    if (conf.sightDot) {
      const pulse = 0.72 + Math.sin(this.time * 3) * 0.14;
      conf.sightDot.material = conf.sightDot.material;
      conf.sightDot.scale.setScalar(pulse);
    }

    // Flash.
    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this._muzzleFlash.visible = false;
        this.flashLight.intensity = 0;
      } else {
        const alpha = clamp(this.flashTimer / 0.055, 0, 1);
        this._muzzleFlash.material.opacity = alpha;
        this.flashLight.intensity = alpha * 5;
      }
    }
  }

  resize(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  setFov(value) {
    this.camera.fov = value;
    this.camera.updateProjectionMatrix();
  }
}
