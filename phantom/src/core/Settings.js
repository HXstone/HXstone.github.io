import { clamp } from '../utils/math.js';

const STORAGE_KEY = 'phantom.settings.v1';

const DEFAULTS = Object.freeze({
  sensitivity: 1,
  fov: 78,
  volume: 0.65,
  quality: 'high',
  invertY: false,
  reducedMotion: false,
});

const QUALITY_VALUES = new Set(['high', 'medium', 'low']);

/**
 * User settings are deliberately kept outside the game modules.
 * Persisted values are validated on read so a corrupted local entry can never
 * produce an unusable camera or mute the entire simulation.
 */
export class Settings {
  constructor() {
    this.values = { ...DEFAULTS };
    this.#load();
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    if (!(key in DEFAULTS)) return this.values[key];

    switch (key) {
      case 'sensitivity':
        value = clamp(Number(value) || DEFAULTS.sensitivity, 0.2, 3);
        break;
      case 'fov':
        value = clamp(Number(value) || DEFAULTS.fov, 65, 105);
        break;
      case 'volume':
        value = clamp(Number(value), 0, 1);
        break;
      case 'quality':
        value = QUALITY_VALUES.has(value) ? value : DEFAULTS.quality;
        break;
      case 'invertY':
      case 'reducedMotion':
        value = Boolean(value);
        break;
      default:
        break;
    }

    this.values[key] = value;
    this.#save();
    return value;
  }

  reset() {
    this.values = { ...DEFAULTS };
    this.#save();
    return { ...this.values };
  }

  #load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;

      this.values.sensitivity = clamp(Number(parsed.sensitivity) || DEFAULTS.sensitivity, 0.2, 3);
      this.values.fov = clamp(Number(parsed.fov) || DEFAULTS.fov, 65, 105);
      this.values.volume = clamp(Number(parsed.volume ?? DEFAULTS.volume), 0, 1);
      this.values.quality = QUALITY_VALUES.has(parsed.quality) ? parsed.quality : DEFAULTS.quality;
      this.values.invertY = Boolean(parsed.invertY);
      this.values.reducedMotion = Boolean(parsed.reducedMotion);
    } catch {
      // Storage can be unavailable in private contexts. Defaults remain valid.
    }
  }

  #save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.values));
    } catch {
      // Non-fatal: settings simply won't persist.
    }
  }
}

export { DEFAULTS };
