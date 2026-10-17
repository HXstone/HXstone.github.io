import { clamp, formatTime } from '../utils/math.js';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
const BEST_TIME_KEY = 'phantom.bestTime.v1';

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

    this._cache();
    this._initCompass();
    this._bind();
    this._readBestTime();
    this.syncSettings();
    this._applyMotionPreference();
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
      killCount: $('kill-count'),
      objectiveCount: $('objective-count'),
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
      compassDeg: $('compass-deg'),
      compassTicks: $('compass-ticks'),
      pauseTime: $('pause-time'),
      pauseRemaining: $('pause-remaining'),
      pauseKills: $('pause-kills'),
      endKicker: $('end-kicker'),
      endTitle: $('end-title'),
      endTitleAccent: $('end-title-accent'),
      endCopy: $('end-copy'),
      endGrade: $('end-grade'),
      endRating: $('end-rating'),
      endScore: $('end-score'),
      endTime: $('end-time'),
      endKills: $('end-kills'),
      endAccuracy: $('end-accuracy'),
      endHeadshots: $('end-headshots'),
      endDamage: $('end-damage'),
      endStreak: $('end-streak'),
      bestTime: $('best-time'),
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
  }

  showPause(stats = {}) {
    this.el.pause.hidden = false;
    this.el.pauseTime.textContent = formatTime(stats.elapsed || 0);
    this.el.pauseRemaining.textContent = String(stats.remaining ?? 0).padStart(2, '0');
    this.el.pauseKills.textContent = String(stats.kills ?? 0).padStart(2, '0');
    const first = this.el.pause.querySelector(FOCUSABLE);
    if (first) first.focus({ preventScroll: true });
  }

  hidePause() {
    this.el.pause.hidden = true;
  }

  showEnd({ victory, stats }) {
    this.el.hud.classList.add('is-hidden');
    this.el.pause.hidden = true;
    this.el.end.hidden = false;
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

    this.el.endKicker.textContent = victory ? 'OPERATION COMPLETE // SITE-09 SECURED' : 'OPERATIVE DOWN // MISSION FAILED';
    this.el.endTitle.setAttribute('aria-label', victory ? 'Mission complete' : 'Signal lost');
    this.el.endTitle.childNodes[0].nodeValue = victory ? 'MISSION' : 'SIGNAL';
    this.el.endTitleAccent.textContent = victory ? 'COMPLETE' : 'LOST';
    this.el.endCopy.textContent = victory
      ? 'All hostile signals neutralized. The facility is dark again — and nothing followed you out.'
      : 'Biometric signal terminated. The sentinels remain active inside SITE-09. Regroup and redeploy.';
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

    const first = this.el.end.querySelector(FOCUSABLE);
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
    this.el.objectiveCount.textContent = `${String(killed).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    this.el.killCount.childNodes[0].nodeValue = String(killed).padStart(2, '0');
    const totalSpan = this.el.killCount.querySelector('span');
    if (totalSpan) totalSpan.textContent = `/${String(total).padStart(2, '0')}`;
    this.el.objectiveFill.style.width = `${total > 0 ? (killed / total) * 100 : 0}%`;
  }

  updateTimer(seconds) {
    this.el.timer.textContent = formatTime(seconds);
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
  }

  _readBestTime() {
    let best = null;
    try {
      const value = Number(localStorage.getItem(BEST_TIME_KEY));
      if (Number.isFinite(value) && value > 0) best = value;
    } catch {
      best = null;
    }
    this.bestTime = best;
    if (this.el.bestTime) {
      this.el.bestTime.textContent = best ? `BEST TIME ${formatTime(best)}` : 'BEST TIME —:—';
    }
  }

  _maybeSaveBestTime(time) {
    if (!Number.isFinite(time) || time <= 0) return;
    if (this.bestTime !== null && time >= this.bestTime) return;
    this.bestTime = time;
    try {
      localStorage.setItem(BEST_TIME_KEY, String(time));
    } catch {
      // Scoring still works without persistence.
    }
    if (this.el.bestTime) this.el.bestTime.textContent = `BEST TIME ${formatTime(time)}`;
  }
}
