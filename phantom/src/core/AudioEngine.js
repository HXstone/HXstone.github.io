import { clamp, randomRange } from '../utils/math.js';

/**
 * Fully procedural audio. Nothing is fetched, so the game remains portable
 * and cannot fail because of a missing sound asset. All playback begins after
 * a user gesture (the Start Mission click), satisfying autoplay policy.
 */
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.comp = null;
    this.ambientGain = null;
    this.volume = 0.65;
    this.ready = false;
    this._noiseBuffer = null;
    this._ambientStarted = false;
  }

  async unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        try {
          await this.ctx.resume();
        } catch {
          /* ignored */
        }
      }
      return true;
    }

    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;

    try {
      this.ctx = new Ctx({ latencyHint: 'interactive' });
      this.comp = this.ctx.createDynamicsCompressor();
      this.comp.threshold.value = -16;
      this.comp.knee.value = 18;
      this.comp.ratio.value = 5;
      this.comp.attack.value = 0.003;
      this.comp.release.value = 0.22;

      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;

      this.master.connect(this.comp);
      this.comp.connect(this.ctx.destination);
      this._noiseBuffer = this._createNoiseBuffer(2.2);
      await this.ctx.resume();
      this.ready = true;
      this.startAmbience();
      return true;
    } catch {
      this.ready = false;
      return false;
    }
  }

  setVolume(value) {
    this.volume = clamp(value, 0, 1);
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.08);
    }
  }

  setPaused(paused) {
    if (!this.ctx || !this.ambientGain) return;
    this.ambientGain.gain.setTargetAtTime(paused ? 0.012 : 0.05, this.ctx.currentTime, 0.6);
  }

  _createNoiseBuffer(seconds) {
    const length = Math.floor(this.ctx.sampleRate * seconds);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      // Slight integration makes the noise feel less like pure static.
      last = last * 0.72 + white * 0.28;
      data[i] = white * 0.72 + last * 0.5;
    }
    return buffer;
  }

  _noiseSource() {
    const source = this.ctx.createBufferSource();
    source.buffer = this._noiseBuffer;
    source.loop = true;
    return source;
  }

  _panner(pan = 0) {
    if (!this.ctx.createStereoPanner) return null;
    const panner = this.ctx.createStereoPanner();
    panner.pan.value = clamp(pan, -1, 1);
    panner.connect(this.master);
    return panner;
  }

  _envelope(attack, hold, release, peak) {
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(peak, t + attack);
    gain.gain.setValueAtTime(peak, t + attack + hold);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + hold + release);
    return { gain, end: t + attack + hold + release + 0.02 };
  }

  startAmbience() {
    if (!this.ctx || this._ambientStarted) return;
    const ctx = this.ctx;
    this._ambientStarted = true;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.value = 0.05;
    this.ambientGain.connect(this.master);

    // Low industrial hum.
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.45;
    droneGain.connect(this.ambientGain);

    const droneA = ctx.createOscillator();
    droneA.type = 'sine';
    droneA.frequency.value = 44;
    const droneB = ctx.createOscillator();
    droneB.type = 'triangle';
    droneB.frequency.value = 66.2;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 160;
    droneFilter.Q.value = 3;
    const droneBMix = ctx.createGain();
    droneBMix.gain.value = 0.18;

    droneA.connect(droneFilter);
    droneB.connect(droneBMix);
    droneBMix.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneA.start();
    droneB.start();

    // Very quiet filtered air / machinery rumble.
    const rumble = this._noiseSource();
    const rumbleFilter = ctx.createBiquadFilter();
    rumbleFilter.type = 'bandpass';
    rumbleFilter.frequency.value = 190;
    rumbleFilter.Q.value = 0.6;
    const rumbleGain = ctx.createGain();
    rumbleGain.gain.value = 0.07;
    rumble.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.ambientGain);
    rumble.start();

    // Slow wandering resonance, like a distant ventilation system.
    const sweep = ctx.createOscillator();
    sweep.type = 'sine';
    sweep.frequency.value = 0.045;
    const sweepGain = ctx.createGain();
    sweepGain.gain.value = 55;
    sweep.connect(sweepGain);
    sweepGain.connect(droneFilter.frequency);
    sweep.start();
  }

  shoot(kind = 'rifle', pan = 0) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const isPistol = kind === 'pistol';
    const output = this._panner(pan) || this.master;

    // Crack: filtered noise transient.
    const noise = this._noiseSource();
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = isPistol ? 'bandpass' : 'highpass';
    noiseFilter.frequency.value = isPistol ? 1300 : 720;
    noiseFilter.Q.value = 0.8;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(isPistol ? 0.62 : 0.45, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + (isPistol ? 0.13 : 0.09));
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(output);
    noise.start(now);
    noise.stop(now + 0.16);

    // Body: descending mechanical thump.
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isPistol ? 170 : 125, now);
    osc.frequency.exponentialRampToValueAtTime(isPistol ? 48 : 36, now + 0.13);
    oscGain.gain.setValueAtTime(isPistol ? 0.5 : 0.36, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
    osc.connect(oscGain);
    oscGain.connect(output);
    osc.start(now);
    osc.stop(now + 0.18);

    // Metallic high-frequency ring.
    const ring = ctx.createOscillator();
    const ringGain = ctx.createGain();
    ring.type = 'square';
    ring.frequency.value = isPistol ? 940 : 620;
    ringGain.gain.setValueAtTime(0.035, now);
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
    ring.connect(ringGain);
    ringGain.connect(output);
    ring.start(now);
    ring.stop(now + 0.06);
  }

  reloadStart() {
    this._click(0.06, 480, 0.08);
    setTimeout(() => this._click(0.05, 330, 0.07), 120);
  }

  reloadMag() {
    this._click(0.1, 240, 0.11);
    setTimeout(() => this._click(0.07, 410, 0.05), 60);
  }

  reloadEnd() {
    this._click(0.09, 620, 0.05);
    setTimeout(() => this._click(0.08, 760, 0.04), 55);
  }

  _click(volume, frequency, duration) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'square';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, frequency * 0.55), now + duration);
    filter.type = 'bandpass';
    filter.frequency.value = frequency * 1.4;
    filter.Q.value = 2.5;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  hit(headshot = false) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(headshot ? 1480 : 980, t);
    osc.frequency.exponentialRampToValueAtTime(headshot ? 980 : 620, t + 0.06);
    gain.gain.setValueAtTime(0.11, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.1);

    if (headshot) {
      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.type = 'triangle';
      ping.frequency.value = 2350;
      pingGain.gain.setValueAtTime(0.045, t + 0.015);
      pingGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      ping.connect(pingGain);
      pingGain.connect(this.master);
      ping.start(t + 0.015);
      ping.stop(t + 0.13);
    }
  }

  kill() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [420, 620, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const start = t + i * 0.055;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.09, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.24);
    });
  }

  enemyShoot(pan = 0) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const output = this._panner(pan) || this.master;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.18);
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 1.2;
    gain.gain.setValueAtTime(0.11, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(output);
    osc.start(t);
    osc.stop(t + 0.22);
  }

  hurt(severity = 1) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(36, t + 0.35);
    gain.gain.setValueAtTime(0.2 * clamp(severity, 0.4, 2), t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + 0.42);

    const noise = this._noiseSource();
    const nf = ctx.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 520;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.1, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    noise.connect(nf);
    nf.connect(ng);
    ng.connect(this.master);
    noise.start(t);
    noise.stop(t + 0.17);
  }

  footstep(sprint = false) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const noise = this._noiseSource();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = sprint ? 260 : 180;
    filter.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(sprint ? 0.045 : 0.028, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    noise.start(t);
    noise.stop(t + 0.1);
  }

  jump() {
    this._click(0.035, 190, 0.08);
  }

  land() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const noise = this._noiseSource();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    noise.start(t);
    noise.stop(t + 0.17);
  }

  impact(pan = 0) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const output = this._panner(pan) || this.master;
    const noise = this._noiseSource();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1900;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(output);
    noise.start(t);
    noise.stop(t + 0.07);
  }

  explosion(pan = 0) {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const output = this._panner(pan) || this.master;

    const noise = this._noiseSource();
    const low = ctx.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.setValueAtTime(1600, t);
    low.frequency.exponentialRampToValueAtTime(120, t + 0.7);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);
    noise.connect(low);
    low.connect(gain);
    gain.connect(output);
    noise.start(t);
    noise.stop(t + 0.9);

    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(72, t);
    sub.frequency.exponentialRampToValueAtTime(28, t + 0.5);
    subGain.gain.setValueAtTime(0.24, t);
    subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    sub.connect(subGain);
    subGain.connect(output);
    sub.start(t);
    sub.stop(t + 0.62);
  }

  pickup() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [660, 990].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = t + i * 0.07;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.07, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.27);
    });
  }

  uiHover() {
    this._click(0.018, 1900, 0.025);
  }

  uiClick() {
    this._click(0.035, 760, 0.05);
  }

  victory() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [196, 293.66, 392, 587.33].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 3 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      const start = t + i * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.075, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 1.25);
    });
  }

  defeat() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    [148, 116, 73].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      const start = t + i * 0.24;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 420;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.055, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 1.45);
    });
  }

  heartbeat() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (let i = 0; i < 2; i += 1) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 0 ? 54 : 48;
      const start = t + i * 0.15;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(start);
      osc.stop(start + 0.18);
    }
  }

  setLowHealth(active) {
    if (!this.ctx) return;
    this.lowHealth = active;
  }
}
