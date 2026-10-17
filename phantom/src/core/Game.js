import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { clamp, damp, formatTime } from '../utils/math.js';
import { AudioEngine } from './AudioEngine.js';
import { Input } from './Input.js';
import { Settings } from './Settings.js';
import { Effects } from '../fx/Effects.js';
import { Player } from '../player/Player.js';
import { WeaponSystem } from '../weapons/WeaponSystem.js';
import { EnemyManager } from '../enemies/EnemyManager.js';
import { UI } from '../ui/UI.js';
import { World } from '../world/World.js';
import { createMaterials } from '../world/materials.js';
import { DEFAULT_LEVEL_ID, LEVELS, getLevel, getNextLevel } from '../levels/catalog.js';
import { CampaignDirector } from '../campaign/CampaignDirector.js';
import { MissionDirector } from '../campaign/MissionDirector.js';

const QUALITY_PIXEL_RATIO = { high: 1.4, medium: 1.15, low: 0.9 };

/**
 * Game orchestrator: renderer, fixed update pipeline, state transitions and
 * UI wiring. Gameplay systems are intentionally separate so each can be
 * reasoned about and tested independently.
 */
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.settings = new Settings();
    this.audio = new AudioEngine();
    this.audio.setVolume(this.settings.get('volume'));
    this.input = new Input(canvas);
    this.levelId = DEFAULT_LEVEL_ID;
    this.level = getLevel(this.levelId);

    this.state = 'menu';
    this.started = false;
    this._starting = false;
    this._firstFrame = true;
    this._last = performance.now();
    this._hudAccumulator = 0;
    this._crosshairAccumulator = 0;
    this.gameTime = 0;
    this.menuTime = 0;
    this.kills = 0;
    this.damageTaken = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.pickupTarget = null;
    this.enemyTarget = false;
    this.campaign = null;
    this.mission = null;
    this._fHandled = false;
    this._lastHeartbeat = -10;
    this._lastVitalsKey = '';

    this._center = new THREE.Vector2(0, 0);
    this._targetRaycaster = new THREE.Raycaster();
    this._worldVector = new THREE.Vector3();
    this._cloudTmp = new THREE.Vector3();

    this._setupRenderer();
    this._setupScene();
    this._setupSystems();
    this.campaign = this._createCampaign();
    this.mission = this._createMission();
    this._bindEvents();
    this._setupDebugApi();

    this.resetMission();
    this.ui.showMenu();
    this._setMenuCamera(0);
    this._applyQuality();

    this._loop = this._loop.bind(this);
    this._raf = requestAnimationFrame(this._loop);
  }

  _setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.96;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, QUALITY_PIXEL_RATIO[this.settings.get('quality')] || 1.4),
    );
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  _setupScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.settings.get('fov'),
      window.innerWidth / Math.max(1, window.innerHeight),
      0.04,
      150,
    );
    this.camera.rotation.order = 'YXZ';
    this.scene.add(this.camera);

    // A neutral studio environment prevents metals from reading as flat
    // black while the actual scene lighting stays dark and directional.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this._envRenderTarget = pmrem.fromScene(room, 0.04);
    this.scene.environment = this._envRenderTarget.texture;
    this.scene.environmentIntensity = 0.2;
    if (room.dispose) room.dispose();
    pmrem.dispose();

    this.materials = createMaterials(this.renderer);
    this.world = new World(
      this.scene,
      this.renderer,
      this.materials,
      this.settings.get('quality'),
      this.levelId,
    );
    this.effects = new Effects(this.scene, this.camera, this.settings.get('quality'));
  }

  _setupSystems() {
    this.ui = new UI({
      settings: this.settings,
      audio: this.audio,
      callbacks: {
        onStart: () => this.startMission(),
        onResume: () => this.resumeMission(),
        onRestart: () => this.restartMission(),
        onAbort: () => this.abortToMenu(),
        onLevelSelect: (id) => this.selectLevel(id),
        onNext: () => this.startNextMission(),
        onSettingsChange: (key, value) => this._handleSettingChange(key, value),
      },
    });

    this.player = new Player({
      camera: this.camera,
      world: this.world,
      input: this.input,
      audio: this.audio,
      settings: this.settings,
      callbacks: {
        onDamage: (payload) => this._handlePlayerDamage(payload),
        onDeath: () => this._handlePlayerDeath(),
        onHeal: (amount) => {
          if (amount > 0) this.ui.showToast(`BIOCELL ABSORBED // +${Math.round(amount)} INTEGRITY`, 2100);
        },
      },
    });

    this.weapons = new WeaponSystem({
      camera: this.camera,
      player: this.player,
      world: this.world,
      input: this.input,
      audio: this.audio,
      effects: this.effects,
      callbacks: {
        onAmmoChange: (state) => this.ui.updateAmmo(state),
        onWeaponChange: (weapon) => this.ui.updateWeapon(weapon),
        onShot: () => {},
        onHit: (info) => this.ui.showHitmarker(info),
        onKill: () => this.ui.showHitmarker({ killed: true }),
        onReloadStart: () => this.ui.showToast('MAGAZINE RELEASE // RELOADING', 1300),
        onReloadProgress: (progress) => this.ui.setReloadState(this.weapons.reloading, progress),
        onReloadEnd: () => this.ui.setReloadState(false),
        onEmpty: () => this.ui.showToast('MAGAZINE EMPTY // PRESS R TO RELOAD', 1600),
        onWeaponSwitch: (weapon) => this.ui.showToast(`${weapon.name} // ${weapon.mode}`, 1200),
      },
    });

    this.enemies = this._createEnemyManager();

    this.weapons.setEnemyManager(this.enemies);

    // Give the overlay weapon the same image-based lighting as the facility,
    // otherwise high-metalness gun materials read as flat black.
    this.weapons.weaponModel.scene.environment = this.scene.environment;
    this.weapons.weaponModel.scene.environmentIntensity = 0.62;
  }

  _createEnemyManager() {
    return new EnemyManager({
      scene: this.scene,
      world: this.world,
      effects: this.effects,
      audio: this.audio,
      quality: this.settings.get('quality'),
      callbacks: {
        onKill: (enemy, info) => this._handleEnemyKilled(enemy, info),
        onMissionComplete: () => this._handleAllEnemiesDown(),
        onWave: (info) => this._handleWaveDeployed(info),
      },
    });
  }

  _createCampaign() {
    return new CampaignDirector({
      game: this,
      world: this.world,
      level: this.level,
      ui: this.ui,
      audio: this.audio,
    });
  }

  _createMission() {
    return new MissionDirector({
      game: this,
      world: this.world,
      level: this.level,
      ui: this.ui,
      audio: this.audio,
    });
  }

  _bindEvents() {
    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', this._onResize);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.state === 'playing') this.pauseMission();
    });
    window.addEventListener('blur', () => {
      if (this.state === 'playing') this.pauseMission();
    });

    this.input.onLockChange = (locked) => {
      if (!locked && this.state === 'playing') {
        this._escapeIgnoreUntil = performance.now() + 320;
        this.pauseMission();
      }
    };
    this.input.onLockError = () => {
      if (this.state === 'playing' || this.state === 'paused') {
        this.ui.showToast('MOUSE CAPTURE BLOCKED // CLICK THE VIEWPORT TO RETRY', 2600);
      }
    };

    this.canvas.addEventListener('click', () => {
      if ((this.state === 'playing' || this.state === 'paused') && !this.input.locked) {
        this.input.requestLock();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) return;
      if (event.code === 'Escape' || event.key === 'Escape') {
        if (this.state === 'playing') {
          this._escapeIgnoreUntil = performance.now() + 320;
          this.pauseMission();
          return;
        }
      }
      if (
        (event.code === 'Enter' || event.code === 'NumpadEnter') &&
        this.state === 'paused' &&
        !this.ui.modal
      ) {
        event.preventDefault();
        this.resumeMission();
        return;
      }
      if (event.code === 'KeyR' && (this.state === 'victory' || this.state === 'defeat') && !this.ui.modal) {
        event.preventDefault();
        this.restartMission();
      }
      if (event.code === 'Enter' && this.state === 'menu' && !this.ui.modal) {
        this.startMission();
      }
    });

    this.canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      if (this.state === 'playing') this.pauseMission();
      this.ui.showToast('RENDER CONTEXT LOST // REFRESH TO RECOVER', 6000);
    });

    this._onResize();
  }

  /**
   * Loads a different operation while the player is in the menu/end screen.
   * The gameplay systems stay alive; only the world, navigation mesh and
   * sentinel instances are replaced. This keeps every existing control and
   * combat rule untouched while allowing completely different geometry.
   */
  selectLevel(levelId) {
    if (this._starting || this.state === 'playing' || this.state === 'paused') return;
    const level = getLevel(levelId);
    if (!level) return;

    if (level.id !== this.levelId || this.world.levelId !== level.id) {
      this._swapWorld(level);
    }

    this.levelId = level.id;
    this.level = level;
    this.state = 'menu';
    this.input.releaseAll();
    this.resetMission();
    this.ui.setMission(level);
    this.ui.showMenu();
    // Quality is unchanged when switching operations. Rebuilding the composer
    // here would discard perfectly valid render targets and bloom mips.
    this.menuTime = 0;
    this._setMenuCamera(0);
  }

  _swapWorld(level) {
    this.world.dispose();
    this.level = level;
    this.levelId = level.id;
    this.world = new World(
      this.scene,
      this.renderer,
      this.materials,
      this.settings.get('quality'),
      level.id,
    );
    this.player.world = this.world;
    this.weapons.world = this.world;
    this.enemies.dispose();
    this.enemies = this._createEnemyManager();
    this.weapons.setEnemyManager(this.enemies);
    this.campaign?.dispose();
    this.campaign = this._createCampaign();
    this.mission = this._createMission();
    this.effects.reset();
    this.world.setShadows(this.quality !== 'low');
  }

  startNextMission() {
    const next = getNextLevel(this.level.id);
    if (!next) return;
    this.selectLevel(next.id);
    this.startMission();
  }

  startMission() {
    if (this._starting || this.state === 'playing' || this.state === 'paused') return;
    this._starting = true;
    this.started = true;

    // Pointer lock must be requested inside the original user gesture.
    this.input.requestLock().then((locked) => {
      if (!locked) {
        this.ui.showToast('CLICK THE VIEWPORT TO CAPTURE THE MOUSE', 2600);
      }
    });

    this.audio.unlock().then(() => {
      this.audio.setVolume(this.settings.get('volume'));
    });

    this.resetMission();
    this.state = 'playing';
    this.ui.enterGame();
    this.ui.showToast(this.level.startToast, 2300);
    this.campaign?.begin();
    this.mission?.begin();
    this.audio.setPaused(false);
    this.camera.fov = this.settings.get('fov');
    this.camera.updateProjectionMatrix();
    this._starting = false;
  }

  async resumeMission() {
    if (this.state !== 'paused') return;
    this.ui.closeModal(true);
    const locked = await this.input.requestLock();
    if (!locked) {
      this.ui.showToast('MOUSE CAPTURE BLOCKED // CLICK THE VIEWPORT', 2600);
      return;
    }
    this.state = 'playing';
    this.ui.hidePause();
    this.audio.setPaused(false);
    this._last = performance.now();
  }

  pauseMission() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.audio.setPaused(true);
    this.input.releaseAll();
    this.ui.setIntelPrompt(false);
    this.ui.showPause({
      elapsed: this.gameTime,
      remainingTime: this.mission?.remaining ?? 0,
      remaining: this.enemies.totalRemaining,
      kills: this.kills,
    });
    if (document.pointerLockElement) document.exitPointerLock();
  }

  restartMission() {
    if (this._starting) return;
    this._starting = true;
    this.input.requestLock().catch(() => {});
    this.resetMission();
    this.state = 'playing';
    this.ui.enterGame();
    this.ui.hidePause();
    this.ui.closeModal(true);
    this.audio.setPaused(false);
    this.audio.unlock();
    this.ui.showToast('REDEPLOYING // OPERATION RESET', 1800);
    this.campaign?.begin();
    this.mission?.begin();
    this._last = performance.now();
    this._starting = false;
  }

  abortToMenu() {
    this.audio.setPaused(false);
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this.resetMission();
    this.state = 'menu';
    this.ui.showMenu();
    this.audio.setPaused(false);
    this._setMenuCamera(this.menuTime);
    this.camera.fov = this.world.level.menuCamera?.fov || 58;
    this.camera.updateProjectionMatrix();
  }

  resetMission() {
    this.gameTime = 0;
    this.kills = 0;
    this.damageTaken = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.pickupTarget = null;
    this.enemyTarget = false;
    this._fHandled = false;
    this._lastHeartbeat = -10;
    this.campaign?.reset();
    this.player.reset();
    this.weapons.reset();
    this.enemies.reset();
    this.effects.reset();
    this.world.resetPickups();
    this.ui.clearTransient();
    this.ui.updateObjective(0, this.enemies.totalEnemies);
    this.ui.updateHealth(this.player.health, this.player.shield);
    this.ui.updateWeapon(this.weapons.weapon);
    this.ui.updateAmmo({
      current: this.weapons.currentAmmo,
      reserve: this.weapons.currentReserve,
      max: this.weapons.weapon.ammo,
      reloading: false,
    });
    this.ui.setPickupPrompt(false);
    this.camera.fov = this.settings.get('fov');
    this.camera.updateProjectionMatrix();
    // MissionDirector owns the single countdown, safe-zone latch, objective
    // console and extraction state. Reset it last so it can restore the HUD
    // labels after the transient UI has been cleared.
    this.mission?.reset();
  }

  _handleSettingChange(key, value) {
    if (key === 'volume') {
      this.audio.setVolume(value);
    } else if (key === 'quality') {
      this._applyQuality();
    } else if (key === 'fov' && (this.state === 'menu' || this.state === 'paused')) {
      this.camera.fov = value;
      this.camera.updateProjectionMatrix();
    } else if (key === 'reset') {
      this._applyQuality();
      this.audio.setVolume(this.settings.get('volume'));
      this.camera.fov = this.settings.get('fov');
      this.camera.updateProjectionMatrix();
    }
  }

  _setupDebugApi() {
    if (!import.meta.env.DEV) return;
    const game = this;
    window.__PHANTOM__ = {
      getSnapshot() {
        return {
          state: game.state,
          level: game.level.id,
          levelName: game.level.name,
          time: Number(game.gameTime.toFixed(2)),
          kills: game.kills,
          remaining: game.enemies.remaining,
          totalRemaining: game.enemies.totalRemaining,
          wave: game.enemies.currentWave,
          maxWave: game.enemies.maxWave,
          hostiles: game.enemies.totalEnemies,
          campaign: {
            terminalRead: game.campaign?.readIntel.size || 0,
            objective: document.getElementById('objective-title')?.textContent || '',
          },
          mission: game.mission?.getSnapshot(),
          alarm: Boolean(game.world._alarmActive),
          objectiveLocked: Boolean(game.world.objectiveConsole?.locked),
          decks: game.world.decks?.map((deck) => ({
            name: deck.name,
            y: deck.y,
            bounds: deck.navBounds,
          })),
          stairs: game.world.stairways?.map((stair) => ({
            name: stair.name,
            bottom: stair.bottom.toArray(),
            top: stair.top.toArray(),
          })),
          player: game.player.getDebugState(),
          weapon: {
            id: game.weapons.currentId,
            ammo: game.weapons.currentAmmo,
            reserve: game.weapons.currentReserve,
            reloading: game.weapons.reloading,
            aiming: game.weapons.aiming,
          },
          shots: game.weapons.shotsFired,
          hits: game.weapons.shotsHit,
          lastShot: game.weapons.lastDebugShot || null,
          enemies: game.enemies.enemies.map((enemy) => ({
            id: enemy.spawn.id,
            role: enemy.role,
            wave: enemy.spawn.wave || 1,
            state: enemy.state,
            alive: enemy.alive,
            dormant: enemy.dormant,
            hp: Number(enemy.health.toFixed(0)),
            pos: enemy.position.toArray().map((v) => Number(v.toFixed(1))),
            sight: enemy.hasSight,
          })),
          nav: {
            cells: game.enemies.nav.total,
            blocked: game.enemies.nav.blocked.reduce((sum, value) => sum + value, 0),
          },
          hitMeshes: game.enemies.getHitMeshes().length,
          hitMeshSample: game.enemies.getHitMeshes().slice(0, 3).map((mesh) => ({
            zone: mesh.userData.hitZone,
            visible: mesh.visible,
            world: mesh.getWorldPosition(new THREE.Vector3()).toArray().map((v) => Number(v.toFixed(2))),
          })),
        };
      },
      startNoLock() {
        if (game.state === 'menu') {
          game.resetMission();
          game.state = 'playing';
          game.ui.enterGame();
          game.audio.unlock();
          game.campaign?.begin();
          game.mission?.begin();
        }
      },
      teleport(x, z, y = 0) {
        game.player.position.set(x, y, z);
        game.player.velocity.set(0, 0, 0);
        game.player.grounded = y <= 0.01;
      },
      look(yaw, pitch = 0) {
        game.player.yaw = yaw;
        game.player.pitch = pitch;
      },
      setKey(code, down = true) {
        if (down) game.input.keys.add(code);
        else game.input.keys.delete(code);
      },
      press(code) {
        game.input.pressedKeys.add(code);
      },
      interactObjective() {
        return game.mission?.interactObjective(game.player.position);
      },
      setRemaining(seconds) {
        if (!game.mission) return false;
        const clamped = Math.max(0, Number(seconds) || 0);
        game.mission.remaining = clamped;
        game.mission.elapsed = Math.max(0, game.mission.timeLimit - clamped);
        game.gameTime = game.mission.elapsed;
        game.mission.started = clamped < game.mission.timeLimit;
        game.ui.setTimer(clamped, { frozen: false, label: 'TIME TO EXFIL' });
        return true;
      },
      damageEnemy(index, amount = 50) {
        const enemy = game.enemies.enemies[index];
        if (enemy) enemy.takeDamage(amount, { weapon: 'debug' });
      },
      damagePlayer(amount = 20) {
        return game.player.takeDamage(amount, new THREE.Vector3(0, 1, 0));
      },
      restart() {
        game.restartMission();
      },
      killAll() {
        for (const enemy of game.enemies.enemies) {
          if (enemy.alive) enemy.takeDamage(1000, { weapon: 'debug' });
        }
      },
      readTerminal(id) {
        const terminal = game.world.terminals.find((entry) => entry.id === id) || game.world.terminals[0];
        return terminal ? game.campaign.interact(terminal) : false;
      },
      deployWave(wave = 2) {
        return game.deployReserveWave(wave);
      },
      forceFire() {
        game.weapons._shoot();
      },
      step(seconds = 1, render = false) {
        const frames = Math.max(1, Math.round(seconds * 60));
        for (let i = 0; i < frames; i += 1) {
          if (game.state === 'playing') game._updatePlaying(1 / 60);
          else if (game.state === 'menu') game._updateMenu(1 / 60);
          else game._updateEndState(1 / 60);
          game.input.endFrame();
        }
        if (render) {
          if (game.composer) game.composer.render();
          else game.renderer.render(game.scene, game.camera);
          game._renderWeapon();
        }
        return {
          state: game.state,
          mission: game.mission?.getSnapshot(),
          time: Number(game.gameTime.toFixed(2)),
        };
      },
      setState(state) {
        game.state = state;
      },
      selectLevel(id) {
        game.selectLevel(id);
        return game.level.id;
      },
      validateLevels() {
        const previous = game.level.id;
        const results = [];
        const approachFor = (objective) => {
          const rotation = objective.rotation || 0;
          return {
            x: objective.x + Math.sin(rotation) * 1.65,
            z: objective.z + Math.cos(rotation) * 1.65,
          };
        };
        for (const level of LEVELS) {
          game.selectLevel(level.id);
          const nav = game.enemies.nav;
          const world = game.world;
          const mission = world.missionLayout;
          const issues = [];
          if (!nav.isWalkablePoint(world.playerSpawn.x, world.playerSpawn.z)) {
            issues.push(`player spawn blocked at ${world.playerSpawn.x},${world.playerSpawn.z}`);
          }
          if (!mission?.safeZone) {
            issues.push('missing safe zone');
          } else {
            const zone = mission.safeZone;
            const inside =
              world.playerSpawn.x > zone.x - zone.w / 2 &&
              world.playerSpawn.x < zone.x + zone.w / 2 &&
              world.playerSpawn.z > zone.z - zone.d / 2 &&
              world.playerSpawn.z < zone.z + zone.d / 2;
            if (!inside) issues.push('player spawn outside safe zone');
          }

          if (!game.world.objectiveConsole) {
            issues.push('missing objective console');
          } else {
            const objective = game.world.objectiveConsole;
            const approach = approachFor(objective);
            if (objective.y > 0.5) {
              const deck = world.decks.find((entry) => {
                const b = entry.navBounds;
                return (
                  Math.abs(entry.y - objective.y) < 0.2 &&
                  approach.x >= b.minX &&
                  approach.x <= b.maxX &&
                  approach.z >= b.minZ &&
                  approach.z <= b.maxZ
                );
              });
              if (!deck) {
                issues.push(`objective at y=${objective.y} has no matching deck`);
              } else {
                const stair = world.stairways.find(
                  (entry) =>
                    Math.abs(entry.height - deck.y) < 0.2 &&
                    Math.abs(entry.top.x - deck.x) <= deck.w / 2 + 0.2 &&
                    Math.abs(entry.top.z - deck.z) <= deck.d / 2 + 0.2,
                );
                if (!stair) {
                  issues.push(`deck ${deck.name} has no stair landing`);
                } else {
                  // The first riser occupies the recorded bottom point, so test
                  // the approach on open floor just outside the stair footprint.
                  const dir = {
                    north: [0, 1],
                    south: [0, -1],
                    east: [-1, 0],
                    west: [1, 0],
                  }[stair.direction] || [0, 1];
                  const approachX = stair.bottom.x + dir[0] * 1.25;
                  const approachZ = stair.bottom.z + dir[1] * 1.25;
                  if (!nav.isWalkablePoint(approachX, approachZ)) {
                    issues.push(`stair bottom blocked at ${stair.bottom.x},${stair.bottom.z}`);
                  } else if (nav.findPath(world.playerSpawn, new THREE.Vector3(approachX, 0, approachZ)).length === 0) {
                    issues.push(`stair bottom unreachable from player spawn`);
                  }
                }
                const upperNav = game.enemies._getNavForSpawn({
                  floorY: objective.y,
                  navBounds: deck.navBounds,
                });
                if (!upperNav.isWalkablePoint(approach.x, approach.z)) {
                  issues.push(`objective approach blocked on ${deck.name}`);
                }
              }
            } else if (!nav.isWalkablePoint(approach.x, approach.z)) {
              issues.push(`objective approach blocked at ${approach.x.toFixed(1)},${approach.z.toFixed(1)}`);
            } else if (nav.findPath(world.playerSpawn, new THREE.Vector3(approach.x, 0, approach.z)).length === 0) {
              issues.push('objective approach unreachable from player spawn');
            }
          }

          if (!mission?.extraction) {
            issues.push('missing extraction zone');
          } else {
            const exfil = mission.extraction;
            if (!nav.isWalkablePoint(exfil.x, exfil.z)) {
              issues.push(`extraction point blocked at ${exfil.x},${exfil.z}`);
            } else if (nav.findPath(world.playerSpawn, new THREE.Vector3(exfil.x, 0, exfil.z)).length === 0) {
              issues.push('extraction unreachable from player spawn');
            }
          }

          for (const terminal of world.terminals) {
            const ax = terminal.x + Math.sin(terminal.rotation || 0) * 1.3;
            const az = terminal.z + Math.cos(terminal.rotation || 0) * 1.3;
            if (!nav.isWalkablePoint(ax, az)) {
              issues.push(`${terminal.id} approach blocked at ${ax.toFixed(1)},${az.toFixed(1)}`);
            } else if (nav.findPath(world.playerSpawn, new THREE.Vector3(ax, 0, az)).length === 0) {
              issues.push(`${terminal.id} unreachable from player spawn`);
            }
          }

          for (const enemySpawn of world.enemySpawns) {
            const enemyNav = game.enemies._getNavForSpawn(enemySpawn);
            if (!enemyNav.isWalkablePoint(enemySpawn.pos.x, enemySpawn.pos.z)) {
              issues.push(`${enemySpawn.id} spawn blocked at ${enemySpawn.pos.x},${enemySpawn.pos.z}`);
            }
            for (const [index, target] of enemySpawn.route.entries()) {
              if (!enemyNav.isWalkablePoint(target.x, target.z)) {
                issues.push(`${enemySpawn.id} route ${index} blocked at ${target.x},${target.z}`);
                continue;
              }
              if (enemyNav.findPath(enemySpawn.pos, target).length === 0) {
                issues.push(`${enemySpawn.id} route ${index} unreachable`);
              }
            }
            if (!enemySpawn.floorY || enemySpawn.floorY < 0.5) {
              if (nav.findPath(world.playerSpawn, enemySpawn.pos).length === 0) {
                issues.push(`${enemySpawn.id} unreachable from player spawn`);
              }
            }
          }
          results.push({
            id: level.id,
            hostiles: world.enemySpawns.length,
            expected: level.hostiles,
            waves: Math.max(...world.enemySpawns.map((spawn) => spawn.wave || 1)),
            navCells: nav.total,
            blockedCells: nav.blocked.reduce((sum, value) => sum + value, 0),
            colliders: world.colliders.length,
            decks: world.decks.length,
            stairs: world.stairways.length,
            mission: {
              safeZone: mission?.safeZone,
              objective: mission?.objective,
              extraction: mission?.extraction,
            },
            issues,
          });
        }
        game.selectLevel(previous);
        return results;
      },
    };
  }

  _applyQuality() {
    const quality = this.settings.get('quality');
    this.quality = quality;
    const ratio = Math.min(window.devicePixelRatio || 1, QUALITY_PIXEL_RATIO[quality] || 1.4);
    this.renderer.setPixelRatio(ratio);
    this.world.setShadows(quality !== 'low');
    this.renderer.shadowMap.enabled = quality !== 'low';
    this.effects.quality = quality;
    this._setupComposer();
    this._resize();
  }

  _setupComposer() {
    if (this.composer) {
      // EffectComposer.dispose() does not release pass-owned render targets.
      // UnrealBloomPass keeps the mip chain, so release it explicitly.
      this.bloomPass?.dispose?.();
      this.composer.dispose();
      this.composer = null;
      this.bloomPass = null;
    }
    if (this.quality === 'low') return;

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(window.innerWidth, window.innerHeight);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth * 0.55, window.innerHeight * 0.55),
      this.quality === 'high' ? 0.3 : 0.18,
      0.7,
      0.86,
    );
    this.composer.addPass(renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(new OutputPass());
  }

  _resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / Math.max(1, height);
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      QUALITY_PIXEL_RATIO[this.quality] || 1.4,
    );
    if (Math.abs(this.renderer.getPixelRatio() - ratio) > 0.001) {
      this.renderer.setPixelRatio(ratio);
    }
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    if (this.composer) {
      this.composer.setPixelRatio(this.renderer.getPixelRatio());
      this.composer.setSize(width, height);
      // Bloom is intentionally evaluated at a lower resolution; the softened
      // highlight reads the same while costing roughly a third of the fill.
      this.bloomPass?.setSize(width * 0.55, height * 0.55);
    }
    this.weapons?.resize(aspect);
  }

  _setMenuCamera(time) {
    // Each operation stages its own landmark through the menu overlay. SITE-09
    // uses its original insertion-bay/reaction-hall framing.
    const base = this.world.menuCamera;
    const target = this.world.menuTarget;
    const driftX = Math.sin(time * 0.045) * 1.6;
    const driftY = Math.sin(time * 0.16) * 0.12;
    this.camera.position.set(base.x + driftX, base.y + driftY, base.z);
    this.camera.lookAt(
      target.x + driftX * 0.12,
      target.y + Math.sin(time * 0.11) * 0.06,
      target.z,
    );
    this.camera.rotation.z = Math.sin(time * 0.07) * 0.005;
  }

  _updateMenu(dt) {
    this.menuTime += dt;
    this.world.update(dt, this.menuTime);
    this._setMenuCamera(this.menuTime);
    this.camera.fov = this.world.level.menuCamera?.fov || 58;
    this.camera.updateProjectionMatrix();
    this.enemyTarget = false;
  }

  _handlePlayerDamage(payload) {
    this.damageTaken += payload.amount;
    this.currentStreak = 0;
    this.ui.updateHealth(payload.health, payload.shield);
    this.ui.flashDamage();
    this.ui.showDirectionalDamage(payload.sourcePosition, this.player.position, this.player.yaw);
    this.ui.setPickupPrompt(false);

    if (this.player.health <= 30) {
      this.ui.showLowHealthWarning(true);
    }
  }

  _handlePlayerDeath() {
    if (this.state !== 'playing') return;
    this.mission?.markFailed('killed');
    this.state = 'defeat';
    this.audio.setPaused(true);
    this.audio.defeat();
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this._finishMission(false, 'killed');
  }

  _handleEnemyKilled(enemy, info) {
    if (this.state !== 'playing') return;
    this.kills += 1;
    this.currentStreak += 1;
    this.bestStreak = Math.max(this.bestStreak, this.currentStreak);
    this.ui.updateObjective(this.kills, this.enemies.totalEnemies);
    const roleLabel = enemy.role === 'commander' ? 'WARDEN-CLASS' : String(enemy.role || 'SENTINEL').toUpperCase();
    this.ui.addKillFeed(`${roleLabel}-${enemy.spawn.id.split('-')[1] || enemy.spawn.id}`);
    this.audio.kill();
    this.ui.flashHit();
    this.ui.showToast(
      enemy.role === 'commander'
        ? 'COMMAND SIGNAL TERMINATED // WARDEN OFFLINE'
        : info.headshot
          ? 'CRITICAL NEUTRALIZATION // HEADSHOT'
          : 'HOSTILE SIGNAL NEUTRALIZED',
      1200,
    );
  }

  _handleAllEnemiesDown() {
    if (this.state !== 'playing') return;
    const objectiveUnlocked = this.mission?.onAllEnemiesDown();
    this.campaign?.onAllEnemiesDown?.(objectiveUnlocked);
    if (objectiveUnlocked) {
      this.audio.pickup();
      return;
    }
    // Kills never win the mission. The objective console and the extraction pad
    // remain the only route to success; clearing the map simply removes pressure.
    this.ui.showToast(
      this.mission?.objectiveComplete
        ? 'ALL HOSTILES DOWN // CONTINUE TO EXTRACTION'
        : 'RESISTANCE BROKEN // COMPLETE THE PRIMARY OBJECTIVE',
      2600,
    );
    this.audio.pickup();
  }

  deployReserveWave(waveNumber) {
    if (this.state !== 'playing') return 0;
    const count = this.enemies.deployWave(waveNumber);
    if (count > 0) {
      this.ui.showToast(
        `CROWN GUARD DEPLOYED // ${String(count).padStart(2, '0')} NEW SIGNALS`,
        2400,
      );
      this.ui.flashDamage();
      this.audio.pickup();
    }
    return count;
  }

  deployExtractionResponse() {
    if (this.state !== 'playing') return 0;
    const count = this.enemies.deployRemainingReserves();
    if (count > 0) {
      this.ui.showToast(
        `ALARM RESPONSE // ${String(count).padStart(2, '0')} ADDITIONAL SIGNALS`,
        2400,
      );
      this.ui.flashDamage();
      this.audio.pickup();
    }
    return count;
  }

  completeMissionByExtraction() {
    if (this.state !== 'playing') return;
    this._handleVictory();
  }

  failMission(reason = 'timeout') {
    if (this.state !== 'playing') return;
    this.mission?.markFailed(reason);
    this.state = 'defeat';
    this.audio.setPaused(true);
    this.audio.defeat();
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this._finishMission(false, reason);
  }

  _checkInteractions() {
    this._fHandled = false;
    const pressed = this.input.wasPressed('KeyF');
    if (this.ui.intelOpen && pressed) {
      this.ui.hideIntel();
      this._fHandled = true;
      this.ui.setIntelPrompt(false);
      return;
    }

    // Priority: primary objective > optional archive > medkit. This prevents a
    // single F press from both reading a terminal and collecting a biocell.
    const missionPrompt = this.mission?.getPrompt(this.player.position);
    if (missionPrompt) {
      this.ui.setIntelPrompt(true, missionPrompt);
      this.ui.setPickupPrompt(false);
      if (pressed) {
        this.mission.interactObjective(this.player.position);
        this._fHandled = true;
        this.ui.setIntelPrompt(false);
      }
      return;
    }

    const terminal = this.campaign?.getInteractable(this.player.position);
    if (terminal) {
      this.ui.setIntelPrompt(true, {
        label: 'ARCHIVE NODE',
        action: 'READ',
      });
      this.ui.setPickupPrompt(false);
      if (pressed) {
        this.campaign.interact(terminal);
        this._fHandled = true;
        this.ui.setIntelPrompt(false);
      }
      return;
    }
    this.ui.setIntelPrompt(false);

    const medkit = this.world.tryPickupMedkit(this.player.position);
    if (medkit && this.player.health < this.player.maxHealth) {
      if (this.pickupTarget !== medkit) {
        this.pickupTarget = medkit;
        this.ui.setPickupPrompt(true);
        this.ui.showToast('BIOCELL IN RANGE // PRESS F TO COLLECT', 1300);
      }
      if (pressed && !this._fHandled) {
        this.world.consumeMedkit(medkit);
        this.player.heal(42);
        this.audio.pickup();
        this.ui.updateHealth(this.player.health, this.player.shield);
        this.ui.setPickupPrompt(false);
        this.pickupTarget = null;
        this._fHandled = true;
      }
    } else if (this.pickupTarget) {
      this.pickupTarget = null;
      this.ui.setPickupPrompt(false);
    }
  }

  _handleWaveDeployed({ wave, totalWaves, deployed }) {
    if (this.state !== 'playing') return;
    this.ui.showToast(
      `REINFORCEMENT WAVE ${String(wave).padStart(2, '0')}/${String(totalWaves).padStart(2, '0')} // ${deployed} NEW SIGNALS`,
      2600,
    );
    this.ui.flashDamage();
    this.audio.pickup();
  }

  _finishMission(victory, failureReason = null) {
    const stats = {
      victory,
      level: this.level,
      failureReason,
      stats: {
        elapsed: this.gameTime,
        timeRemaining: this.mission?.remaining ?? 0,
        kills: this.kills,
        total: this.enemies.totalEnemies,
        accuracy: this.weapons.getStats().accuracy,
        headshots: this.weapons.getStats().headshots,
        damageTaken: this.damageTaken,
        bestStreak: this.bestStreak,
        debrief: victory ? this.campaign?.debrief || '' : '',
      },
    };
    this.ui.showEnd(stats);
    if (victory) {
      this.audio.victory();
    }
    this.gameTime = Number(this.gameTime.toFixed(2));
  }

  _handleVictory() {
    if (this.state !== 'playing') return;
    this.state = 'victory';
    this.audio.setPaused(true);
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this._finishMission(true);
  }

  _updateTargeting() {
    this.camera.updateMatrixWorld();
    this._targetRaycaster.setFromCamera(this._center, this.camera);
    this._targetRaycaster.far = 80;
    const enemyHits = this._targetRaycaster.intersectObjects(this.enemies.getHitMeshes(), false);
    const worldHits = this._targetRaycaster.intersectObjects(this.world.collisionMeshes, false);
    const enemyDistance = enemyHits[0]?.distance ?? Infinity;
    const worldDistance = worldHits[0]?.distance ?? Infinity;
    this.enemyTarget = enemyDistance < worldDistance && enemyDistance < 70;
  }

  _updatePlaying(dt) {
    this.player.update(dt);
    if (this.player.dead) return;

    // Mission flow runs before hostile AI so crossing the safe-zone threshold
    // arms the clock and combat in the same frame.
    this.mission?.update(dt);
    if (this.state !== 'playing') return;
    this.gameTime = this.mission?.elapsed ?? this.gameTime + dt;

    this.weapons.update(dt, true);
    this.enemies.update(dt, this.player);
    this.effects.update(dt);
    this.world.update(dt, this.gameTime);
    this.campaign?.update(dt);

    const targetFov = this.weapons.getFov(this.settings.get('fov'), this.player.sprinting);
    this.camera.fov = damp(this.camera.fov, targetFov, 16, dt);
    this.camera.updateProjectionMatrix();

    this._checkInteractions();

    if (this.player.health <= 30) {
      this.ui.showLowHealthWarning(true);
      if (this.gameTime - this._lastHeartbeat > 1.45) {
        this._lastHeartbeat = this.gameTime;
        this.audio.heartbeat();
      }
    } else {
      this.ui.showLowHealthWarning(false);
    }

    this._hudAccumulator += dt;
    if (this._hudAccumulator >= 0.08) {
      this._hudAccumulator = 0;
      if (this.mission) {
        this.ui.setTimer(this.mission.remaining, {
          frozen: !this.mission.started,
          label: this.mission.started ? 'TIME TO EXFIL' : 'EXFIL WINDOW',
        });
      }
      this.ui.updateCompass(this.player.yaw);
      this.ui.updateHealth(this.player.health, this.player.shield);
      this._updateTargeting();
      this.ui.updateCrosshair({
        spread: this.weapons.getSpreadNormalized(),
        aiming: this.weapons.adsProgress > 0.55,
        enemyTarget: this.enemyTarget,
      });
    }

    this._crosshairAccumulator += dt;
    if (this._crosshairAccumulator >= 0.034) {
      this._crosshairAccumulator = 0;
      this.ui.updateCrosshair({
        spread: this.weapons.getSpreadNormalized(),
        aiming: this.weapons.adsProgress > 0.55,
        enemyTarget: this.enemyTarget,
      });
    }
  }

  _updateEndState(dt) {
    // Let the death camera/particles settle behind the end card, but do not
    // advance mission time or any hostile logic.
    if (this.state === 'defeat') this.player.update(dt);
    this.effects.update(dt);
    this.world.update(dt, this.gameTime);
  }

  _renderWeapon() {
    if (!(this.state === 'playing' || this.state === 'paused')) return;
    this.renderer.autoClear = false;
    this.renderer.clearDepth();
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.weapons.weaponModel.scene, this.weapons.weaponModel.camera);
    this.renderer.autoClear = true;
  }

  _loop(now) {
    this._raf = requestAnimationFrame(this._loop);
    const dt = Math.min(0.05, Math.max(0, (now - this._last) / 1000));
    this._last = now;

    if (this.state === 'playing') {
      this._updatePlaying(dt);
    } else if (this.state === 'menu') {
      this._updateMenu(dt);
    } else if (this.state === 'victory' || this.state === 'defeat') {
      this._updateEndState(dt);
    }

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, this.camera);
    }
    this._renderWeapon();

    this.input.endFrame();

    if (this._firstFrame) {
      this._firstFrame = false;
      setTimeout(() => this.ui.showBootDone(), 260);
    }
  }

  dispose() {
    cancelAnimationFrame(this._raf);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('orientationchange', this._onResize);
    this.input.dispose();
    this.weapons.dispose();
    this.enemies.dispose();
    this.world.dispose();
    this.composer?.dispose();
    this.renderer.dispose();
    if (this._envRenderTarget) this._envRenderTarget.dispose();
    delete window.__PHANTOM__;
  }

  get elapsedLabel() {
    return formatTime(this.gameTime);
  }
}
