import { clamp, formatTime } from '../utils/math.js';
import { DEFAULT_LEVEL_ID, LEVELS, getLevel, getNextLevel } from '../levels/catalog.js';
import { getNarrative, getSpeaker } from '../campaign/narrative.js';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
const LEGACY_BEST_TIME_KEY = 'phantom.bestTime.v1';
const BEST_TIMES_KEY = 'phantom.bestTimes.v1';
const COMPLETED_KEY = 'phantom.completed.v1';

/**
 * DOM HUD and menu controller. All dynamic text goes through textContent,
 * never innerHTML, and time-sensitive indicators are throttled by the caller
 * where they do not need per-frame reactivity.
 */
export class UI {
  constructor({ settings, audio, callbacks = {} }) {
    this.settings = settings;
    this.audio = audio;
    this.callbacks = callbacks;
    this.modal = null;
    this.lastFocus = null;
    this._timers = new Set();
    this._hitTimer = null;
    this._toastTimer = null;
    this._damageTimer = null;
    this._lastAmmo = null;
    this._radioQueue = [];
    this._radioActive = false;
    this._radioTimer = null;
    this._intelTimer = null;
    this.intelOpen = false;
    this.radioActive = false;
    this.level = getLevel(DEFAULT_LEVEL_ID);
    this.bestTimes = {};
    this.completed = new Set();

    this._cache();
    this._buildOperations();
    this._initCompass();
    this._bind();
    this._readProgress();
    this.syncSettings();
    this._applyMotionPreference();
    this.setMission(this.level);
  }

  _cache() {
    const $ = (id) => document.getElementById(id);
    this.el = {
      hud: $('hud'),
      menu: $('menu'),
      boot: $('boot'),
      bootStatus: $('boot-status'),
      pause: $('pause'),
      end: $('end-screen'),
      mobile: $('mobile-notice'),
      damageFlash: $('damage-flash'),
      hitFlash: $('hit-flash'),
      timer: $('timer'),
      timerLabel: $('timer-label'),
      objectivePhase: $('objective-phase'),
      objectiveSubLabel: $('objective-sub-label'),
      missionNav: $('mission-nav'),
      missionNavArrow: $('mission-nav-arrow'),
      missionNavLabel: $('mission-nav-label'),
      missionNavDistance: $('mission-nav-distance'),
      killCount: $('kill-count'),
      objectiveCount: $('objective-count'),
      objectiveTitle: $('objective-title'),
      objectiveFill: $('objective-fill'),
      healthValue: $('health-value'),
      healthFill: $('health-fill'),
      shieldValue: $('shield-value'),
      shieldFill: $('shield-fill'),
      vitals: document.querySelector('.vitals'),
      lowHealth: $('low-health'),
      weaponName: $('weapon-name'),
      weaponMode: $('weapon-mode'),
      weaponClass: $('weapon-class'),
      weaponPanel: document.querySelector('.weapon-panel'),
      ammoCurrent: $('ammo-current'),
      ammoReserve: $('ammo-reserve'),
      ammoFill: $('ammo-fill'),
      reloadState: $('reload-state'),
      crosshair: $('crosshair'),
      hitmarker: $('hitmarker'),
      damageDirection: $('damage-direction'),
      killfeed: $('killfeed'),
      toast: $('toast'),
      reloadPrompt: $('reload-prompt'),
      pickupPrompt: $('pickup-prompt'),
      intelPrompt: $('intel-prompt'),
      intelPromptLabel: $('intel-prompt-label'),
      intelPromptAction: $('intel-prompt-action'),
      intelCard: $('intel-card'),
      intelKicker: $('intel-kicker'),
      intelTitle: $('intel-title'),
      intelBody: $('intel-body'),
      intelSpeaker: $('intel-speaker'),
      radio: $('radio'),
      radioSpeaker: $('radio-speaker'),
      radioRole: $('radio-role'),
      radioText: $('radio-text'),
      compassDeg: $('compass-deg'),
      compassTicks: $('compass-ticks'),
      pauseTime: $('pause-time'),
      pauseRemaining: $('pause-remaining'),
      pauseKills: $('pause-kills'),
      endKicker: $('end-kicker'),
      endTitle: $('end-title'),
      endTitleAccent: $('end-title-accent'),
      endCopy: $('end-copy'),
      endDebrief: $('end-debrief'),
      endGrade: $('end-grade'),
      endRating: $('end-rating'),
      endScore: $('end-score'),
      endTime: $('end-time'),
      endKills: $('end-kills'),
      endAccuracy: $('end-accuracy'),
      endHeadshots: $('end-headshots'),
      endDamage: $('end-damage'),
      endStreak: $('end-streak'),
      endNext: $('end-next'),
      bestTime: $('best-time'),
      menuLocation: $('menu-location'),
      heroCopy: $('hero-copy'),
      activeMission: $('active-mission'),
      activeReadout: $('active-readout'),
      dossierIndex: $('dossier-index'),
      dossierTitle: $('dossier-title'),
      dossierCopy: $('dossier-copy'),
      dossierObjective: $('dossier-objective'),
      dossierHostiles: $('dossier-hostiles'),
      dossierThreat: $('dossier-threat'),
      dossierExfil: $('dossier-exfil'),
      dossierCoords: $('dossier-coords'),
      diagramMain: $('diagram-main'),
      diagramAccent: $('diagram-accent'),
      diagramLabel: $('diagram-label'),
      diagramScale: $('diagram-scale'),
      operationsGrid: $('operations-grid'),
      operationsStatus: $('operations-status'),
      operationsBrief: $('operations-brief-text'),
      operationsBriefSpeaker: $('operations-brief-speaker'),
      sensitivity: $('sensitivity'),
      sensitivityValue: $('sensitivity-value'),
      fov: $('fov'),
      fovValue: $('fov-value'),
      volume: $('volume'),
      volumeValue: $('volume-value'),
      invertY: $('invert-y'),
      reducedMotion: $('reduced-motion'),
      qualityNote: $('quality-note'),
      qualityButtons: Array.from(document.querySelectorAll('[data-quality]')),
      startButton: $('start-button'),
      resetSettings: $('reset-settings'),
      settingsModal: $('settings-modal'),
      controlsModal: $('controls-modal'),
    };
  }

  _initCompass() {
    if (!this.el.compassTicks) return;
    this.compassMarks = [];
    const cardinals = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' };
    for (let angle = 0; angle < 360; angle += 15) {
      const mark = document.createElement('span');
      mark.className = `compass__tick${angle % 90 === 0 ? ' compass__tick--major' : ''}`;
      mark.textContent = cardinals[angle] || (angle % 30 === 0 ? String(angle) : '');
      this.el.compassTicks.appendChild(mark);
      this.compassMarks.push({ angle, mark });
    }
  }

  _buildOperations() {
    if (!this.el.operationsGrid) return;
    this.operationCards = new Map();
    for (const level of LEVELS) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'operation-card';
      card.dataset.level = level.id;
      card.style.setProperty('--op-accent', level.accent);
      card.setAttribute('aria-pressed', 'false');

      const index = document.createElement('span');
      index.className = 'operation-card__index mono';
      index.textContent = level.index;

      const body = document.createElement('span');
      body.className = 'operation-card__body';
      const meta = document.createElement('span');
      meta.className = 'operation-card__meta mono';
      meta.textContent = `${level.code.replace('OP / ', '')} // ${level.biome}`;
      const name = document.createElement('strong');
      name.className = 'operation-card__name';
      name.textContent = level.name;
      const readout = document.createElement('span');
      readout.className = 'operation-card__readout mono';
      readout.textContent = `${level.readout} // ${String(level.hostiles).padStart(2, '0')} HOSTILES`;
      body.append(meta, name, readout);

      const state = document.createElement('span');
      state.className = 'operation-card__state mono';
      state.textContent = 'READY';

      card.append(index, body, state);
      card.setAttribute('aria-label', `${level.index}. ${level.name}, ${level.location}, ${level.hostiles} hostiles, threat ${level.threat}`);
      this.el.operationsGrid.appendChild(card);
      this.operationCards.set(level.id, { card, state });
    }
  }

  _bind() {
    const click = this._click.bind(this);

    this.el.startButton?.addEventListener('click', () => {
      click();
      if (this.callbacks.onStart) this.callbacks.onStart();
    });

    document.getElementById('resume-button')?.addEventListener('click', () => {
      click();
      if (this.callbacks.onResume) this.callbacks.onResume();
    });

    document.getElementById('pause-restart')?.addEventListener('click', () => {
      click();
      if (this.callbacks.onRestart) this.callbacks.onRestart();
    });

    document.getElementById('pause-quit')?.addEventListener('click', () => {
      click();
      if (this.callbacks.onAbort) this.callbacks.onAbort();
    });

    document.getElementById('pause-settings')?.addEventListener('click', () => {
      click();
      this.openModal('settings-modal');
    });

    document.getElementById('end-restart')?.addEventListener('click', () => {
      click();
      if (this.callbacks.onRestart) this.callbacks.onRestart();
    });

    document.getElementById('end-menu')?.addEventListener('click', () => {
      click();
      if (this.callbacks.onAbort) this.callbacks.onAbort();
    });

    this.el.endNext?.addEventListener('click', () => {
      click();
      if (this.callbacks.onNext) this.callbacks.onNext();
    });

    this.el.operationsGrid?.addEventListener('click', (event) => {
      const card = event.target.closest('[data-level]');
      if (!card) return;
      const level = getLevel(card.dataset.level);
      click();
      this.closeModal(true);
      if (this.callbacks.onLevelSelect) this.callbacks.onLevelSelect(level.id);
    });

    // Modal triggers and closers.
    for (const trigger of document.querySelectorAll('[data-open]')) {
      trigger.addEventListener('click', () => {
        click();
        this.openModal(trigger.dataset.open);
      });
    }
    for (const closer of document.querySelectorAll('[data-close]')) {
      closer.addEventListener('click', () => {
        click();
        this.closeModal();
      });
    }

    // Settings.
    this.el.sensitivity?.addEventListener('input', (event) => {
      const value = Number(event.target.value);
      this.settings.set('sensitivity', value);
      this._updateSlider(this.el.sensitivity, this.el.sensitivityValue, value.toFixed(2), value, 0.2, 3);
      this._emitSetting('sensitivity', value);
    });

    this.el.fov?.addEventListener('input', (event) => {
      const value = Number(event.target.value);
      this.settings.set('fov', value);
      this._updateSlider(this.el.fov, this.el.fovValue, `${value}°`, value, 65, 105);
      this._emitSetting('fov', value);
    });

    this.el.volume?.addEventListener('input', (event) => {
      const value = Number(event.target.value);
      this.settings.set('volume', value);
      this._updateSlider(this.el.volume, this.el.volumeValue, `${Math.round(value * 100)}%`, value, 0, 1);
      this.audio.setVolume(value);
      this._emitSetting('volume', value);
    });

    this.el.invertY?.addEventListener('change', (event) => {
      this.settings.set('invertY', event.target.checked);
      this._emitSetting('invertY', event.target.checked);
    });

    this.el.reducedMotion?.addEventListener('change', (event) => {
      this.settings.set('reducedMotion', event.target.checked);
      this._applyMotionPreference();
      this._emitSetting('reducedMotion', event.target.checked);
    });

    for (const button of this.el.qualityButtons) {
      button.addEventListener('click', () => {
        click();
        const quality = button.dataset.quality;
        this.settings.set('quality', quality);
        this._syncQuality();
        this._emitSetting('quality', quality);
      });
    }

    this.el.resetSettings?.addEventListener('click', () => {
      click();
      this.settings.reset();
      this.syncSettings();
      this.audio.setVolume(this.settings.get('volume'));
      this._emitSetting('reset', true);
    });

    // Esc closes a modal, otherwise is handled by the game's pointer-lock flow.
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && this.modal) {
        event.preventDefault();
        this.closeModal();
      }
    });

    // Keyboard trap for dialogs.
    document.addEventListener('keydown', (event) => {
      if (!this.modal || event.key !== 'Tab') return;
      const focusable = Array.from(this.modal.querySelectorAll(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // UI audio feedback, delegated to avoid dozens of listeners.
    for (const button of document.querySelectorAll('.btn, .icon-btn, .segmented button')) {
      button.addEventListener('pointerenter', () => this.audio.uiHover());
    }
  }

  _click() {
    this.audio.uiClick();
  }

  _updateSlider(input, output, label, value, min, max) {
    if (!input) return;
    if (output) output.textContent = label;
    const pct = ((value - min) / (max - min)) * 100;
    input.style.setProperty('--fill', `${pct}%`);
  }

  _emitSetting(key, value) {
    if (this.callbacks.onSettingsChange) this.callbacks.onSettingsChange(key, value);
  }

  _applyMotionPreference() {
    const reduced = this.settings.get('reducedMotion');
    document.documentElement.classList.toggle('user-reduced-motion', reduced);
  }

  syncSettings() {
    const s = this.settings.values;
    if (this.el.sensitivity) {
      this.el.sensitivity.value = s.sensitivity;
      this._updateSlider(this.el.sensitivity, this.el.sensitivityValue, Number(s.sensitivity).toFixed(2), s.sensitivity, 0.2, 3);
    }
    if (this.el.fov) {
      this.el.fov.value = s.fov;
      this._updateSlider(this.el.fov, this.el.fovValue, `${s.fov}°`, s.fov, 65, 105);
    }
    if (this.el.volume) {
      this.el.volume.value = s.volume;
      this._updateSlider(this.el.volume, this.el.volumeValue, `${Math.round(s.volume * 100)}%`, s.volume, 0, 1);
    }
    if (this.el.invertY) this.el.invertY.checked = s.invertY;
    if (this.el.reducedMotion) this.el.reducedMotion.checked = s.reducedMotion;
    this._syncQuality();
  }

  _syncQuality() {
    const quality = this.settings.get('quality');
    for (const button of this.el.qualityButtons) {
      const active = button.dataset.quality === quality;
      button.setAttribute('aria-checked', String(active));
    }
    if (this.el.qualityNote) {
      this.el.qualityNote.textContent =
        quality === 'high' ? 'BLOOM + SHADOWS' : quality === 'medium' ? 'BALANCED' : 'PERFORMANCE';
    }
  }

  openModal(id) {
    const target = document.getElementById(id);
    if (!target) return;
    if (this.modal && this.modal !== target) this.closeModal(true);
    this.lastFocus = document.activeElement;
    this.modal = target;
    target.hidden = false;
    document.body.classList.add('modal-open');
    const first = target.querySelector(FOCUSABLE);
    if (first) requestAnimationFrame(() => first.focus({ preventScroll: true }));
  }

  closeModal(silent = false) {
    if (!this.modal) return;
    this.modal.hidden = true;
    this.modal = null;
    document.body.classList.remove('modal-open');
    if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
      this.lastFocus.focus({ preventScroll: true });
    }
    if (!silent) this.audio.uiClick();
  }

  /* ------------------------------------------------------------------ */
  /* Screen state                                                       */
  /* ------------------------------------------------------------------ */

  setMission(levelOrId) {
    const level = typeof levelOrId === 'string' ? getLevel(levelOrId) : levelOrId;
    if (!level) return;
    this.level = level;

    if (this.el.heroCopy) this.el.heroCopy.textContent = level.hero;
    if (this.el.menuLocation) this.el.menuLocation.textContent = `${level.locationShort} / ${level.coords}`;
    if (this.el.activeMission) this.el.activeMission.textContent = `${level.index} / ${level.name}`;
    if (this.el.activeReadout) this.el.activeReadout.textContent = level.readout;
    if (this.el.dossierIndex) this.el.dossierIndex.textContent = level.code;
    if (this.el.dossierTitle) this.el.dossierTitle.textContent = level.dossierTitle;
    if (this.el.dossierCopy) this.el.dossierCopy.textContent = level.brief;
    if (this.el.dossierObjective) this.el.dossierObjective.textContent = level.objective;
    if (this.el.dossierHostiles) {
      this.el.dossierHostiles.textContent = `${String(level.hostiles).padStart(2, '0')} // ${this.completed.has(level.id) ? 'CLEARED' : 'ACTIVE'}`;
    }
    if (this.el.dossierThreat) this.el.dossierThreat.textContent = level.threat;
    if (this.el.dossierExfil) this.el.dossierExfil.textContent = level.exfilLabel ? `MANUAL // ${level.exfilLabel}` : 'MANUAL';
    if (this.el.dossierCoords) this.el.dossierCoords.textContent = level.coords;
    if (this.el.objectiveTitle) this.el.objectiveTitle.textContent = level.objective;
    if (this.el.diagramMain) this.el.diagramMain.setAttribute('d', level.diagram.main);
    if (this.el.diagramAccent) {
      this.el.diagramAccent.setAttribute('d', level.diagram.accent);
      this.el.diagramAccent.setAttribute('stroke', level.accent);
    }
    if (this.el.diagramLabel) this.el.diagramLabel.textContent = `${level.locationShort} // GRID ${level.index}`;
    if (this.el.diagramScale) this.el.diagramScale.textContent = `THREAT ${level.threat}`;
    const briefLine = getNarrative(level.id).intro?.[0];
    if (this.el.operationsBrief && briefLine) {
      this.el.operationsBrief.textContent = briefLine.text;
      if (this.el.operationsBriefSpeaker) {
        this.el.operationsBriefSpeaker.textContent = `${getSpeaker(briefLine.speaker).name} // MISSION COMMAND`;
      }
    }
    const startIndex = this.el.startButton?.querySelector('.btn__index');
    if (startIndex) startIndex.textContent = level.index;

    this._refreshOperationStates();
    this._renderBestTime();
  }

  _refreshOperationStates() {
    if (!this.operationCards) return;
    for (const level of LEVELS) {
      const entry = this.operationCards.get(level.id);
      if (!entry) continue;
      const active = level.id === this.level.id;
      const cleared = this.completed.has(level.id);
      entry.card.classList.toggle('is-active', active);
      entry.card.classList.toggle('is-cleared', cleared);
      entry.card.setAttribute('aria-pressed', String(active));
      entry.state.textContent = active ? 'ACTIVE' : cleared ? 'CLEARED' : 'READY';
    }
    if (this.el.operationsStatus) {
      this.el.operationsStatus.textContent = `${String(LEVELS.length).padStart(2, '0')} OPERATIONS // ${String(this.completed.size).padStart(2, '0')} CLEARED`;
    }
    if (this.el.dossierHostiles) {
      this.el.dossierHostiles.textContent = `${String(this.level.hostiles).padStart(2, '0')} // ${this.completed.has(this.level.id) ? 'CLEARED' : 'ACTIVE'}`;
    }
  }

  _renderBestTime() {
    const time = this.bestTimes[this.level.id] ?? null;
    this.bestTime = time;
    if (this.el.bestTime) {
      this.el.bestTime.textContent = time ? `BEST TIME ${formatTime(time)}` : 'BEST TIME —:—';
    }
  }

  showMenu() {
    this.el.menu.hidden = false;
    this.el.menu.classList.remove('is-leaving');
    this.el.hud.classList.add('is-hidden');
    this.el.hud.setAttribute('aria-hidden', 'true');
    this.el.pause.hidden = true;
    this.el.end.hidden = true;
    this.el.end.classList.remove('is-defeat');
    this.el.damageFlash.classList.remove('is-active');
    this.el.toast.classList.remove('is-visible');
    this.el.reloadPrompt.classList.remove('is-visible');
    this.el.pickupPrompt.classList.remove('is-visible');
    this.setIntelPrompt(false);
    this.updateNavigation({ active: false });
    this.hideRadio();
    this.hideIntel();
    this.closeModal(true);
    this.syncSettings();
  }

  enterGame() {
    this.el.menu.classList.add('is-leaving');
    this.el.hud.classList.remove('is-hidden');
    this.el.hud.setAttribute('aria-hidden', 'false');
    this.el.pause.hidden = true;
    this.el.end.hidden = true;
    this.el.damageFlash.classList.remove('is-active');
    this.el.hitFlash.classList.remove('is-active');
    this.setIntelPrompt(false);
  }

  showPause(stats = {}) {
    this.el.pause.hidden = false;
    this.el.pauseTime.textContent = formatTime(stats.remainingTime ?? stats.elapsed ?? 0);
    this.el.pauseRemaining.textContent = String(stats.remaining ?? 0).padStart(2, '0');
    this.el.pauseKills.textContent = String(stats.kills ?? 0).padStart(2, '0');
    const first = this.el.pause.querySelector(FOCUSABLE);
    if (first) first.focus({ preventScroll: true });
  }

  hidePause() {
    this.el.pause.hidden = true;
  }

  showEnd({ victory, stats, level = this.level, failureReason = null }) {
    this.level = level;
    const timedOut = !victory && failureReason === 'timeout';
    this.el.hud.classList.add('is-hidden');
    this.el.pause.hidden = true;
    this.el.end.hidden = false;
    this.setIntelPrompt(false);
    this.hideRadio();
    this.hideIntel();
    this.closeModal(true);
    this.el.end.classList.toggle('is-defeat', !victory);

    const accuracy = clamp(stats.accuracy || 0, 0, 1);
    const time = stats.elapsed || 0;
    const kills = Math.max(0, Math.round(stats.kills || 0));
    const total = Math.max(kills, stats.total || kills || 1);
    const headshots = Math.max(0, Math.round(stats.headshots || 0));
    const damage = Math.max(0, Math.round(stats.damageTaken || 0));

    const timeBonus = victory ? Math.max(0, 6000 - Math.round(time * 18)) : 0;
    const rawScore = kills * 1000 + headshots * 140 + Math.round(accuracy * 2000) + timeBonus - damage * 12;
    const score = Math.max(0, rawScore);

    let grade = 'C';
    let rating = 'COMPLIANT';
    if (victory) {
      if (score >= 14500) {
        grade = 'S';
        rating = 'EXEMPLARY';
      } else if (score >= 11500) {
        grade = 'A';
        rating = 'SUPERIOR';
      } else if (score >= 8500) {
        grade = 'B';
        rating = 'EFFECTIVE';
      } else {
        grade = 'C';
        rating = 'ADEQUATE';
      }
    } else {
      grade = 'F';
      rating = 'SIGNAL LOST';
    }

    this.el.endKicker.textContent = victory
      ? `OPERATION COMPLETE // ${level.locationShort} SECURED`
      : timedOut
        ? `EXFIL WINDOW CLOSED // ${level.locationShort} NOT SECURED`
        : `OPERATIVE DOWN // ${level.locationShort} LOST`;
    this.el.endTitle.setAttribute('aria-label', victory ? 'Mission complete' : timedOut ? 'Exfil failed' : 'Signal lost');
    this.el.endTitle.childNodes[0].nodeValue = victory ? 'MISSION' : timedOut ? 'EXFIL' : 'SIGNAL';
    this.el.endTitleAccent.textContent = victory ? 'COMPLETE' : timedOut ? 'FAILED' : 'LOST';
    this.el.endCopy.textContent = victory
      ? level.victoryCopy
      : timedOut
        ? level.timeoutCopy || 'The extraction window closed before you reached the pad. The mission is not complete.'
        : level.defeatCopy;
    if (this.el.endDebrief) {
      this.el.endDebrief.textContent = victory ? stats.debrief || '' : '';
      this.el.endDebrief.hidden = !victory || !stats.debrief;
    }
    this.el.endGrade.textContent = grade;
    this.el.endRating.textContent = rating;
    this.el.endScore.textContent = `SCORE ${String(score).padStart(6, '0')}`;
    this.el.endTime.textContent = formatTime(time);
    this.el.endKills.textContent = `${String(kills).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    this.el.endAccuracy.textContent = `${Math.round(accuracy * 100)}%`;
    this.el.endHeadshots.textContent = String(headshots).padStart(2, '0');
    this.el.endDamage.textContent = String(damage).padStart(3, '0');
    this.el.endStreak.textContent = String(stats.bestStreak || 0).padStart(2, '0');

    if (victory) this._maybeSaveBestTime(time);
    const next = victory ? getNextLevel(level.id) : null;
    if (this.el.endNext) {
      this.el.endNext.hidden = !next;
      this.el.endNext.title = next ? `Continue to ${next.name}` : '';
    }
    this.el.end.classList.toggle('has-next', Boolean(next));

    const first = Array.from(this.el.end.querySelectorAll(FOCUSABLE)).find((node) => node.offsetParent !== null);
    if (first) requestAnimationFrame(() => first.focus({ preventScroll: true }));
  }

  showBootDone() {
    this.el.boot.classList.add('is-done');
    setTimeout(() => {
      this.el.boot.hidden = true;
    }, 800);
  }

  showBootStatus(text) {
    if (this.el.bootStatus) this.el.bootStatus.textContent = text;
  }

  showFatalError() {
    document.getElementById('webgl-error').hidden = false;
    this.el.boot.hidden = true;
  }

  showMobileNotice() {
    this.el.mobile.hidden = false;
    this.el.menu.hidden = true;
    this.el.hud.classList.add('is-hidden');
    this.el.boot.hidden = true;
  }

  /* ------------------------------------------------------------------ */
  /* HUD updates                                                        */
  /* ------------------------------------------------------------------ */

  updateHealth(health, shield) {
    const h = clamp(health, 0, 100);
    const s = clamp(shield, 0, 50);
    this.el.healthValue.textContent = String(Math.ceil(h));
    this.el.shieldValue.textContent = String(Math.ceil(s));
    this.el.healthFill.style.width = `${h}%`;
    this.el.shieldFill.style.width = `${(s / 50) * 100}%`;
    const critical = h <= 30;
    this.el.vitals.classList.toggle('is-critical', critical);
    this.showLowHealthWarning(critical);
  }

  updateAmmo(state) {
    const { current, reserve, max, reloading } = state;
    this.el.ammoCurrent.textContent = String(current).padStart(2, '0');
    this.el.ammoReserve.textContent = String(reserve).padStart(3, '0');
    const ratio = max > 0 ? current / max : 0;
    this.el.ammoFill.style.width = `${ratio * 100}%`;
    this.el.ammoCurrent.classList.toggle('is-low', current > 0 && current <= Math.max(2, Math.ceil(max * 0.18)));
    this.el.weaponPanel.classList.toggle('is-low', current === 0);
    this.el.reloadPrompt.classList.toggle('is-visible', current === 0 && !reloading && reserve > 0);
    this.el.crosshair.classList.toggle('is-empty', current === 0);
    this.el.reloadState.textContent = reloading ? 'RELOADING' : current === 0 ? 'MAG EMPTY' : '';
    if (this.el.ammoCurrent.textContent !== this._lastAmmo) {
      this._lastAmmo = this.el.ammoCurrent.textContent;
      this.el.ammoCurrent.animate(
        [
          { transform: 'translateY(-4px)', opacity: 0.55 },
          { transform: 'translateY(0)', opacity: 1 },
        ],
        { duration: 130, easing: 'cubic-bezier(.22,1,.36,1)' },
      );
    }
  }

  updateWeapon(weapon) {
    this.el.weaponName.textContent = weapon.name;
    this.el.weaponMode.textContent = weapon.mode;
    this.el.weaponClass.textContent = weapon.category;
    const slot = this.el.weaponPanel.querySelector('.weapon-panel__slot b');
    if (slot) slot.textContent = String(weapon.slot).padStart(2, '0');
    this.el.reloadState.textContent = '';
  }

  updateObjective(killed, total) {
    this.el.objectiveCount.textContent = String(Math.max(0, total - killed)).padStart(2, '0');
    this.el.killCount.childNodes[0].nodeValue = String(killed).padStart(2, '0');
    const totalSpan = this.el.killCount.querySelector('span');
    if (totalSpan) totalSpan.textContent = `/${String(total).padStart(2, '0')}`;
    this.el.objectiveFill.style.width = `${total > 0 ? (killed / total) * 100 : 0}%`;
  }

  updateTimer(seconds) {
    this.el.timer.textContent = formatTime(seconds);
  }

  setTimer(seconds, { frozen = false, label = null } = {}) {
    this.el.timer.textContent = formatTime(Math.max(0, seconds));
    this.el.timer.classList.toggle('is-frozen', Boolean(frozen));
    this.el.timer.classList.toggle('is-critical', !frozen && seconds <= 60);
    this.el.timer.parentElement?.classList.toggle('is-critical', !frozen && seconds <= 60);
    if (label && this.el.timerLabel) this.el.timerLabel.textContent = label;
  }

  markTimerCritical(critical) {
    this.el.timer.classList.toggle('is-critical', Boolean(critical));
    this.el.timer.parentElement?.classList.toggle('is-critical', Boolean(critical));
  }

  setMissionPhase(phase, {
    objective = null,
    extraction = 'EXTRACTION',
    frozen = false,
  } = {}) {
    const kicker = {
      SAFE_ZONE: 'SAFE ZONE // CLOCK HOLD',
      MISSION_ACTIVE: 'ACTIVE DIRECTIVE',
      OBJECTIVE_COMPLETED: 'OBJECTIVE COMPLETE',
      EXTRACTION_ACTIVE: 'EXTRACTION ACTIVE',
      MISSION_SUCCESS: 'EXFIL COMPLETE',
      MISSION_FAILED: 'MISSION FAILED',
    }[phase] || 'ACTIVE DIRECTIVE';
    if (this.el.objectivePhase) this.el.objectivePhase.textContent = kicker;
    if (objective && this.el.objectiveTitle) this.el.objectiveTitle.textContent = objective;
    if (this.el.objectiveSubLabel) {
      this.el.objectiveSubLabel.textContent =
        phase === 'EXTRACTION_ACTIVE' ? 'HOSTILES ACTIVE' : 'HOSTILES REMAINING';
    }
    if (this.el.timerLabel) {
      this.el.timerLabel.textContent = frozen ? 'EXFIL WINDOW' : 'TIME TO EXFIL';
    }
    if (this.el.timer) this.el.timer.classList.toggle('is-frozen', Boolean(frozen));
    this.el.hud?.classList.toggle('is-exfil', phase === 'EXTRACTION_ACTIVE');
    if (phase === 'EXTRACTION_ACTIVE' && extraction) {
      this.el.objectiveTitle?.setAttribute('data-extraction', extraction);
    }
  }

  updateNavigation({
    active = false,
    label = '',
    distance = 0,
    bearing = 0,
    extraction = false,
    floor = 1,
  } = {}) {
    if (!this.el.missionNav) return;
    this.el.missionNav.classList.toggle('is-visible', Boolean(active));
    this.el.missionNav.classList.toggle('is-extraction', Boolean(extraction));
    this.el.missionNav.setAttribute('aria-hidden', String(!active));
    if (!active) return;
    if (this.el.missionNavLabel) {
      this.el.missionNavLabel.textContent = floor > 1 ? `${label} // L${floor}` : label;
    }
    if (this.el.missionNavDistance) {
      this.el.missionNavDistance.textContent = `${String(Math.max(0, Math.round(distance))).padStart(3, '0')} M`;
    }
    if (this.el.missionNavArrow) {
      this.el.missionNavArrow.style.transform = `rotate(${(bearing * 180) / Math.PI}deg)`;
    }
  }

  updateCompass(yaw) {
    const deg = ((-yaw * 180) / Math.PI + 360) % 360;
    this.el.compassDeg.textContent = String(Math.round(deg) % 360).padStart(3, '0');
    if (!this.compassMarks) return;
    // The displayed band spans ±60°, matching the masked compass window.
    for (const { angle, mark } of this.compassMarks) {
      let delta = angle - deg;
      delta = ((delta + 540) % 360) - 180;
      const visible = Math.abs(delta) <= 64;
      mark.style.left = `${50 + (delta / 128) * 100}%`;
      mark.style.opacity = visible ? String(1 - Math.abs(delta) / 92) : '0';
      mark.style.visibility = visible ? 'visible' : 'hidden';
    }
  }

  updateCrosshair({ spread, aiming, enemyTarget }) {
    const px = Math.round(3 + spread * 17);
    this.el.crosshair.style.setProperty('--spread', `${px}px`);
    this.el.crosshair.classList.toggle('is-ads', aiming);
    this.el.crosshair.classList.toggle('is-enemy', Boolean(enemyTarget));
  }

  setReloadState(reloading, progress = 0) {
    this.el.reloadState.textContent = reloading ? `RELOADING ${Math.round(progress * 100)}%` : '';
    this.el.reloadPrompt.classList.toggle('is-visible', false);
  }

  setPickupPrompt(visible) {
    this.el.pickupPrompt.classList.toggle('is-visible', Boolean(visible));
  }

  showHitmarker({ headshot = false, killed = false } = {}) {
    const marker = this.el.hitmarker;
    marker.classList.remove('is-hit', 'is-kill', 'is-headshot');
    void marker.offsetWidth;
    marker.classList.add('is-hit');
    if (headshot) marker.classList.add('is-headshot');
    if (killed) marker.classList.add('is-kill');
    clearTimeout(this._hitTimer);
    this._hitTimer = setTimeout(() => {
      marker.classList.remove('is-hit', 'is-kill', 'is-headshot');
    }, 220);
  }

  flashDamage() {
    this.el.damageFlash.classList.add('is-active');
    clearTimeout(this._damageTimer);
    this._damageTimer = setTimeout(() => {
      this.el.damageFlash.classList.remove('is-active');
    }, 280);
  }

  flashHit() {
    this.el.hitFlash.classList.add('is-active');
    setTimeout(() => this.el.hitFlash.classList.remove('is-active'), 80);
  }

  showDirectionalDamage(sourcePosition, playerPosition, yaw) {
    if (!sourcePosition) return;
    const dx = sourcePosition.x - playerPosition.x;
    const dz = sourcePosition.z - playerPosition.z;
    // Conic-gradient 0deg points up (north). The player's facing vector is
    // (-sin(yaw), -cos(yaw)); convert both to a clockwise screen bearing.
    const worldBearing = (Math.atan2(dx, -dz) * 180) / Math.PI;
    const cameraBearing = ((-yaw * 180) / Math.PI + 360) % 360;
    const degrees = (worldBearing - cameraBearing + 360) % 360;
    this.el.damageDirection.style.setProperty('--angle', `${degrees}deg`);
    this.el.damageDirection.classList.remove('is-active');
    void this.el.damageDirection.offsetWidth;
    this.el.damageDirection.classList.add('is-active');
    setTimeout(() => this.el.damageDirection.classList.remove('is-active'), 650);
  }

  addKillFeed(name = 'SENTINEL') {
    const row = document.createElement('div');
    row.className = 'killfeed__row';
    const operative = document.createElement('b');
    operative.textContent = 'PHANTOM-1';
    const glyph = document.createElement('i');
    glyph.textContent = '⌁';
    const target = document.createElement('b');
    target.textContent = name;
    row.append(operative, glyph, target, document.createTextNode('NEUTRALIZED'));
    this.el.killfeed.prepend(row);
    while (this.el.killfeed.children.length > 4) {
      this.el.killfeed.lastElementChild?.remove();
    }
    const timeout = setTimeout(() => {
      row.classList.add('is-fading');
      setTimeout(() => row.remove(), 350);
    }, 3600);
    this._timers.add(timeout);
  }

  setObjective(title) {
    if (this.el.objectiveTitle && title) this.el.objectiveTitle.textContent = title;
  }

  setIntelPrompt(visible, { label = 'ARCHIVE NODE', action = 'READ' } = {}) {
    if (!this.el.intelPrompt) return;
    if (this.el.intelPromptLabel) this.el.intelPromptLabel.textContent = label;
    if (this.el.intelPromptAction) this.el.intelPromptAction.textContent = action;
    this.el.intelPrompt.classList.toggle('is-visible', Boolean(visible));
  }

  showIntel({ kicker = 'ARCHIVE RECOVERED', title, body, speaker }) {
    if (!this.el.intelCard) return;
    this.intelOpen = true;
    if (this.el.intelKicker) this.el.intelKicker.textContent = kicker;
    if (this.el.intelTitle) this.el.intelTitle.textContent = title;
    if (this.el.intelBody) this.el.intelBody.textContent = body;
    if (this.el.intelSpeaker) this.el.intelSpeaker.textContent = speaker;
    this.el.intelCard.classList.add('is-visible');
    clearTimeout(this._intelTimer);
    this._intelTimer = setTimeout(() => this.hideIntel(), 14000);
  }

  hideIntel() {
    this.intelOpen = false;
    clearTimeout(this._intelTimer);
    this.el.intelCard?.classList.remove('is-visible');
  }

  showRadio({ speaker, text }) {
    if (!text) return;
    this._radioQueue.push({ speaker, text });
    if (!this._radioActive) this._playNextRadio();
  }

  _playNextRadio() {
    const line = this._radioQueue.shift();
    if (!line) {
      this._radioActive = false;
      this.radioActive = false;
      return;
    }
    this._radioActive = true;
    this.radioActive = true;
    this.el.radioSpeaker.textContent = line.speaker?.name || 'COMMAND';
    this.el.radioRole.textContent = line.speaker?.role || 'MISSION CHANNEL';
    this.el.radioText.textContent = line.text;
    this.el.radio.style.setProperty('--radio-accent', line.speaker?.accent || '#6be7ff');
    this.el.radio.classList.add('is-visible');
    const duration = clamp(2400 + line.text.length * 38, 3200, 7600);
    clearTimeout(this._radioTimer);
    this._radioTimer = setTimeout(() => {
      this.el.radio.classList.remove('is-visible');
      this._radioActive = false;
      this.radioActive = false;
      this._radioTimer = setTimeout(() => this._playNextRadio(), 180);
    }, duration);
  }

  hideRadio() {
    clearTimeout(this._radioTimer);
    this._radioQueue = [];
    this._radioActive = false;
    this.radioActive = false;
    this.el.radio?.classList.remove('is-visible');
  }

  showToast(message, duration = 1800) {
    this.el.toast.textContent = message;
    this.el.toast.classList.add('is-visible');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.el.toast.classList.remove('is-visible'), duration);
  }

  showLowHealthWarning(show) {
    this.el.lowHealth.style.display = show ? 'block' : '';
  }

  setMenuRequirementError(message) {
    const requirements = document.querySelector('.menu__requirements');
    if (requirements) requirements.dataset.error = message;
  }

  clearTransient() {
    this.el.killfeed.replaceChildren();
    this.el.toast.classList.remove('is-visible');
    this.el.damageDirection.classList.remove('is-active');
    this.el.reloadPrompt.classList.remove('is-visible');
    this.el.pickupPrompt.classList.remove('is-visible');
    this.el.damageFlash.classList.remove('is-active');
    this.el.hitFlash.classList.remove('is-active');
    this.setIntelPrompt(false);
    this.hideRadio();
    this.hideIntel();
  }

  _readProgress() {
    this.bestTimes = {};
    this.completed = new Set();
    try {
      const raw = localStorage.getItem(BEST_TIMES_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === 'object') {
        for (const level of LEVELS) {
          const value = Number(parsed[level.id]);
          if (Number.isFinite(value) && value > 0) this.bestTimes[level.id] = value;
        }
      }
      // Preserve the original single-mission best time from v1.0 builds.
      if (this.bestTimes['site-09'] === undefined) {
        const legacy = Number(localStorage.getItem(LEGACY_BEST_TIME_KEY));
        if (Number.isFinite(legacy) && legacy > 0) this.bestTimes['site-09'] = legacy;
      }
      const completed = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]');
      if (Array.isArray(completed)) {
        for (const id of completed) {
          if (LEVELS.some((level) => level.id === id)) this.completed.add(id);
        }
      }
    } catch {
      // Progress is optional; the campaign remains fully playable in private
      // browsing contexts where storage is unavailable.
    }
    this._renderBestTime();
    this._refreshOperationStates();
  }

  _saveProgress() {
    try {
      localStorage.setItem(BEST_TIMES_KEY, JSON.stringify(this.bestTimes));
      localStorage.setItem(COMPLETED_KEY, JSON.stringify([...this.completed]));
    } catch {
      // Scoring still works without persistence.
    }
  }

  _maybeSaveBestTime(time) {
    if (!Number.isFinite(time) || time <= 0) return;
    const current = this.bestTimes[this.level.id];
    if (current === undefined || time < current) {
      this.bestTimes[this.level.id] = time;
    }
    this.completed.add(this.level.id);
    this._saveProgress();
    this._renderBestTime();
    this._refreshOperationStates();
  }
}
