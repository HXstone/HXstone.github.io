/**
 * Campaign catalogue. Metadata lives here so the menu, briefing and HUD all
 * read from one source of truth; playable geometry is built in layouts.js.
 *
 * Coordinates are deliberately authored, never random. Every operation has a
 * distinct silhouette, sightline profile and combat rhythm while reusing the
 * same player, weapons, sentinels and interaction rules as SITE-09.
 */

export const DEFAULT_LEVEL_ID = 'site-09';

const LEVEL_LIST = [
  {
    id: 'site-09',
    order: 1,
    code: 'OP / BLACKOUT-09',
    name: 'BLACKOUT PROTOCOL',
    dossierTitle: 'BLACKOUT\nPROTOCOL',
    location: 'SITE-09 / SUBLEVEL 04',
    locationShort: 'SITE-09',
    biome: 'REACTOR BLACKSITE',
    coords: `09° 14' 22" N`,
    threat: 'CRITICAL',
    difficulty: 'STANDARD',
    hostiles: 8,
    timeLimit: 660,
    readout: 'CLOSE–MID // COMMAND DECK',
    objective: 'RECOVER CROWN KEY',
    exfilLabel: 'SERVICE LIFT',
    startToast: 'BLACKOUT PROTOCOL ENGAGED // SITE-09',
    clearToast: 'ALL HOSTILE SIGNALS OFFLINE // EXFIL READY',
    hero:
      'Six hours ago SITE-09 stopped answering. Eight autonomous sentinels hold the command deck, and the CROWN archive is still inside. Breach the blacksite, recover the key, and reach the service lift before Command seals it.',
    brief:
      'An unregistered research cell beneath the Kestrel industrial complex. Command calls CROWN a weapon; the last transmission is countersigned by a scientist Command says is dead.',
    victoryCopy:
      'The CROWN key is out of SITE-09 and the service lift seals behind you. The archive is no longer a rumour Command can bury.',
    defeatCopy:
      'Biometric signal terminated inside SITE-09. The archive key remains below, and Command still owns the record.',
    timeoutCopy:
      'The service lift locked out before you reached it. SITE-09 is sealed with the CROWN key still inside.',
    accent: '#6be7ff',
    diagram: {
      main: 'M8 110h84V36h62v74h58V56h80v54h56V22h64v88',
      accent: 'M8 110h84V36h62v74h58V56h80v54h56V22h64v88',
    },
    menuCamera: { position: [0, 3.35, 20.25], target: [0, 2.15, -1.65], fov: 58 },
  },
  {
    id: 'foundry',
    order: 2,
    code: 'OP / ASH-12',
    name: 'ASH VEIL',
    dossierTitle: 'ASH\nVEIL',
    location: 'ASHLINE FOUNDRY / CASTING HALL',
    locationShort: 'ASHLINE',
    biome: 'ABANDONED FOUNDRY',
    coords: `41° 06' 08" N`,
    threat: 'HIGH',
    difficulty: 'VETERAN',
    hostiles: 12,
    timeLimit: 720,
    readout: 'TWO LEVELS // CASTING FLOOR → CRANE CONTROL',
    objective: 'SECURE CRANE CONTROL',
    exfilLabel: 'EAST LOADING GATE',
    startToast: 'ASH VEIL ENGAGED // ASHLINE FOUNDRY',
    clearToast: 'CASTING LINE SILENT // ASHLINE SECURED',
    hero:
      'Ashline’s casting floor built eighteen sentinel chassis under a civil contract. The crane-control gallery holds the production log. Reach the upper deck, secure the log, and get back to the loading gate before the furnace line restarts.',
    brief:
      'A decommissioned ironworks still drawing power. The furnace deck has been running unattended, and the crane-control gallery is sealed from below.',
    victoryCopy:
      'The crane log leaves Ashline in your hands. Eighteen chassis, eighteen accepted bodies, one missing iteration — Command can no longer call the plant abandoned.',
    defeatCopy:
      'Signal lost beneath the crane rails. Ashline’s sentinels still own the casting floor and the production record.',
    timeoutCopy:
      'The east loading gate seals before you reach it. The crane log burns with the rest of the line.',
    accent: '#ffb15c',
    diagram: {
      main: 'M8 24h404v92H8z M8 70h404 M124 24v92 M292 24v92',
      accent: 'M8 70h404 M50 70v46 M368 70v46',
    },
    menuCamera: { position: [0.4, 3.1, 18.4], target: [0, 2.55, -8], fov: 60 },
  },
  {
    id: 'port',
    order: 3,
    code: 'OP / NIGHT-TIDE',
    name: 'NIGHT TIDE',
    dossierTitle: 'NIGHT\nTIDE',
    location: 'K-7 TERMINAL / CONTAINER QUAY',
    locationShort: 'K-7 TERMINAL',
    biome: 'NIGHT PORT',
    coords: `34° 58' 41" N`,
    threat: 'HIGH',
    difficulty: 'VETERAN',
    hostiles: 13,
    timeLimit: 780,
    readout: 'TWO LEVELS // CONTAINER CANYONS → MANIFEST OFFICE',
    objective: 'RECOVER CARGO MANIFEST',
    exfilLabel: 'WEST QUAY SKIFF',
    startToast: 'NIGHT TIDE ENGAGED // K-7 TERMINAL',
    clearToast: 'QUAY SECURED // K-7 SIGNAL DARK',
    hero:
      'K-7 is the Citadel’s supply throat. Nineteen cryo pods were signed for CROWN; eighteen are still on the quay. Climb to the manifest office above the loading bay, recover the bill of lading, then cross the container canyons to the west skiff.',
    brief:
      'An automated cargo terminal last pinged during a storm. The gantry crane is still moving, one cryo pod is empty, and the manifest has been edited from inside the yard.',
    victoryCopy:
      'The manifest leaves K-7 with the nineteenth pod listed as “in transit.” CROWN’s supply line is no longer a shipping error; it is a trail.',
    defeatCopy:
      'Operative signal lost among the containers. K-7’s sentinels continue their patrol beneath the crane lights.',
    timeoutCopy:
      'The west quay skiff casts off without you. The manifest stays sealed in the office above the loading bay.',
    accent: '#8fd4ff',
    diagram: {
      main: 'M8 18h404v104H8z M8 44h404 M8 72h404 M8 100h404 M78 18v26 M186 44v28 M264 72v28 M350 18v26',
      accent: 'M78 44v56 M264 44v56 M350 72v46',
    },
    menuCamera: { position: [8.5, 3.2, 25.5], target: [-5, 3.0, -3], fov: 60 },
  },
  {
    id: 'polar',
    order: 4,
    code: 'OP / WHITEOUT-3',
    name: 'WHITEOUT',
    dossierTitle: 'WHITE\nOUT',
    location: 'VOSTOK-3 / CRYO RESEARCH STATION',
    locationShort: 'VOSTOK-3',
    biome: 'POLAR RESEARCH',
    coords: `78° 12' 03" S`,
    threat: 'SEVERE',
    difficulty: 'SEVERE',
    hostiles: 11,
    timeLimit: 720,
    readout: 'TWO LEVELS // SEALED LABS → OBSERVATION GALLERY',
    objective: "ACCESS VALE'S LOG",
    exfilLabel: 'NORTH EVAC HATCH',
    startToast: 'WHITEOUT ENGAGED // VOSTOK-3',
    clearToast: 'STATION SEALED // VOSTOK-3 SECURED',
    hero:
      'Vostok-3 is buried under forty metres of ice and running on backup heat. Dr. Vale’s observation gallery sits above the sealed lab. Take the gallery stair, pull her shutdown log, and reach the old north evac hatch before the station goes cold.',
    brief:
      'A cryogenic research station cut off by a whiteout. Internal doors are cycling on their own, and the core temperature is falling past safe limits.',
    victoryCopy:
      'Vale’s log is out. She did not come to Vostok-3 to hide from the sentinels. She came here to wake them.',
    defeatCopy:
      'Thermal signature lost inside Vostok-3. The station’s sentinels still hold the sealed corridors.',
    timeoutCopy:
      'The north evac hatch freezes shut. Vostok-3 keeps Dr. Vale’s log and its secret.',
    accent: '#b8f2ff',
    diagram: {
      main: 'M8 16h404v108H8z M8 56h404 M8 92h404 M142 16v40 M278 16v40 M108 92v32 M312 92v32',
      accent: 'M200 56v36 M200 56a18 18 0 1 0 .1 0',
    },
    menuCamera: { position: [0, 3.05, 20.5], target: [0, 2.6, 1], fov: 58 },
  },
  {
    id: 'silo',
    order: 5,
    code: 'OP / DEAD-ECHO',
    name: 'DEAD ECHO',
    dossierTitle: 'DEAD\nECHO',
    location: 'SILO ECHO-4 / LAUNCH RING',
    locationShort: 'ECHO-4',
    biome: 'UNDERGROUND SILO',
    coords: `46° 31' 19" N`,
    threat: 'SEVERE',
    difficulty: 'SEVERE',
    hostiles: 14,
    timeLimit: 720,
    readout: 'TWO LEVELS // LAUNCH RING → CONTROL GANTRY',
    objective: 'RECOVER LAUNCH RECORD',
    exfilLabel: 'NORTH SERVICE TUNNEL',
    startToast: 'DEAD ECHO ENGAGED // SILO ECHO-4',
    clearToast: 'LAUNCH RING COLD // ECHO-4 SECURED',
    hero:
      'Echo-4 was erased from every map for a reason. There is no payload in the silo, but there is a transfer record on the launch-control gantry. Climb the west stair, pull the log, and cross the ring to the north service tunnel.',
    brief:
      'A launch complex buried under a decommissioned radar station. The silo still has power, the cradle is empty, and something below is answering the perimeter ping.',
    victoryCopy:
      'The launch record confirms CROWN left Echo-4 six hours before SITE-09 went dark. The order carries Voss’s signature.',
    defeatCopy:
      'Signal terminated in the launch ring. ECHO-4’s sentinels still circle the silo. Regroup at the south lift.',
    timeoutCopy:
      'The north service tunnel closes. Echo-4 keeps its launch record, and CROWN’s transfer stays buried.',
    accent: '#ff6b63',
    diagram: {
      main: 'M8 14h404v112H8z M210 70a44 44 0 1 0 .1 0 M166 26h88v18h-88z M166 96h88v18h-88z',
      accent: 'M210 26v12 M210 114v12 M166 70h12 M254 70h12',
    },
    menuCamera: { position: [0, 3.2, 21], target: [0, 3.4, 0], fov: 60 },
  },
  {
    id: 'desert',
    order: 6,
    code: 'OP / RED-MERIDIAN',
    name: 'RED MERIDIAN',
    dossierTitle: 'RED\nMERIDIAN',
    location: 'REDLINE-6 / FORWARD OUTPOST',
    locationShort: 'REDLINE-6',
    biome: 'DESERT OUTPOST',
    coords: `27° 44' 56" N`,
    threat: 'HIGH',
    difficulty: 'VETERAN',
    hostiles: 12,
    timeLimit: 750,
    readout: 'LONG // OPEN GROUND → OPS BLOCK',
    objective: 'RECOVER PREAUTH ORDER',
    exfilLabel: 'RADAR LZ',
    startToast: 'RED MERIDIAN ENGAGED // REDLINE-6',
    clearToast: 'OUTPOST CLEAR // REDLINE-6 SECURED',
    hero:
      'Redline-6 is the last ground node before the Citadel. The preauthorization order for BLACKOUT is in the ops block, signed six hours before SITE-09 went dark. Cross the open yard, pull the order, and reach the radar LZ.',
    brief:
      'A frontier resupply post gone silent at dusk. Long-range thermal contacts are holding fixed positions around the radar array.',
    victoryCopy:
      'The preauthorization order is dated before the blackout. BLACKOUT was not a response to an emergency; it was the plan.',
    defeatCopy:
      'Operative down on the salt flats. Redline-6 remains in hostile hands under the desert moon.',
    timeoutCopy:
      'The radar LZ goes dark before you reach it. The preauthorization order stays in the ops block.',
    accent: '#ffc46b',
    diagram: {
      main: 'M8 16h404v108H8z M250 24h154v46H250z M44 24h110v40H44z M120 92h150v24H120z M300 88h90v28h-90z',
      accent: 'M210 16v108 M44 92h50 M210 92h50',
    },
    menuCamera: { position: [0, 3.7, 24], target: [8, 3.2, -8], fov: 62 },
  },
  {
    id: 'research',
    order: 7,
    code: 'OP / HOLLOW-CROWN',
    name: 'HOLLOW CROWN',
    dossierTitle: 'HOLLOW\nCROWN',
    location: 'HELIX-7 / CONTAINMENT LAB',
    locationShort: 'HELIX-7',
    biome: 'ABANDONED RESEARCH',
    coords: `51° 02' 37" N`,
    threat: 'SEVERE',
    difficulty: 'SEVERE',
    hostiles: 10,
    timeLimit: 720,
    readout: 'MID // CONTAINMENT RING',
    objective: 'RECOVER ITERATION INDEX',
    exfilLabel: 'COLD STORAGE LIFT',
    startToast: 'HOLLOW CROWN ENGAGED // HELIX-7',
    clearToast: 'CONTAINMENT BREACH SEALED // HELIX-7 SECURE',
    hero:
      'Helix-7 holds the PHANTOM series index. Every iteration, every wipe, every deployment is logged in the containment ring. Recover the index, then reach the cold-storage lift behind the containment pod.',
    brief:
      'A private research campus abandoned mid-experiment. The observation ring is intact; the containment pods are not. Every sealed door opens inward.',
    victoryCopy:
      'The index names iterations one through eighteen. All terminated. Iteration nineteen is marked active. There is no name left in the file — only the process.',
    defeatCopy:
      'Biometric signal lost inside Helix-7. The containment rooms remain sealed — with the sentinels still inside.',
    timeoutCopy:
      'The cold-storage lift shuts down. Helix-7 keeps the index of every iteration, including this one.',
    accent: '#7dffd1',
    diagram: {
      main: 'M8 16h404v108H8z M8 54h404 M8 96h404 M128 16v38 M292 16v38 M104 54v42 M316 54v42',
      accent: 'M200 58a24 24 0 1 0 .1 0 M200 58v38',
    },
    menuCamera: { position: [0, 3.15, 20], target: [0, 2.7, 2], fov: 58 },
  },
  {
    id: 'citadel',
    order: 8,
    code: 'OP / LAST-LIGHT',
    name: 'LAST LIGHT',
    dossierTitle: 'LAST\nLIGHT',
    location: 'CITADEL BLACK / UPLINK CORE',
    locationShort: 'CITADEL BLACK',
    biome: 'FINAL DEFENSE',
    coords: `CLASSIFIED`,
    threat: 'OMEGA',
    difficulty: 'OMEGA',
    hostiles: 15,
    timeLimit: 840,
    readout: 'THREE WAVES // UPLINK → SOUTH CAUSEWAY',
    objective: 'OVERLOAD THE UPLINK',
    exfilLabel: 'SOUTH CAUSEWAY',
    startToast: 'LAST LIGHT ENGAGED // CITADEL BLACK',
    clearToast: 'UPLINK OVERLOADING // EXFIL AUTHORIZED',
    hero:
      'Every route ends here. The Citadel is holding fifteen sentinels and a live uplink to the network. Break three defensive waves, overload the tower console, then run the south causeway before the archive pulse closes the blast doors.',
    brief:
      'The final blacksite. Its uplink has been broadcasting since SITE-09 went dark. No extraction plan survives contact with the core.',
    victoryCopy:
      'The archive is loose in every node from SITE-09 to the Citadel. Voss’s command channel is gone. KITE is still on the line, and the causeway doors are closing behind you.',
    defeatCopy:
      'Signal terminated at the Citadel threshold. Three defensive waves remain between you and the uplink. Redeploy.',
    timeoutCopy:
      'The archive pulse completes without you. The Citadel remains a command instrument, and the record is erased with the causeway.',
    accent: '#ff4d58',
    diagram: {
      main: 'M8 16h404v108H8z M86 16v108 M332 16v108 M8 64h404 M200 64a34 34 0 1 0 .1 0',
      accent: 'M200 30v34 M200 98v26 M112 64h34 M254 64h34',
    },
    menuCamera: { position: [0, 3.5, 23.5], target: [0, 3.2, 0], fov: 60 },
  },
];

export const LEVELS = Object.freeze(
  LEVEL_LIST.map((level) =>
    Object.freeze({
      ...level,
      index: String(level.order).padStart(2, '0'),
      id: level.id,
    }),
  ),
);

const LEVEL_MAP = new Map(LEVELS.map((level) => [level.id, level]));

export function getLevel(id) {
  return LEVEL_MAP.get(id) || LEVEL_MAP.get(DEFAULT_LEVEL_ID);
}

export function getLevelIndex(id) {
  const level = getLevel(id);
  return LEVELS.findIndex((entry) => entry.id === level.id);
}

export function getNextLevel(id) {
  const index = getLevelIndex(id);
  return index >= 0 && index < LEVELS.length - 1 ? LEVELS[index + 1] : null;
}
