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
    this.victoryPending = 0;
    this.pickupTarget = null;
    this.enemyTarget = false;
    this._lastHeartbeat = -10;
    this._lastVitalsKey = '';

    this._center = new THREE.Vector2(0, 0);
    this._targetRaycaster = new THREE.Raycaster();
    this._worldVector = new THREE.Vector3();
    this._cloudTmp = new THREE.Vector3();

    this._setupRenderer();
    this._setupScene();
    this._setupSystems();
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
    this.world = new World(this.scene, this.renderer, this.materials, this.settings.get('quality'));
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

    this.enemies = new EnemyManager({
      scene: this.scene,
      world: this.world,
      effects: this.effects,
      audio: this.audio,
      quality: this.settings.get('quality'),
      callbacks: {
        onKill: (enemy, info) => this._handleEnemyKilled(enemy, info),
        onMissionComplete: () => this._handleAllEnemiesDown(),
      },
    });

    this.weapons.setEnemyManager(this.enemies);

    // Give the overlay weapon the same image-based lighting as the facility,
    // otherwise high-metalness gun materials read as flat black.
    this.weapons.weaponModel.scene.environment = this.scene.environment;
    this.weapons.weaponModel.scene.environmentIntensity = 0.62;
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
    this.ui.showToast('BLACKOUT PROTOCOL ENGAGED // SITE-09', 2300);
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
    this.ui.showPause({
      elapsed: this.gameTime,
      remaining: this.enemies.remaining,
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
    this.camera.fov = 58;
    this.camera.updateProjectionMatrix();
  }

  resetMission() {
    this.gameTime = 0;
    this.kills = 0;
    this.damageTaken = 0;
    this.currentStreak = 0;
    this.bestStreak = 0;
    this.victoryPending = 0;
    this.pickupTarget = null;
    this.enemyTarget = false;
    this._lastHeartbeat = -10;
    this.player.reset();
    this.weapons.reset();
    this.enemies.reset();
    this.effects.reset();
    this.world.resetPickups();
    this.ui.clearTransient();
    this.ui.updateHealth(this.player.health, this.player.shield);
    this.ui.updateObjective(0, this.enemies.totalEnemies);
    this.ui.updateTimer(0);
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
          time: Number(game.gameTime.toFixed(2)),
          kills: game.kills,
          remaining: game.enemies.remaining,
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
          enemies: game.enemies.enemies.map((enemy) => ({
            id: enemy.spawn.id,
            state: enemy.state,
            alive: enemy.alive,
            hp: Number(enemy.health.toFixed(0)),
            pos: enemy.position.toArray().map((v) => Number(v.toFixed(1))),
            sight: enemy.hasSight,
          })),
          nav: {
            cells: game.enemies.nav.total,
            blocked: game.enemies.nav.blocked.reduce((sum, value) => sum + value, 0),
          },
        };
      },
      startNoLock() {
        if (game.state === 'menu') {
          game.resetMission();
          game.state = 'playing';
          game.ui.enterGame();
          game.audio.unlock();
        }
      },
      teleport(x, z) {
        game.player.position.set(x, 0, z);
        game.player.velocity.set(0, 0, 0);
      },
      look(yaw, pitch = 0) {
        game.player.yaw = yaw;
        game.player.pitch = pitch;
      },
      damageEnemy(index, amount = 50) {
        const enemy = game.enemies.enemies[index];
        if (enemy) enemy.takeDamage(amount, { weapon: 'debug' });
      },
      killAll() {
        for (const enemy of game.enemies.enemies) {
          if (enemy.alive) enemy.takeDamage(1000, { weapon: 'debug' });
        }
      },
      forceFire() {
        game.weapons._shoot();
      },
      setState(state) {
        game.state = state;
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
    // The menu is staged through the insertion-bay doorway so the reactor is
    // framed centrally and the title sits over the darker left third.
    const driftX = Math.sin(time * 0.045) * 1.6;
    const driftY = Math.sin(time * 0.16) * 0.12;
    this.camera.position.set(driftX, 3.35 + driftY, 20.25);
    this.camera.lookAt(driftX * 0.12, 2.15 + Math.sin(time * 0.11) * 0.06, -1.65);
    this.camera.rotation.z = Math.sin(time * 0.07) * 0.005;
  }

  _updateMenu(dt) {
    this.menuTime += dt;
    this.world.update(dt, this.menuTime);
    this._setMenuCamera(this.menuTime);
    this.camera.fov = 58;
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
    this.state = 'defeat';
    this.victoryPending = 0;
    this.audio.setPaused(true);
    this.audio.defeat();
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this._finishMission(false);
  }

  _handleEnemyKilled(enemy, info) {
    if (this.state !== 'playing') return;
    this.kills += 1;
    this.currentStreak += 1;
    this.bestStreak = Math.max(this.bestStreak, this.currentStreak);
    this.ui.updateObjective(this.kills, this.enemies.totalEnemies);
    this.ui.addKillFeed(`SENTINEL-${enemy.spawn.id.split('-')[1] || enemy.spawn.id}`);
    this.audio.kill();
    this.ui.flashHit();
    this.ui.showToast(
      info.headshot ? 'CRITICAL NEUTRALIZATION // HEADSHOT' : 'HOSTILE SIGNAL NEUTRALIZED',
      1200,
    );
  }

  _handleAllEnemiesDown() {
    if (this.state !== 'playing' || this.victoryPending > 0) return;
    this.victoryPending = 1.35;
    this.ui.showToast('ALL HOSTILE SIGNALS OFFLINE // EXFIL READY', 2200);
    this.audio.pickup();
  }

  _finishMission(victory) {
    const stats = {
      victory,
      stats: {
        elapsed: this.gameTime,
        kills: this.kills,
        total: this.enemies.totalEnemies,
        accuracy: this.weapons.getStats().accuracy,
        headshots: this.weapons.getStats().headshots,
        damageTaken: this.damageTaken,
        bestStreak: this.bestStreak,
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
    this.victoryPending = 0;
    this.audio.setPaused(true);
    this.input.releaseAll();
    if (document.pointerLockElement) document.exitPointerLock();
    this._finishMission(true);
  }

  _checkPickup() {
    const medkit = this.world.tryPickupMedkit(this.player.position);
    if (medkit && this.player.health < this.player.maxHealth) {
      if (this.pickupTarget !== medkit) {
        this.pickupTarget = medkit;
        this.ui.setPickupPrompt(true);
        this.ui.showToast('BIOCELL IN RANGE // PRESS F TO COLLECT', 1300);
      }
      if (this.input.wasPressed('KeyF')) {
        this.world.consumeMedkit(medkit);
        this.player.heal(42);
        this.audio.pickup();
        this.ui.updateHealth(this.player.health, this.player.shield);
        this.ui.setPickupPrompt(false);
        this.pickupTarget = null;
      }
    } else if (this.pickupTarget) {
      this.pickupTarget = null;
      this.ui.setPickupPrompt(false);
    }
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
    this.gameTime += dt;
    this.player.update(dt);

    if (this.player.dead) return;

    this.weapons.update(dt, true);
    this.enemies.update(dt, this.player);
    this.effects.update(dt);
    this.world.update(dt, this.gameTime);

    const targetFov = this.weapons.getFov(this.settings.get('fov'), this.player.sprinting);
    this.camera.fov = damp(this.camera.fov, targetFov, 16, dt);
    this.camera.updateProjectionMatrix();

    this._checkPickup();

    if (this.player.health <= 30) {
      this.ui.showLowHealthWarning(true);
      if (this.gameTime - this._lastHeartbeat > 1.45) {
        this._lastHeartbeat = this.gameTime;
        this.audio.heartbeat();
      }
    } else {
      this.ui.showLowHealthWarning(false);
    }

    if (this.victoryPending > 0) {
      this.victoryPending -= dt;
      if (this.victoryPending <= 0) this._handleVictory();
    }

    this._hudAccumulator += dt;
    if (this._hudAccumulator >= 0.08) {
      const step = this._hudAccumulator;
      this._hudAccumulator = 0;
      this.ui.updateTimer(this.gameTime);
      this.ui.updateCompass(this.player.yaw);
      this.ui.updateHealth(this.player.health, this.player.shield);
      this._updateTargeting();
      this.ui.updateCrosshair({
        spread: this.weapons.getSpreadNormalized(),
        aiming: this.weapons.adsProgress > 0.55,
        enemyTarget: this.enemyTarget,
      });
      void step;
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
