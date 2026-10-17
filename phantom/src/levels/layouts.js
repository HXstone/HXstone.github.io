import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/**
 * Authored layouts for every operation beyond SITE-09.
 *
 * Design rules:
 *  - The spawn always sits on a clear, readable approach with the objective
 *    silhouette visible down the primary lane.
 *  - Every wall run is axis-aligned and every doorway is at least 4 m wide, so
 *    the AABB collision and 1.1 m A* grid agree with what the player sees.
 *  - Cover is placed as deliberate lanes and fallback positions, never as
 *    random scatter. Each map has one dominant landmark and one secondary
 *    route that breaks the primary sightline.
 *  - Decorative geometry never receives a collider; solid geometry always
 *    registers one through World's helpers.
 */

const spawn = (id, pos, route, extra = {}) => ({
  id,
  pos,
  route,
  ...extra,
});

function perimeter(world, {
  width,
  depth,
  height = 8,
  wallMaterial = world.materials.wallDark,
  floorMaterial = world.materials.floor,
  thickness = 0.8,
  inset = 1.5,
  lights = false,
  floorY = 0,
} = {}) {
  const m = world.materials;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(width, 0.35, depth), floorMaterial);
  floor.position.set(0, floorY - 0.175, 0);
  floor.receiveShadow = true;
  world.root.add(floor);
  world.collisionMeshes.push(floor);

  const halfW = width / 2;
  const halfD = depth / 2;
  world.addWall({ x: 0, z: halfD - thickness / 2, w: width, d: thickness, h: height, material: wallMaterial, light: lights, name: 'south perimeter' });
  world.addWall({ x: 0, z: -halfD + thickness / 2, w: width, d: thickness, h: height, material: wallMaterial, light: lights, name: 'north perimeter' });
  world.addWall({ x: -halfW + thickness / 2, z: 0, w: thickness, d: depth - thickness, h: height, material: wallMaterial, name: 'west perimeter' });
  world.addWall({ x: halfW - thickness / 2, z: 0, w: thickness, d: depth - thickness, h: height, material: wallMaterial, name: 'east perimeter' });

  world.navBounds = {
    minX: -halfW + inset,
    maxX: halfW - inset,
    minZ: -halfD + inset,
    maxZ: halfD - inset,
  };

  // A darker inset deck makes the playable floor legible against the walls.
  if (floorMaterial !== m.sand) {
    world.addFloorPanel(0, 0, width - 8, depth - 8, m.floorDark);
  }

  return { halfW, halfD };
}

function trusses(world, { width, y, spacing = 9, depth = 56 }) {
  for (let z = -depth / 2 + 4; z <= depth / 2 - 4; z += spacing) {
    const beam = new THREE.Mesh(new THREE.BoxGeometry(width - 2, 0.26, 0.34), world.materials.steel);
    beam.position.set(0, y, z);
    world.root.add(beam);
  }
}

function roof(world, { width, depth, y, material = world.materials.darkPanel }) {
  world.addRoof(0, 0, width, depth, y, material, 0.28);
  trusses(world, { width, y: y - 0.18, spacing: 8, depth });
}

function doorFrame(world, x, z, width, height, rotation = 0) {
  world._buildDoorFrame(x, z, width, height, rotation);
}

function addWallRun(world, {
  x,
  z,
  w,
  d,
  h,
  material = world.materials.wall,
  name = 'partition',
  light = false,
}) {
  return world.addWall({ x, z, w, d, h, material, name, light });
}

function addLightMast(world, x, z, height = 9, color = 0x9bdcff, glowScale = 1.8) {
  const m = world.materials;
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, height, 8), m.steel);
  pole.position.set(x, height / 2, z);
  pole.castShadow = true;
  world.root.add(pole);
  const head = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.24, 0.45, 2, 0.04), m.blackMetal);
  head.position.set(x, height, z);
  world.root.add(head);
  world.addEmissiveStrip(x, height - 0.16, z, 0.7, 0.02, 0.22, m.white);
  world.addGlowSprite(x, height - 0.15, z, glowScale, color, 0.16);
}

function addSpecimenTank(world, x, z, { radius = 1.05, height = 2.8, color = 0x67ffd0, collide = true, broken = false } = {}) {
  const m = world.materials;
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  world.root.add(group);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.18, radius * 1.24, 0.35, 18), m.blackMetal);
  base.position.y = 0.175;
  base.castShadow = true;
  group.add(base);

  const shell = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, height, 20, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0x44636a,
      roughness: 0.14,
      metalness: 0.55,
      transparent: true,
      opacity: broken ? 0.18 : 0.34,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  shell.position.y = height / 2 + 0.3;
  group.add(shell);

  const fluid = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.86, radius * 0.86, height * 0.62, 18),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: broken ? 0.08 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    }),
  );
  fluid.position.y = height * 0.45;
  group.add(fluid);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.02, 0.045, 6, 24), m.steel);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 0.34;
  group.add(collar);

  const top = new THREE.Mesh(new THREE.CylinderGeometry(radius * 1.1, radius * 0.92, 0.22, 18), m.blackMetal);
  top.position.y = height + 0.3;
  group.add(top);

  if (collide) {
    world.colliders.push({
      box: new THREE.Box3(
        new THREE.Vector3(x - radius * 1.15, 0, z - radius * 1.15),
        new THREE.Vector3(x + radius * 1.15, height + 0.4, z + radius * 1.15),
      ),
      mesh: shell,
      name: 'specimen tank',
    });
    world.collisionMeshes.push(shell);
  }
  if (broken) {
    const shard = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.2), m.ice);
    shard.position.set(x + 0.7, 0.06, z + 0.5);
    shard.rotation.y = 0.6;
    world.root.add(shard);
  }
  world.addGlowSprite(x, height * 0.55, z, radius * 2.8, color, broken ? 0.035 : 0.08);
  return group;
}

function addRadarDish(world, x, z) {
  const m = world.materials;
  const base = world.addCylinder({
    x,
    z,
    radiusTop: 1.8,
    radiusBottom: 2.2,
    height: 0.7,
    radialSegments: 18,
    material: m.blackMetal,
    collide: true,
    name: 'radar base',
  });
  base.castShadow = true;

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.3, 4.1, 10), m.steel);
  mast.position.set(x, 2.4, z);
  mast.rotation.z = -0.22;
  mast.castShadow = true;
  world.root.add(mast);

  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(2.7, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.52),
    new THREE.MeshStandardMaterial({ color: 0x6f777a, roughness: 0.55, metalness: 0.62, side: THREE.DoubleSide }),
  );
  dish.position.set(x + 0.85, 4.7, z - 0.4);
  dish.rotation.set(0.82, -0.35, 0);
  dish.castShadow = true;
  world.root.add(dish);

  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 6), m.steel);
  feed.position.set(x + 1.35, 4.95, z - 1.2);
  feed.rotation.x = -0.7;
  world.root.add(feed);
}

function addCraneLeg(world, x, z, height) {
  const m = world.materials;
  const leg = new THREE.Mesh(new THREE.BoxGeometry(0.55, height, 0.55), m.steel);
  leg.position.set(x, height / 2, z);
  leg.castShadow = true;
  world.root.add(leg);
  world.colliders.push({
    box: new THREE.Box3(new THREE.Vector3(x - 0.33, 0, z - 0.33), new THREE.Vector3(x + 0.33, height, z + 0.33)),
    mesh: leg,
    name: 'crane leg',
  });
  world.collisionMeshes.push(leg);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 1.2), m.blackMetal);
  foot.position.set(x, 0.15, z);
  world.root.add(foot);
}

/* ------------------------------------------------------------------------- */
/* 02 / ASHLINE FOUNDRY                                                      */
/* ------------------------------------------------------------------------- */

function buildFoundry(world) {
  const m = world.materials;
  const width = 64;
  const depth = 58;
  perimeter(world, {
    width,
    depth,
    height: 10,
    wallMaterial: m.wallDark,
    floorMaterial: m.floorDark,
    lights: true,
  });
  world.playerSpawn.set(0, 0, 24.6);
  world.playerYaw = 0;

  // South receiving bay and gatehouse.
  addWallRun(world, { x: -20.4, z: 16.2, w: 21.2, d: 0.6, h: 5.2, name: 'bay divider west' });
  addWallRun(world, { x: 20.4, z: 16.2, w: 21.2, d: 0.6, h: 5.2, name: 'bay divider east' });
  doorFrame(world, 0, 16.2, 11, 5.2, 0);
  world.addSign(m.signs.security, 0, 3.6, 15.85, 4.4, 1.35, Math.PI);
  world.addHazardStrip(0, 17.0, 10.6, 0.5, 0, 0.018);

  addWallRun(world, { x: -22.4, z: 23.8, w: 0.6, d: 8, h: 4.4, name: 'gatehouse west' });
  addWallRun(world, { x: -27.8, z: 20.1, w: 10.4, d: 0.6, h: 4.4, name: 'gatehouse north' });
  addWallRun(world, { x: -27.8, z: 27.2, w: 10.4, d: 0.5, h: 4.4, name: 'gatehouse south' });
  world.addRoof(-25, 24, 10, 7.6, 4.4, m.blackMetal, 0.2);
  world.addSign(m.signs.service, -22.05, 2.8, 22.5, 2.4, 0.9, Math.PI / 2);

  // Parallel casting aisles. The gaps are 3.2 m and deliberately offset so
  // an enemy cannot simply mirror the player's lane.
  for (const side of [-1, 1]) {
    const x = side * 18.5;
    addWallRun(world, { x, z: 10.8, w: 0.6, d: 7.4, h: 6.2, name: 'aisle wall south' });
    addWallRun(world, { x, z: 0.2, w: 0.6, d: 7.3, h: 6.2, name: 'aisle wall middle' });
    addWallRun(world, { x, z: -9.6, w: 0.6, d: 8.4, h: 6.2, name: 'aisle wall north' });
    world.addHazardStrip(x - side * 0.55, 4.1, 0.45, 2.7, Math.PI / 2, 0.018);
    world.addHazardStrip(x - side * 0.55, -4.6, 0.45, 2.7, Math.PI / 2, 0.018);
    // Service aisle lighting rails.
    world.addEmissiveStrip(x - side * 0.38, 0.07, 13.8, 0.04, 0.012, 4.4, side > 0 ? m.amber : m.cyanSoft);
  }

  // Long machines and conveyor housings form the side-lane cover.
  for (const side of [-1, 1]) {
    const x = side * 24.7;
    world.addBox({ x, z: 8.6, w: 7.4, d: 2.1, h: 1.25, material: m.blackMetal, name: 'conveyor housing' });
    world.addBox({ x: x - side * 0.6, z: 1.6, w: 8.6, d: 1.8, h: 1.05, material: m.darkPanel, name: 'roller bed' });
    for (let i = 0; i < 6; i += 1) {
      world.addCylinder({
        x: x - 2.8 + i * 1.12,
        y: 1.05,
        z: 1.6,
        radiusTop: 0.22,
        height: 0.52,
        radialSegments: 10,
        material: m.steel,
        collide: false,
        name: 'roller',
      });
    }
    world.addCrate(x - side * 2.2, -13.5, 1.5, 1.5, 1.4, side * 0.14);
    world.addCrate(x + side * 1.2, 19.7, 1.3, 1.1, 1.3, -side * 0.18);
    world.addBarrier(x - side * 2.8, 4.2, 3.2, Math.PI / 2);
  }

  // Central crucible: the room's main landmark and strongest piece of cover.
  world.addCylinder({
    x: 0,
    z: -4.6,
    radiusTop: 3.6,
    radiusBottom: 3.9,
    height: 0.55,
    radialSegments: 32,
    material: m.darkPanel,
    collide: false,
    name: 'crucible plinth',
  });
  const crucible = world.addCylinder({
    x: 0,
    z: -4.6,
    radiusTop: 2.1,
    radiusBottom: 2.45,
    height: 2.35,
    radialSegments: 28,
    material: m.blackMetal,
    collide: true,
    name: 'crucible',
  });
  crucible.castShadow = true;
  const molten = new THREE.Mesh(
    new THREE.CircleGeometry(1.72, 30),
    new THREE.MeshBasicMaterial({ color: 0xff8b3b, transparent: true, opacity: 0.82, toneMapped: false }),
  );
  molten.rotation.x = -Math.PI / 2;
  molten.position.set(0, 2.37, -4.6);
  world.root.add(molten);
  world.addGlowSprite(0, 2.4, -4.6, 7.5, 0xff7d35, 0.3);
  world.addCylinder({
    x: 0,
    z: -4.6,
    radiusTop: 0.35,
    radiusBottom: 0.55,
    height: 1.8,
    radialSegments: 10,
    material: m.steel,
    collide: true,
    name: 'crucible stack',
  });
  world.addHazardStrip(0, -4.6, 9.2, 9.2, 0, 0.019);

  // Furnace bank on the north wall.
  for (let i = -1; i <= 1; i += 1) {
    const x = i * 11.2;
    world.addBox({ x, z: -26.2, w: 7.2, d: 4.2, h: 5.5, material: m.wallDark, rounded: 0.14, name: 'furnace' });
    world.addBox({ x, z: -23.8, w: 4.1, d: 0.4, h: 2.7, material: m.blackMetal, name: 'furnace door' });
    world.addEmissiveStrip(x, 1.15, -23.58, 3.25, 0.06, 0.05, m.amber);
    world.addEmissiveStrip(x, 2.35, -23.58, 3.25, 0.06, 0.05, m.red);
    world.addGlowSprite(x, 1.55, -23.5, 4.2, 0xff8b3b, 0.18);
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.82, 6.8, 12), m.steel);
    stack.position.set(x, 9.2, -27.1);
    world.root.add(stack);
  }
  world.addHazardStrip(0, -21.8, 25, 0.6, 0, 0.018);

  // Overhead crane: one slow-moving landmark, deliberately outside the player
  // collision layer but visible from the whole hall.
  const crane = new THREE.Group();
  crane.position.set(0, 0, 2.4);
  world.root.add(crane);
  world.dynamicGroups.push(crane);
  for (const x of [-17.9, 17.9]) {
    addCraneLeg(world, x, 2.4, 8.4);
  }
  const railA = new THREE.Mesh(new THREE.BoxGeometry(36.6, 0.35, 0.5), m.steel);
  railA.position.set(0, 8.35, 2.4);
  crane.add(railA);
  const trolley = new THREE.Group();
  trolley.position.set(-2.5, 8.1, 0);
  crane.add(trolley);
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.45, 1.15), m.blackMetal);
  bridge.position.y = 0.2;
  trolley.add(bridge);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.8, 5), m.rubber);
  cable.position.set(0, -1.7, 0);
  trolley.add(cable);
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.06, 6, 12, Math.PI * 1.4), m.steel);
  hook.position.set(0, -3.75, 0);
  hook.rotation.z = 0.4;
  trolley.add(hook);
  crane.userData.trolley = trolley;
  world.animators.push((dt) => {
    crane.position.x = Math.sin(world.time * 0.14) * 2.2;
    trolley.position.x = -2.5 + Math.sin(world.time * 0.23 + 1.1) * 1.1;
    hook.rotation.z = 0.4 + Math.sin(world.time * 0.9) * 0.16;
  });

  // Hanging work lamps give the casting floor a readable middle distance and
  // reinforce the overhead structure seen from the insertion bay.
  world._addHangingLamp(0, 7.6, 13.2);
  world._addHangingLamp(-9.4, 7.4, -1.8);
  world._addHangingLamp(9.4, 7.4, -13.2);
  world._addHangingLamp(0, 7.4, -21.2);

  // Floor-level cover in the central lane.
  world.addBarrier(-7.4, 7.2, 4.4, 0.12);
  world.addBarrier(7.8, 3.6, 4.2, -0.18);
  world.addBarrier(-7.2, -12.2, 4.4, -0.08);
  world.addBarrier(7.4, -15.4, 4.2, 0.15);
  world.addCrate(-11.4, -1.8, 1.6, 1.5, 1.5, 0.14);
  world.addCrate(11.8, -5.4, 1.5, 1.2, 1.4, -0.18);
  world.addCrate(-13.2, 12.2, 1.5, 1.25, 1.35, -0.1);
  world.addCrate(13.4, 12.9, 1.4, 1.3, 1.3, 0.2);

  // South bay props.
  world.addContainer(-13.8, 21.2, 7.3, 2.5, 2.8, m.darkPanel, 0.05, 0, m.containerRust);
  world.addContainer(13.2, 22.1, 6.4, 2.4, 2.6, m.darkPanel, -0.04, 0, m.containerBlue);
  world.addCrate(-5.6, 20.4, 1.35, 1.1, 1.3, 0.12);
  world.addBarrier(5.2, 19.3, 3.6, -0.2);
  world.addHazardStrip(0, 24.3, 3.2, 6.6, 0, 0.018);

  // Playable crane-control gallery. This replaces the old decorative
  // mezzanine: the stair run from the casting floor lands on the south edge of
  // the deck, and the room above the furnace is the primary objective.
  const controlDeck = world.addDeck({
    x: -25,
    z: -16.9,
    w: 8.0,
    d: 17.0,
    y: 4.2,
    name: 'Crane Control Gallery',
    railGaps: { south: [{ offset: 1.7, width: 3.0 }] },
  });
  world.addStairs({
    x: -23.3,
    z: -2.0,
    width: 2.7,
    height: 4.2,
    run: 6.8,
    direction: 'north',
    name: 'crane control stair',
  });

  world.addBox({
    x: -27.1,
    z: -17.2,
    w: 3.2,
    d: 1.0,
    h: 0.95,
    y: 4.2,
    material: m.blackMetal,
    name: 'crane control console bank',
  });
  for (let i = 0; i < 3; i += 1) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 0.42), m.screens[i % 3]);
    screen.position.set(-28.0 + i * 1.0, 5.34, -16.66);
    screen.rotation.x = -0.1;
    world.root.add(screen);
  }
  const foundryDeckLight = new THREE.SpotLight(0xffb15c, 20, 14, 0.95, 0.8, 1.7);
  foundryDeckLight.position.set(-25.0, 7.2, -19.0);
  foundryDeckLight.target.position.set(-25.0, 4.2, -19.0);
  world.addSceneLight(foundryDeckLight, foundryDeckLight.target);
  world.addGlowSprite(-24.8, 5.55, -22.0, 2.4, 0xffb15c, 0.13);
  // Evidence of the production run: eighteen empty chassis wait in the dark
  // below the control room.
  world.addChassisRack(-6.4, -22.6, 0, 3);
  world.addChassisRack(-0.6, -22.7, 0, 3);

  world.addMedkit(-27.2, 12.7);
  world.addMedkit(27.4, -14.6);
  world.addMedkit(0, -19.2);

  world.addLightRig({
    ambientColor: 0x6a503a,
    ambientIntensity: 0.72,
    hemiSky: 0xb19570,
    hemiGround: 0x0a0705,
    hemiIntensity: 0.52,
    directionalColor: 0xffc28e,
    directionalIntensity: 0.64,
    directionalPosition: [-18, 23, 12],
    shadowSpan: 38,
    spotlights: [
      { position: [0, 9.2, 21], target: [0, 0, 14], color: 0xa8e7ef, intensity: 640, angle: 0.82 },
      { position: [0, 7.8, 9], target: [0, 0, 1], color: 0xc5e8e7, intensity: 620, angle: 0.9 },
      { position: [-12, 7.4, -17], target: [-10, 0, -25], color: 0xff9a52, intensity: 430, angle: 0.6 },
      { position: [12, 7.4, -17], target: [10, 0, -25], color: 0xff9a52, intensity: 430, angle: 0.6 },
      { position: [0, 8.8, 1], target: [0, 0, -4], color: 0x8bc7d4, intensity: 380, angle: 0.85 },
    ],
    points: [
      { position: [0, 2.6, -4.6], color: 0xff7d35, intensity: 34, distance: 17, pulse: 2.1 },
      { position: [0, 3.2, -25.3], color: 0xff6b2e, intensity: 38, distance: 20, pulse: 1.4 },
      { position: [-27, 3.2, 2], color: 0x7dd8e8, intensity: 24, distance: 16 },
      { position: [0, 3.2, 11], color: 0x9ad8df, intensity: 22, distance: 16 },
    ],
    glows: [
      [-27, 4.4, 20, 2.6, 0xffa35c, 0.2],
      [27, 4.2, 18, 2.2, 0x9ad9e6, 0.16],
    ],
  });
  world.setAtmosphere({
    background: 0x080604,
    fogColor: 0x160e08,
    fogDensity: 0.016,
    particles: {
      count: 420,
      color: 0xff9a52,
      size: 0.026,
      opacity: 0.32,
      bounds: { minX: -29, maxX: 29, minY: 0.3, maxY: 8.8, minZ: -27, maxZ: 26 },
      fall: -0.18,
      drift: 0.035,
    },
  });

  world.setSpawns([
    spawn('F-01', [-24.8, 12.2], [[-24.8, 5], [-20.3, -8], [-20.3, -14]]),
    spawn('F-02', [24.8, 10.6], [[24.8, 4.6], [24.8, -9], [24.8, -15]]),
    spawn('F-03', [-24.2, -16.4], [[-24.2, -10], [-20.3, -6.6], [-20.3, 10]]),
    spawn('F-04', [24.4, -17.2], [[24.4, -10], [24.4, -6.6], [24.4, 11]]),
    spawn('F-05', [0, -18.2], [[-7, -18], [-9.8, -15.8], [8.8, -17.4], [8, -18]]),
    spawn('F-06', [-8.4, 1.2], [[-8.4, 8], [-4, 8.6], [-3.8, -2]]),
    spawn('F-07', [9.2, -1.8], [[11.4, 6.6], [4, 4.8], [4.4, -8]]),
    spawn('F-08', [0, 12.8], [[-5, 12.8], [-6, 18], [5, 18]]),
    spawn('F-09', [-13.4, -22.2], [[-13.4, -18], [-8, -18], [-8, -21.4]], { health: 140, elite: true, wave: 2 }),
    spawn('F-10', [13.6, -22.8], [[13.6, -18], [8, -18], [8, -21.4]], { wave: 2 }),
    spawn('F-11', [-25.8, -13.2], [[-22.6, -13.6], [-22.6, -22.0], [-23.4, -22.8]], {
      role: 'marksman',
      floorY: 4.2,
      navBounds: controlDeck.navBounds,
    }),
    spawn('F-12', [-23.0, -22.4], [[-22.6, -18.0], [-22.6, -13.4], [-26.0, -14.0]], {
      role: 'defender',
      floorY: 4.2,
      navBounds: controlDeck.navBounds,
    }),
  ]);

  world.setMissionLayout({
    timeLimit: 720,
    safeZone: { x: 0, z: 23.2, w: 18, d: 6.4, label: 'RECEIVING BAY' },
    objective: {
      x: -24.8,
      z: -22.0,
      y: 4.2,
      rotation: Math.PI / 2,
      hudTitle: 'SECURE CRANE CONTROL',
      promptLabel: 'CRANE LOG',
      action: 'SECURE',
      zoneLabel: 'CRANE CONTROL',
    },
    extraction: { x: 25.4, z: 22.6, w: 4.2, d: 5.0, label: 'EAST LOADING GATE' },
  });
}

/* ------------------------------------------------------------------------- */
/* 03 / K-7 TERMINAL                                                         */
/* ------------------------------------------------------------------------- */

function buildPort(world) {
  const m = world.materials;
  const width = 76;
  const depth = 60;
  perimeter(world, {
    width,
    depth,
    height: 7,
    wallMaterial: m.wallDark,
    floorMaterial: m.floorDark,
    lights: false,
  });
  world.playerSpawn.set(0, 0, 25.6);
  world.playerYaw = 0;

  // Lower the north quay wall to a crash barrier while keeping the AABB solid.
  // The wall itself is already in place; this rail reads as a waterfront edge.
  const quayRail = new THREE.Mesh(new THREE.BoxGeometry(75, 0.95, 0.35), m.steel);
  quayRail.position.set(0, 1.25, -29.4);
  world.root.add(quayRail);
  for (let x = -36; x <= 36; x += 4) {
    world.addEmissiveStrip(x, 1.7, -29.15, 0.06, 0.06, 0.06, m.cyanSoft);
  }

  // Water beyond the quay, visible over the rail.
  const water = new THREE.Mesh(new THREE.PlaneGeometry(180, 70), m.water);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -0.7, -64);
  world.root.add(water);
  const waterGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(180, 18),
    new THREE.MeshBasicMaterial({ color: 0x2d5f78, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  waterGlow.rotation.x = -Math.PI / 2;
  waterGlow.position.set(0, -0.68, -48);
  world.root.add(waterGlow);

  // South gatehouse.
  addWallRun(world, { x: -25.8, z: 23.8, w: 0.6, d: 7.6, h: 4.2, name: 'gatehouse east' });
  addWallRun(world, { x: -30.8, z: 20.2, w: 10.6, d: 0.6, h: 4.2, name: 'gatehouse north' });
  world.addRoof(-28, 24, 10, 7.4, 4.2, m.blackMetal, 0.2);
  world.addSign(m.signs.security, -25.45, 2.7, 23.2, 2.6, 0.9, -Math.PI / 2);

  // Container rows are laid out as overlapping firing lanes. The gaps between
  // stacks are the actual map: wide enough to fight through, narrow enough
  // that the next row always breaks the sightline.
  const stacks = [
    { x: -24, z: 16, w: 9, h: 2.7, mat: m.containerRust, rot: 0.02, stack: false },
    { x: -10.5, z: 16.6, w: 8.5, h: 2.7, mat: m.containerBlue, rot: -0.03, stack: true },
    { x: 8.2, z: 15.4, w: 8.4, h: 2.7, mat: m.containerOlive, rot: 0.04, stack: false },
    { x: 22.8, z: 16.4, w: 8.8, h: 2.7, mat: m.containerRust, rot: -0.02, stack: false },
    { x: -27.2, z: 4.2, w: 8.2, h: 2.75, mat: m.containerOlive, rot: 0.03, stack: false },
    { x: -12.1, z: 3.6, w: 9.2, h: 2.75, mat: m.containerRust, rot: -0.04, stack: true },
    { x: 4.2, z: 4.2, w: 9.8, h: 2.8, mat: m.containerBlue, rot: 0.01, stack: false },
    { x: 19.6, z: 3.4, w: 8.8, h: 2.7, mat: m.containerOlive, rot: -0.02, stack: false },
    { x: -24.6, z: -8.8, w: 8.8, h: 2.7, mat: m.containerBlue, rot: 0.03, stack: false },
    { x: -8.2, z: -8.2, w: 8.6, h: 2.8, mat: m.containerRust, rot: -0.02, stack: false },
    { x: 6.8, z: -8.9, w: 9.1, h: 2.7, mat: m.containerOlive, rot: 0.02, stack: true },
    { x: 22.2, z: -8.2, w: 8.2, h: 2.7, mat: m.containerBlue, rot: -0.03, stack: false },
  ];
  for (const stack of stacks) {
    world.addContainer(stack.x, stack.z, stack.w, 2.6, stack.h, stack.mat, stack.rot, 0, stack.mat);
    if (stack.stack) {
      world.addContainer(
        stack.x + 0.12,
        stack.z - 0.08,
        stack.w * 0.96,
        2.5,
        stack.h,
        stack.mat,
        stack.rot + 0.025,
        stack.h,
        stack.mat,
      );
      world.addEmissiveStrip(stack.x, stack.h + 0.06, stack.z + 1.3, 0.7, 0.025, 0.04, m.amber);
    }
  }

  // Container labels and door-side details for scale.
  for (const x of [-24, -10.5, 8.2, 22.8, -12.1, 4.2, -8.2, 6.8]) {
    world.addSign(m.signs.service, x, 1.4, 17.8, 2.2, 0.7, 0);
  }

  // Warehouse on the north-east corner. Two open loading bays face the yard.
  addWallRun(world, { x: 5.1, z: -21.4, w: 0.6, d: 13.2, h: 6.2, name: 'warehouse west' });
  addWallRun(world, { x: 6.85, z: -15.0, w: 3.5, d: 0.65, h: 6.2, name: 'warehouse south west' });
  addWallRun(world, { x: 16.6, z: -15.0, w: 6.0, d: 0.65, h: 6.2, name: 'warehouse south middle' });
  addWallRun(world, { x: 27.6, z: -15.0, w: 6.0, d: 0.65, h: 6.2, name: 'warehouse south east' });
  addWallRun(world, { x: 18, z: -27.6, w: 26, d: 0.65, h: 6.2, name: 'warehouse north' });
  addWallRun(world, { x: 31, z: -21.3, w: 0.65, d: 13.2, h: 6.2, name: 'warehouse east' });
  // Roll-up shutters sit in the header, leaving both loading bays walkable.
  world.addBox({ x: 11.1, z: -15.0, w: 4.8, d: 0.7, h: 2.0, y: 4.1, material: m.blackMetal, collide: false, name: 'loading shutter west' });
  world.addBox({ x: 22.3, z: -15.0, w: 4.8, d: 0.7, h: 2.0, y: 4.1, material: m.blackMetal, collide: false, name: 'loading shutter east' });
  for (const x of [11.1, 22.3]) {
    world.addEmissiveStrip(x, 4.02, -14.6, 3.2, 0.04, 0.04, m.cyanSoft);
  }
  world.addRoof(18, -21.4, 26.4, 13.4, 6.3, m.darkPanel, 0.3);
  world.addSign(m.signs.command, 18, 4.8, -14.62, 5, 1.5, Math.PI);
  world.addCrate(7.8, -17.4, 1.5, 1.4, 1.5, 0.1);
  world.addCrate(9.2, -19.2, 1.2, 1.1, 1.2, -0.2);
  world.addCrate(27.8, -18.6, 1.8, 1.7, 1.7, 0.15);
  world.addCrate(26.1, -20.2, 1.2, 1.1, 1.2, -0.1);
  world.addBarrier(16.8, -20.4, 4.6, Math.PI / 2);
  world.addBarrier(20.2, -23.7, 4.4, 0.1);
  world.addCylinder({ x: 14.8, z: -25.8, radiusTop: 0.8, radiusBottom: 0.8, height: 1.8, material: m.steel, collide: true, name: 'drum' });

  // Warehouse mezzanine: a real manifest office above the loading floor. The
  // stair is inside the loading bay and lands at the west rail opening.
  const manifestDeck = world.addDeck({
    x: 24.4,
    z: -21.2,
    w: 11.4,
    d: 11.2,
    y: 4.0,
    name: 'Manifest Office',
    railGaps: { west: [{ offset: -2.0, width: 3.1 }] },
  });
  world.addStairs({
    x: 11.8,
    z: -23.2,
    width: 2.7,
    height: 4.0,
    run: 7.0,
    direction: 'east',
    name: 'manifest office stair',
  });
  world.addBox({
    x: 25.2,
    z: -17.4,
    w: 6.0,
    d: 1.0,
    h: 0.92,
    y: 4.0,
    material: m.blackMetal,
    name: 'manifest desk',
  });
  world.addLabel(['MANIFEST OFFICE', 'K-7 CUSTOMS / SEALED CARGO', 'CLEARANCE: CROWN'], {
    x: 30.55,
    y: 5.55,
    z: -21.4,
    w: 3.4,
    h: 0.92,
    rotation: -Math.PI / 2,
    accent: '#8fd4ff',
    align: 'center',
  });
  const officeLight = new THREE.SpotLight(0x8fd4ff, 15, 12, 0.9, 0.8, 1.7);
  officeLight.position.set(24.0, 6.1, -21.0);
  officeLight.target.position.set(24.0, 4.0, -21.0);
  world.addSceneLight(officeLight, officeLight.target);
  world.addGlowSprite(25.6, 5.4, -25.0, 2.2, 0x8fd4ff, 0.12);
  // The nineteenth cryo pod is the story's physical anomaly: three sealed units
  // and one empty cradle on the quay, all consigned to CROWN.
  world.addCryoPod(-4.8, -23.6, { rotation: 0, label: 'CROWN TRANSFER POD', index: 16 });
  world.addCryoPod(-1.8, -23.6, { rotation: 0, label: 'CROWN TRANSFER POD', index: 17 });
  world.addCryoPod(1.2, -23.6, { rotation: 0, label: 'CROWN TRANSFER POD', index: 18 });
  world.addCryoPod(4.2, -23.6, { rotation: 0.1, open: true, label: 'POD 19 // EMPTY', index: 19 });
  world.addLabel(['POD NINETEEN', 'CONSIGNEE: CROWN', 'SUBJECT: IN TRANSIT'], {
    x: 4.2,
    y: 3.5,
    z: -24.8,
    w: 2.8,
    h: 0.82,
    rotation: 0,
    accent: '#ffb15c',
    align: 'center',
  });

  // Gantry crane on the west quay: the map's night-time silhouette.
  addCraneLeg(world, -29.6, -17.4, 10.2);
  addCraneLeg(world, -12.8, -17.4, 10.2);
  addCraneLeg(world, -29.6, -26.6, 10.2);
  addCraneLeg(world, -12.8, -26.6, 10.2);
  const gantry = new THREE.Group();
  gantry.position.set(-21.2, 10.1, -22);
  world.root.add(gantry);
  world.dynamicGroups.push(gantry);
  const beam = new THREE.Mesh(new THREE.BoxGeometry(20, 0.6, 0.82), m.steel);
  beam.castShadow = true;
  gantry.add(beam);
  const cab = new THREE.Mesh(new RoundedBoxGeometry(2.3, 1.8, 2.1, 2, 0.08), m.blackMetal);
  cab.position.set(-3.2, -1.2, 0);
  gantry.add(cab);
  const trolley = new THREE.Mesh(new THREE.BoxGeometry(3, 0.45, 1.2), m.darkPanel);
  trolley.position.set(4.3, -0.5, 0);
  gantry.add(trolley);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), m.red);
  beacon.position.set(-3.2, 0.25, 0);
  gantry.add(beacon);
  world.addGlowSprite(-21.2, 10.4, -22, 1.8, 0xff4d58, 0.32);
  world.animators.push((dt) => {
    trolley.position.x = 4.3 + Math.sin(world.time * 0.17) * 4.2;
    beacon.visible = Math.sin(world.time * 3.8) > 0.2;
  });

  // Floodlight masts and quay furniture.
  for (const [x, z, h] of [[-33.6, 24.8, 10.5], [33.8, 22.6, 9.8], [33.2, -25.6, 11], [-33.4, -25.2, 10]]) {
    addLightMast(world, x, z, h);
  }
  for (const [x, z] of [[-31.8, 10], [31.4, 10], [-33.6, -11], [33.2, -10]]) {
    world.addCylinder({ x, z, radiusTop: 0.42, radiusBottom: 0.5, height: 1.1, material: m.blackMetal, collide: true, name: 'bollard' });
  }

  // Yard cover between the container rows.
  world.addBarrier(-4.4, 10.2, 4.2, 0.08);
  world.addBarrier(14.3, 10.4, 3.8, -0.12);
  world.addBarrier(-19.8, -2.2, 3.4, Math.PI / 2);
  world.addBarrier(12.4, -1.8, 3.6, Math.PI / 2);
  world.addCrate(-3.2, -2.8, 1.4, 1.15, 1.3, 0.2);
  world.addCrate(29.2, 8.2, 1.2, 1.1, 1.2, -0.15);
  world.addCrate(-31.8, -2.2, 1.4, 1.3, 1.4, 0.1);
  world.addContainer(-32.8, 25.5, 5.8, 2.4, 2.6, m.darkPanel, 0, 0, m.containerOlive);

  world.addMedkit(-33.2, 13.4);
  world.addMedkit(29.6, -12.6);
  world.addMedkit(15.8, -25.8);

  world.addLightRig({
    ambientColor: 0x3f5b6b,
    ambientIntensity: 0.48,
    hemiSky: 0x6a9eb6,
    hemiGround: 0x020406,
    hemiIntensity: 0.46,
    directionalColor: 0xa7d7f0,
    directionalIntensity: 0.62,
    directionalPosition: [-22, 24, 14],
    shadowSpan: 44,
    spotlights: [
      { position: [-33.6, 10.2, 24.8], target: [-20, 0, 12], color: 0xbbe5ff, intensity: 680, angle: 0.72 },
      { position: [33.8, 9.5, 22.6], target: [18, 0, 8], color: 0x9fcfe8, intensity: 560, angle: 0.7 },
      { position: [33.2, 10.7, -25.6], target: [18, 0, -22], color: 0xd9f3ff, intensity: 320, angle: 0.5 },
      { position: [-33.4, 9.8, -25.2], target: [-18, 0, -19], color: 0x79b7d2, intensity: 480, angle: 0.75 },
    ],
    points: [
      { position: [-21.2, 9.2, -22], color: 0xff4d58, intensity: 22, distance: 16, pulse: 3.8 },
      { position: [2.4, 5.4, -21], color: 0x7cbcda, intensity: 26, distance: 20 },
      { position: [0, 4.2, 4], color: 0x5b8fa8, intensity: 20, distance: 22 },
    ],
    glows: [
      [-20, 1.5, 13, 3.4, 0x8fcbe2, 0.16],
      [20, 1.5, 12, 3.2, 0x8fcbe2, 0.13],
    ],
  });
  world.setAtmosphere({
    background: 0x03070b,
    fogColor: 0x07151d,
    fogDensity: 0.02,
    particles: {
      count: 760,
      color: 0xaad4e6,
      size: 0.024,
      opacity: 0.34,
      bounds: { minX: -36, maxX: 36, minY: 0.3, maxY: 13, minZ: -28, maxZ: 28 },
      fall: 4.2,
      drift: 0.02,
      flutter: 0.02,
    },
  });

  world.setSpawns([
    spawn('P-01', [-21.4, 20.4], [[-21.4, 12], [-30.4, 8], [-30.4, 16]]),
    spawn('P-02', [27.6, 20.8], [[27.6, 10], [17.4, 8.2], [16, 19]]),
    spawn('P-03', [-19.2, 8.8], [[-22, 8], [-30.8, 8], [-30.8, 16]]),
    spawn('P-04', [14.4, 9.4], [[14.4, 1], [24, 1], [24, 9]]),
    spawn('P-05', [0, -2.2], [[0, -5], [3, -5], [3, 1]]),
    spawn('P-06', [27.8, -2.4], [[27.8, -12], [18, -12], [18, -4]]),
    spawn('P-07', [-27.4, -15.2], [[-27.4, -24], [-20, -24], [-20, -18]]),
    spawn('P-08', [-16.2, -21.2], [[-8, -21], [-8, -26], [-18, -26]]),
    spawn('P-09', [12.2, -18.2], [[12.2, -17.4], [20.8, -17.6], [20.8, -13.4]]),
    spawn('P-10', [29.2, -21.6], [[29.2, -25], [24, -25], [24, -18]], { wave: 2 }),
    spawn('P-11', [17.8, -26.2], [[17.8, -21], [24, -21], [24, -25]], { health: 130, elite: true, wave: 2 }),
    spawn('P-12', [21.6, -25.4], [[24.0, -25.4], [27.4, -25.8], [27.4, -19.0]], {
      role: 'marksman',
      floorY: 4.0,
      navBounds: manifestDeck.navBounds,
    }),
    spawn('P-13', [20.8, -21.4], [[22.4, -24.4], [27.8, -25.0], [29.0, -21.8]], {
      role: 'defender',
      floorY: 4.0,
      navBounds: manifestDeck.navBounds,
    }),
  ]);

  world.setMissionLayout({
    timeLimit: 780,
    safeZone: { x: 0, z: 25.4, w: 18, d: 5.8, label: 'TERMINAL GATE' },
    objective: {
      x: 25.6,
      z: -25.0,
      y: 4.0,
      rotation: -Math.PI / 2,
      hudTitle: 'RECOVER CARGO MANIFEST',
      promptLabel: 'K-7 MANIFEST',
      action: 'RECOVER',
      zoneLabel: 'MANIFEST OFFICE',
    },
    extraction: { x: -32.0, z: -21.5, w: 5.0, d: 6.0, label: 'WEST QUAY SKIFF' },
  });
}

/* ------------------------------------------------------------------------- */
/* 04 / VOSTOK-3                                                             */
/* ------------------------------------------------------------------------- */

function buildPolar(world) {
  const m = world.materials;
  const width = 52;
  const depth = 56;
  perimeter(world, {
    width,
    depth,
    height: 5.8,
    wallMaterial: m.labPanel,
    floorMaterial: m.labFloor,
    lights: true,
  });
  world.playerSpawn.set(0, 0, 23.8);
  world.playerYaw = 0;

  // Decompression corridor. Narrow enough to feel sealed, with a clear
  // threshold into the atrium.
  addWallRun(world, { x: -5.6, z: 21.4, w: 0.6, d: 10.4, h: 4.3, material: m.labPanel, name: 'airlock west' });
  addWallRun(world, { x: 5.6, z: 21.4, w: 0.6, d: 10.4, h: 4.3, material: m.labPanel, name: 'airlock east' });
  addWallRun(world, { x: -14.8, z: 16.6, w: 18.4, d: 0.6, h: 4.8, material: m.labPanel, name: 'atrium south west' });
  addWallRun(world, { x: 14.8, z: 16.6, w: 18.4, d: 0.6, h: 4.8, material: m.labPanel, name: 'atrium south east' });
  doorFrame(world, 0, 16.6, 8, 4.8, 0);
  world.addSign(m.signs.security, 0, 3.2, 16.25, 3.8, 1.15, Math.PI);

  // Central atrium walls, with four room thresholds.
  for (const side of [-1, 1]) {
    // Leave a 7.8 m lab threshold rather than a solid wall with a cosmetic
    // door drawn on top of it.
    addWallRun(world, { x: side * 15.6, z: 13.8, w: 0.6, d: 5.6, h: 4.8, material: m.labPanel, name: 'atrium side north' });
    addWallRun(world, { x: side * 15.6, z: 0.9, w: 0.6, d: 4.6, h: 4.8, material: m.labPanel, name: 'atrium side south' });
    doorFrame(world, side * 15.6, 7.1, 5.6, 4.8, Math.PI / 2);
  }
  addWallRun(world, { x: -9.2, z: -8.1, w: 12.6, d: 0.6, h: 4.8, material: m.labPanel, name: 'atrium north west' });
  addWallRun(world, { x: 4.7, z: -8.1, w: 3.6, d: 0.6, h: 4.8, material: m.labPanel, name: 'atrium north east west' });
  addWallRun(world, { x: 13.2, z: -8.1, w: 4.6, d: 0.6, h: 4.8, material: m.labPanel, name: 'atrium north east east' });
  doorFrame(world, 0, -8.1, 5.8, 4.8, 0);
  doorFrame(world, 8.8, -8.1, 4.8, 4.8, 0);

  // West and east laboratory blocks.
  for (const side of [-1, 1]) {
    // The perimeter is the lab's outer wall; a second wall at x=20.6 would
    // cut each room in half and block every spawn on the workbenches.
    addWallRun(world, { x: side * 20.6, z: 1.9, w: 10.4, d: 0.6, h: 4.5, material: m.labPanel, name: 'lab north wall' });
    // Lab benches and glassware.
    world.addBox({ x: side * 20.8, z: 6.2, w: 6.4, d: 0.9, h: 0.92, material: m.darkPanel, rounded: 0.03, name: 'lab bench' });
    world.addEmissiveStrip(side * 20.8, 0.96, 6.2, 5.2, 0.03, 0.08, m.cyanSoft);
    for (let i = 0; i < 3; i += 1) {
      world.addCylinder({
        x: side * (18.7 + i * 1.8),
        y: 0.96,
        z: 6.2,
        radiusTop: 0.14,
        radiusBottom: 0.18,
        height: 0.34,
        radialSegments: 10,
        material: m.ice,
        collide: false,
        name: 'sample jar',
      });
    }
    world.addBox({ x: side * 23.2, z: 12.4, w: 3.2, d: 1.2, h: 2.2, material: m.blackMetal, name: 'lab cabinet' });
    world.addCrate(side * 18.4, 14.2, 1.1, 1.15, 1.1, side * 0.1);
    addSpecimenTank(world, side * 23.8, 4.0, { color: 0x78e8ff, height: 2.4, broken: side < 0 });
  }

  // Cryo core in the middle of the atrium.
  const coreBase = world.addCylinder({
    x: 0,
    z: 3.2,
    radiusTop: 3.9,
    radiusBottom: 4.25,
    height: 0.55,
    radialSegments: 36,
    material: m.blackMetal,
    collide: false,
    name: 'cryo base',
  });
  coreBase.castShadow = true;
  const core = world.addCylinder({
    x: 0,
    z: 3.2,
    radiusTop: 2.4,
    radiusBottom: 2.7,
    height: 3.9,
    radialSegments: 28,
    material: m.ice,
    collide: true,
    name: 'cryo core',
  });
  core.castShadow = true;
  const coreLight = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 1.4, 3.6, 20, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xa9f4ff,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    }),
  );
  coreLight.position.set(0, 2.3, 3.2);
  world.root.add(coreLight);
  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.75 + i * 0.1, 0.04, 6, 32), i === 2 ? m.red : m.white);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.65 + i * 0.82, 3.2);
    world.root.add(ring);
    world.animators.push((dt, elapsed) => {
      ring.rotation.z += dt * (i % 2 === 0 ? 0.2 : -0.16);
      ring.position.y = 0.65 + i * 0.82 + Math.sin(elapsed * 0.9 + i) * 0.025;
    });
    if (!world._polarRings) world._polarRings = [];
    world._polarRings.push(ring);
  }
  world.addGlowSprite(0, 2.6, 3.2, 8, 0x8be9ff, 0.3);
  world.addHazardStrip(0, 3.2, 10.6, 10.6, 0, 0.02);

  // North observation room and side plant rooms.
  addWallRun(world, { x: -13.2, z: -14.4, w: 0.6, d: 12.6, h: 4.8, material: m.labPanel, name: 'observation west' });
  addWallRun(world, { x: 13.2, z: -14.4, w: 0.6, d: 12.6, h: 4.8, material: m.labPanel, name: 'observation east' });
  addWallRun(world, { x: -21.6, z: -20.6, w: 9.4, d: 0.6, h: 4.8, material: m.labPanel, name: 'north room divider west' });
  addWallRun(world, { x: 21.6, z: -20.6, w: 9.4, d: 0.6, h: 4.8, material: m.labPanel, name: 'north room divider east' });
  for (const side of [-1, 1]) {
    addWallRun(world, { x: side * 15.6, z: -17, w: 0.6, d: 5.6, h: 4.5, material: m.labPanel, name: 'north service wall' });
    doorFrame(world, side * 15.6, -21.2, 4.2, 4.5, Math.PI / 2);
    world.addBox({ x: side * 20.8, z: -15.2, w: 5.4, d: 0.8, h: 1.8, material: m.blackMetal, name: 'plant rack' });
    world.addCrate(side * 22.4, -24.2, 1.2, 1.2, 1.2, side * 0.2);
    world.addCylinder({
      x: side * 18.2,
      z: -25.1,
      radiusTop: 0.65,
      radiusBottom: 0.8,
      height: 2.6,
      material: m.steel,
      collide: true,
      name: 'coolant tank',
    });
  }
  // Observation consoles.
  world.addBox({ x: 0, z: -22.8, w: 12.4, d: 1.3, h: 0.95, material: m.blackMetal, rounded: 0.04, name: 'observation console' });
  for (let i = 0; i < 4; i += 1) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.8), m.screens[i % m.screens.length]);
    screen.position.set(-4.2 + i * 2.8, 1.48, -22.1);
    screen.rotation.x = -0.08;
    world.root.add(screen);
  }
  // Vale's observation gallery. This is a genuine second level over the north
  // lab: a stair rises from the atrium-side service aisle and the objective
  // console overlooks the cryo core through the gallery rail.
  const observationDeck = world.addDeck({
    x: 0,
    z: -18.0,
    w: 22.0,
    d: 6.4,
    y: 2.8,
    name: 'Observation Gallery',
    railGaps: { south: [{ offset: 8.8, width: 3.0 }] },
  });
  world.addStairs({
    x: 8.8,
    z: -9.6,
    width: 2.7,
    height: 2.8,
    run: 5.2,
    direction: 'north',
    name: 'observation gallery stair',
  });
  world.addBox({
    x: 4.8,
    z: -19.2,
    w: 7.4,
    d: 1.0,
    h: 0.9,
    y: 2.8,
    material: m.blackMetal,
    name: 'observation desk',
  });
  for (let i = 0; i < 3; i += 1) {
    const monitor = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.55), m.screens[i % 3]);
    monitor.position.set(2.3 + i * 1.8, 3.86, -18.6);
    monitor.rotation.x = -0.08;
    world.root.add(monitor);
  }
  world.addLabel(['VALE / OBSERVATION', 'CROWN SHUTDOWN SEQUENCE', 'LOG 04 SEALED'], {
    x: -6.8,
    y: 4.95,
    z: -20.9,
    w: 3.2,
    h: 0.86,
    rotation: 0,
    accent: '#b8f2ff',
    align: 'center',
  });
  const galleryLight = new THREE.SpotLight(0xb8f2ff, 11, 9, 0.92, 0.85, 1.8);
  galleryLight.position.set(0, 5.1, -18.0);
  galleryLight.target.position.set(0, 2.8, -18.0);
  world.addSceneLight(galleryLight, galleryLight.target);
  world.addGlowSprite(-1.2, 4.15, -19.0, 2.0, 0xb8f2ff, 0.11);
  // Physical evidence of the intentional shutdown: a cut cryo feed and a
  // thawed emergency hatch.
  world.addCylinder({ x: -10.4, z: -23.4, radiusTop: 0.5, radiusBottom: 0.62, height: 1.7, material: m.ice, collide: true, name: 'severed coolant feed' });
  world.addCryoPod(9.4, -23.6, { rotation: Math.PI, open: true, label: 'VALE // EMPTY POD', index: null });

  world.addBarrier(-6.8, 12.2, 3.4, 0.1);
  world.addBarrier(6.8, 1.2, 3.4, -0.12);
  world.addBarrier(-7.4, -4.4, 3.2, Math.PI / 2);
  world.addCrate(-10.4, 8.4, 1.3, 1.2, 1.3, 0.2);
  world.addCrate(10.2, 11.4, 1.3, 1.15, 1.3, -0.15);

  // Snow ingress around the broken skylight; purely visual, no collision.
  const drift = new THREE.Mesh(new THREE.SphereGeometry(4.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), m.snow);
  drift.scale.set(1, 0.09, 0.6);
  drift.position.set(0, 0.02, 12.6);
  drift.receiveShadow = true;
  world.root.add(drift);
  world.addRoof(-13, -2, 12, 36, 5.5, m.labPanel, 0.22);
  world.addRoof(13, -2, 12, 36, 5.5, m.labPanel, 0.22);
  world.addRoof(0, -18, 16, 20, 5.5, m.labPanel, 0.22);
  trusses(world, { width: 46, y: 5.28, spacing: 7, depth: 50 });

  world.addMedkit(-23.4, 13.8);
  world.addMedkit(23.4, -10.2);
  world.addMedkit(-8.4, -16.4);

  world.addLightRig({
    ambientColor: 0x66858e,
    ambientIntensity: 0.62,
    hemiSky: 0xb6dbe2,
    hemiGround: 0x081014,
    hemiIntensity: 0.5,
    directionalColor: 0xcdebf2,
    directionalIntensity: 0.52,
    directionalPosition: [14, 24, 10],
    shadowSpan: 32,
    spotlights: [
      { position: [0, 5.2, 11], target: [0, 0, 3], color: 0xc5f4ff, intensity: 420, angle: 0.86 },
      { position: [-12, 4.8, 8], target: [-20, 0, 7], color: 0xbbdae2, intensity: 290, angle: 0.72 },
      { position: [12, 4.8, 8], target: [20, 0, 7], color: 0xbbdae2, intensity: 290, angle: 0.72 },
      { position: [0, 5.1, -21], target: [0, 0, -24], color: 0x8ebbd0, intensity: 120, angle: 0.55 },
    ],
    points: [
      { position: [0, 2.8, 3.2], color: 0x8be9ff, intensity: 30, distance: 18, pulse: 1.4 },
      { position: [-20.8, 2.2, 6.2], color: 0x9fefff, intensity: 14, distance: 11 },
      { position: [20.8, 2.2, 6.2], color: 0x9fefff, intensity: 14, distance: 11 },
    ],
    glows: [
      [-20.4, 3.8, -23.6, 2.2, 0xff5a66, 0.18],
      [20.4, 3.8, 3.2, 1.8, 0x8be9ff, 0.16],
    ],
  });
  world.setAtmosphere({
    background: 0x071015,
    fogColor: 0x0d2029,
    fogDensity: 0.021,
    particles: {
      count: 760,
      color: 0xd7f3fa,
      size: 0.03,
      opacity: 0.38,
      bounds: { minX: -24, maxX: 24, minY: 0.3, maxY: 6.2, minZ: -26, maxZ: 25 },
      fall: 1.35,
      drift: 0.04,
      flutter: 0.04,
    },
  });

  world.setSpawns([
    spawn('V-01', [20.8, 9.8], [[18.6, 10.6], [16.9, 8.0], [16.9, 4.2], [20.4, 4.0]]),
    spawn('V-02', [-20.8, 9.2], [[-18.6, 10.6], [-16.9, 8.0], [-16.9, 4.2], [-20.4, 4.0]]),
    spawn('V-03', [0, -15.2], [[-6, -15], [-8.2, -19.2], [8.2, -19.2], [5.4, -14]]),
    spawn('V-04', [20.6, -14.2], [[20.6, -18.4], [20.6, -21.4], [19.8, -24.6]]),
    spawn('V-05', [-20.6, -14.2], [[-20.6, -18.4], [-20.6, -21.4], [-19.8, -24.6]]),
    spawn('V-06', [10.4, 0.4], [[10.4, 6], [6, 6], [6, -2]]),
    spawn('V-07', [-10.4, -1.2], [[-10.4, 5], [-5, 5], [-5, -2]]),
    spawn('V-08', [3.4, 12.8], [[3.4, 15.8], [-4.0, 14.0], [-4.0, 9.0]], { wave: 2 }),
    spawn('V-09', [0, -25.8], [[-3.2, -25.8], [4.2, -25.8], [0, -20.6]], { health: 135, elite: true, wave: 2 }),
    spawn('V-10', [7.4, -18.2], [[3.6, -18.2], [-2.8, -16.6], [-2.8, -20.0]], {
      role: 'marksman',
      floorY: 2.8,
      navBounds: observationDeck.navBounds,
    }),
    spawn('V-11', [-8.2, -17.4], [[-4.2, -17.4], [-3.0, -19.4], [-7.0, -20.0]], {
      role: 'defender',
      floorY: 2.8,
      navBounds: observationDeck.navBounds,
    }),
  ]);

  world.setMissionLayout({
    timeLimit: 720,
    safeZone: { x: 0, z: 23.4, w: 9.0, d: 5.8, label: 'DECON AIRLOCK' },
    objective: {
      x: -1.2,
      z: -19.0,
      y: 2.8,
      rotation: 0,
      hudTitle: "ACCESS VALE'S LOG",
      promptLabel: 'VALE OBSERVATION',
      action: 'ACCESS',
      zoneLabel: 'OBSERVATION GALLERY',
    },
    extraction: { x: 0, z: -26.4, w: 4.4, d: 3.0, label: 'NORTH EVAC HATCH' },
  });
}

/* ------------------------------------------------------------------------- */
/* 05 / ECHO-4                                                               */
/* ------------------------------------------------------------------------- */

function buildSilo(world) {
  const m = world.materials;
  const width = 56;
  const depth = 56;
  perimeter(world, {
    width,
    depth,
    height: 9,
    wallMaterial: m.wallDark,
    floorMaterial: m.floorDark,
    lights: false,
  });
  world.playerSpawn.set(0, 0, 24.6);
  world.playerYaw = 0;

  // Outer approach markings.
  world.addHazardStrip(0, 23.4, 3.2, 8.2, 0, 0.018);
  world.addEmissiveStrip(-2.2, 0.03, 22.4, 0.035, 0.01, 8.4, m.cyanSoft);
  world.addEmissiveStrip(2.2, 0.03, 22.4, 0.035, 0.01, 8.4, m.cyanSoft);

  // Central launch silo. The cylinder is the map's anchor and cannot be
  // crossed, forcing fights to resolve around the ring.
  const siloBase = world.addCylinder({
    x: 0,
    z: 0,
    radiusTop: 7.2,
    radiusBottom: 7.7,
    height: 0.8,
    radialSegments: 48,
    material: m.blackMetal,
    collide: false,
    name: 'silo plinth',
  });
  siloBase.castShadow = true;
  const silo = world.addCylinder({
    x: 0,
    z: 0,
    radiusTop: 6.7,
    radiusBottom: 7.1,
    height: 9,
    radialSegments: 36,
    material: m.wallDark,
    collide: true,
    name: 'launch silo',
  });
  silo.castShadow = true;
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const x = Math.cos(angle) * 7.2;
    const z = Math.sin(angle) * 7.2;
    const buttress = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.6, 0.9), m.steel);
    buttress.position.set(x, 4.5, z);
    buttress.rotation.y = -angle;
    buttress.castShadow = true;
    world.root.add(buttress);
    world.addEmissiveStrip(
      Math.cos(angle) * 7.0,
      2.6,
      Math.sin(angle) * 7.0,
      Math.abs(Math.cos(angle)) * 0.1 + 0.02,
      3.2,
      Math.abs(Math.sin(angle)) * 0.1 + 0.02,
      i === 2 ? m.red : m.cyan,
    );
  }
  const warningRing = new THREE.Mesh(new THREE.TorusGeometry(7.45, 0.045, 8, 48), m.red);
  warningRing.rotation.x = Math.PI / 2;
  warningRing.position.y = 0.83;
  world.root.add(warningRing);
  world.addGlowSprite(0, 1.1, 0, 16, 0xff3f4c, 0.11);
  world.addGlowSprite(0, 7.4, 0, 8, 0x63e9ff, 0.12);

  // Upper catwalk ring, above the player but visible from every angle.
  const catwalk = new THREE.Mesh(new THREE.TorusGeometry(8.8, 0.28, 4, 48), m.grate);
  catwalk.rotation.x = Math.PI / 2;
  catwalk.position.y = 7.2;
  world.root.add(catwalk);
  const catwalkRail = new THREE.Mesh(new THREE.TorusGeometry(9.3, 0.035, 4, 48), m.steel);
  catwalkRail.rotation.x = Math.PI / 2;
  catwalkRail.position.y = 8.1;
  world.root.add(catwalkRail);
  for (let i = 0; i < 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.9, 0.04), m.steel);
    post.position.set(Math.cos(angle) * 9.3, 7.7, Math.sin(angle) * 9.3);
    world.root.add(post);
  }

  // Corner control cells: doors face the ring, creating four blind corners.
  const cells = [
    { x: 21.4, z: 21.4, sx: -1, sz: -1 },
    { x: -21.4, z: 21.4, sx: 1, sz: -1 },
    { x: 21.4, z: -21.4, sx: -1, sz: 1 },
    { x: -21.4, z: -21.4, sx: 1, sz: 1 },
  ];
  for (const cell of cells) {
    const west = cell.x - 5.2 * cell.sx;
    const east = cell.x + 5.2 * cell.sx;
    const north = cell.z - 5.2 * cell.sz;
    const south = cell.z + 5.2 * cell.sz;
    // Outer two walls use the perimeter; inner walls are built as segments
    // around a 4 m door facing the silo.
    addWallRun(world, { x: west, z: cell.z, w: 0.6, d: 8.4, h: 4.4, name: 'control cell side' });
    addWallRun(world, { x: cell.x, z: north, w: 8.4, d: 0.6, h: 4.4, name: 'control cell back' });
    addWallRun(world, { x: cell.x, z: south, w: 2.2, d: 0.6, h: 4.4, name: 'control cell front left' });
    addWallRun(world, { x: cell.x + 6.2 * cell.sx, z: south, w: 3.8, d: 0.6, h: 4.4, name: 'control cell front right' });
    doorFrame(world, cell.x + 2.7 * cell.sx, south, 3.8, 4.4, 0);
    world.addRoof(cell.x, cell.z, 10.6, 10.6, 4.6, m.darkPanel, 0.24);
    // Console bank and cover inside each cell.
    world.addBox({ x: cell.x, z: cell.z + 2.6 * cell.sz, w: 5.2, d: 1.0, h: 1.05, material: m.blackMetal, rounded: 0.04, name: 'control console' });
    for (let i = 0; i < 3; i += 1) {
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.55), m.screens[i % m.screens.length]);
      screen.position.set(cell.x - 1.6 + i * 1.6, 1.65, cell.z + 3.13 * cell.sz);
      screen.rotation.y = cell.sz > 0 ? Math.PI : 0;
      world.root.add(screen);
    }
    world.addCrate(cell.x + 3.0 * cell.sx, cell.z - 2.4 * cell.sz, 1.2, 1.2, 1.2, 0.2);
  }

  // Ring cover: eight offset barrier clusters leave a walkable outer band.
  const ringCover = [
    { a: -0.55, r: 11.8 },
    { a: 0.45, r: 11.8 },
    { a: 1.55, r: 11.6 },
    { a: 2.55, r: 12.0 },
    { a: 3.55, r: 11.7 },
    { a: 4.55, r: 11.9 },
    { a: 5.55, r: 11.6 },
    { a: 6.15, r: 12.1 },
  ];
  ringCover.forEach((cover, index) => {
    const x = Math.cos(cover.a) * cover.r;
    const z = Math.sin(cover.a) * cover.r;
    if (index % 2 === 0) {
      world.addBarrier(x, z, 3.8, cover.a);
    } else {
      world.addCrate(x, z, 1.35, 1.3, 1.35, cover.a);
    }
  });
  // Outer ring guide lights.
  for (let i = 0; i < 12; i += 1) {
    const angle = (i / 12) * Math.PI * 2;
    world.addEmissiveStrip(
      Math.cos(angle) * 15.2,
      0.045,
      Math.sin(angle) * 15.2,
      0.05,
      0.012,
      1.2,
      i % 3 === 0 ? m.red : m.cyanSoft,
    );
  }

  // West launch-control gantry: a playable second level overlooking the silo.
  // The old decorative wall boxes are gone; this deck has collisions, a stair,
  // a control console and two defenders that can actually fire from above.
  const launchDeck = world.addDeck({
    x: -23.2,
    z: -3.0,
    w: 8.0,
    d: 20.0,
    y: 3.8,
    name: 'Launch Control Gantry',
    railGaps: { south: [{ offset: 0, width: 3.0 }] },
  });
  world.addStairs({
    x: -23.2,
    z: 13.0,
    width: 2.8,
    height: 3.8,
    run: 6.0,
    direction: 'north',
    name: 'launch gantry stair',
  });
  world.addBox({
    x: -24.9,
    z: -10.4,
    w: 4.6,
    d: 1.0,
    h: 0.9,
    y: 3.8,
    material: m.blackMetal,
    name: 'launch control desk',
  });
  for (let i = 0; i < 3; i += 1) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.5), m.screens[i % 3]);
    screen.position.set(-26.2 + i * 1.3, 4.85, -9.8);
    screen.rotation.x = -0.08;
    world.root.add(screen);
  }
  world.addLabel(['LAUNCH CONTROL', 'ECHO-4 / PAD AUTHORITY', 'PAYLOAD STATUS: EMPTY'], {
    x: -26.95,
    y: 5.45,
    z: -11.6,
    w: 3.2,
    h: 0.88,
    rotation: Math.PI / 2,
    accent: '#ff6b63',
    align: 'center',
  });
  const gantryLight = new THREE.SpotLight(0xff6b63, 15, 12, 0.9, 0.8, 1.7);
  gantryLight.position.set(-23.2, 6.8, -4.0);
  gantryLight.target.position.set(-23.2, 3.8, -4.0);
  world.addSceneLight(gantryLight, gantryLight.target);
  world.addGlowSprite(-23.8, 5.25, -6.2, 2.2, 0xff6b63, 0.12);
  world.addCryoPod(19.0, 17.2, { rotation: Math.PI, open: true, label: 'TRANSFER CRADLE // EMPTY', index: null });
  world.addLabel(['CROWN TRANSFER', 'PAYLOAD LOGGED OUT', 'DESTINATION: CITADEL BLACK'], {
    x: 19.0,
    y: 3.65,
    z: 15.8,
    w: 3.4,
    h: 0.9,
    rotation: 0,
    accent: '#ff6b63',
    align: 'center',
  });

  // Rotating warning beacon at the silo crown.
  const beacon = new THREE.Group();
  beacon.position.set(0, 9.2, 0);
  world.root.add(beacon);
  world.dynamicGroups.push(beacon);
  const beaconArm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.12), m.blackMetal);
  beacon.add(beaconArm);
  const beaconLamp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), m.red);
  beaconLamp.position.x = 0.75;
  beaconArm.add(beaconLamp);
  world.addGlowSprite(0, 9.2, 0, 4.5, 0xff3f4c, 0.24);
  world.animators.push((dt) => {
    beacon.rotation.y += dt * 1.9;
  });

  world.addMedkit(-24.6, 11.2);
  world.addMedkit(24.6, -11.2);
  world.addMedkit(0, -20.8);

  world.addLightRig({
    ambientColor: 0x3b566b,
    ambientIntensity: 0.64,
    hemiSky: 0x628ba1,
    hemiGround: 0x030507,
    hemiIntensity: 0.52,
    directionalColor: 0x8cb8cd,
    directionalIntensity: 0.56,
    directionalPosition: [18, 24, 14],
    shadowSpan: 34,
    spotlights: [
      { position: [0, 8.5, 18], target: [0, 0, 10], color: 0x9edcef, intensity: 520, angle: 0.76 },
      { position: [18, 8.4, 0], target: [10, 0, 0], color: 0xff5a63, intensity: 360, angle: 0.65 },
      { position: [-18, 8.4, 0], target: [-10, 0, 0], color: 0x7bcfe6, intensity: 320, angle: 0.7 },
      { position: [0, 8.2, -18], target: [0, 0, -10], color: 0xff6b72, intensity: 330, angle: 0.72 },
    ],
    points: [
      { position: [0, 8.8, 0], color: 0xff3f4c, intensity: 26, distance: 20, pulse: 3.1 },
      { position: [0, 2.3, 10.4], color: 0x66d9ed, intensity: 20, distance: 15 },
      { position: [0, 2.3, -10.4], color: 0x66d9ed, intensity: 20, distance: 15 },
    ],
    glows: [
      [0, 8.8, 0, 4.5, 0xff3f4c, 0.2],
      [0, 0.9, 0, 13, 0xff4d58, 0.08],
    ],
  });
  world.setAtmosphere({
    background: 0x030508,
    fogColor: 0x060c11,
    fogDensity: 0.026,
    particles: {
      count: 480,
      color: 0x96cfe0,
      size: 0.03,
      opacity: 0.26,
      bounds: { minX: -25, maxX: 25, minY: 0.3, maxY: 8.5, minZ: -25, maxZ: 25 },
      fall: 0.04,
      drift: 0.03,
    },
  });

  world.setSpawns([
    spawn('E-01', [-16.8, 17.8], [[-16.8, 11], [-17.8, 4], [-17.8, -4], [-16, -13]]),
    spawn('E-02', [16.8, 17.8], [[16.8, 11], [17.8, 4], [17.8, -4], [16, -13]]),
    spawn('E-03', [-19.2, 0], [[-19.2, 8], [-16, 11], [-16, -8], [-19.2, -10]]),
    spawn('E-04', [19.2, 0], [[19.2, 8], [16, 11], [16, -8], [19.2, -10]]),
    spawn('E-05', [-16.4, -17.4], [[-16.4, -11], [-17.2, -4], [-17.2, 8]]),
    spawn('E-06', [16.4, -17.4], [[16.4, -11], [17.2, -4], [17.2, 8]]),
    spawn('E-07', [0, 17.2], [[-9, 17.2], [-12, 12], [9, 12], [9, 17.2]]),
    spawn('E-08', [0, -17.2], [[-9, -17.2], [-12, -12], [9, -12], [9, -17.2]]),
    spawn('E-09', [21.4, 21.4], [[18.7, 14.2], [12, 10], [6, 16.4]], { health: 130, elite: true }),
    spawn('E-10', [-21.4, -21.4], [[-18.7, -14.2], [-12, -10], [0, -10]]),
    spawn('E-11', [21.4, -21.4], [[18.7, -14.2], [12, -10], [0, -10]], { wave: 2 }),
    spawn('E-12', [-21.4, 21.4], [[-18.7, 14.2], [-12, 10], [-6, 16.4]], { wave: 2 }),
    spawn('E-13', [-24.8, -11.8], [[-22.0, -11.8], [-22.0, -4.4], [-24.8, 1.2]], {
      role: 'marksman',
      floorY: 3.8,
      navBounds: launchDeck.navBounds,
    }),
    spawn('E-14', [-23.2, 4.2], [[-25.2, 4.2], [-21.0, 0.6], [-21.0, -8.8]], {
      role: 'defender',
      floorY: 3.8,
      navBounds: launchDeck.navBounds,
    }),
  ]);

  world.setMissionLayout({
    timeLimit: 720,
    safeZone: { x: 0, z: 24.4, w: 16, d: 6.0, label: 'SOUTH LIFT' },
    objective: {
      x: -23.8,
      z: -6.2,
      y: 3.8,
      rotation: Math.PI / 2,
      hudTitle: 'RECOVER LAUNCH RECORD',
      promptLabel: 'ECHO LAUNCH LOG',
      action: 'RECOVER',
      zoneLabel: 'LAUNCH CONTROL',
    },
    extraction: { x: 0, z: -24.6, w: 5.0, d: 4.0, label: 'NORTH SERVICE TUNNEL' },
  });
}

/* ------------------------------------------------------------------------- */
/* 06 / REDLINE-6                                                            */
/* ------------------------------------------------------------------------- */

function buildDesert(world) {
  const m = world.materials;
  const width = 80;
  const depth = 64;
  perimeter(world, {
    width,
    depth,
    height: 2.7,
    wallMaterial: m.concreteLight,
    floorMaterial: m.sand,
    lights: false,
  });
  world.playerSpawn.set(0, 0, 27.2);
  world.playerYaw = 0;

  // Concrete arrival apron and the long central track.
  world.addFloorPanel(0, 20, 26, 12, m.concreteLight);
  world.addFloorPanel(0, 3, 11, 32, m.concreteLight);
  world.addFloorPanel(0, 3, 0.22, 34, m.hazardStripe);
  world.addHazardStrip(0, 13.4, 9, 0.55, 0, 0.025);

  // South checkpoint: gatehouse, barriers and a watchtower silhouette.
  addWallRun(world, { x: -10.6, z: 23.2, w: 0.6, d: 7.2, h: 3.6, material: m.concreteLight, name: 'checkpoint office' });
  addWallRun(world, { x: -15.4, z: 19.8, w: 9.6, d: 0.6, h: 3.6, material: m.concreteLight, name: 'checkpoint office north' });
  world.addRoof(-15.4, 23.2, 9.8, 7.2, 3.6, m.concreteLight, 0.24);
  world.addSign(m.signs.security, -10.25, 2.2, 23.2, 2.6, 0.9, -Math.PI / 2);
  world.addBarrier(4.2, 22.2, 5.2, 0);
  world.addBarrier(-2.2, 18.4, 3.8, Math.PI / 2);
  world.addSandbagWall(5.6, 17.2, 5.2, 0.05);
  world.addSandbagWall(-5.2, 14.2, 4.6, Math.PI / 2);

  // West operations block: two connected rooms, one door each.
  addWallRun(world, { x: -20.4, z: -15.2, w: 14.4, d: 0.65, h: 4.6, material: m.concreteLight, name: 'ops north' });
  addWallRun(world, { x: -20.4, z: -3.1, w: 5.2, d: 0.65, h: 4.6, material: m.concreteLight, name: 'ops south west' });
  addWallRun(world, { x: -20.4, z: -3.1, w: 5.2, d: 0.65, h: 4.6, material: m.concreteLight, name: 'ops south east' });
  addWallRun(world, { x: -27.4, z: -9.2, w: 0.65, d: 12.4, h: 4.6, material: m.concreteLight, name: 'ops west' });
  addWallRun(world, { x: -13.4, z: -9.2, w: 0.65, d: 5.6, h: 4.6, material: m.concreteLight, name: 'ops east north' });
  addWallRun(world, { x: -13.4, z: -12.8, w: 0.65, d: 3.2, h: 4.6, material: m.concreteLight, name: 'ops east south' });
  doorFrame(world, -13.4, -3.1, 4.4, 4.6, Math.PI / 2);
  world.addRoof(-20.4, -9.2, 14.4, 12.4, 4.6, m.concreteLight, 0.26);
  world.addBox({ x: -22.4, z: -11.6, w: 5.2, d: 1.1, h: 1.0, material: m.blackMetal, rounded: 0.04, name: 'ops console' });
  world.addCrate(-16.4, -13.4, 1.3, 1.2, 1.3, 0.15);
  world.addCrate(-24.8, -6.4, 1.4, 1.4, 1.4, -0.1);
  world.addSign(m.signs.command, -13.05, 2.7, -9.8, 2.8, 0.95, Math.PI / 2);

  // East hangar: a large roofed volume with one wide opening facing the yard.
  addWallRun(world, { x: 32.8, z: -10.2, w: 0.7, d: 23.4, h: 7.4, material: m.wallDark, name: 'hangar east' });
  addWallRun(world, { x: 22.6, z: -22.0, w: 21, d: 0.7, h: 7.4, material: m.wallDark, name: 'hangar north' });
  addWallRun(world, { x: 22.6, z: 2.2, w: 21, d: 0.7, h: 7.4, material: m.wallDark, name: 'hangar south' });
  addWallRun(world, { x: 12.1, z: -17.4, w: 0.7, d: 9.2, h: 7.4, material: m.wallDark, name: 'hangar west north' });
  addWallRun(world, { x: 12.1, z: -1.4, w: 0.7, d: 7.2, h: 7.4, material: m.wallDark, name: 'hangar west south' });
  doorFrame(world, 12.1, -9.2, 7.2, 6.6, Math.PI / 2);
  world.addRoof(22.6, -10.2, 21.4, 24.6, 7.4, m.darkPanel, 0.3);
  world.addSign(m.signs.service, 11.75, 4.4, -9.2, 3.4, 1.1, -Math.PI / 2);
  world.addBox({ x: 19.2, z: -9.4, w: 8.2, d: 3.0, h: 1.35, material: m.darkPanel, rounded: 0.08, name: 'stripped vehicle hull' });
  for (const side of [-1, 1]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.5, 16), m.rubber);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(19.2 + side * 2.9, 0.85, -7.4);
    world.root.add(wheel);
  }
  world.addBarrier(15.8, -16.2, 4.2, Math.PI / 2);
  world.addCrate(29.2, -18.4, 1.8, 1.8, 1.8, 0.1);
  world.addCrate(27.4, -20.2, 1.2, 1.1, 1.2, -0.2);
  world.addCrate(28.2, -4.2, 1.4, 1.3, 1.4, 0.2);

  // Radar array north of the central lane.
  addRadarDish(world, 0, -25.2);
  world.addBox({ x: -8, z: -22.4, w: 4.2, d: 2.0, h: 1.3, material: m.darkPanel, rounded: 0.06, name: 'radar generator' });
  world.addBox({ x: 8, z: -22.4, w: 4.2, d: 2.0, h: 1.3, material: m.darkPanel, rounded: 0.06, name: 'radar generator' });
  world.addSandbagWall(-4.4, -19.2, 5.6, 0.1);
  world.addSandbagWall(5.2, -17.6, 4.8, -0.12);
  world.addSandbagWall(-1.2, -12.4, 3.8, Math.PI / 2);

  // Fuel tanks and the crashed recon drone in the open yard.
  for (const [x, z] of [[-11.2, 6.4], [-14.8, 9.4]]) {
    world.addCylinder({
      x,
      z,
      radiusTop: 1.5,
      radiusBottom: 1.6,
      height: 3.2,
      radialSegments: 18,
      material: m.steel,
      collide: true,
      name: 'fuel tank',
    });
    world.addCylinder({
      x,
      z,
      radiusTop: 0.25,
      radiusBottom: 0.3,
      height: 1.6,
      radialSegments: 8,
      material: m.blackMetal,
      collide: false,
      name: 'tank vent',
    });
  }
  const drone = new THREE.Group();
  drone.position.set(2.2, 0, 4.8);
  drone.rotation.y = 0.35;
  world.root.add(drone);
  const body = new THREE.Mesh(new RoundedBoxGeometry(4.6, 0.9, 1.8, 2, 0.12), m.darkPanel);
  body.position.y = 0.65;
  body.castShadow = true;
  drone.add(body);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.16, 1.1), m.blackMetal);
  wing.position.y = 0.92;
  drone.add(wing);
  world.colliders.push({
    box: new THREE.Box3(new THREE.Vector3(0.2, 0, 3.8), new THREE.Vector3(4.2, 1.2, 5.8)),
    mesh: body,
    name: 'crashed drone',
  });
  world.collisionMeshes.push(body);
  world.addSandbagWall(8.6, 6.8, 4.2, 0.1);
  world.addSandbagWall(-4.8, -2.4, 5.2, Math.PI / 2);
  world.addBarrier(9.2, -2.8, 3.4, -0.2);
  world.addBarrier(-7.6, 11.8, 3.2, 0.4);
  world.addCrate(-6.2, 16.2, 1.3, 1.1, 1.3, 0.1);

  // Solar array in the south-east: angled visual panels, low collision posts.
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      const x = 19 + i * 5.2;
      const z = 10.4 + j * 4.0;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.0, 0.22), m.steel);
      post.position.set(x, 1.0, z);
      world.root.add(post);
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.1, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x14232d, roughness: 0.28, metalness: 0.65 }),
      );
      panel.position.set(x, 2.05, z);
      panel.rotation.z = -0.4;
      panel.castShadow = true;
      world.root.add(panel);
      world.addColliderOnly(x, 0, z, 0.3, 2.0, 0.3, 'solar post');
    }
  }
  // Watchtower silhouette beyond the west wall.
  const tower = new THREE.Group();
  tower.position.set(-35.2, 0, 21.2);
  world.root.add(tower);
  for (const [x, z] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 7.2, 0.16), m.steel);
    leg.position.set(x, 3.6, z);
    tower.add(leg);
  }
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.5, 3.4), m.blackMetal);
  cabin.position.y = 6.6;
  tower.add(cabin);

  world.addMedkit(-27.2, 16.8);
  world.addMedkit(29.6, 6.2);
  world.addMedkit(-19.2, -6.2);

  world.addLightRig({
    ambientColor: 0x6b5040,
    ambientIntensity: 0.55,
    hemiSky: 0xd59a6b,
    hemiGround: 0x1a0d08,
    hemiIntensity: 0.5,
    directionalColor: 0xffb070,
    directionalIntensity: 0.92,
    directionalPosition: [-28, 15, 22],
    shadowSpan: 46,
    shadowFar: 70,
    spotlights: [
      { position: [12, 9, 4], target: [8, 0, -4], color: 0xffd4a1, intensity: 380, angle: 0.8 },
      { position: [23, 8, -14], target: [21, 0, -9], color: 0xbfdbe4, intensity: 340, angle: 0.72 },
      { position: [0, 8, 20], target: [0, 0, 10], color: 0xffd0a0, intensity: 280, angle: 0.88 },
    ],
    points: [
      { position: [0, 3.5, -25.2], color: 0xff4f4f, intensity: 24, distance: 16, pulse: 2.4 },
      { position: [19.2, 2.4, -9.4], color: 0x91c6da, intensity: 18, distance: 14 },
    ],
    glows: [
      [-38, 17, -38, 26, 0xff9a5c, 0.22],
      [0, 3.8, -25.2, 2.6, 0xff4f4f, 0.22],
      [19, 2.4, -9.4, 3.4, 0xc2e8f4, 0.13],
    ],
  });
  world.setAtmosphere({
    background: 0x1a0e0a,
    fogColor: 0x3c251b,
    fogDensity: 0.012,
    particles: {
      count: 360,
      color: 0xd8b184,
      size: 0.032,
      opacity: 0.3,
      bounds: { minX: -38, maxX: 38, minY: 0.3, maxY: 9, minZ: -30, maxZ: 30 },
      fall: -0.02,
      drift: 0.07,
    },
  });

  world.setSpawns([
    spawn('D-01', [-27.4, 17.2], [[-30.8, 15], [-30.8, 8], [-22, 8], [-22, 14]]),
    spawn('D-02', [22.2, 17.4], [[22.2, 10], [14, 10], [14, 16]]),
    spawn('D-03', [-12.2, 13.2], [[-17.8, 13.2], [-17.8, 7.2], [-8, 7.2]]),
    spawn('D-04', [9.2, 8.6], [[9.2, 3], [4, 2], [3, 9]]),
    spawn('D-05', [-22.4, 4.2], [[-22.4, -1], [-18, -1], [-18, 5]]),
    spawn('D-06', [-25.2, -10.2], [[-24.4, -9.6], [-18.6, -9.6], [-18.6, -5.4]]),
    spawn('D-07', [22.8, -7.2], [[22.8, -13], [16, -13], [16, -6]]),
    spawn('D-08', [29.2, -17.2], [[29.2, -12], [24, -12], [24, -18]]),
    spawn('D-09', [16.8, -20.2], [[16.8, -14], [20, -14], [20, -20]]),
    spawn('D-10', [-0.4, -16.6], [[1.8, -14.2], [1.8, -16.0], [-0.4, -16.6]]),
    spawn('D-11', [6.2, -25.2], [[6.2, -20], [1.4, -20.4], [3.8, -27.2]], { wave: 2 }),
    spawn('D-12', [-15.2, -23.2], [[-15.2, -18], [-12.4, -20.2], [-12.4, -24.8]], { health: 135, elite: true, wave: 2 }),
  ]);

  world.addLabel(['BLACKOUT PREAUTH', 'VOSS, M. / OPERATION AUTHORITY', 'TIMESTAMP +06:00 BEFORE INCIDENT'], {
    x: -13.1,
    y: 3.15,
    z: -11.4,
    w: 3.8,
    h: 1.0,
    rotation: Math.PI / 2,
    accent: '#ffc46b',
    align: 'center',
  });
  world.addLabel(['RADAR LZ', 'LAST GROUND NODE TO CITADEL', 'EXFIL / NORTH'], {
    x: 8.4,
    y: 2.15,
    z: -26.55,
    w: 3.4,
    h: 0.9,
    rotation: Math.PI,
    accent: '#ffc46b',
    align: 'center',
  });
  world.setMissionLayout({
    timeLimit: 750,
    safeZone: { x: 0, z: 27.0, w: 18, d: 5.0, label: 'CHECKPOINT APRON' },
    objective: {
      x: -19.4,
      z: -6.1,
      rotation: -Math.PI / 2,
      hudTitle: 'RECOVER PREAUTH ORDER',
      promptLabel: 'BLACKOUT ORDER',
      action: 'RECOVER',
      zoneLabel: 'OPS BLOCK',
    },
    extraction: { x: 8.4, z: -28.0, w: 4.6, d: 3.0, label: 'RADAR LZ' },
  });
}

/* ------------------------------------------------------------------------- */
/* 07 / HELIX-7                                                              */
/* ------------------------------------------------------------------------- */

function buildResearch(world) {
  const m = world.materials;
  const width = 62;
  const depth = 58;
  perimeter(world, {
    width,
    depth,
    height: 6.6,
    wallMaterial: m.labPanel,
    floorMaterial: m.labFloor,
    lights: true,
  });
  world.playerSpawn.set(0, 0, 24.8);
  world.playerYaw = 0;

  // Decontamination corridor.
  addWallRun(world, { x: -5.4, z: 22.0, w: 0.6, d: 11.2, h: 4.8, material: m.labPanel, name: 'decon west' });
  addWallRun(world, { x: 5.4, z: 22.0, w: 0.6, d: 11.2, h: 4.8, material: m.labPanel, name: 'decon east' });
  addWallRun(world, { x: -15.8, z: 16.7, w: 20.4, d: 0.6, h: 5.1, material: m.labPanel, name: 'atrium south west' });
  addWallRun(world, { x: 15.8, z: 16.7, w: 20.4, d: 0.6, h: 5.1, material: m.labPanel, name: 'atrium south east' });
  doorFrame(world, 0, 16.7, 7.6, 5.1, 0);
  world.addSign(m.signs.security, 0, 3.5, 16.35, 4, 1.2, Math.PI);

  // Atrium shell. The east/west thresholds are completed by the segmented
  // lab walls below; a continuous side wall here would seal both suites.
  addWallRun(world, { x: -15.8, z: -4.0, w: 0.6, d: 8.2, h: 5.1, material: m.labPanel, name: 'atrium west lower' });
  addWallRun(world, { x: 15.8, z: -4.0, w: 0.6, d: 8.2, h: 5.1, material: m.labPanel, name: 'atrium east lower' });
  addWallRun(world, { x: -9.2, z: -8.2, w: 13.0, d: 0.6, h: 5.1, material: m.labPanel, name: 'atrium north west' });
  addWallRun(world, { x: 9.2, z: -8.2, w: 13.0, d: 0.6, h: 5.1, material: m.labPanel, name: 'atrium north east' });
  doorFrame(world, 0, -8.2, 5.6, 5.1, 0);

  // Laboratory suites: each opens off the atrium through a single wide door.
  for (const side of [-1, 1]) {
    const inner = side * 15.8;
    const outer = side * 28.0;
    addWallRun(world, { x: side * 21.8, z: 16.7, w: 12.6, d: 0.6, h: 4.8, material: m.labPanel, name: 'lab south wall' });
    addWallRun(world, { x: side * 21.8, z: 0.2, w: 12.6, d: 0.6, h: 4.8, material: m.labPanel, name: 'lab north wall' });
    addWallRun(world, { x: outer, z: 8.4, w: 0.6, d: 17.0, h: 4.8, material: m.labPanel, name: 'lab outer wall' });
    // Atrium wall segments leave a 6.2 m lab threshold. The previous 2 m
    // gap was visible but narrower than the agent radius used by A*.
    addWallRun(world, { x: inner, z: 13.9, w: 0.6, d: 5.6, h: 5.1, material: m.labPanel, name: 'lab inner wall north' });
    addWallRun(world, { x: inner, z: 2.7, w: 0.6, d: 4.4, h: 5.1, material: m.labPanel, name: 'lab inner wall south' });
    doorFrame(world, inner, 8.0, 5.8, 5.0, Math.PI / 2);
    // Glass observation partition inside the lab.
    const glass = world.addBox({
      x: side * 22.2,
      z: 8.4,
      w: 6.0,
      d: 0.12,
      h: 2.4,
      y: 0.65,
      material: m.glass,
      collide: true,
      cast: false,
      name: 'glass partition',
    });
    glass.renderOrder = 2;
    world.addBox({ x: side * 22.2, z: 8.4, w: 6.2, d: 0.2, h: 0.18, y: 3.15, material: m.steel, collide: false, name: 'glass header' });
    // Benches / terminals.
    world.addBox({ x: side * 24.6, z: 4.2, w: 5.6, d: 1.2, h: 0.95, material: m.darkPanel, rounded: 0.04, name: 'lab bench' });
    for (let i = 0; i < 3; i += 1) {
      const monitor = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.6), m.screens[i % m.screens.length]);
      monitor.position.set(side * (23.2 + i * 1.4), 1.55, 3.55);
      monitor.rotation.y = side > 0 ? Math.PI : 0;
      world.root.add(monitor);
    }
    addSpecimenTank(world, side * 23.8, 13.2, { color: side > 0 ? 0x6dffd2 : 0x8bd8ff, height: 2.9, broken: side < 0 });
    addSpecimenTank(world, side * 19.4, 12.0, { radius: 0.8, height: 2.2, color: 0x6dffd2, collide: true });
    world.addCrate(side * 27.2, 10.4, 1.2, 1.2, 1.2, 0.1);
  }

  // Central containment atrium: observation ring around a specimen column.
  const coreBase = world.addCylinder({
    x: 0,
    z: 4.4,
    radiusTop: 3.9,
    radiusBottom: 4.2,
    height: 0.42,
    radialSegments: 32,
    material: m.blackMetal,
    collide: false,
    name: 'containment plinth',
  });
  coreBase.castShadow = true;
  world.addCylinder({
    x: 0,
    z: 4.4,
    radiusTop: 2.15,
    radiusBottom: 2.35,
    height: 3.4,
    radialSegments: 28,
    material: m.blackMetal,
    collide: true,
    name: 'containment column',
  });
  addSpecimenTank(world, 0, 4.4, { radius: 1.5, height: 3.0, color: 0x69ffd0, collide: false });
  for (let i = 0; i < 3; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5 + i * 0.55, 0.035, 6, 40), i === 1 ? m.red : m.cyanSoft);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 0.6 + i * 0.5, 4.4);
    world.root.add(ring);
    world.animators.push((dt, elapsed) => {
      ring.rotation.z += dt * (i % 2 === 0 ? 0.15 : -0.12);
      ring.position.y = 0.6 + i * 0.5 + Math.sin(elapsed * 0.8 + i) * 0.02;
    });
  }
  world.addHazardStrip(0, 4.4, 10.2, 10.2, 0, 0.02);

  // North containment wing.
  addWallRun(world, { x: -13.4, z: -14.5, w: 0.6, d: 12.6, h: 5.1, material: m.labPanel, name: 'containment west' });
  addWallRun(world, { x: 13.4, z: -14.5, w: 0.6, d: 12.6, h: 5.1, material: m.labPanel, name: 'containment east' });
  addWallRun(world, { x: -21.3, z: -22.6, w: 8.8, d: 0.6, h: 4.8, material: m.labPanel, name: 'north lab south west' });
  addWallRun(world, { x: 21.3, z: -22.6, w: 8.8, d: 0.6, h: 4.8, material: m.labPanel, name: 'north lab south east' });
  for (const side of [-1, 1]) {
    addWallRun(world, { x: side * 16.0, z: -17.8, w: 0.6, d: 5.2, h: 4.8, material: m.labPanel, name: 'north suite wall' });
    doorFrame(world, side * 16.0, -21.4, 4.2, 4.8, Math.PI / 2);
    world.addBox({ x: side * 22.4, z: -12.4, w: 4.8, d: 5.6, h: 1.0, material: m.darkPanel, rounded: 0.04, name: 'analysis bench' });
    addSpecimenTank(world, side * 24.0, -23.2, { radius: 0.8, height: 2.0, color: 0xff6d7b, broken: true });
    world.addCrate(side * 18.8, -25.0, 1.2, 1.2, 1.2, 0.2);
  }
  // Containment pod at the far end.
  const pod = new THREE.Mesh(
    new THREE.CylinderGeometry(3.0, 3.4, 4.6, 24, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x3e5053, roughness: 0.25, metalness: 0.6, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
  );
  pod.position.set(0, 2.3, -23.2);
  pod.castShadow = true;
  world.root.add(pod);
  world.addColliderOnly(0, 0, -23.2, 6.2, 4.6, 6.2, 'containment pod');
  const podCore = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.8, 3.4, 18, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x74ffcf, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }),
  );
  podCore.position.set(0, 2.0, -23.2);
  world.root.add(podCore);
  world.addGlowSprite(0, 2.4, -23.2, 8, 0x74ffcf, 0.22);
  world.addBox({ x: 0, z: -18.8, w: 8.6, d: 1.2, h: 1.0, material: m.blackMetal, rounded: 0.04, name: 'containment console' });
  world.addBarrier(-8.2, 10.2, 3.4, 0.12);
  world.addBarrier(8.2, 0.2, 3.4, -0.1);
  world.addCrate(-10.8, -3.2, 1.4, 1.25, 1.4, 0.2);
  world.addCrate(11.2, 11.6, 1.3, 1.15, 1.3, -0.2);

  roof(world, { width: 58, depth: 54, y: 6.5, material: m.darkPanel });

  world.addMedkit(-26.2, 14.6);
  world.addMedkit(26.2, -9.4);
  world.addMedkit(-7.2, -20.4);

  world.addLightRig({
    ambientColor: 0x5f7f84,
    ambientIntensity: 0.62,
    hemiSky: 0xb6d7d9,
    hemiGround: 0x061012,
    hemiIntensity: 0.48,
    directionalColor: 0xb8dad7,
    directionalIntensity: 0.58,
    directionalPosition: [12, 22, 10],
    shadowSpan: 34,
    spotlights: [
      { position: [0, 6.1, 18], target: [0, 0, 11], color: 0xc5f4f0, intensity: 420, angle: 0.8 },
      { position: [0, 6.0, -2], target: [0, 0, 4], color: 0x9ff0dc, intensity: 330, angle: 0.86 },
      { position: [0, 5.8, -19], target: [0, 0, -23], color: 0x74ffcf, intensity: 320, angle: 0.7 },
      { position: [-21, 5.5, 8], target: [-22, 0, 12], color: 0xbfe7e4, intensity: 230, angle: 0.75 },
      { position: [21, 5.5, 8], target: [22, 0, 12], color: 0xbfe7e4, intensity: 230, angle: 0.75 },
    ],
    points: [
      { position: [0, 2.4, 4.4], color: 0x69ffd0, intensity: 26, distance: 16, pulse: 1.3 },
      { position: [0, 2.4, -23.2], color: 0x74ffcf, intensity: 24, distance: 15, pulse: 1.8 },
      { position: [-23.8, 2.1, 13.2], color: 0x8bd8ff, intensity: 12, distance: 8 },
      { position: [23.8, 2.1, 13.2], color: 0x6dffd2, intensity: 12, distance: 8 },
    ],
    glows: [
      [0, 2.5, -23.2, 8, 0x74ffcf, 0.22],
      [0, 2.2, 4.4, 7, 0x69ffd0, 0.16],
    ],
  });
  world.setAtmosphere({
    background: 0x050b0c,
    fogColor: 0x081416,
    fogDensity: 0.015,
    particles: {
      count: 460,
      color: 0x9fe8d9,
      size: 0.025,
      opacity: 0.26,
      bounds: { minX: -28, maxX: 28, minY: 0.3, maxY: 6.2, minZ: -27, maxZ: 26 },
      fall: 0.015,
      drift: 0.03,
    },
  });

  world.setSpawns([
    spawn('H-01', [22.4, 9.8], [[18.0, 14.8], [17.2, 9.0], [17.2, 4.2], [20.4, 2.4]]),
    spawn('H-02', [-18.0, 6.2], [[-17.4, 14.8], [-17.2, 9.0], [-17.2, 4.2], [-20.4, 2.4]]),
    spawn('H-03', [0, -16.2], [[-7, -16], [-7.4, -20.6], [7.4, -20.6], [7, -15]]),
    spawn('H-04', [19.6, -18.0], [[20.8, -21], [26.4, -21], [26.4, -18]]),
    spawn('H-05', [-19.6, -18.0], [[-20.8, -21], [-26.4, -21], [-26.4, -18]]),
    spawn('H-06', [10.4, -1.0], [[10.4, 4], [5, 6], [5, 11]]),
    spawn('H-07', [-9.8, 9.2], [[-9.8, 2], [-5, 1], [-5, 8]]),
    spawn('H-08', [4.2, 14.2], [[4.2, 10.2], [-2.0, 8.0], [-2.0, 14.0]]),
    spawn('H-09', [6.2, -24.0], [[6.2, -19], [7.6, -25.2], [-7.6, -25.2]], { wave: 2 }),
    spawn('H-10', [24.6, 2.0], [[25.8, 8.4], [26.6, 2.0], [22, 1.2]], { wave: 2 }),
  ]);

  world.addLabel(['PHANTOM SERIES', 'ITERATIONS 01–18 / TERMINATED', 'ITERATION 19 / ACTIVE'], {
    x: -9.0,
    y: 4.2,
    z: -22.65,
    w: 4.4,
    h: 1.1,
    rotation: 0,
    accent: '#7dffd1',
    align: 'center',
  });
  world.addLabel(['COLD STORAGE LIFT', 'EVIDENCE TRANSFER / PRIORITY BLACK', 'EXFIL / NORTH'], {
    x: 0,
    y: 2.2,
    z: -26.4,
    w: 3.6,
    h: 0.95,
    rotation: 0,
    accent: '#7dffd1',
    align: 'center',
  });
  world.setMissionLayout({
    timeLimit: 720,
    safeZone: { x: 0, z: 24.6, w: 9.0, d: 5.4, label: 'DECON CORRIDOR' },
    objective: {
      x: 0,
      z: -4.8,
      rotation: 0,
      hudTitle: 'RECOVER ITERATION INDEX',
      promptLabel: 'PHANTOM INDEX',
      action: 'RECOVER',
      zoneLabel: 'CONTAINMENT RING',
    },
    extraction: { x: 0, z: -27.0, w: 4.2, d: 3.0, label: 'COLD STORAGE LIFT' },
  });
}

/* ------------------------------------------------------------------------- */
/* 08 / CITADEL BLACK                                                        */
/* ------------------------------------------------------------------------- */

function buildCitadel(world) {
  const m = world.materials;
  const width = 66;
  const depth = 64;
  perimeter(world, {
    width,
    depth,
    height: 10,
    wallMaterial: m.wallDark,
    floorMaterial: m.floorDark,
    lights: true,
  });
  world.playerSpawn.set(0, 0, 27.2);
  world.playerYaw = 0;

  // Approach causeway.
  world.addHazardStrip(0, 23.2, 4.0, 8.0, 0, 0.018);
  for (const x of [-2.6, 2.6]) {
    world.addEmissiveStrip(x, 0.03, 22.6, 0.05, 0.012, 8.8, m.red);
  }
  world.addSign(m.signs.security, 0, 3.8, 30.6, 5, 1.5, Math.PI);

  // Central uplink core: square base, octagonal crown, continuous beacon.
  const base = world.addBox({
    x: 0,
    z: -1,
    w: 11,
    d: 11,
    h: 1.2,
    material: m.blackMetal,
    name: 'uplink base',
  });
  base.castShadow = true;
  const tower = world.addCylinder({
    x: 0,
    z: -1,
    radiusTop: 4.4,
    radiusBottom: 4.9,
    height: 9.2,
    radialSegments: 8,
    material: m.darkPanel,
    collide: true,
    name: 'uplink tower',
  });
  tower.rotation.y = Math.PI / 8;
  tower.castShadow = true;
  world.addColliderOnly(0, 0, -1, 9.2, 9.2, 9.2, 'uplink tower core');
  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.9 + i * 0.22, 0.055, 6, 40), i === 0 ? m.red : m.cyanSoft);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(0, 1.6 + i * 1.9, -1);
    world.root.add(ring);
    world.animators.push((dt, elapsed) => {
      ring.rotation.z += dt * (i % 2 === 0 ? 0.18 : -0.14);
      ring.position.y = 1.6 + i * 1.9 + Math.sin(elapsed * 0.7 + i) * 0.02;
    });
  }
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.28, 9.4, 0.9), m.steel);
    fin.position.set(Math.cos(angle) * 5.0, 5.4, -1 + Math.sin(angle) * 5.0);
    fin.rotation.y = -angle;
    world.root.add(fin);
  }
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.34, 22, 8, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xff4954, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
  );
  beam.position.set(0, 15, -1);
  world.root.add(beam);
  world.addGlowSprite(0, 9.4, -1, 14, 0xff4d58, 0.24);
  world.addGlowSprite(0, 4.2, -1, 8, 0x82eaff, 0.1);
  world.addHazardStrip(0, -1, 15.6, 15.6, 0, 0.022);

  // Four corner bastions: low walls, cover and a raised pad that the player
  // can step onto. They create crossfire without adding vertical navigation.
  const bastions = [
    { x: 22, z: 20, rot: 0 },
    { x: -22, z: 20, rot: 0 },
    { x: 22, z: -20, rot: 0 },
    { x: -22, z: -20, rot: 0 },
  ];
  for (const b of bastions) {
    world.addBox({ x: b.x, z: b.z, w: 10.4, d: 10.4, h: 0.32, material: m.blackMetal, collide: false, name: 'bastion pad' });
    const inward = Math.sign(-b.z);
    // Low walls face the central tower, leaving a wide side entrance.
    world.addBox({ x: b.x, z: b.z + inward * 4.2, w: 7.2, d: 0.7, h: 1.25, material: m.steel, name: 'bastion parapet' });
    world.addBox({ x: b.x + Math.sign(-b.x) * 4.2, z: b.z, w: 0.7, d: 6.4, h: 1.25, material: m.steel, name: 'bastion flank' });
    world.addCrate(b.x + Math.sign(b.x) * 1.8, b.z - inward * 1.6, 1.5, 1.4, 1.5, 0.2);
    world.addBarrier(b.x - Math.sign(b.x) * 2.0, b.z + inward * 1.4, 3.4, inward > 0 ? 0.1 : -0.1);
    world.addServerRack(b.x + Math.sign(b.x) * 3.2, b.z + inward * 3.0, Math.PI / 2);
    world.addEmissiveStrip(b.x, 0.42, b.z, 8.8, 0.02, 8.8, m.red);
    world.addGlowSprite(b.x, 1.4, b.z, 3.4, 0xff4d58, 0.1);
  }

  // Midfield cover. Four separate islands, none of which fully blocks the
  // central lane, so the player always has a route to the tower.
  world.addBarrier(-10.2, 13.2, 5.0, 0.1);
  world.addBarrier(10.2, 13.2, 5.0, -0.1);
  world.addCrate(-14.2, 7.2, 1.6, 1.5, 1.6, 0.1);
  world.addCrate(14.2, 7.2, 1.6, 1.5, 1.6, -0.1);
  world.addBarrier(-12.0, 0.2, 4.6, Math.PI / 2);
  world.addBarrier(12.0, 0.2, 4.6, Math.PI / 2);
  world.addServerRack(-16.2, -3.4, Math.PI / 2);
  world.addServerRack(16.2, -3.4, -Math.PI / 2);
  world.addCrate(-8.6, -11.2, 1.5, 1.4, 1.5, 0.2);
  world.addCrate(8.6, -11.2, 1.5, 1.4, 1.5, -0.2);
  world.addBarrier(0, 9.2, 4.4, 0);
  world.addBarrier(-4.8, -12.8, 3.4, 0.1);

  // North command deck: dais, console wall, three elite positions.
  world.addBox({ x: 0, z: -27.6, w: 22, d: 2.2, h: 0.4, material: m.blackMetal, collide: false, name: 'command dais' });
  world.addBox({ x: 0, z: -28.4, w: 12, d: 1.4, h: 1.0, y: 0.4, material: m.darkPanel, rounded: 0.04, name: 'command console' });
  for (let i = 0; i < 4; i += 1) {
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.9), m.screens[i % m.screens.length]);
    screen.position.set(-4.2 + i * 2.8, 2.0, -27.63);
    world.root.add(screen);
    world.addEmissiveStrip(-4.2 + i * 2.8, 1.42, -27.55, 1.6, 0.025, 0.03, m.red);
  }
  world.addBox({ x: -21.2, z: -27.4, w: 5.6, d: 1.2, h: 1.0, material: m.blackMetal, name: 'command rack west' });
  world.addBox({ x: 21.2, z: -27.4, w: 5.6, d: 1.2, h: 1.0, material: m.blackMetal, name: 'command rack east' });
  world.addHazardStrip(0, -24.2, 2.2, 3.8, 0, 0.02);

  // Perimeter service details and red alert strips.
  for (let x = -28; x <= 28; x += 8) {
    world.addEmissiveStrip(x, 0.08, 30.6, 1.2, 0.02, 0.05, m.red);
    world.addEmissiveStrip(x, 0.08, -30.6, 1.2, 0.02, 0.05, m.red);
  }
  world.addBox({ x: 0, z: 30.1, w: 12, d: 0.8, h: 3.0, y: 0, material: m.blackMetal, collide: true, name: 'entry checkpoint' });
  world.addBarrier(-7.4, 22.6, 5.8, 0.1);
  world.addBarrier(7.4, 22.6, 5.8, -0.1);

  world.addMedkit(-28.2, 12.2);
  world.addMedkit(28.2, -12.2);
  world.addMedkit(0, 14.0);

  world.addLightRig({
    ambientColor: 0x56404c,
    ambientIntensity: 0.62,
    hemiSky: 0x8f6a7c,
    hemiGround: 0x030304,
    hemiIntensity: 0.48,
    directionalColor: 0xd0aeb2,
    directionalIntensity: 0.54,
    directionalPosition: [-16, 26, 18],
    shadowSpan: 38,
    spotlights: [
      { position: [0, 9.2, 20], target: [0, 0, 12], color: 0xffc1c5, intensity: 460, angle: 0.8 },
      { position: [0, 11, 0], target: [0, 0, -1], color: 0xff4d58, intensity: 620, angle: 0.72 },
      { position: [0, 8.4, -22], target: [0, 0, -27], color: 0xff8a83, intensity: 380, angle: 0.75 },
      { position: [-22, 7.4, 20], target: [-18, 0, 14], color: 0x96cad8, intensity: 260, angle: 0.7 },
      { position: [22, 7.4, 20], target: [18, 0, 14], color: 0x96cad8, intensity: 260, angle: 0.7 },
    ],
    points: [
      { position: [0, 9.6, -1], color: 0xff3f4c, intensity: 30, distance: 26, pulse: 3.4 },
      { position: [-22, 2.4, -20], color: 0xff5d66, intensity: 18, distance: 12, pulse: 2.1 },
      { position: [22, 2.4, 20], color: 0xff5d66, intensity: 18, distance: 12, pulse: 2.1 },
      { position: [0, 2.3, -28], color: 0xff8c92, intensity: 24, distance: 15, pulse: 1.8 },
    ],
    glows: [
      [0, 9.5, -1, 16, 0xff4d58, 0.22],
      [-22, 1.4, -20, 3.2, 0xff4d58, 0.1],
      [22, 1.4, 20, 3.2, 0xff4d58, 0.1],
    ],
  });
  world.setAtmosphere({
    background: 0x060407,
    fogColor: 0x11080b,
    fogDensity: 0.022,
    particles: {
      count: 520,
      color: 0xff9a9f,
      size: 0.028,
      opacity: 0.22,
      bounds: { minX: -30, maxX: 30, minY: 0.3, maxY: 9.4, minZ: -30, maxZ: 30 },
      fall: -0.1,
      drift: 0.04,
    },
  });

  world.setSpawns([
    // Wave 01 — outer ring pressure.
    spawn('C-01', [-23.4, 18.2], [[-23.4, 11], [-16.2, 11], [-16.2, 18]], { wave: 1 }),
    spawn('C-02', [23.4, 18.2], [[23.4, 11], [16.2, 11], [16.2, 18]], { wave: 1 }),
    spawn('C-03', [-25.8, 2.4], [[-20, 2.4], [-16, 7], [-16, 13]], { wave: 1 }),
    spawn('C-04', [25.8, 2.4], [[20, 2.4], [16, 7], [16, 13]], { wave: 1 }),
    spawn('C-05', [-12.2, 12.0], [[-12.2, 6], [-7, 8], [-7, 14]], { wave: 1 }),
    spawn('C-06', [12.2, 12.0], [[12.2, 6], [7, 8], [6, 16]], { wave: 1 }),
    // Wave 02 — flank collapse.
    spawn('C-07', [-23.0, -17.2], [[-15.8, -18], [-16, -10], [-19, -4]], { wave: 2 }),
    spawn('C-08', [23.0, -17.2], [[15.8, -18], [16, -10], [19, -4]], { wave: 2 }),
    spawn('C-09', [0, 8.4], [[-6, 8.4], [-8, 4], [8, 4]], { wave: 2 }),
    spawn('C-10', [-11.0, -5.2], [[-11, -10], [-6.8, -14.2], [-2, -8]], { wave: 2 }),
    spawn('C-11', [11.0, -5.2], [[11, -10], [6.8, -14.2], [2, -8]], { wave: 2 }),
    // Wave 03 — command guard.
    spawn('C-12', [0, -22.8], [[0, -18], [4, -16], [4, -22]], { wave: 3, health: 165, elite: true }),
    spawn('C-13', [-7.4, -25.4], [[-7.4, -21], [-3, -20], [-3, -25]], { wave: 3, health: 150, elite: true }),
    spawn('C-14', [7.4, -25.4], [[7.4, -21], [3, -20], [3, -25]], { wave: 3, health: 150, elite: true }),
    spawn('C-15', [0, -25.8], [[0, -22], [-4, -20], [4, -20]], {
      wave: 3,
      role: 'commander',
      health: 220,
      elite: true,
    }),
  ]);

  world.addArchiveRack(14.8, -25.8, 0, 6.2);
  world.addArchiveRack(-14.8, -25.8, 0, 6.2);
  world.addLabel(['CROWN UPLINK', 'ARCHIVE BROADCAST / SEVERANCE', 'COMMAND GUARD REQUIRED'], {
    x: 0,
    y: 4.0,
    z: 8.1,
    w: 4.6,
    h: 1.15,
    rotation: 0,
    accent: '#ff4d58',
    align: 'center',
  });
  world.addLabel(['SOUTH CAUSEWAY', 'BLAST DOORS / ARCHIVE PULSE', 'EXFIL AFTER OVERLOAD'], {
    x: -25.0,
    y: 2.2,
    z: 29.2,
    w: 4.0,
    h: 1.0,
    rotation: Math.PI,
    accent: '#ff4d58',
    align: 'center',
  });
  world.setMissionLayout({
    timeLimit: 840,
    safeZone: { x: 0, z: 27.4, w: 14, d: 5.0, label: 'CITADEL INSERTION' },
    objective: {
      x: 0,
      z: 5.4,
      rotation: 0,
      requiresClear: true,
      hudTitle: 'BREAK THE COMMAND GUARD',
      readyTitle: 'OVERLOAD THE UPLINK',
      promptLabel: 'CROWN UPLINK',
      action: 'OVERLOAD',
      zoneLabel: 'UPLINK CORE',
    },
    extraction: { x: -25.0, z: 27.4, w: 4.2, d: 4.2, label: 'SOUTH CAUSEWAY' },
  });
}

const BUILDERS = {
  foundry: buildFoundry,
  port: buildPort,
  polar: buildPolar,
  silo: buildSilo,
  desert: buildDesert,
  research: buildResearch,
  citadel: buildCitadel,
};

export function buildLevelLayout(world, level) {
  const builder = BUILDERS[level.id];
  if (!builder) {
    throw new Error(`No layout builder registered for level "${level.id}"`);
  }
  builder(world);
  world.root.name = level.locationShort;
}
