export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const clamp01 = (value) => clamp(value, 0, 1);

export const lerp = (a, b, t) => a + (b - a) * t;

export const invLerp = (a, b, value) => (value - a) / (b - a || 1);

export const smoothstep = (min, max, value) => {
  const x = clamp01((value - min) / (max - min || 1));
  return x * x * (3 - 2 * x);
};

/**
 * Frame-rate independent exponential smoothing.
 * `lambda` is the approximate convergence speed per second.
 */
export const damp = (current, target, lambda, dt) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export const dampAngle = (current, target, lambda, dt) => {
  let delta = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return current + delta * (1 - Math.exp(-lambda * dt));
};

export const randomRange = (min, max) => min + Math.random() * (max - min);

export const randomInt = (min, max) => Math.floor(randomRange(min, max + 1));

export const choose = (array) => array[Math.floor(Math.random() * array.length)];

export const formatTime = (seconds, tenths = true) => {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  if (!tenths) return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const dec = Math.floor((safe % 1) * 10);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${dec}`;
};

/** Deterministic PRNG for stable procedural textures. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Minimal binary min-heap, used by A* pathfinding. */
export class MinHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  push(value, priority) {
    const node = { value, priority };
    this.items.push(node);
    this.#bubbleUp(this.items.length - 1);
  }

  pop() {
    if (this.items.length === 0) return null;
    const top = this.items[0];
    const end = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = end;
      this.#sinkDown(0);
    }
    return top.value;
  }

  #bubbleUp(index) {
    const node = this.items[index];
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      const parent = this.items[parentIndex];
      if (parent.priority <= node.priority) break;
      this.items[parentIndex] = node;
      this.items[index] = parent;
      index = parentIndex;
    }
  }

  #sinkDown(index) {
    const length = this.items.length;
    const node = this.items[index];
    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = leftIndex + 1;
      let smallest = index;

      if (leftIndex < length && this.items[leftIndex].priority < this.items[smallest].priority) {
        smallest = leftIndex;
      }
      if (rightIndex < length && this.items[rightIndex].priority < this.items[smallest].priority) {
        smallest = rightIndex;
      }
      if (smallest === index) break;

      this.items[index] = this.items[smallest];
      this.items[smallest] = node;
      index = smallest;
    }
  }
}
