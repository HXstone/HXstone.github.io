import * as THREE from 'three';
import {
  createConcreteTexture,
  createGratingTexture,
  createHazardTexture,
  createMetalTexture,
  createScreenTexture,
  createSignTexture,
} from './TextureFactory.js';

/**
 * All scene materials are created once and shared. Textures are procedural,
 * which keeps the download tiny while allowing enough surface variation for
 * close-up inspection.
 */
export function createMaterials(renderer) {
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const concrete = createConcreteTexture(anisotropy);
  const metal = createMetalTexture(anisotropy);
  const grating = createGratingTexture(anisotropy);
  const hazard = createHazardTexture(anisotropy);

  const floor = new THREE.MeshStandardMaterial({
    map: concrete.map,
    bumpMap: concrete.bumpMap,
    bumpScale: 0.055,
    color: 0x737a7e,
    roughness: 0.82,
    metalness: 0.14,
  });

  const floorDark = new THREE.MeshStandardMaterial({
    map: concrete.map,
    bumpMap: concrete.bumpMap,
    bumpScale: 0.04,
    color: 0x50565a,
    roughness: 0.88,
    metalness: 0.1,
  });

  const wall = new THREE.MeshStandardMaterial({
    map: metal.map,
    bumpMap: metal.bumpMap,
    bumpScale: 0.035,
    color: 0x798189,
    roughness: 0.58,
    metalness: 0.68,
  });

  const wallDark = new THREE.MeshStandardMaterial({
    map: metal.map,
    bumpMap: metal.bumpMap,
    bumpScale: 0.03,
    color: 0x4d555a,
    roughness: 0.68,
    metalness: 0.55,
  });

  const steel = new THREE.MeshStandardMaterial({
    color: 0x2e353a,
    roughness: 0.42,
    metalness: 0.82,
  });

  const blackMetal = new THREE.MeshStandardMaterial({
    color: 0x14191d,
    roughness: 0.48,
    metalness: 0.75,
  });

  const darkPanel = new THREE.MeshStandardMaterial({
    color: 0x1d2429,
    roughness: 0.72,
    metalness: 0.32,
  });

  const rubber = new THREE.MeshStandardMaterial({
    color: 0x0b0e11,
    roughness: 0.92,
    metalness: 0.06,
  });

  const grate = new THREE.MeshStandardMaterial({
    map: grating,
    color: 0x6a7479,
    roughness: 0.74,
    metalness: 0.58,
    bumpMap: grating,
    bumpScale: 0.02,
  });

  const hazardStripe = new THREE.MeshStandardMaterial({
    map: hazard,
    color: 0xb5a06b,
    roughness: 0.7,
    metalness: 0.25,
  });

  const cyan = new THREE.MeshStandardMaterial({
    color: 0x061014,
    emissive: 0x59e9ff,
    emissiveIntensity: 3.4,
    roughness: 0.25,
    metalness: 0.2,
    toneMapped: false,
  });

  const cyanSoft = new THREE.MeshStandardMaterial({
    color: 0x07141a,
    emissive: 0x2a8ca6,
    emissiveIntensity: 1.4,
    roughness: 0.4,
    metalness: 0.1,
  });

  const blue = new THREE.MeshStandardMaterial({
    color: 0x07101a,
    emissive: 0x5c9cff,
    emissiveIntensity: 2.4,
    roughness: 0.3,
    metalness: 0.2,
    toneMapped: false,
  });

  const red = new THREE.MeshStandardMaterial({
    color: 0x120506,
    emissive: 0xff3345,
    emissiveIntensity: 3,
    roughness: 0.32,
    metalness: 0.16,
    toneMapped: false,
  });

  const amber = new THREE.MeshStandardMaterial({
    color: 0x100b04,
    emissive: 0xffa53d,
    emissiveIntensity: 2.4,
    roughness: 0.3,
    metalness: 0.16,
    toneMapped: false,
  });

  const white = new THREE.MeshStandardMaterial({
    color: 0x11161a,
    emissive: 0xdff9ff,
    emissiveIntensity: 2.3,
    roughness: 0.2,
    metalness: 0.1,
    toneMapped: false,
  });

  const glass = new THREE.MeshBasicMaterial({
    color: 0x75eaff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const holo = new THREE.MeshBasicMaterial({
    color: 0x60e8ff,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const screens = [
    createScreenTexture('SITE-09', 'CORE LINK', '#6be7ff', anisotropy),
    createScreenTexture('REACTOR', 'OUTPUT 87.2%', '#77a9ff', anisotropy),
    createScreenTexture('SECURITY', 'HOSTILES ACTIVE', '#ff7b83', anisotropy),
  ].map(
    (texture) =>
      new THREE.MeshStandardMaterial({
        map: texture,
        emissiveMap: texture,
        emissive: 0xffffff,
        emissiveIntensity: 1.15,
        roughness: 0.35,
        metalness: 0.1,
        toneMapped: false,
      }),
  );

  const signs = {
    core: new THREE.MeshBasicMaterial({
      map: createSignTexture(['CORE ACCESS', 'AUTHORIZED PERSONNEL', 'SECTOR 09 / SUBLEVEL 04'], {
        accent: '#6be7ff',
      }, anisotropy),
      transparent: true,
      toneMapped: false,
    }),
    security: new THREE.MeshBasicMaterial({
      map: createSignTexture(['SECURITY CHECKPOINT', 'BIOMETRIC OVERRIDE REQUIRED', 'THREAT LEVEL / CRITICAL'], {
        accent: '#ff5d67',
      }, anisotropy),
      transparent: true,
      toneMapped: false,
    }),
    command: new THREE.MeshBasicMaterial({
      map: createSignTexture(['COMMAND DECK', 'AUTONOMOUS DEFENSE GRID', 'UPLINK / OFFLINE'], {
        accent: '#87b8ff',
      }, anisotropy),
      transparent: true,
      toneMapped: false,
    }),
    service: new THREE.MeshBasicMaterial({
      map: createSignTexture(['SERVICE CORRIDOR', 'COOLANT / HIGH PRESSURE', 'KEEP CLEAR'], {
        accent: '#ffb15c',
      }, anisotropy),
      transparent: true,
      toneMapped: false,
    }),
  };

  return {
    floor,
    floorDark,
    wall,
    wallDark,
    steel,
    blackMetal,
    darkPanel,
    rubber,
    grate,
    hazardStripe,
    cyan,
    cyanSoft,
    blue,
    red,
    amber,
    white,
    glass,
    holo,
    screens,
    signs,
    textures: { concrete, metal, grating, hazard },
    anisotropy,
  };
}
