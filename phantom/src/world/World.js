import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { randomRange } from '../utils/math.js';
import { getLevel } from '../levels/catalog.js';
import { buildLevelLayout } from '../levels/layouts.js';
import { getNarrativeTerminals } from '../campaign/narrative.js';
import { createGlowTexture, createSignTexture } from './TextureFactory.js';

const UP = new THREE.Vector3(0, 1, 0);

/**
 * Every operation is assembled from the same kit of parts:
 * shell → rooms/corridors → cover → landmarks → light → atmosphere → spawns.
 *
 * SITE-09 keeps its original hand-built construction path untouched. The
 * additional operations are authored in levels/layouts.js against the same
 * primitive and collision helpers, so player movement, AI navigation and
 * hit-scanning behave identically across the campaign.
 *
 * Every solid prop registers an axis-aligned collider. The same meshes are
 * used for hit-scanning and line-of-sight tests, so what the player sees is
 * what the simulation collides with.
 */
export class World {
  constructor(scene, renderer, materials, quality = 'high', levelId = 'site-09') {
    this.scene = scene;
    this.renderer = renderer;
    this.materials = materials;
    this.quality = quality;
    this.levelId = levelId;
    this.level = getLevel(levelId);
    this.root = new THREE.Group();
    this.root.name = this.level.locationShort;
    this.scene.add(this.root);

    this.colliders = [];
    this.collisionMeshes = [];
    this.medkits = [];
    this.terminals = [];
    this.enemySpawns = [];
    this.sceneLights = [];
    this.dynamicGroups = [];
    this.animators = [];
    this.decks = [];
    this.stairways = [];
    this.walkableSurfaces = [];
    this.ownedAssets = [];
    this.missionLayout = null;
    this.objectiveConsole = null;
    this.extractionZone = null;
    this.time = 0;
    this._dust = null;
    this._dustData = null;
    this._particleField = null;
    this._tempV = new THREE.Vector3();
    this.menuCamera = null;
    this.menuTarget = null;

    this.playerSpawn = new THREE.Vector3(0, 0, 23.2);
    this.playerYaw = 0;
    this.navBounds = { minX: -27.2, maxX: 27.2, minZ: -31.4, maxZ: 26.6 };

    if (this.levelId === 'site-09') {
      this._buildSite09();
    } else {
      buildLevelLayout(this, this.level);
    }
    this._buildNarrativeProps();
    this._buildMissionProps();

    const camera = this.level.menuCamera || { position: [0, 3.35, 20.25], target: [0, 2.15, -1.65] };
    this.menuCamera = new THREE.Vector3(...camera.position);
    this.menuTarget = new THREE.Vector3(...camera.target);

    this._batchStaticGeometry();

    if (quality === 'low') this.setShadows(false);
  }

  _buildSite09() {
    this._buildShell();
    this._buildSouthBay();
    this._buildReactorHall();
    this._buildCommandDeck();
    this._buildServiceCorridors();
    this._buildCeiling();
    this._buildLighting();
    this._buildAtmosphere();
    this._buildMedkits();
    this._defineSpawns();
    this.setMissionLayout({
      timeLimit: 660,
      safeZone: { x: 0, z: 23.2, w: 18, d: 6.0, label: 'INSERTION BAY' },
      objective: {
        x: 10.2,
        z: -21.0,
        rotation: 0,
        hudTitle: 'RECOVER CROWN KEY',
        promptLabel: 'CROWN ARCHIVE',
        action: 'RECOVER',
        zoneLabel: 'COMMAND DECK',
      },
      extraction: { x: 26.0, z: -6.0, w: 3.2, d: 6.2, label: 'SERVICE LIFT' },
    });
  }

  /**
   * The facility is deliberately detailed, which would normally create
   * hundreds of draw calls. Static, opaque meshes are merged by material into
   * a handful of batches. The original meshes stay in the graph but become
   * invisible and continue to act as precise raycast/collision proxies.
   *
   * Animated assemblies (reactor cage, hologram, pickups) and transparent
   * surfaces are excluded from batching.
   */
  _batchStaticGeometry() {
    this.root.updateMatrixWorld(true);
    this.batchedRoot = new THREE.Group();
    this.batchedRoot.name = 'STATIC_BATCHES';
    this.root.add(this.batchedRoot);

    const ignored = new Set();
    const ignoreTree = (node) => {
      if (!node) return;
      node.traverse((child) => ignored.add(child));
    };
    ignoreTree(this._reactorCage);
    ignoreTree(this._holoGroup);
    for (const group of this.dynamicGroups) ignoreTree(group);
    for (const medkit of this.medkits) ignoreTree(medkit.group);

    const groups = new Map();
    this.root.traverse((object) => {
      if (!object.isMesh || object.isSkinnedMesh) return;
      if (ignored.has(object) || !object.visible) return;
      if (object === this.batchedRoot) return;
      if (object.userData.noBatch) return;
      const material = object.material;
      if (!material || Array.isArray(material) || material.transparent || material.opacity < 1) return;
      if (!object.geometry?.attributes?.position) return;

      const key = `${material.uuid}|${object.castShadow ? 1 : 0}|${object.receiveShadow ? 1 : 0}|${object.renderOrder}`;
      if (!groups.has(key)) {
        groups.set(key, {
          material,
          castShadow: object.castShadow,
          receiveShadow: object.receiveShadow,
          renderOrder: object.renderOrder,
          meshes: [],
        });
      }
      groups.get(key).meshes.push(object);
    });

    let batchCount = 0;
    for (const group of groups.values()) {
      if (group.meshes.length < 2) continue;

      const geometries = [];
      for (const mesh of group.meshes) {
        try {
          const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
          for (const attribute of Object.keys(geometry.attributes)) {
            if (!['position', 'normal', 'uv'].includes(attribute)) geometry.deleteAttribute(attribute);
          }
          if (!geometry.getAttribute('uv')) {
            const count = geometry.getAttribute('position').count;
            geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
          }
          geometry.applyMatrix4(mesh.matrixWorld);
          geometries.push(geometry);
        } catch {
          // If one geometry cannot be normalized, leave it unbatched.
          geometries.length = 0;
          break;
        }
      }
      if (geometries.length !== group.meshes.length || geometries.length < 2) continue;

      let merged = null;
      try {
        merged = mergeGeometries(geometries, false);
      } catch {
        merged = null;
      }
      if (!merged) continue;

      const batch = new THREE.Mesh(merged, group.material);
      batch.castShadow = group.castShadow;
      batch.receiveShadow = group.receiveShadow;
      batch.renderOrder = group.renderOrder;
      this.batchedRoot.add(batch);
      for (const mesh of group.meshes) mesh.visible = false;
      for (const geometry of geometries) geometry.dispose();
      batchCount += 1;
    }

    this.batchCount = batchCount;
  }

  /* ------------------------------------------------------------------ */
  /* Registration helpers                                               */
  /* ------------------------------------------------------------------ */

  addBox({
    x,
    z,
    w,
    d,
    h,
    y = 0,
    material,
    collide = true,
    cast = true,
    receive = true,
    name = 'structure',
    rounded = 0,
  }) {
    const geometry =
      rounded > 0
        ? new RoundedBoxGeometry(w, h, d, 2, Math.min(rounded, Math.min(w, h, d) * 0.2))
        : new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    this.root.add(mesh);

    if (collide) {
      const box = new THREE.Box3(
        new THREE.Vector3(x - w / 2, y, z - d / 2),
        new THREE.Vector3(x + w / 2, y + h, z + d / 2),
      );
      this.colliders.push({ box, mesh, name });
      this.collisionMeshes.push(mesh);
    }

    return mesh;
  }

  addCylinder({
    x,
    y = 0,
    z,
    radiusTop,
    radiusBottom = radiusTop,
    height,
    radialSegments = 16,
    material,
    collide = false,
    cast = true,
    receive = true,
    name = 'cylinder',
  }) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + height / 2, z);
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    this.root.add(mesh);

    if (collide) {
      const radius = Math.max(radiusTop, radiusBottom);
      const box = new THREE.Box3(
        new THREE.Vector3(x - radius, y, z - radius),
        new THREE.Vector3(x + radius, y + height, z + radius),
      );
      this.colliders.push({ box, mesh, name });
      this.collisionMeshes.push(mesh);
    }

    return mesh;
  }

  addColliderOnly(x, y, z, w, h, d, name = 'collision') {
    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(x - w / 2, y, z - d / 2),
        new THREE.Vector3(x + w / 2, y + h, z + d / 2),
      ),
      mesh: null,
      name,
    });
  }

  addWall({ x, z, w, d, h = 6, material = this.materials.wallDark, cap = true, light = false, name = 'wall' }) {
    const mesh = this.addBox({ x, z, w, d, h, material, name });
    if (cap) {
      const capMesh = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.1, d + 0.08), this.materials.steel);
      capMesh.position.set(x, h + 0.05, z);
      capMesh.castShadow = false;
      capMesh.receiveShadow = true;
      this.root.add(capMesh);
    }
    if (light) {
      // A restrained illuminated base line; not every wall gets one.
      const isWide = w > d;
      const lightMesh = new THREE.Mesh(
        new THREE.BoxGeometry(isWide ? w * 0.82 : 0.015, 0.015, isWide ? 0.015 : d * 0.82),
        this.materials.cyanSoft,
      );
      lightMesh.position.set(x, 0.18, z);
      this.root.add(lightMesh);
    }
    return mesh;
  }

  addFloorPanel(x, z, w, d, material = this.materials.floorDark) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 0.012, z);
    mesh.receiveShadow = true;
    this.root.add(mesh);
    return mesh;
  }

  addSign(material, x, y, z, w, h, rotationY = 0) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotationY;
    this.root.add(mesh);
    return mesh;
  }

  addHazardStrip(x, z, w, d, rotationY = 0, y = 0.02) {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), this.materials.hazardStripe);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = rotationY;
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    this.root.add(mesh);
    return mesh;
  }

  addEmissiveStrip(x, y, z, w, h, d, material = this.materials.cyan) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    this.root.add(mesh);
    return mesh;
  }

  /**
   * Adds a scene-level light and remembers it so switching operations can
   * remove the previous lighting rig without leaking Three.js objects.
   */
  addSceneLight(light, target = null) {
    this.scene.add(light);
    this.sceneLights.push(light);
    if (target) {
      this.scene.add(target);
      this.sceneLights.push(target);
    }
    return light;
  }

  addGlowSprite(x, y, z, scale, color = 0x7fe9ff, opacity = 0.35) {
    if (!this._glowTexture) this._glowTexture = createGlowTexture();
    const material = new THREE.SpriteMaterial({
      map: this._glowTexture,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(scale, scale, 1);
    this.root.add(sprite);
    return sprite;
  }

  addContainer(x, z, w, d, h, material, rotation = 0, y = 0, bodyMaterial = null) {
    return this._buildContainer(x, z, w, d, h, material, rotation, y, bodyMaterial);
  }

  addRoof(x, z, w, d, y, material = this.materials.darkPanel, thickness = 0.3) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, thickness, d), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    this.root.add(mesh);
    return mesh;
  }

  /**
   * Layered sandbags: low enough to vault with a jump, high enough to break
   * a firing line. Collision stays a single clean AABB.
   */
  addSandbagWall(x, z, width, rotation = 0) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const bagW = 0.72;
    const count = Math.max(2, Math.ceil(width / bagW));
    const step = width / count;
    for (let row = 0; row < 2; row += 1) {
      const offset = row % 2 === 0 ? 0 : step * 0.5;
      for (let i = 0; i < count; i += 1) {
        const bag = new THREE.Mesh(new RoundedBoxGeometry(step * 1.04, 0.33, 0.5, 1, 0.09), this.materials.sandbag);
        bag.position.set(-width / 2 + step * (i + 0.5) + offset, 0.18 + row * 0.31, (i % 2 === 0 ? 0.03 : -0.03));
        bag.rotation.y = (i % 3 - 1) * 0.035;
        bag.castShadow = true;
        bag.receiveShadow = true;
        group.add(bag);
      }
    }
    const base = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, 0.72), this.materials.sand);
    base.position.y = 0.04;
    base.receiveShadow = true;
    group.add(base);

    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const w = width * cos + 0.72 * sin;
    const d = width * sin + 0.72 * cos;
    // An invisible axis-aligned proxy keeps hitscan and line-of-sight honest
    // without raycasting every individual bag.
    const proxy = new THREE.Mesh(new THREE.BoxGeometry(w, 0.82, d), this.materials.sandbag);
    proxy.position.set(x, 0.41, z);
    proxy.visible = false;
    this.root.add(proxy);
    this.colliders.push({
      box: new THREE.Box3(new THREE.Vector3(x - w / 2, 0, z - d / 2), new THREE.Vector3(x + w / 2, 0.82, z + d / 2)),
      mesh: proxy,
      name: 'sandbag wall',
    });
    this.collisionMeshes.push(proxy);
    return group;
  }

  addServerRack(x, z, rotation) {
    return this._addServerRack(x, z, rotation);
  }

  /**
   * Shared atmospheric setup for the additional operations. SITE-09 keeps
   * its bespoke reactor haze, but every other map uses this helper so the
   * fog, background and particle budgets stay consistent.
   */
  setAtmosphere({
    background = 0x04070a,
    fogColor = 0x05090c,
    fogDensity = 0.016,
    particles = null,
  } = {}) {
    this.scene.background = new THREE.Color(background);
    this.scene.fog = new THREE.FogExp2(fogColor, fogDensity);

    if (!particles) return;
    const count = Math.round((this.quality === 'low' ? 0.45 : 1) * (particles.count || 500));
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2);
    const bounds = particles.bounds;
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = randomRange(bounds.minX, bounds.maxX);
      positions[i * 3 + 1] = randomRange(bounds.minY, bounds.maxY);
      positions[i * 3 + 2] = randomRange(bounds.minZ, bounds.maxZ);
      seeds[i * 2] = randomRange(0, Math.PI * 2);
      seeds[i * 2 + 1] = randomRange(0.2, 0.9);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: particles.color || 0xabdfe9,
      size: particles.size || 0.035,
      transparent: true,
      opacity: particles.opacity ?? 0.3,
      depthWrite: false,
      blending: particles.additive === false ? THREE.NormalBlending : THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    this.root.add(points);
    this._particleField = {
      points,
      positions,
      seeds,
      count,
      bounds,
      fall: particles.fall || 0,
      drift: particles.drift ?? 0.03,
      flutter: particles.flutter ?? 0.035,
    };
  }

  /**
   * One compact lighting rig shared by the new operations. Individual maps
   * supply the colour temperature and accent lights that define their mood.
   */
  addLightRig({
    ambientColor = 0x3b5662,
    ambientIntensity = 0.5,
    hemiSky = 0x7ea4b2,
    hemiGround = 0x030506,
    hemiIntensity = 0.44,
    directionalColor = 0x91b4c1,
    directionalIntensity = 0.6,
    directionalPosition = [11, 19, 9],
    shadowSpan = 36,
    shadowFar = 58,
    spotlights = [],
    points = [],
    glows = [],
  }) {
    this.ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    this.addSceneLight(this.ambient);
    this.hemi = new THREE.HemisphereLight(hemiSky, hemiGround, hemiIntensity);
    this.addSceneLight(this.hemi);

    this.directional = new THREE.DirectionalLight(directionalColor, directionalIntensity);
    this.directional.position.set(...directionalPosition);
    this.directional.castShadow = this.quality !== 'low';
    const shadowMap = this.quality === 'high' ? 1024 : 512;
    this.directional.shadow.mapSize.set(shadowMap, shadowMap);
    this.directional.shadow.camera.left = -shadowSpan;
    this.directional.shadow.camera.right = shadowSpan;
    this.directional.shadow.camera.top = shadowSpan;
    this.directional.shadow.camera.bottom = -shadowSpan;
    this.directional.shadow.camera.near = 1;
    this.directional.shadow.camera.far = shadowFar;
    this.directional.shadow.bias = -0.0007;
    this.directional.shadow.normalBias = 0.035;
    this.addSceneLight(this.directional);

    this.mainSpot = null;
    for (let i = 0; i < spotlights.length; i += 1) {
      const config = spotlights[i];
      const spot = new THREE.SpotLight(
        config.color ?? 0xb9e4ed,
        config.intensity ?? 450,
        config.distance ?? 38,
        config.angle ?? 0.8,
        config.penumbra ?? 0.68,
        config.decay ?? 1.45,
      );
      spot.position.set(...config.position);
      spot.target.position.set(...config.target);
      spot.castShadow = Boolean(config.shadow) && this.quality !== 'low';
      spot.shadow.mapSize.set(shadowMap, shadowMap);
      spot.shadow.bias = -0.001;
      spot.shadow.normalBias = 0.025;
      this.addSceneLight(spot, spot.target);
      if (!this.mainSpot) this.mainSpot = spot;
    }

    for (const config of points) {
      const light = new THREE.PointLight(
        config.color ?? 0x5edcf2,
        config.intensity ?? 30,
        config.distance ?? 16,
        config.decay ?? 1.8,
      );
      light.position.set(...config.position);
      this.addSceneLight(light);
      if (config.pulse) this.animators.push((dt, elapsed) => {
        light.intensity = config.intensity * (0.72 + Math.sin(elapsed * config.pulse + (config.phase || 0)) * 0.22);
      });
    }

    for (const glow of glows) {
      this.addGlowSprite(...glow);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Architecture                                                       */
  /* ------------------------------------------------------------------ */

  _buildShell() {
    const m = this.materials;

    // Floor: one thick slab, no collider required because ground is resolved
    // explicitly by the player controller.
    const floor = new THREE.Mesh(new THREE.BoxGeometry(58, 0.35, 62), m.floor);
    floor.position.set(0, -0.175, -2.5);
    floor.receiveShadow = true;
    this.root.add(floor);
    this.collisionMeshes.push(floor);

    // Central inset deck slightly darker than the outer bays.
    this.addFloorPanel(0, -4, 47, 25, m.floorDark);
    this.addFloorPanel(0, 18.5, 34, 15, m.floorDark);

    // Perimeter.
    this.addWall({ x: 0, z: 28.1, w: 58.4, d: 0.8, h: 8.4, material: m.wallDark, light: true, name: 'south perimeter' });
    this.addWall({ x: 0, z: -32.1, w: 58.4, d: 0.8, h: 8.4, material: m.wallDark, light: true, name: 'north perimeter' });
    this.addWall({ x: -28.1, z: -2, w: 0.8, d: 61, h: 8.4, material: m.wallDark, name: 'west perimeter' });
    this.addWall({ x: 28.1, z: -2, w: 0.8, d: 61, h: 8.4, material: m.wallDark, name: 'east perimeter' });

    // Structural ribs around the perimeter.
    for (let z = -28; z <= 24; z += 8) {
      this.addBox({ x: -27.6, z, w: 0.34, d: 0.6, h: 8.1, material: m.steel, collide: false, cast: false, name: 'rib' });
      this.addBox({ x: 27.6, z, w: 0.34, d: 0.6, h: 8.1, material: m.steel, collide: false, cast: false, name: 'rib' });
    }

    // Main divider: insertion bay → reactor hall.
    this.addWall({ x: -17, z: 9.5, w: 22, d: 0.55, h: 5.6, material: m.wall, name: 'south divider left' });
    this.addWall({ x: 17, z: 9.5, w: 22, d: 0.55, h: 5.6, material: m.wall, name: 'south divider right' });
    this._buildDoorFrame(0, 9.5, 10.6, 5.6, 0);
    this.addSign(m.signs.security, 0, 3.8, 9.18, 4.6, 1.45, Math.PI);
    this.addHazardStrip(0, 10.25, 10.4, 0.55, 0, 0.018);

    // Reactor hall → command deck divider, with flanking service doors.
    this.addWall({ x: -27, z: -12.1, w: 2, d: 0.55, h: 5.4, material: m.wall, name: 'north divider left edge' });
    this.addWall({ x: -13.5, z: -12.1, w: 17, d: 0.55, h: 5.4, material: m.wall, name: 'north divider left' });
    this.addWall({ x: 13.5, z: -12.1, w: 17, d: 0.55, h: 5.4, material: m.wall, name: 'north divider right' });
    this.addWall({ x: 27, z: -12.1, w: 2, d: 0.55, h: 5.4, material: m.wall, name: 'north divider right edge' });
    this._buildDoorFrame(0, -12.1, 10, 5.4, Math.PI);
    this._buildDoorFrame(24, -12.1, 3.4, 5.4, Math.PI);
    this._buildDoorFrame(-24, -12.1, 3.4, 5.4, Math.PI);
    this.addSign(m.signs.command, 0, 3.7, -11.75, 4.4, 1.4, 0);
    this.addSign(m.signs.service, 23.9, 3.5, -11.75, 3.2, 1, 0);
    this.addHazardStrip(0, -11.45, 9.8, 0.5, 0, 0.018);

    // Side hall walls with wide service openings.
    this.addWall({ x: -23.9, z: -8.1, w: 0.55, d: 8, h: 5.8, material: m.wall, name: 'reactor west wall north' });
    this.addWall({ x: -23.9, z: 5.9, w: 0.55, d: 7.2, h: 5.8, material: m.wall, name: 'reactor west wall south' });
    this.addWall({ x: 23.9, z: -8.1, w: 0.55, d: 8, h: 5.8, material: m.wall, name: 'reactor east wall north' });
    this.addWall({ x: 23.9, z: 5.9, w: 0.55, d: 7.2, h: 5.8, material: m.wall, name: 'reactor east wall south' });
    this._buildDoorFrame(-23.9, -1.1, 7, 5.8, Math.PI / 2);
    this._buildDoorFrame(23.9, -1.1, 7, 5.8, Math.PI / 2);
    this.addSign(m.signs.core, -23.55, 3.55, -4, 3.4, 1.1, Math.PI / 2);
    this.addSign(m.signs.core, 23.55, 3.55, -4, 3.4, 1.1, -Math.PI / 2);
    this.addHazardStrip(-23.4, -1.1, 6.6, 0.45, Math.PI / 2, 0.018);
    this.addHazardStrip(23.4, -1.1, 6.6, 0.45, Math.PI / 2, 0.018);
  }

  _buildDoorFrame(x, z, width, height, rotationY) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotationY;
    this.root.add(group);

    const postGeo = new THREE.BoxGeometry(0.26, height, 0.34);
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(postGeo, m.blackMetal);
      post.position.set((width / 2) * side, height / 2, 0);
      post.castShadow = true;
      group.add(post);
      const light = new THREE.Mesh(new THREE.BoxGeometry(0.035, height * 0.55, 0.035), m.cyan);
      light.position.set((width / 2) * side - side * 0.16, height * 0.48, 0.18);
      group.add(light);
    }

    const header = new THREE.Mesh(new THREE.BoxGeometry(width + 0.35, 0.38, 0.36), m.steel);
    header.position.set(0, height - 0.18, 0);
    header.castShadow = true;
    group.add(header);

    const topLight = new THREE.Mesh(new THREE.BoxGeometry(width * 0.52, 0.03, 0.04), m.cyanSoft);
    topLight.position.set(0, height - 0.39, 0.2);
    group.add(topLight);
  }

  _buildSouthBay() {
    const m = this.materials;

    // Inset arrival markings.
    this.addEmissiveStrip(0, 0.015, 17.4, 0.09, 0.008, 9.5, m.cyanSoft);
    this.addEmissiveStrip(-4.7, 0.014, 17.4, 0.025, 0.006, 9.5, m.cyanSoft);
    this.addEmissiveStrip(4.7, 0.014, 17.4, 0.025, 0.006, 9.5, m.cyanSoft);

    // Shipping containers make distinct silhouettes and cover lanes.
    this._buildContainer(-14.2, 17.2, 5.6, 2.6, 3.0, m.darkPanel, 0.08);
    this._buildContainer(13.6, 19.7, 5.0, 2.5, 2.9, m.wallDark, -0.06);

    // Crates.
    this.addCrate(-20.5, 22.4, 1.35, 1.25, 1.35, 0.16);
    this.addCrate(-18.8, 22.6, 1.05, 0.9, 1.05, -0.1);
    this.addCrate(-19.7, 20.9, 1.2, 1.5, 1.2, 0.3);
    this.addCrate(20.2, 14.5, 1.4, 1.1, 1.4, -0.14);
    this.addCrate(21.1, 16.1, 1.0, 1.35, 1.0, 0.22);
    this.addCrate(5.8, 22.8, 1.1, 0.9, 1.1, 0.08);
    this.addCrate(-6.4, 14.2, 1.25, 1.25, 1.25, -0.2);

    // Low barricades define the two approach lanes.
    this.addBarrier(-5.2, 13.3, 3.6, 0.28);
    this.addBarrier(6.1, 12.3, 3.2, -0.22);
    this.addBarrier(0, 19.6, 2.8, Math.PI / 2);

    // Spawn beacon and floor ring.
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.3, 1.42, 48),
      new THREE.MeshBasicMaterial({ color: 0x63e9ff, transparent: true, opacity: 0.32, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.02, 23.2);
    this.root.add(ring);
    this.addEmissiveStrip(0, 0.1, 25.5, 2.8, 0.08, 0.025, m.cyanSoft);

    // Wall details for scale.
    this._addWallVent(-27.55, 2.4, 19.5, Math.PI / 2);
    this._addWallVent(27.55, 2.4, 19.5, -Math.PI / 2);
    this._addPipeRun(-26.8, 4.2, 11, 13, 0.16, 0);
    this._addPipeRun(26.8, 4.8, 20, 8, 0.2, Math.PI);
  }

  _buildReactorHall() {
    const m = this.materials;

    // Reactor plinth.
    const base = this.addCylinder({
      x: 0,
      z: -1.4,
      radiusTop: 5.4,
      radiusBottom: 5.7,
      height: 0.55,
      radialSegments: 48,
      material: m.darkPanel,
      collide: false,
      receive: true,
    });
    base.castShadow = true;
    this.colliders.push({
      box: new THREE.Box3(new THREE.Vector3(-4.5, 0, -5.9), new THREE.Vector3(4.5, 4.8, 3.1)),
      mesh: base,
      name: 'reactor core',
    });
    this.collisionMeshes.push(base);

    const trim = new THREE.Mesh(new THREE.TorusGeometry(5.15, 0.07, 8, 64), m.steel);
    trim.rotation.x = Math.PI / 2;
    trim.position.set(0, 0.59, -1.4);
    this.root.add(trim);

    const warningRing = new THREE.Mesh(new THREE.TorusGeometry(4.55, 0.035, 8, 64), m.red);
    warningRing.rotation.x = Math.PI / 2;
    warningRing.position.set(0, 0.61, -1.4);
    this.root.add(warningRing);

    // Containment cage and core.
    const cage = new THREE.Group();
    cage.position.set(0, 0, -1.4);
    this.root.add(cage);
    const shellGeo = new THREE.CylinderGeometry(2.25, 2.45, 4.7, 32, 1, true);
    const shell = new THREE.Mesh(
      shellGeo,
      new THREE.MeshStandardMaterial({
        color: 0x202a30,
        metalness: 0.85,
        roughness: 0.28,
        transparent: true,
        opacity: 0.56,
        side: THREE.DoubleSide,
      }),
    );
    shell.position.y = 2.9;
    shell.castShadow = true;
    cage.add(shell);
    // The shell is what the player sees; include it in hit-scan and AI
    // line-of-sight tests so shots cannot pass through the reactor.
    this.collisionMeshes.push(shell);

    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x54dff5,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.45, 4.9, 24, 1, true), coreMat);
    core.position.y = 2.9;
    cage.add(core);
    const coreInner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.62, 4.3, 16),
      new THREE.MeshBasicMaterial({ color: 0xd4fbff, transparent: true, opacity: 0.75, toneMapped: false }),
    );
    coreInner.position.y = 2.9;
    cage.add(coreInner);

    const rings = [];
    for (let i = 0; i < 6; i += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.45 + (i % 2) * 0.24, 0.055, 8, 42), i === 2 ? m.red : m.cyan);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.95 + i * 0.72;
      cage.add(ring);
      rings.push(ring);
    }

    // Vertical braces.
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2;
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.8, 0.12), m.steel);
      brace.position.set(Math.cos(angle) * 2.6, 2.9, Math.sin(angle) * 2.6);
      brace.rotation.y = -angle;
      cage.add(brace);
    }

    // Four supports and clamps.
    for (let i = 0; i < 4; i += 1) {
      const angle = Math.PI / 4 + (i / 4) * Math.PI * 2;
      const x = Math.cos(angle) * 3.9;
      const z = Math.sin(angle) * 3.9 - 1.4;
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.55, 0.8), m.blackMetal);
      foot.position.set(x, 0.3, z);
      foot.castShadow = true;
      this.root.add(foot);
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.23, 3.2, 0.23), m.steel);
      strut.position.set(x * 0.82, 1.7, z + (z > -1.4 ? -0.25 : 0.25));
      strut.rotation.z = x > 0 ? -0.18 : 0.18;
      strut.castShadow = true;
      this.root.add(strut);
    }

    this._reactorCage = cage;
    this._reactorRings = rings;
    this._reactorCore = core;

    // Reactor warning light.
    this.reactorLight = new THREE.PointLight(0x54dff5, 68, 25, 1.6);
    this.reactorLight.position.set(0, 3.1, -1.4);
    this.addSceneLight(this.reactorLight);

    // Overhead cable run from reactor toward command deck.
    this._addCableCurve([
      [0, 6.5, 2],
      [1.5, 5.3, -3],
      [-1, 6.9, -8],
      [0, 7.4, -11],
    ]);

    // Four columns around the chamber.
    for (const [x, z] of [
      [-14, 4.6],
      [14, 4.6],
      [-14, -7.8],
      [14, -7.8],
    ]) {
      this.addPillar(x, z, 0.62, 7.2);
    }

    // Cover and flank routes.
    this.addBarrier(-9.4, 5.8, 4.2, 0.12);
    this.addBarrier(9.4, 5.8, 4.2, -0.12);
    this.addBarrier(-18.2, -1.5, 3.4, Math.PI / 2);
    this.addBarrier(18.2, -1.5, 3.4, Math.PI / 2);
    this.addCrate(-20.3, 6.3, 1.5, 1.35, 1.5, 0.12);
    this.addCrate(20.4, 6.4, 1.3, 1.1, 1.3, -0.18);
    this.addCrate(-19.4, -6.9, 1.4, 1.7, 1.4, 0.2);
    this.addCrate(19.2, -6.7, 1.25, 1.35, 1.25, -0.1);

    // Low railings / guide rails toward the side doors.
    this._addGuardRail(-22.6, -1.1, 0.12, 5.8, 0);
    this._addGuardRail(22.6, -1.1, 0.12, 5.8, 0);

    // Ground markings around the reactor.
    const ringMark = new THREE.Mesh(
      new THREE.RingGeometry(6.3, 6.42, 64),
      new THREE.MeshBasicMaterial({ color: 0x5abed1, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
    );
    ringMark.rotation.x = -Math.PI / 2;
    ringMark.position.set(0, 0.018, -1.4);
    this.root.add(ringMark);
    this.addHazardStrip(-9.4, 7.3, 7, 0.38, 0, 0.02);

    // Catwalk silhouette at 5.1 m, outside the playable floor.
    this._addCatwalk();
  }

  _buildCommandDeck() {
    const m = this.materials;

    // Command dais and console bank.
    this.addBox({ x: 0, z: -27.7, w: 20, d: 2.6, h: 0.5, material: m.darkPanel, name: 'command dais' });
    const console = this.addBox({
      x: 0,
      z: -27.3,
      w: 11.5,
      d: 1.7,
      h: 1.05,
      y: 0.5,
      material: m.blackMetal,
      rounded: 0.08,
      name: 'command console',
    });
    console.castShadow = true;

    for (let i = 0; i < 5; i += 1) {
      const screenMat = m.screens[i % m.screens.length];
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.85), screenMat);
      screen.position.set(-4.4 + i * 2.2, 1.95, -26.47);
      screen.rotation.x = -0.08;
      screen.rotation.y = 0;
      this.root.add(screen);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.83, 0.98, 0.08), m.blackMetal);
      frame.position.set(-4.4 + i * 2.2, 1.95, -26.57);
      frame.rotation.x = -0.08;
      frame.castShadow = true;
      this.root.add(frame);

      const glow = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.025, 0.02), i === 3 ? m.red : m.cyanSoft);
      glow.position.set(-4.4 + i * 2.2, 1.48, -26.5);
      this.root.add(glow);
    }

    // Holographic tactical table.
    const tableBase = this.addCylinder({
      x: 0,
      z: -20.2,
      radiusTop: 1.7,
      radiusBottom: 1.95,
      height: 0.9,
      radialSegments: 32,
      material: m.blackMetal,
      collide: true,
      receive: true,
      name: 'holo table',
    });
    tableBase.castShadow = true;
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.12, 32), m.steel);
    tableTop.position.set(0, 0.98, -20.2);
    this.root.add(tableTop);
    const holoDisc = new THREE.Mesh(new THREE.CircleGeometry(1.72, 42), m.holo);
    holoDisc.rotation.x = -Math.PI / 2;
    holoDisc.position.set(0, 1.07, -20.2);
    this.root.add(holoDisc);

    const holoGroup = new THREE.Group();
    holoGroup.position.set(0, 1.25, -20.2);
    this.root.add(holoGroup);
    for (let i = 0; i < 4; i += 1) {
      const block = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35 + i * 0.2, 0.3), m.holo);
      block.position.set(Math.cos(i * 1.7) * 0.75, 0.2, Math.sin(i * 1.7) * 0.75);
      holoGroup.add(block);
    }
    this._holoGroup = holoGroup;

    // Server racks along both flanks.
    for (let i = 0; i < 5; i += 1) {
      this._addServerRack(-22.8, -22.5 + i * 2.1, Math.PI / 2);
      if (i < 4) this._addServerRack(22.8, -24.3 + i * 2.1, -Math.PI / 2);
    }

    // Crates and cover.
    this.addCrate(-12.5, -17.2, 1.4, 1.2, 1.4, 0.12);
    this.addCrate(-11.3, -16, 1.0, 0.95, 1.0, -0.2);
    this.addCrate(12.8, -18.2, 1.6, 1.5, 1.6, 0.2);
    this.addCrate(14.1, -16.9, 1.0, 0.9, 1.0, -0.15);
    this.addBarrier(-7.8, -16.2, 3.4, 0.1);
    this.addBarrier(8.2, -16.3, 3.4, -0.1);
    this.addBarrier(0, -23.4, 3.0, Math.PI / 2);

    // Hazard path to uplink.
    this.addHazardStrip(0, -24.8, 2.8, 0.45, 0, 0.02);

    // Ceiling-cable termination boxes.
    for (const x of [-8, 8]) {
      this.addBox({ x, z: -30.9, w: 1.2, d: 0.5, h: 1.4, y: 4.5, material: m.blackMetal, collide: false, cast: false, name: 'junction box' });
    }

    // Blast door edge lighting.
    this.addEmissiveStrip(-16.8, 0.8, -12.38, 0.05, 1.6, 0.05, m.cyanSoft);
    this.addEmissiveStrip(16.8, 0.8, -12.38, 0.05, 1.6, 0.05, m.cyanSoft);
  }

  _buildServiceCorridors() {
    const m = this.materials;

    // Corridor floor differentiation and pipework.
    for (const side of [-1, 1]) {
      const x = side * 26;
      this.addFloorPanel(x, -1.2, 3.5, 20.4, m.floorDark);
      this._addPipeRun(x - side * 1.1, 3.35, -10.4, 19.6, 0.18, Math.PI / 2);
      this._addPipeRun(x - side * 1.5, 3.05, -10.4, 19.6, 0.12, Math.PI / 2);
      this._addWallVent(x, 2.2, side > 0 ? -10 : -8, side > 0 ? -Math.PI / 2 : Math.PI / 2);
      this.addCrate(x + side * 0.8, -9.2, 0.9, 1.1, 0.9, side * 0.1);
      this.addCrate(x - side * 0.7, 7.4, 1.1, 1.2, 1.1, -side * 0.15);
      this.addEmissiveStrip(x, 0.06, -1.1, 0.035, 0.012, 10.4, side > 0 ? m.amber : m.cyanSoft);
    }

    // A red emergency beacon deep in the east corridor.
    this.emergencyLight = new THREE.PointLight(0xff3345, 28, 12, 1.8);
    this.emergencyLight.position.set(26.2, 3.4, -7.6);
    this.addSceneLight(this.emergencyLight);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), m.red);
    beacon.position.set(26.2, 4.6, -7.6);
    this.root.add(beacon);
    this.addEmissiveStrip(26.2, 4.25, -7.6, 0.02, 0.7, 0.02, m.red);

    // Low barricade in each corridor for cover.
    this.addBarrier(26, 3.5, 2.4, Math.PI / 2);
    this.addBarrier(-26, -6.8, 2.4, Math.PI / 2);
  }

  _buildCeiling() {
    const m = this.materials;

    // Side roof panels leave an industrial skylight / service void above the
    // central hall, which reads as depth rather than a flat box ceiling.
    this.addBox({ x: -20, z: -2, w: 16, d: 58, h: 0.3, y: 8.3, material: m.darkPanel, collide: false, cast: false, receive: false, name: 'roof' });
    this.addBox({ x: 20, z: -2, w: 16, d: 58, h: 0.3, y: 8.3, material: m.darkPanel, collide: false, cast: false, receive: false, name: 'roof' });

    // Trusses.
    for (let z = -28; z <= 26; z += 9) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(56, 0.34, 0.42), m.steel);
      beam.position.set(0, 8.05, z);
      beam.castShadow = true;
      this.root.add(beam);
      for (const x of [-22.5, -11, 11, 22.5]) {
        const brace = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.4, 0.22), m.steel);
        brace.position.set(x, 7.45, z + 0.65);
        brace.rotation.x = 0.55;
        this.root.add(brace);
      }
    }

    // Longitudinal beams.
    for (const x of [-20, -8, 8, 20]) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 60), m.steel);
      beam.position.set(x, 8.28, -2);
      this.root.add(beam);
    }

    // Hanging lamps and faked volumetric shafts.
    const lampPositions = [
      [0, 7.4, 17],
      [-14, 7.4, 2],
      [14, 7.4, -4],
      [0, 7.4, -24],
    ];
    for (const [x, y, z] of lampPositions) {
      this._addHangingLamp(x, y, z);
    }

    this._addCableCurve([
      [-24, 7.3, 7],
      [-11, 6.7, 6.5],
      [3, 7.1, 5.5],
      [21, 6.8, 6],
    ]);
    this._addCableCurve([
      [23, 7.4, -17],
      [9, 6.8, -17.4],
      [-5, 7.2, -18],
      [-22, 6.9, -17.8],
    ]);
  }

  _buildLighting() {
    this.ambient = new THREE.AmbientLight(0x3b5662, 0.54);
    this.addSceneLight(this.ambient);

    this.hemi = new THREE.HemisphereLight(0x7ea4b2, 0x030506, 0.46);
    this.addSceneLight(this.hemi);

    this.directional = new THREE.DirectionalLight(0x91b4c1, 0.58);
    this.directional.position.set(11, 19, 9);
    this.directional.castShadow = this.quality !== 'low';
    this.directional.shadow.mapSize.set(this.quality === 'high' ? 1024 : 512, this.quality === 'high' ? 1024 : 512);
    this.directional.shadow.camera.left = -34;
    this.directional.shadow.camera.right = 34;
    this.directional.shadow.camera.top = 34;
    this.directional.shadow.camera.bottom = -36;
    this.directional.shadow.camera.near = 1;
    this.directional.shadow.camera.far = 55;
    this.directional.shadow.bias = -0.0007;
    this.directional.shadow.normalBias = 0.035;
    this.addSceneLight(this.directional);

    const makeSpot = (x, y, z, tx, tz, color, intensity, angle, shadow = false) => {
      const spot = new THREE.SpotLight(color, intensity, 32, angle, 0.68, 1.45);
      spot.position.set(x, y, z);
      spot.target.position.set(tx, 0, tz);
      spot.castShadow = shadow && this.quality !== 'low';
      spot.shadow.mapSize.set(this.quality === 'high' ? 1024 : 512, this.quality === 'high' ? 1024 : 512);
      spot.shadow.bias = -0.001;
      spot.shadow.normalBias = 0.025;
      this.addSceneLight(spot, spot.target);
      return spot;
    };

    this.mainSpot = makeSpot(0, 8.2, 18, 0, 16, 0xb9e4ed, 590, 0.82, false);
    this.centralSpot = makeSpot(0, 8.3, 2, 0, -1, 0x98d8e7, 380, 0.85, false);
    this.commandSpot = makeSpot(0, 7.9, -22, 0, -25, 0x8ebcff, 450, 0.75, false);
    this.westLight = new THREE.PointLight(0x5edcf2, 34, 18, 1.8);
    this.westLight.position.set(-20, 3.2, -2);
    this.addSceneLight(this.westLight);

    // Red accents only where danger information is useful.
    this.warningLight = new THREE.PointLight(0xff2f3e, 18, 14, 2);
    this.warningLight.position.set(0, 1.2, 6.6);
    this.addSceneLight(this.warningLight);

    // Glow sprites reinforce the emissive fixtures without extra real lights.
    const glowTexture = createGlowTexture();
    this.glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0x7fe9ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    for (const [x, y, z, scale, color] of [
      [0, 3.1, -1.4, 7.5, 0x66e7ff],
      [0, 7.2, 17, 4.5, 0x99e8f2],
      [-14, 7.2, 2, 3.2, 0x99e8f2],
      [14, 7.2, -4, 3.2, 0x99e8f2],
      [0, 7.2, -24, 4, 0x8ebcff],
      [26.2, 4.6, -7.6, 1.6, 0xff5666],
    ]) {
      const material = this.glowMaterial.clone();
      material.color.setHex(color);
      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(scale, scale, 1);
      this.root.add(sprite);
    }
  }

  _buildAtmosphere() {
    this.scene.fog = new THREE.FogExp2(0x05090c, 0.0165);
    this.scene.background = new THREE.Color(0x04070a);

    const count = this.quality === 'low' ? 260 : 680;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = randomRange(-27, 27);
      positions[i * 3 + 1] = randomRange(0.4, 8);
      positions[i * 3 + 2] = randomRange(-31, 27);
      seeds[i * 2] = randomRange(0, Math.PI * 2);
      seeds[i * 2 + 1] = randomRange(0.2, 0.8);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xabdfe9,
      size: 0.035,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(geometry, material);
    dust.frustumCulled = false;
    this.root.add(dust);
    this._dust = dust;
    this._dustData = { positions, seeds, count };

    // Ground haze volume, very subtle, keeps the far end of the hall readable.
    const haze = new THREE.Mesh(
      new THREE.PlaneGeometry(58, 40),
      new THREE.MeshBasicMaterial({
        color: 0x33515b,
        transparent: true,
        opacity: 0.025,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    haze.rotation.x = -Math.PI / 2;
    haze.position.set(0, 0.35, -10);
    this.root.add(haze);
  }

  _buildNarrativeProps() {
    for (const definition of getNarrativeTerminals(this.levelId)) {
      this.addIntelTerminal(definition);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Mission layout, vertical circulation and environmental evidence    */
  /* ------------------------------------------------------------------ */

  /**
   * Every operation declares its safe zone, primary objective and extraction
   * pad next to the geometry that supports them. All three are authored data,
   * never a random placement, and the MissionDirector treats this object as the
   * only spatial source of truth for the countdown flow.
   */
  setMissionLayout(layout) {
    const safeZone = layout.safeZone || {
      x: this.playerSpawn.x,
      z: this.playerSpawn.z,
      w: 12,
      d: 6,
    };
    this.missionLayout = {
      timeLimit: layout.timeLimit || this.level.timeLimit || 12 * 60,
      safeZone: {
        ...safeZone,
        label: safeZone.label || 'INSERTION BAY',
        signRotation: safeZone.signRotation ?? Math.PI,
      },
      objective: {
        y: 0,
        rotation: 0,
        promptLabel: 'CROWN ARCHIVE',
        action: 'ACCESS',
        ...layout.objective,
      },
      extraction: {
        w: 5,
        d: 5,
        y: 0,
        label: 'EXTRACTION',
        ...layout.extraction,
      },
    };
  }

  _buildMissionProps() {
    if (!this.missionLayout) {
      this.setMissionLayout({
        safeZone: { x: this.playerSpawn.x, z: this.playerSpawn.z, w: 10, d: 5 },
        objective: {
          x: this.playerSpawn.x,
          z: Math.max(this.navBounds.minZ + 3, this.playerSpawn.z - 18),
          hudTitle: this.level.objective,
          label: this.level.objective,
        },
        extraction: { x: this.playerSpawn.x, z: this.playerSpawn.z + 1, label: 'EXTRACTION' },
      });
    }

    this._buildSafeZone(this.missionLayout.safeZone);
    this._buildObjectiveConsole(this.missionLayout.objective);
    this._buildExtractionPad(this.missionLayout.extraction);
  }

  /**
   * Adds an authored, in-world label using the same thin industrial signage
   * language as the existing menus. These materials are owned by World because
   * each label has a unique canvas texture.
   */
  addLabel(lines, {
    x,
    y,
    z,
    w = 3.2,
    h = 1.0,
    rotation = 0,
    accent = '#6be7ff',
    align = 'left',
    flat = false,
    sub = null,
    detail = null,
  }) {
    const texture = createSignTexture(
      Array.isArray(lines) ? lines : [lines, sub || '', detail || ''],
      { accent, align },
      this.materials.anisotropy,
    );
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      toneMapped: false,
      side: THREE.FrontSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    mesh.position.set(x, y, z);
    mesh.rotation.y = flat ? 0 : rotation;
    if (flat) mesh.rotation.set(-Math.PI / 2, 0, rotation);
    this.root.add(mesh);
    this.ownedAssets.push({ material, texture });
    return mesh;
  }

  _buildSafeZone(zone) {
    const m = this.materials;
    const tint = new THREE.MeshBasicMaterial({
      color: 0x4cd6e8,
      transparent: true,
      opacity: 0.035,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(zone.w, zone.d), tint);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(zone.x, 0.018, zone.z);
    pad.renderOrder = 1;
    this.root.add(pad);
    this.ownedAssets.push({ material: tint, texture: null });

    // A broken/perimeter line makes the exact safe-zone threshold readable
    // without placing a collider the player has to negotiate.
    const y = 0.026;
    for (const x of [zone.x - zone.w / 2, zone.x + zone.w / 2]) {
      this.addEmissiveStrip(x, y, zone.z, 0.055, 0.012, zone.d, m.cyanSoft);
    }
    for (const z of [zone.z - zone.d / 2, zone.z + zone.d / 2]) {
      this.addEmissiveStrip(zone.x, y, z, zone.w, 0.012, 0.055, m.cyanSoft);
    }
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        this.addEmissiveStrip(
          zone.x + sx * (zone.w / 2 - 0.4),
          0.06,
          zone.z + sz * (zone.d / 2 - 0.4),
          0.5,
          0.018,
          0.08,
          m.cyan,
        );
      }
    }

    this.addLabel(['SAFE ZONE', 'MISSION CLOCK HOLDS UNTIL YOU LEAVE', zone.label], {
      x: zone.x,
      y: 2.35,
      z: zone.z + zone.d / 2 - 0.08,
      w: 4.4,
      h: 1.16,
      rotation: zone.signRotation,
      accent: '#6be7ff',
      align: 'center',
    });
    this.addLabel(['SAFE ZONE'], {
      x: zone.x,
      y: 0.035,
      z: zone.z - zone.d / 2 + 1.0,
      w: 3.2,
      h: 0.72,
      flat: true,
      rotation: 0,
      accent: '#6be7ff',
      align: 'center',
    });
  }

  _buildObjectiveConsole(definition) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(definition.x, definition.y || 0, definition.z);
    group.rotation.y = definition.rotation || 0;
    this.root.add(group);
    this.dynamicGroups.push(group);

    const plinth = new THREE.Mesh(new RoundedBoxGeometry(1.72, 1.08, 0.74, 2, 0.05), m.blackMetal);
    plinth.position.y = 0.54;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    group.add(plinth);

    const apron = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.06, 0.9), m.steel);
    apron.position.y = 1.08;
    group.add(apron);

    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.32, 0.62), m.screens[2]);
    screen.position.set(0, 1.46, 0.25);
    screen.rotation.x = -0.22;
    group.add(screen);

    const frame = new THREE.Mesh(new RoundedBoxGeometry(1.52, 0.82, 0.14, 2, 0.03), m.steel);
    frame.position.set(0, 1.45, 0.17);
    frame.rotation.x = -0.22;
    group.add(frame);

    const accent = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.035, 0.03), m.amber);
    accent.position.set(0, 1.15, 0.4);
    group.add(accent);
    const status = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), m.amber);
    status.position.set(0.68, 1.63, 0.31);
    group.add(status);

    const arch = new THREE.Group();
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.3, 0.08), m.steel);
      post.position.set(side * 0.92, 1.15, 0);
      group.add(post);
    }
    const header = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.08, 0.08), m.steel);
    header.position.y = 2.3;
    group.add(header);
    const headerLight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.025, 0.02), m.amber);
    headerLight.position.set(0, 2.25, 0.05);
    group.add(headerLight);

    const label = this.addLabel(
      ['CROWN INTERFACE', definition.promptLabel || 'PRIMARY OBJECTIVE', definition.zoneLabel || ''],
      {
        x: definition.x + Math.sin(definition.rotation || 0) * 0.02,
        y: (definition.y || 0) + 2.68,
        z: definition.z + Math.cos(definition.rotation || 0) * 0.06,
        w: 2.0,
        h: 0.56,
        rotation: definition.rotation || 0,
        accent: '#ffb15c',
        align: 'center',
      },
    );
    label.position.y = (definition.y || 0) + 2.68;
    // The overhead label should stay legible against the dark wall behind it.
    label.renderOrder = 3;

    const horizontal = Math.abs(Math.cos(definition.rotation || 0));
    const vertical = Math.abs(Math.sin(definition.rotation || 0));
    const bw = 1.9 * horizontal + 1.0 * vertical;
    const bd = 1.9 * vertical + 1.0 * horizontal;
    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(
          definition.x - bw / 2,
          (definition.y || 0),
          definition.z - bd / 2,
        ),
        new THREE.Vector3(
          definition.x + bw / 2,
          (definition.y || 0) + 2.42,
          definition.z + bd / 2,
        ),
      ),
      mesh: plinth,
      name: 'primary objective console',
    });
    this.collisionMeshes.push(plinth);

    this.objectiveConsole = {
      ...definition,
      y: definition.y || 0,
      group,
      position: new THREE.Vector3(definition.x, definition.y || 0, definition.z),
      active: false,
      complete: false,
      accent,
      status,
      screen,
      arch,
    };
    this.setObjectiveState(definition.requiresClear ? 'locked' : 'available');
  }

  _buildExtractionPad(definition) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(definition.x, 0, definition.z);
    this.root.add(group);
    this.dynamicGroups.push(group);

    const padMaterial = new THREE.MeshBasicMaterial({
      color: 0x8f5526,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
    const pad = new THREE.Mesh(new THREE.CircleGeometry(Math.min(definition.w, definition.d) * 0.48, 42), padMaterial);
    pad.rotation.x = -Math.PI / 2;
    pad.position.y = 0.026;
    group.add(pad);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffa53d,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(
        Math.min(definition.w, definition.d) * 0.48,
        Math.min(definition.w, definition.d) * 0.5,
        48,
      ),
      ringMaterial,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.035;
    group.add(ring);

    const beaconMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8a38,
      transparent: true,
      opacity: 0.012,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.62, 5.5, 16, 1, true), beaconMaterial);
    beacon.position.y = 2.75;
    group.add(beacon);

    const pylons = [];
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const pylon = new THREE.Group();
        pylon.position.set(
          sx * definition.w * 0.38,
          0,
          sz * definition.d * 0.38,
        );
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.35, 0.16), m.blackMetal);
        post.position.y = 0.68;
        post.castShadow = true;
        pylon.add(post);
        const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.22), m.amber);
        lamp.position.y = 1.42;
        pylon.add(lamp);
        const glow = this.addGlowSprite(
          definition.x + pylon.position.x,
          1.42,
          definition.z + pylon.position.z,
          1.8,
          0xffa53d,
          0.13,
        );
        this.dynamicGroups.push(glow);
        pylons.push({ pylon, lamp, post });
        group.add(pylon);
      }
    }

    this.addLabel(
      ['EXTRACTION', definition.label, 'REACH THE PAD BEFORE THE CLOCK ENDS'],
      {
        x: definition.x,
        y: 2.65,
        z: definition.z + definition.d * 0.38 + 0.1,
        w: 4.2,
        h: 1.12,
        // The sign sits on the south edge and faces back into the extraction
        // approach. FrontSide prevents mirrored text when seen from behind.
        rotation: Math.PI,
        accent: '#ffb15c',
        align: 'center',
      },
    );

    this.extractionZone = {
      ...definition,
      position: new THREE.Vector3(definition.x, 0, definition.z),
      group,
      pad,
      padMaterial,
      ring,
      ringMaterial,
      beacon,
      beaconMaterial,
      pylons,
      active: false,
    };
    this.ownedAssets.push(
      { material: padMaterial, texture: null },
      { material: ringMaterial, texture: null },
      { material: beaconMaterial, texture: null },
    );
    this.animators.push((dt, elapsed) => {
      if (!this.extractionZone) return;
      const active = this.extractionZone.active;
      const pulse = 0.72 + Math.sin(elapsed * (active ? 5.2 : 1.5)) * 0.24;
      this.extractionZone.ringMaterial.opacity = active ? 0.55 + pulse * 0.25 : 0.3;
      this.extractionZone.padMaterial.opacity = active ? 0.12 : 0.055;
      this.extractionZone.beaconMaterial.opacity = active ? 0.035 + pulse * 0.03 : 0.01;
      this.extractionZone.ring.rotation.z += dt * (active ? 0.65 : 0.12);
      for (const { pylon, lamp } of this.extractionZone.pylons) {
        pylon.scale.y = active ? 1 + Math.sin(elapsed * 4 + pylon.position.x) * 0.035 : 1;
        lamp.visible = active;
      }
    });
  }

  setObjectiveState(state) {
    if (!this.objectiveConsole) return;
    const objective = this.objectiveConsole;
    objective.active = state === 'available' || state === 'complete';
    objective.locked = state === 'locked';
    if (state !== 'complete') objective.complete = false;
    const blocked = state === 'locked';
    objective.accent.material = blocked ? this.materials.red : this.materials.cyan;
    objective.status.material = blocked ? this.materials.red : this.materials.cyan;
    objective.screen.material = blocked ? this.materials.screens[2] : this.materials.screens[0];
  }

  activateObjective() {
    if (!this.objectiveConsole) return;
    this.objectiveConsole.complete = true;
    this.objectiveConsole.active = false;
    this.objectiveConsole.locked = false;
    this.objectiveConsole.accent.material = this.materials.cyan;
    this.objectiveConsole.status.material = this.materials.cyan;
    this.objectiveConsole.screen.material = this.materials.screens[0];
    this.objectiveConsole.arch.rotation.z = 0;
  }

  setExtractionActive(active) {
    if (!this.extractionZone) return;
    this.extractionZone.active = Boolean(active);
    const color = active ? 0x6be7ff : 0xffa53d;
    this.extractionZone.ringMaterial.color.setHex(color);
    this.extractionZone.padMaterial.color.setHex(color);
    this.extractionZone.beaconMaterial.color.setHex(color);
    for (const { lamp } of this.extractionZone.pylons) {
      lamp.material = active ? this.materials.cyan : this.materials.amber;
    }
  }

  addDeck({
    x,
    z,
    w,
    d,
    y = 4,
    material = this.materials.grate,
    name = 'upper deck',
    railGaps = {},
    edgeLights = true,
  }) {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.34, d), material);
    slab.position.set(x, y - 0.17, z);
    slab.castShadow = true;
    slab.receiveShadow = true;
    this.root.add(slab);

    const box = new THREE.Box3(
      new THREE.Vector3(x - w / 2, y - 0.34, z - d / 2),
      new THREE.Vector3(x + w / 2, y, z + d / 2),
    );
    this.colliders.push({ box, mesh: slab, name, walkable: true });
    this.collisionMeshes.push(slab);
    this.walkableSurfaces.push({ box, y });

    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const support = new THREE.Mesh(new THREE.BoxGeometry(0.18, y - 0.34, 0.18), this.materials.steel);
      support.position.set(x + sx * (w / 2 - 0.45), (y - 0.34) / 2, z + sz * (d / 2 - 0.45));
      support.castShadow = true;
      this.root.add(support);
    }

    const deck = {
      x,
      z,
      w,
      d,
      y,
      navBounds: {
        minX: x - w / 2 + 0.56,
        maxX: x + w / 2 - 0.56,
        minZ: z - d / 2 + 0.56,
        maxZ: z + d / 2 - 0.56,
      },
      name,
    };
    this.decks.push(deck);

    this._addDeckRail({ x, z, w, d, y, side: 'north', gaps: railGaps.north || [] });
    this._addDeckRail({ x, z, w, d, y, side: 'south', gaps: railGaps.south || [] });
    this._addDeckRail({ x, z, w, d, y, side: 'west', gaps: railGaps.west || [] });
    this._addDeckRail({ x, z, w, d, y, side: 'east', gaps: railGaps.east || [] });

    if (edgeLights) {
      this.addEmissiveStrip(x, y + 0.018, z + d / 2 - 0.12, w - 0.5, 0.015, 0.045, this.materials.cyanSoft);
      this.addEmissiveStrip(x, y + 0.018, z - d / 2 + 0.12, w - 0.5, 0.015, 0.045, this.materials.cyanSoft);
    }

    // Callers place one authored nameplate at a readable wall/landmark. An
    // automatic full-width deck label here would compete with that sign and
    // with the objective console header in close-quarters fights.
    return deck;
  }

  _addDeckRail({ x, z, w, d, y, side, gaps }) {
    const thickness = 0.11;
    const railH = 1.06;
    const segments = [];
    if (side === 'north' || side === 'south') {
      const edgeZ = z + (side === 'south' ? d / 2 : -d / 2);
      const half = w / 2;
      const blocked = [...gaps].sort((a, b) => a.offset - b.offset);
      let cursor = -half;
      for (const gap of blocked) {
        const start = Math.max(-half, gap.offset - gap.width / 2);
        const end = Math.min(half, gap.offset + gap.width / 2);
        if (start > cursor) segments.push([cursor, start]);
        cursor = Math.max(cursor, end);
      }
      if (cursor < half) segments.push([cursor, half]);
      for (const [start, end] of segments) {
        const length = end - start;
        if (length < 0.18) continue;
        this.addBox({
          x: x + (start + end) / 2,
          z: edgeZ,
          w: length,
          d: thickness,
          h: railH,
          y,
          material: this.materials.steel,
          collide: true,
          name: 'deck rail',
        });
        this.addEmissiveStrip(
          x + (start + end) / 2,
          y + railH + 0.015,
          edgeZ,
          length,
          0.02,
          0.02,
          this.materials.cyanSoft,
        );
      }
    } else {
      const edgeX = x + (side === 'east' ? w / 2 : -w / 2);
      const half = d / 2;
      const blocked = [...gaps].sort((a, b) => a.offset - b.offset);
      let cursor = -half;
      for (const gap of blocked) {
        const start = Math.max(-half, gap.offset - gap.width / 2);
        const end = Math.min(half, gap.offset + gap.width / 2);
        if (start > cursor) segments.push([cursor, start]);
        cursor = Math.max(cursor, end);
      }
      if (cursor < half) segments.push([cursor, half]);
      for (const [start, end] of segments) {
        const length = end - start;
        if (length < 0.18) continue;
        this.addBox({
          x: edgeX,
          z: z + (start + end) / 2,
          w: thickness,
          d: length,
          h: railH,
          y,
          material: this.materials.steel,
          collide: true,
          name: 'deck rail',
        });
        this.addEmissiveStrip(
          edgeX,
          y + railH + 0.015,
          z + (start + end) / 2,
          0.02,
          0.02,
          length,
          this.materials.cyanSoft,
        );
      }
    }
  }

  /**
   * Stepped stair built from solid risers so the existing step-up controller
   * works unchanged. The top of the run meets an authored deck edge.
   */
  addStairs({
    x,
    z,
    width = 2.8,
    height = 4,
    run = 7.2,
    direction = 'north',
    name = 'deck stairs',
  }) {
    const vectors = {
      north: [0, -1],
      south: [0, 1],
      east: [1, 0],
      west: [-1, 0],
    };
    const [dx, dz] = vectors[direction] || vectors.north;
    const steps = Math.max(8, Math.ceil(height / 0.31));
    const rise = height / steps;
    const stepRun = run / steps;
    const stepW = direction === 'north' || direction === 'south' ? width : stepRun;
    const stepD = direction === 'north' || direction === 'south' ? stepRun : width;

    for (let i = 0; i < steps; i += 1) {
      const top = rise * (i + 1);
      const cx = x + dx * (i + 0.5) * stepRun;
      const cz = z + dz * (i + 0.5) * stepRun;
      this.addBox({
        x: cx,
        z: cz,
        w: stepW,
        d: stepD,
        h: top,
        y: 0,
        material: this.materials.steel,
        collide: true,
        name: `${name} step ${i + 1}`,
      });
    }

    // Open side rails are visual only; the stair core remains traversable.
    for (const side of [-1, 1]) {
      const railX = x + (direction === 'north' || direction === 'south' ? side * (width / 2 + 0.08) : 0);
      const railZ = z + (direction === 'north' || direction === 'south' ? 0 : side * (width / 2 + 0.08));
      const length = direction === 'north' || direction === 'south' ? run : run;
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(
          direction === 'north' || direction === 'south' ? 0.06 : length,
          0.06,
          direction === 'north' || direction === 'south' ? length : 0.06,
        ),
        this.materials.steel,
      );
      rail.position.set(
        railX + (direction === 'north' || direction === 'south' ? 0 : dx * run * 0.5),
        height * 0.55 + 0.55,
        railZ + (direction === 'north' || direction === 'south' ? dz * run * 0.5 : 0),
      );
      rail.rotation.x = direction === 'north' || direction === 'south' ? (dz > 0 ? -0.48 : 0.48) : 0;
      rail.rotation.z = direction === 'east' || direction === 'west' ? (dx > 0 ? 0.48 : -0.48) : 0;
      this.root.add(rail);
    }

    const stair = {
      bottom: new THREE.Vector3(x, 0, z),
      top: new THREE.Vector3(x + dx * run, height, z + dz * run),
      direction,
      width,
      height,
      run,
      name,
    };
    this.stairways.push(stair);
    return stair;
  }

  /* ------------------------------------------------------------------ */
  /* Environmental evidence props                                       */
  /* ------------------------------------------------------------------ */

  addCryoPod(x, z, { rotation = 0, open = false, label = 'CROWN TRANSFER POD', index = null } = {}) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.92, 0.32, 18), m.blackMetal);
    base.position.y = 0.16;
    base.castShadow = true;
    group.add(base);

    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x5f7d84,
      roughness: 0.2,
      metalness: 0.55,
      transparent: true,
      opacity: open ? 0.12 : 0.36,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.78, 2.25, 20, 1, true), shellMaterial);
    shell.position.y = 1.45;
    group.add(shell);
    this.ownedAssets.push({ material: shellMaterial, texture: null });

    const inner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.42, 1.75, 14),
      new THREE.MeshBasicMaterial({
        color: open ? 0x3b2c20 : 0x6fddeb,
        transparent: true,
        opacity: open ? 0.1 : 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    inner.position.y = 1.35;
    group.add(inner);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.035, 6, 24), m.steel);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 0.34;
    group.add(collar);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.7, 0.2, 18), m.blackMetal);
    cap.position.y = 2.63;
    group.add(cap);

    const status = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.045, 0.03), open ? m.amber : m.cyanSoft);
    status.position.set(0, 2.35, 0.57);
    group.add(status);

    if (open) {
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.08), m.darkPanel);
      door.position.set(0.75, 1.3, 0.36);
      door.rotation.y = -0.82;
      door.castShadow = true;
      group.add(door);
    }

    this.addColliderOnly(x, 0, z, 1.5, 2.8, 1.5, 'cryo pod');
    this.addLabel(
      [label, index !== null ? `POD ${String(index).padStart(2, '0')} / ${open ? 'SEAL BROKEN' : 'SEALED'}` : 'CROWN LOGISTICS'],
      {
        x: x + Math.sin(rotation) * 0.73,
        y: 1.55,
        z: z + Math.cos(rotation) * 0.73,
        w: 1.35,
        h: 0.44,
        rotation,
        accent: open ? '#ffb15c' : '#6be7ff',
        align: 'center',
      },
    );
    return group;
  }

  addChassisRack(x, z, rotation = 0, count = 3) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const frame = new THREE.Group();
    for (const side of [-1, 1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.2, 0.12), m.steel);
      post.position.set(side * 1.85, 1.6, 0);
      frame.add(post);
    }
    const top = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.1, 0.16), m.steel);
    top.position.y = 3.15;
    frame.add(top);
    for (let i = 0; i < count; i += 1) {
      const px = -1.4 + i * 1.4;
      const body = new THREE.Mesh(new RoundedBoxGeometry(0.5, 1.25, 0.32, 2, 0.04), m.darkPanel);
      body.position.set(px, 1.35, 0);
      body.castShadow = true;
      frame.add(body);
      const skull = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), m.blackMetal);
      skull.position.set(px, 2.12, 0);
      frame.add(skull);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.03, 0.02), m.red);
      visor.position.set(px, 2.13, 0.17);
      frame.add(visor);
      const hanger = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.9, 0.04), m.steel);
      hanger.position.set(px, 2.7, 0);
      frame.add(hanger);
    }
    group.add(frame);
    this.addColliderOnly(x, 0, z, 4.1, 3.2, 0.9, 'chassis rack');
    this.addLabel(['ITERATION LINE', `CHASSIS ${String(count).padStart(2, '0')} / HALTED`], {
      x: x + Math.sin(rotation) * 0.5,
      y: 2.55,
      z: z + Math.cos(rotation) * 0.5,
      w: 2.8,
      h: 0.8,
      rotation,
      accent: '#ffb15c',
      align: 'center',
    });
    return group;
  }

  addPayloadCradle(x, z) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    this.root.add(group);

    const cradle = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.18, 8, 36), m.blackMetal);
    cradle.rotation.x = Math.PI / 2;
    cradle.position.y = 0.56;
    group.add(cradle);
    for (let i = 0; i < 4; i += 1) {
      const angle = (i / 4) * Math.PI * 2;
      const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.2, 0.7), m.steel);
      clamp.position.set(Math.cos(angle) * 2.25, 1.1, Math.sin(angle) * 2.25);
      clamp.rotation.y = -angle;
      clamp.castShadow = true;
      group.add(clamp);
    }
    const empty = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 36),
      new THREE.MeshBasicMaterial({ color: 0x02070a, transparent: true, opacity: 0.74, side: THREE.DoubleSide }),
    );
    empty.rotation.x = -Math.PI / 2;
    empty.position.y = 0.03;
    group.add(empty);
    this.addColliderOnly(x, 0, z, 5.2, 2.2, 5.2, 'empty payload cradle');
    this.addLabel(['PAYLOAD CRADLE', 'CROWN / TRANSFER COMPLETE', 'ONE SUBJECT UNACCOUNTED'], {
      x,
      y: 2.2,
      z: z + 2.9,
      w: 3.4,
      h: 0.9,
      rotation: 0,
      accent: '#ffb15c',
      align: 'center',
    });
    return group;
  }

  addArchiveRack(x, z, rotation = 0, width = 8) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);
    const body = new THREE.Mesh(new RoundedBoxGeometry(width, 2.8, 0.9, 2, 0.06), m.blackMetal);
    body.position.y = 1.4;
    body.castShadow = true;
    group.add(body);
    const rows = Math.max(2, Math.floor(width / 1.1));
    for (let i = 0; i < rows; i += 1) {
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.42), m.screens[i % 3]);
      screen.position.set(-width / 2 + 0.75 + i * (width / rows), 1.75, 0.47);
      group.add(screen);
      const light = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.02), i % 4 === 0 ? m.red : m.cyanSoft);
      light.position.set(screen.position.x, 1.16, 0.47);
      group.add(light);
    }
    this.addColliderOnly(x, 0, z, width * Math.abs(Math.cos(rotation)) + 0.9 * Math.abs(Math.sin(rotation)), 2.8, width * Math.abs(Math.sin(rotation)) + 0.9 * Math.abs(Math.cos(rotation)), 'CROWN archive rack');
    this.addLabel(['CROWN ARCHIVE', 'RECORDS / COMMAND ORDERS', 'REPLICATION ACTIVE'], {
      x: x + Math.sin(rotation) * 0.55,
      y: 2.45,
      z: z + Math.cos(rotation) * 0.55,
      w: 3.4,
      h: 0.9,
      rotation,
      accent: '#6be7ff',
      align: 'center',
    });
    return group;
  }

  /**
   * A diegetic terminal. The screen is a shared material, the frame stays a
   * separate dynamic group so it remains visible after static batching, and
   * the collider is small enough to sit against a wall without sealing a lane.
   */
  addIntelTerminal(definition) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(definition.x, 0, definition.z);
    group.rotation.y = definition.rotation || 0;
    this.root.add(group);
    this.dynamicGroups.push(group);

    const plinth = new THREE.Mesh(new RoundedBoxGeometry(0.92, 1.02, 0.52, 2, 0.045), m.blackMetal);
    plinth.position.y = 0.51;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    group.add(plinth);

    const bezel = new THREE.Mesh(new RoundedBoxGeometry(1.04, 0.58, 0.12, 2, 0.025), m.steel);
    bezel.position.set(0, 1.33, 0.12);
    bezel.rotation.x = -0.16;
    group.add(bezel);

    const screenMaterial = definition.kind === 'finale' ? m.red : m.screens[0];
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.42), screenMaterial);
    screen.position.set(0, 1.34, 0.19);
    screen.rotation.x = -0.16;
    group.add(screen);

    const baseLight = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.025, 0.03), definition.kind === 'finale' ? m.red : m.cyan);
    baseLight.position.set(0, 1.03, 0.28);
    group.add(baseLight);

    const status = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), definition.kind === 'finale' ? m.red : m.cyanSoft);
    status.position.set(0.4, 1.58, 0.19);
    group.add(status);

    this.addGlowSprite(
      definition.x,
      1.5,
      definition.z,
      definition.kind === 'finale' ? 3.2 : 1.9,
      definition.kind === 'finale' ? 0xff4d58 : 0x6be7ff,
      definition.kind === 'finale' ? 0.2 : 0.12,
    );

    const horizontal = Math.abs(Math.cos(definition.rotation || 0));
    const vertical = Math.abs(Math.sin(definition.rotation || 0));
    const bw = 1.08 * horizontal + 0.62 * vertical;
    const bd = 1.08 * vertical + 0.62 * horizontal;
    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(definition.x - bw / 2, 0, definition.z - bd / 2),
        new THREE.Vector3(definition.x + bw / 2, 1.45, definition.z + bd / 2),
      ),
      mesh: plinth,
      name: 'archive terminal',
    });
    this.collisionMeshes.push(plinth);

    this.terminals.push({
      ...definition,
      group,
      position: new THREE.Vector3(definition.x, 0, definition.z),
      read: false,
      active: true,
      kind: definition.kind || 'intel',
    });
  }

  resetTerminals() {
    for (const terminal of this.terminals) {
      terminal.read = false;
      terminal.active = true;
      terminal.group.visible = true;
    }
    this.setAlarm(false);
  }

  setAlarm(active) {
    if (!this._alarmBase) {
      this._alarmBase = {
        ambient: this.ambient?.color.clone() || null,
        hemi: this.hemi?.color.clone() || null,
        fog: this.scene.fog?.color.clone() || null,
      };
    }

    this._alarmActive = Boolean(active);
    if (this._alarmActive && !this._alarmLight && this.scene) {
      this._alarmLight = new THREE.PointLight(0xff3345, 0, 64, 1.6);
      this._alarmLight.position.set(0, 5.2, 0);
      this.addSceneLight(this._alarmLight);
      this.animators.push((dt, elapsed) => {
        if (!this._alarmActive) {
          this._alarmLight.intensity = 0;
          return;
        }
        this._alarmLight.intensity = 34 + (Math.sin(elapsed * 4.2) + 1) * 14;
      });
    }
    if (!this._alarmBase.ambient) return;

    if (this._alarmActive) {
      this.ambient?.color.copy(this._alarmBase.ambient).lerp(new THREE.Color(0x6b2029), 0.62);
      this.hemi?.color.copy(this._alarmBase.hemi).lerp(new THREE.Color(0x8c3c46), 0.42);
      if (this.scene.fog?.color && this._alarmBase.fog) {
        this.scene.fog.color.copy(this._alarmBase.fog).lerp(new THREE.Color(0x3a1118), 0.5);
      }
    } else {
      this.ambient?.color.copy(this._alarmBase.ambient);
      this.hemi?.color.copy(this._alarmBase.hemi);
      if (this.scene.fog?.color && this._alarmBase.fog) {
        this.scene.fog.color.copy(this._alarmBase.fog);
      }
      if (this._alarmLight) this._alarmLight.intensity = 0;
    }
  }

  addMedkit(x, z, y = 0.18) {
    const position = new THREE.Vector3(x, y, z);
    const group = new THREE.Group();
    group.position.copy(position);
    this.root.add(group);

    const caseMesh = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.3, 0.46, 2, 0.045), this.materials.darkPanel);
    caseMesh.castShadow = true;
    group.add(caseMesh);

    const glow = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.015, 0.13), this.materials.cyan);
    glow.position.y = 0.158;
    group.add(glow);
    const glowB = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.015, 0.36), this.materials.cyan);
    glowB.position.y = 0.158;
    group.add(glowB);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 6, 32), this.materials.cyanSoft);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.16;
    group.add(ring);

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.5, 1.6, 16, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x64eaff,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    beam.position.y = 0.8;
    group.add(beam);

    this.medkits.push({
      group,
      baseY: position.y,
      active: true,
      position: position.clone(),
      phase: Math.random() * Math.PI * 2,
    });
  }

  _buildMedkits() {
    this.addMedkit(-24.8, 18.2);
    this.addMedkit(25.2, -4.2);
    this.addMedkit(-18.8, -26.8);
  }

  _defineSpawns() {
    this.setSpawns([
      { id: 'S-01', pos: [-16.2, 13.8], route: [[-17.5, 14], [-10.3, 14.4], [-11.2, 22]] },
      { id: 'S-02', pos: [15.8, 14.8], route: [[18.4, 13.2], [12.2, 12.4], [9, 21]] },
      { id: 'S-03', pos: [-18.2, 1.6], route: [[-16.4, -7.4], [-14.2, -5.2], [-16.8, 2.4]] },
      { id: 'S-04', pos: [17.2, 4.8], route: [[20, -2.6], [14.2, -3.8], [17.5, 5.2]] },
      { id: 'S-05', pos: [0, -8.4], route: [[-7.4, -7.8], [7.4, -7.8], [0, -9.6]] },
      { id: 'S-06', pos: [26.2, 5.4], route: [[26.2, -7.2], [26.2, 0.8], [26.2, 6]] },
      {
        id: 'S-07',
        pos: [-13.2, -20.8],
        route: [[-17.6, -20.2], [-19.2, -26.2], [-10.8, -25.5]],
        wave: 2,
        role: 'heavy',
      },
      {
        id: 'S-08',
        pos: [14.8, -22.2],
        route: [[18.2, -25.4], [7.8, -25.4], [7.2, -20.8]],
        wave: 2,
        role: 'commander',
        health: 190,
        elite: true,
      },
    ]);
  }

  setSpawns(spawns) {
    // Stable role composition gives every operation a mix of pressure,
    // holding and ranged units without turning the roster into noise.
    const roleCycle = [
      'assault', 'marksman', 'defender', 'assault', 'heavy',
      'marksman', 'defender', 'assault', 'marksman', 'heavy',
      'defender', 'assault', 'marksman', 'heavy', 'elite',
    ];
    this.enemySpawns = spawns.map((spawn, index) => ({
      ...spawn,
      pos: new THREE.Vector3(spawn.pos[0], spawn.floorY || 0, spawn.pos[1]),
      route: spawn.route.map(([x, z]) => new THREE.Vector3(x, spawn.floorY || 0, z)),
      floorY: spawn.floorY || 0,
      navBounds: spawn.navBounds || null,
      wave: spawn.wave || 1,
      role: spawn.role || (spawn.elite ? 'elite' : roleCycle[index % roleCycle.length]),
    }));
  }

  /* ------------------------------------------------------------------ */
  /* Prop builders                                                      */
  /* ------------------------------------------------------------------ */

  addCrate(x, z, w, h, d, rotation = 0, y = 0) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, 0.035), m.darkPanel);
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const bandMat = m.steel;
    for (const side of [-1, 1]) {
      const band = new THREE.Mesh(new THREE.BoxGeometry(w * 0.98, 0.055, d * 0.12), bandMat);
      band.position.set(0, h * 0.5 + side * h * 0.3, 0);
      band.castShadow = true;
      group.add(band);
    }
    const verticalBand = new THREE.Mesh(new THREE.BoxGeometry(w * 0.08, h * 0.95, d * 0.025), bandMat);
    verticalBand.position.set(w * 0.32, h / 2, d / 2 + 0.005);
    group.add(verticalBand);

    const label = new THREE.Mesh(new THREE.BoxGeometry(w * 0.3, h * 0.16, 0.01), m.amber);
    label.position.set(-w * 0.16, h * 0.66, d / 2 + 0.006);
    label.material = m.amber;
    group.add(label);

    // Register an axis-aligned approximation; rotations are cosmetic and
    // small enough that the AABB remains a fair collision surface.
    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const bw = w * cos + d * sin;
    const bd = w * sin + d * cos;
    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(x - bw / 2, y, z - bd / 2),
        new THREE.Vector3(x + bw / 2, y + h, z + bd / 2),
      ),
      mesh: body,
      name: 'crate',
    });
    this.collisionMeshes.push(body);

    return group;
  }

  addBarrier(x, z, width, rotation = 0) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const plate = new THREE.Mesh(new RoundedBoxGeometry(width, 0.72, 0.22, 2, 0.03), m.steel);
    plate.position.y = 0.72;
    plate.castShadow = true;
    plate.receiveShadow = true;
    group.add(plate);

    const band = new THREE.Mesh(new THREE.BoxGeometry(width * 0.86, 0.08, 0.235), m.hazardStripe);
    band.position.y = 0.58;
    group.add(band);

    for (const side of [-1, 1]) {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.36, 0.6), m.blackMetal);
      foot.position.set(side * (width / 2 - 0.25), 0.18, 0);
      foot.castShadow = true;
      group.add(foot);
      const glow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.035, 0.08), m.cyanSoft);
      glow.position.set(side * (width / 2 - 0.25), 0.4, 0.29);
      group.add(glow);
    }

    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const w = width * cos + 0.3 * sin;
    const d = width * sin + 0.3 * cos;
    this.colliders.push({
      box: new THREE.Box3(new THREE.Vector3(x - w / 2, 0, z - d / 2), new THREE.Vector3(x + w / 2, 1.12, z + d / 2)),
      mesh: plate,
      name: 'barrier',
    });
    this.collisionMeshes.push(plate);

    return group;
  }

  addPillar(x, z, radius, height) {
    const m = this.materials;
    const base = new THREE.Mesh(new THREE.BoxGeometry(radius * 2.9, 0.35, radius * 2.9), m.blackMetal);
    base.position.set(x, 0.175, z);
    base.castShadow = true;
    this.root.add(base);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.08, height, 12), m.wallDark);
    shaft.position.set(x, height / 2, z);
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    this.root.add(shaft);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.06, 0.035, 6, 12), m.steel);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(x, height * 0.62, z);
    this.root.add(collar);
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.25, 0.02), m.cyanSoft);
    light.position.set(x, height * 0.35, z + radius * 1.01);
    this.root.add(light);

    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(x - radius * 1.15, 0, z - radius * 1.15),
        new THREE.Vector3(x + radius * 1.15, height, z + radius * 1.15),
      ),
      mesh: shaft,
      name: 'pillar',
    });
    this.collisionMeshes.push(shaft);
  }

  _buildContainer(x, z, w, d, h, material, rotation = 0, y = 0, bodyMaterial = null) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      bodyMaterial || new THREE.MeshStandardMaterial({ color: 0x2a3136, roughness: 0.66, metalness: 0.52 }),
    );
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Corrugated ribs.
    const ribGeo = new THREE.BoxGeometry(w * 0.02, h * 0.92, 0.04);
    for (let i = 0; i < 9; i += 1) {
      const rib = new THREE.Mesh(ribGeo, this.materials.wallDark);
      rib.position.set(-w * 0.405 + (i / 8) * w * 0.81, h / 2, d / 2 + 0.025);
      group.add(rib);
    }

    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86, h * 0.82, 0.06), this.materials.blackMetal);
    doorFrame.position.set(0, h / 2, d / 2 + 0.045);
    group.add(doorFrame);
    const hazardBand = new THREE.Mesh(new THREE.BoxGeometry(w * 0.88, 0.18, 0.07), this.materials.hazardStripe);
    hazardBand.position.set(0, h * 0.2, d / 2 + 0.08);
    group.add(hazardBand);
    const idLight = new THREE.Mesh(new THREE.BoxGeometry(w * 0.22, 0.06, 0.02), this.materials.amber);
    idLight.position.set(w * 0.24, h * 0.78, d / 2 + 0.09);
    group.add(idLight);

    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const bw = w * cos + d * sin;
    const bd = w * sin + d * cos;
    this.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(x - bw / 2, y, z - bd / 2),
        new THREE.Vector3(x + bw / 2, y + h, z + bd / 2),
      ),
      mesh: body,
      name: 'container',
    });
    this.collisionMeshes.push(body);
  }

  _addServerRack(x, z, rotation) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);

    const body = new THREE.Mesh(new RoundedBoxGeometry(1.1, 2.2, 0.85, 2, 0.04), this.materials.blackMetal);
    body.position.y = 1.1;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    for (let i = 0; i < 9; i += 1) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.035, 0.015), i === 6 ? this.materials.red : this.materials.cyanSoft);
      slot.position.set(0, 0.36 + i * 0.19, 0.432);
      group.add(slot);
    }
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.05, 0.04), this.materials.steel);
    handle.position.set(0, 2.15, 0.44);
    group.add(handle);

    this.colliders.push({
      box: new THREE.Box3(new THREE.Vector3(x - 0.72, 0, z - 0.72), new THREE.Vector3(x + 0.72, 2.2, z + 0.72)),
      mesh: body,
      name: 'server rack',
    });
    this.collisionMeshes.push(body);
  }

  _addHangingLamp(x, y, z) {
    const m = this.materials;
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.6, 5), m.rubber);
    cable.position.set(x, y + 1.1, z);
    this.root.add(cable);

    const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.45, 0.28, 12), m.blackMetal);
    housing.position.set(x, y + 0.25, z);
    housing.castShadow = true;
    this.root.add(housing);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 16), m.white);
    lens.position.set(x, y + 0.1, z);
    this.root.add(lens);

    const cone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 3.6, 7.2, 20, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x9fdde9,
        transparent: true,
        opacity: 0.012,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    cone.position.set(x, y - 3.5, z);
    this.root.add(cone);
  }

  _addPipeRun(x, y, z, length, radius, rotation) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotation;
    this.root.add(group);
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), this.materials.steel);
    pipe.rotation.z = Math.PI / 2;
    pipe.castShadow = true;
    group.add(pipe);

    const flangeGeo = new THREE.TorusGeometry(radius * 1.35, radius * 0.24, 6, 12);
    for (let i = -1; i <= 1; i += 1) {
      const flange = new THREE.Mesh(flangeGeo, this.materials.blackMetal);
      flange.rotation.y = Math.PI / 2;
      flange.position.x = i * length * 0.38;
      group.add(flange);
    }
    return group;
  }

  _addGuardRail(x, z, w, d, rotation) {
    const m = this.materials;
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = rotation;
    this.root.add(group);
    const length = Math.max(w, d);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, length, 6), m.steel);
    top.rotation.z = Math.PI / 2;
    top.position.y = 0.9;
    group.add(top);
    const mid = top.clone();
    mid.position.y = 0.52;
    group.add(mid);
    for (let i = -2; i <= 2; i += 1) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.95, 0.06), m.steel);
      post.position.set((i / 2) * (length / 2), 0.475, 0);
      group.add(post);
    }
  }

  _addWallVent(x, y, z, rotationY) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotationY;
    this.root.add(group);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 0.08), this.materials.blackMetal);
    group.add(frame);
    for (let i = 0; i < 6; i += 1) {
      const slit = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.035, 0.02), this.materials.steel);
      slit.position.set(0, -0.55 + i * 0.22, 0.05);
      group.add(slit);
    }
    const led = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.02), this.materials.cyanSoft);
    led.position.set(1.15, 0.65, 0.05);
    group.add(led);
  }

  _addCatwalk() {
    const m = this.materials;
    for (const side of [-1, 1]) {
      const x = side * 19.8;
      const walk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 18), m.grate);
      walk.position.set(x, 5.2, -1.4);
      walk.castShadow = true;
      walk.receiveShadow = true;
      this.root.add(walk);
      for (let i = 0; i < 3; i += 1) {
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.2, 0.18), m.steel);
        support.position.set(x + side * 1.2, 2.6, -9 + i * 7.2);
        support.castShadow = true;
        this.root.add(support);
      }
      for (let i = 0; i < 8; i += 1) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.95, 0.045), m.steel);
        post.position.set(x - side * 1.5, 5.75, -9.4 + i * 2.2);
        this.root.add(post);
      }
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 17.6, 6), m.steel);
      rail.rotation.x = Math.PI / 2;
      rail.position.set(x - side * 1.5, 6.2, -1.4);
      this.root.add(rail);
      this.addEmissiveStrip(x - side * 1.57, 5.3, -1.4, 0.02, 0.02, 17.6, m.cyanSoft);
    }
  }

  _addCableCurve(points) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    const geometry = new THREE.TubeGeometry(curve, 24, 0.028, 5, false);
    const mesh = new THREE.Mesh(geometry, this.materials.rubber);
    this.root.add(mesh);
  }

  /* ------------------------------------------------------------------ */
  /* Runtime                                                            */
  /* ------------------------------------------------------------------ */

  setShadows(enabled) {
    // One shadow-casting light keeps the industrial silhouettes readable
    // without doubling shadow passes across the whole facility.
    this.directional.castShadow = enabled;
    if (this.mainSpot) this.mainSpot.castShadow = false;
    this.renderer.shadowMap.enabled = enabled;
  }

  update(dt, elapsed) {
    this.time += dt;

    for (const animate of this.animators) animate(dt, elapsed);

    if (this._reactorCage) {
      this._reactorCage.rotation.y += dt * 0.055;
      for (let i = 0; i < this._reactorRings.length; i += 1) {
        const ring = this._reactorRings[i];
        ring.rotation.z += dt * (0.08 + i * 0.012) * (i % 2 === 0 ? 1 : -1);
        ring.position.y = 0.95 + i * 0.72 + Math.sin(elapsed * 0.6 + i) * 0.03;
      }
      if (this._reactorCore) {
        this._reactorCore.material.opacity = 0.32 + Math.sin(elapsed * 1.7) * 0.07;
      }
      this.reactorLight.intensity = 64 + Math.sin(elapsed * 1.9) * 8;
    }

    if (this.emergencyLight) {
      const pulse = (Math.sin(elapsed * 2.2) + 1) * 0.5;
      this.emergencyLight.intensity = 16 + pulse * 22;
    }

    if (this.warningLight) {
      this.warningLight.intensity = 16 + (Math.sin(elapsed * 3.4) + 1) * 6;
    }

    if (this._holoGroup) {
      this._holoGroup.rotation.y += dt * 0.22;
    }

    for (const medkit of this.medkits) {
      if (!medkit.active) continue;
      medkit.group.rotation.y += dt * 0.7;
      medkit.group.position.y = medkit.baseY + Math.sin(elapsed * 1.8 + medkit.phase) * 0.045;
    }

    if (this._dust) {
      const { positions, seeds, count } = this._dustData;
      for (let i = 0; i < count; i += 1) {
        const idx = i * 3;
        positions[idx] += Math.sin(elapsed * 0.22 + seeds[i * 2]) * dt * 0.03;
        positions[idx + 1] += Math.sin(elapsed * 0.17 + seeds[i * 2 + 1]) * dt * 0.025;
        positions[idx + 2] += Math.cos(elapsed * 0.19 + seeds[i * 2]) * dt * 0.025;
        if (positions[idx + 1] > 8.3) positions[idx + 1] = 0.4;
        if (positions[idx + 1] < 0.3) positions[idx + 1] = 8.2;
      }
      this._dust.geometry.attributes.position.needsUpdate = true;
    }

    if (this._particleField) {
      const {
        positions, seeds, count, bounds, fall, drift, flutter, points,
      } = this._particleField;
      for (let i = 0; i < count; i += 1) {
        const idx = i * 3;
        const phase = seeds[i * 2];
        positions[idx] += Math.sin(elapsed * 0.22 + phase) * dt * drift;
        positions[idx + 2] += Math.cos(elapsed * 0.18 + phase) * dt * drift * 0.7;
        if (fall > 0) {
          positions[idx + 1] -= fall * dt * (0.65 + seeds[i * 2 + 1] * 0.8);
          if (positions[idx + 1] < bounds.minY) {
            positions[idx + 1] = bounds.maxY;
            positions[idx] = randomRange(bounds.minX, bounds.maxX);
            positions[idx + 2] = randomRange(bounds.minZ, bounds.maxZ);
          }
        } else {
          positions[idx + 1] += Math.sin(elapsed * 0.17 + seeds[i * 2 + 1]) * dt * flutter;
          if (positions[idx + 1] > bounds.maxY) positions[idx + 1] = bounds.minY;
          if (positions[idx + 1] < bounds.minY) positions[idx + 1] = bounds.maxY;
        }
        if (positions[idx] > bounds.maxX) positions[idx] = bounds.minX;
        if (positions[idx] < bounds.minX) positions[idx] = bounds.maxX;
        if (positions[idx + 2] > bounds.maxZ) positions[idx + 2] = bounds.minZ;
        if (positions[idx + 2] < bounds.minZ) positions[idx + 2] = bounds.maxZ;
      }
      points.geometry.attributes.position.needsUpdate = true;
    }
  }

  tryPickupMedkit(playerPosition) {
    for (const medkit of this.medkits) {
      if (!medkit.active) continue;
      const dx = medkit.position.x - playerPosition.x;
      const dz = medkit.position.z - playerPosition.z;
      if (dx * dx + dz * dz < 1.65) {
        return medkit;
      }
    }
    return null;
  }

  consumeMedkit(medkit) {
    medkit.active = false;
    medkit.group.visible = false;
  }

  resetPickups() {
    for (const medkit of this.medkits) {
      medkit.active = true;
      medkit.group.visible = true;
      medkit.group.position.y = medkit.baseY;
    }
  }

  /**
   * True when the segment between two points intersects static geometry.
   * Used by enemy perception and projectiles. We intentionally test only
   * collision meshes, not decorative particles or catwalk rails.
   */
  isLineBlocked(from, to, raycaster = new THREE.Raycaster()) {
    const direction = this._tempV.copy(to).sub(from);
    const distance = direction.length();
    if (distance < 0.001) return false;
    direction.normalize();
    raycaster.set(from, direction);
    raycaster.far = distance - 0.05;
    const hits = raycaster.intersectObjects(this.collisionMeshes, false);
    return hits.length > 0;
  }

  raycast(raycaster) {
    return raycaster.intersectObjects(this.collisionMeshes, false);
  }

  dispose() {
    // Materials are owned by Game and shared by every operation, so swapping
    // a level must release geometry and scene lights — never the palette.
    this.scene.remove(this.root);
    this.root.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
    });
    for (const light of this.sceneLights) this.scene.remove(light);
    this.sceneLights.length = 0;
    for (const { material, texture } of this.ownedAssets) {
      texture?.dispose();
      material?.dispose();
    }
    this.ownedAssets.length = 0;
    this.scene.fog = null;
    this.scene.background = null;
    this._glowTexture?.dispose();
    this._glowTexture = null;
  }
}
