import { getNarrative, getSpeaker } from './narrative.js';

/**
 * Authored campaign beats layered over the core mission flow.
 *
 * MissionDirector owns phases, the single countdown, objective interaction and
 * extraction. CampaignDirector only decides what the characters say, which
 * archive terminal is readable, and which alarm/reserve beat belongs to a
 * narrative moment. It never wins or fails a mission by itself.
 */
export class CampaignDirector {
  constructor({ game, world, level, ui, audio }) {
    this.game = game;
    this.world = world;
    this.level = level;
    this.ui = ui;
    this.audio = audio;
    this.narrative = getNarrative(level.id);
    this.terminals = world.terminals || [];
    this.pending = [];
    this.firedEvents = new Set();
    this.readIntel = new Set();
    this.clock = 0;
    this.reset();
  }

  reset() {
    this.clock = 0;
    this.pending = [];
    this.firedEvents.clear();
    this.readIntel.clear();
    this.world.resetTerminals();
    this.ui.hideRadio();
    this.ui.hideIntel();
    this.ui.setIntelPrompt(false);
  }

  dispose() {
    this.pending = [];
    this.ui.hideRadio();
    this.ui.hideIntel();
    this.ui.setIntelPrompt(false);
  }

  begin() {
    this.reset();
    if (this.narrative.safeBriefing?.length) {
      this.pending.push({ at: 0.35, lines: this.narrative.safeBriefing });
    }
    if (this.narrative.intro.length > 0) {
      this.pending.push({ at: 0.9, lines: this.narrative.intro });
    }
  }

  update(dt) {
    this.clock += dt;

    if (this.pending.length > 0) {
      const due = this.pending.filter((entry) => entry.at <= this.clock);
      if (due.length > 0) {
        this.pending = this.pending.filter((entry) => entry.at > this.clock);
        for (const entry of due) {
          for (const line of entry.lines) this.say(line);
        }
      }
    }

    if (!this.game.mission?.started) return;

    for (const event of this.narrative.events) {
      if (this.firedEvents.has(event.id)) continue;
      const killReady = event.kills !== undefined && this.game.kills >= event.kills;
      const waveReady = event.wave !== undefined && this.game.enemies.currentWave >= event.wave;
      if (!killReady && !waveReady) continue;
      this.firedEvents.add(event.id);
      this._applyEffect(event);
    }
  }

  onMissionStart() {
    const lines = this.narrative.missionStart || [];
    for (const line of lines) this.say(line);
  }

  onObjectiveComplete() {
    const beat = this.narrative.objectiveComplete;
    if (!beat) return;
    this._applyEffect(beat);
  }

  onExtractionActive() {
    const lines = this.narrative.extraction || [];
    // Extraction voice lines are intentionally terse: the player is moving.
    for (const line of lines) this.say(line);
  }

  onTimeWarning(threshold) {
    const beat = this.narrative.timeWarnings?.[threshold];
    if (beat) {
      for (const line of beat) this.say(line);
      return;
    }
    const fallback = threshold <= 60
      ? [{ speaker: 'KITE', text: 'One minute. Whatever you are doing, stop doing it and get to the pad.' }]
      : [{ speaker: 'KITE', text: 'Three minutes left. The exfil window is closing.' }];
    for (const line of fallback) this.say(line);
  }

  onObjectiveReady() {
    const beat = this.narrative.objectiveReady;
    if (!beat) return;
    this._applyEffect(beat);
  }

  getInteractable(position) {
    let best = null;
    let bestDistance = 2.8 * 2.8;
    for (const terminal of this.terminals) {
      if (terminal.read || !terminal.active) continue;
      if (terminal.kind === 'finale') continue; // handled by the mission console
      const dx = terminal.position.x - position.x;
      const dz = terminal.position.z - position.z;
      const distance = dx * dx + dz * dz;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = terminal;
      }
    }
    return best;
  }

  interact(terminal) {
    if (!terminal || terminal.read) return false;
    terminal.read = true;
    this.readIntel.add(terminal.id);
    this.ui.showIntel({
      kicker: 'ARCHIVE RECOVERED',
      title: terminal.title,
      body: terminal.body,
      speaker: getSpeaker(terminal.speaker).name,
    });
    this.audio.pickup();
    if (this.narrative.intel) this._applyEffect(this.narrative.intel);
    return true;
  }

  _applyEffect(effect) {
    if (!effect) return;
    if (effect.alarm) this.world.setAlarm(true);
    if (effect.objective) this.ui.setObjective(effect.objective);
    if (effect.deployWave !== undefined) {
      this.game.deployReserveWave(effect.deployWave);
    }
    if (effect.radio) {
      for (const line of effect.radio) this.say(line);
    }
  }

  say(line) {
    if (!line) return;
    this.ui.showRadio({
      speaker: getSpeaker(line.speaker),
      text: line.text,
    });
  }

  get debrief() {
    return this.narrative.debrief || '';
  }
}
