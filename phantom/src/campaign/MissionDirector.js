/**
 * Authoritative mission flow and countdown.
 *
 * The countdown is intentionally owned by this one object. Entering the safe
 * zone never starts it, completing the objective never resets it, and the only
 * success path is physically entering the extraction zone while the clock is
 * still above zero. Everything else (HUD, pause screen, stats) reads from here.
 */

export const MISSION_STATE = Object.freeze({
  SAFE_ZONE: 'SAFE_ZONE',
  MISSION_ACTIVE: 'MISSION_ACTIVE',
  OBJECTIVE_COMPLETED: 'OBJECTIVE_COMPLETED',
  EXTRACTION_ACTIVE: 'EXTRACTION_ACTIVE',
  MISSION_SUCCESS: 'MISSION_SUCCESS',
  MISSION_FAILED: 'MISSION_FAILED',
});

const DEFAULT_TIME_LIMIT = 12 * 60;
const OBJECTIVE_RADIUS = 2.9;

const pointInZone = (zone, position, inset = 0) => {
  if (!zone || !position) return false;
  return (
    position.x >= zone.x - zone.w / 2 + inset &&
    position.x <= zone.x + zone.w / 2 - inset &&
    position.z >= zone.z - zone.d / 2 + inset &&
    position.z <= zone.z + zone.d / 2 - inset
  );
};

export class MissionDirector {
  constructor({ game, world, level, ui, audio }) {
    this.game = game;
    this.world = world;
    this.level = level;
    this.ui = ui;
    this.audio = audio;
    this.player = game.player;
    this.enemies = game.enemies;
    this.campaign = game.campaign;

    this.layout = world.missionLayout;
    this.timeLimit = Number(level.timeLimit) || Number(this.layout?.timeLimit) || DEFAULT_TIME_LIMIT;
    this.state = MISSION_STATE.SAFE_ZONE;
    this.remaining = this.timeLimit;
    this.elapsed = 0;
    this.started = false;
    this.ended = false;
    this.objectiveComplete = false;
    this.objectiveReady = !this.requiresClear;
    this.extractionActive = false;
    this.warnings = new Set();
    this.navAccumulator = 0;

    this.reset();
  }

  get safeZone() {
    return this.layout?.safeZone || null;
  }

  get extraction() {
    return this.layout?.extraction || null;
  }

  get objective() {
    return this.world.objectiveConsole || this.layout?.objective || null;
  }

  get requiresClear() {
    return Boolean(this.layout?.objective?.requiresClear);
  }

  get isPlayingPhase() {
    return (
      this.state === MISSION_STATE.MISSION_ACTIVE ||
      this.state === MISSION_STATE.OBJECTIVE_COMPLETED ||
      this.state === MISSION_STATE.EXTRACTION_ACTIVE
    );
  }

  get phaseLabel() {
    switch (this.state) {
      case MISSION_STATE.SAFE_ZONE:
        return 'SAFE ZONE';
      case MISSION_STATE.MISSION_ACTIVE:
        return 'MISSION ACTIVE';
      case MISSION_STATE.OBJECTIVE_COMPLETED:
        return 'OBJECTIVE COMPLETE';
      case MISSION_STATE.EXTRACTION_ACTIVE:
        return 'EXFIL ACTIVE';
      case MISSION_STATE.MISSION_SUCCESS:
        return 'EXFIL SUCCESSFUL';
      default:
        return 'MISSION FAILED';
    }
  }

  reset() {
    this.state = MISSION_STATE.SAFE_ZONE;
    this.remaining = this.timeLimit;
    this.elapsed = 0;
    this.started = false;
    this.ended = false;
    this.objectiveComplete = false;
    this.objectiveReady = !this.requiresClear;
    this.extractionActive = false;
    this.warnings.clear();
    this.navAccumulator = 0;

    if (this.player) this.player.invulnerable = true;
    this.enemies?.setCombatEnabled(false);
    this.world.setAlarm(false);
    this.world.setObjectiveState(this.requiresClear ? 'locked' : 'available');
    this.world.setExtractionActive(false);

    this.ui.setMissionPhase('SAFE_ZONE', {
      objective: this.layout?.objective?.hudTitle || this.level.objective,
      extraction: this.layout?.extraction?.label || 'EXTRACTION',
      remaining: this.timeLimit,
      frozen: true,
    });
    this.ui.setTimer(this.timeLimit, { frozen: true, label: 'EXFIL WINDOW' });
    this.ui.setObjective(this.layout?.objective?.hudTitle || this.level.objective);
    this.ui.updateNavigation({ active: false });
    this.ui.setIntelPrompt(false);
  }

  begin() {
    // resetMission() has already restored the world and HUD. This only arms the
    // safe-zone state; the countdown starts when the player physically leaves.
    this.player.invulnerable = true;
    this.enemies?.setCombatEnabled(false);
    this.ui.setMissionPhase('SAFE_ZONE', {
      objective: this.layout?.objective?.hudTitle || this.level.objective,
      extraction: this.layout?.extraction?.label || 'EXTRACTION',
      remaining: this.timeLimit,
      frozen: true,
    });
    this.ui.setTimer(this.timeLimit, { frozen: true, label: 'EXFIL WINDOW' });
    this.ui.updateNavigation({ active: false });
    this.ui.showToast('SAFE ZONE // CROSS THE THRESHOLD TO START THE CLOCK', 3200);
  }

  update(dt) {
    if (this.ended) return;

    if (this.state === MISSION_STATE.SAFE_ZONE) {
      if (!this._isInsideSafeZone(this.player.position)) {
        this._startClock();
      }
      return;
    }

    if (!this.isPlayingPhase) return;

    const previous = this.remaining;
    this.elapsed += dt;
    this.remaining = Math.max(0, this.timeLimit - this.elapsed);

    this._updateWarnings(previous);
    this.navAccumulator += dt;
    if (this.navAccumulator >= 0.1) {
      this.navAccumulator = 0;
      this._updateNavigation();
    }

    if (this.remaining <= 0) {
      this.remaining = 0;
      this.ui.setTimer(0, { frozen: false, label: 'EXFIL WINDOW' });
      this.fail('timeout');
      return;
    }

    if (this.extractionActive && this._isInsideExtraction(this.player.position)) {
      this._succeed();
    }
  }

  _startClock() {
    if (this.state !== MISSION_STATE.SAFE_ZONE) return;
    this.started = true;
    this.state = MISSION_STATE.MISSION_ACTIVE;
    this.player.invulnerable = false;
    this.enemies?.setCombatEnabled(true);
    this.world.setObjectiveState(this.requiresClear ? 'locked' : 'available');
    this.ui.setMissionPhase('MISSION_ACTIVE', {
      objective: this.layout?.objective?.hudTitle || this.level.objective,
      extraction: this.layout?.extraction?.label || 'EXTRACTION',
      remaining: this.remaining,
      frozen: false,
    });
    this.ui.setTimer(this.remaining, { frozen: false, label: 'TIME TO EXFIL' });
    this.ui.showToast('MISSION ACTIVE // EXFIL CLOCK RUNNING', 2200);
    this.audio?.heartbeat?.();
    this.campaign?.onMissionStart?.();
    this._updateNavigation();
  }

  _updateWarnings(previous) {
    for (const threshold of [180, 60]) {
      if (previous > threshold && this.remaining <= threshold && !this.warnings.has(threshold)) {
        this.warnings.add(threshold);
        this.ui.markTimerCritical(threshold === 60);
        this.campaign?.onTimeWarning?.(threshold, this.remaining);
      }
    }
    if (this.remaining <= 60) this.ui.markTimerCritical(true);
  }

  _updateNavigation() {
    const target = this.extractionActive ? this.extraction : this.layout?.objective;
    if (!target) {
      this.ui.updateNavigation({ active: false });
      return;
    }
    const dx = target.x - this.player.position.x;
    const dz = target.z - this.player.position.z;
    const distance = Math.hypot(dx, dz);
    // Compass 0deg is north (-Z). Screen arrow rotates clockwise.
    const targetBearing = Math.atan2(dx, -dz);
    this.ui.updateNavigation({
      active: this.started && !this.ended,
      label: this.extractionActive
        ? `EXFIL // ${this.extraction.label}`
        : `OBJECTIVE // ${this.layout.objective.zoneLabel || this.layout.objective.label}`,
      distance,
      bearing: targetBearing + this.player.yaw,
      extraction: this.extractionActive,
      floor: target.floor ?? (target.y > 1 ? 2 : 1),
    });
  }

  getPrompt(position = this.player.position) {
    if (this.state !== MISSION_STATE.MISSION_ACTIVE) return null;
    const objective = this.objective;
    if (!objective || this.objectiveComplete) return null;
    if (this.requiresClear && !this.objectiveReady) return null;
    const dx = position.x - objective.position.x;
    const dz = position.z - objective.position.z;
    const dy = Math.abs(position.y - (objective.position.y || 0));
    if (dx * dx + dz * dz > OBJECTIVE_RADIUS * OBJECTIVE_RADIUS || dy > 2.4) return null;
    return {
      kind: 'objective',
      label: objective.promptLabel || 'CROWN ARCHIVE',
      action: objective.action || 'ACCESS',
    };
  }

  interactObjective(position = this.player.position) {
    const prompt = this.getPrompt(position);
    if (!prompt || this.objectiveComplete) return false;
    const objective = this.objective;
    this.objectiveComplete = true;
    this.state = MISSION_STATE.OBJECTIVE_COMPLETED;
    objective.complete = true;
    this.world.activateObjective();
    this.campaign?.onObjectiveComplete?.();
    this.ui.showToast('PRIMARY OBJECTIVE COMPLETE // EXTRACTION AUTHORIZED', 2800);
    this.audio?.pickup?.();

    // The objective is complete, but the mission is not. The same clock
    // continues running while the extraction pad opens.
    this._activateExtraction();
    return true;
  }

  _activateExtraction() {
    this.extractionActive = true;
    this.state = MISSION_STATE.EXTRACTION_ACTIVE;
    this.world.setExtractionActive(true);
    this.world.setAlarm(true);
    this.game.deployExtractionResponse();
    this.ui.setMissionPhase('EXTRACTION_ACTIVE', {
      objective: `EXFIL // ${this.extraction?.label || 'EXTRACTION'}`,
      extraction: this.extraction?.label || 'EXTRACTION',
      remaining: this.remaining,
      frozen: false,
    });
    this.ui.setObjective(`EXTRACT // ${this.extraction?.label || 'EXTRACTION'}`);
    this.ui.showToast(
      `EXFIL ACTIVE // ${Math.ceil(this.remaining / 60)} MIN REMAINING // MOVE NOW`,
      3600,
    );
    this.campaign?.onExtractionActive?.();
    this._updateNavigation();
  }

  onAllEnemiesDown() {
    if (!this.requiresClear || this.objectiveReady || this.ended) return false;
    this.objectiveReady = true;
    this.world.setObjectiveState('available');
    const readyTitle = this.layout?.objective?.readyTitle || 'OVERLOAD THE UPLINK';
    this.ui.setObjective(readyTitle);
    this.ui.showToast('COMMAND GUARD BROKEN // UPLINK EXPOSED', 2800);
    this.campaign?.onObjectiveReady?.();
    return true;
  }

  onEnemyKilled() {
    // The HUD is driven by Game/EnemyManager. This hook exists so the flow can
    // later add scripted beats without creating a second kill tracker.
  }

  fail(reason = 'timeout') {
    if (this.ended) return;
    this.ended = true;
    this.state = MISSION_STATE.MISSION_FAILED;
    this.player.invulnerable = true;
    this.enemies?.setCombatEnabled(false);
    this.ui.markTimerCritical(false);
    this.ui.updateNavigation({ active: false });
    this.game.failMission(reason);
  }

  markFailed(reason = 'killed') {
    if (this.ended) return;
    this.ended = true;
    this.state = MISSION_STATE.MISSION_FAILED;
    this.player.invulnerable = true;
    this.enemies?.setCombatEnabled(false);
    this.ui.updateNavigation({ active: false });
    this.failureReason = reason;
  }

  _succeed() {
    if (this.ended) return;
    this.ended = true;
    this.state = MISSION_STATE.MISSION_SUCCESS;
    this.player.invulnerable = true;
    this.enemies?.setCombatEnabled(false);
    this.ui.setMissionPhase('MISSION_SUCCESS', {
      objective: 'EXFIL COMPLETE',
      extraction: this.extraction?.label || 'EXTRACTION',
      remaining: this.remaining,
      frozen: true,
    });
    this.ui.setTimer(this.remaining, { frozen: true, label: 'TIME TO EXFIL' });
    this.ui.updateNavigation({ active: false });
    this.campaign?.onExtractionReached?.();
    this.game.completeMissionByExtraction();
  }

  _isInsideSafeZone(position) {
    return pointInZone(this.safeZone, position, 0.15);
  }

  _isInsideExtraction(position) {
    const zone = this.extraction;
    if (!zone) return false;
    if (!pointInZone(zone, position, 0.15)) return false;
    if (zone.y !== undefined && Math.abs(position.y - zone.y) > 2.5) return false;
    return true;
  }

  getSnapshot() {
    return {
      state: this.state,
      started: this.started,
      elapsed: Number(this.elapsed.toFixed(2)),
      remaining: Number(this.remaining.toFixed(2)),
      timeLimit: this.timeLimit,
      objectiveComplete: this.objectiveComplete,
      objectiveReady: this.objectiveReady,
      extractionActive: this.extractionActive,
      safeZone: this.safeZone ? { ...this.safeZone } : null,
      objective: this.layout?.objective
        ? {
            x: this.objective?.position?.x ?? this.layout.objective.x,
            y: this.objective?.position?.y ?? this.layout.objective.y ?? 0,
            z: this.objective?.position?.z ?? this.layout.objective.z,
            label: this.layout.objective.zoneLabel || this.layout.objective.promptLabel,
            requiresClear: this.requiresClear,
          }
        : null,
      extraction: this.extraction ? { ...this.extraction } : null,
    };
  }
}
