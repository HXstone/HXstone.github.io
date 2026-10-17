import * as THREE from 'three';
import { MinHeap } from '../utils/math.js';

/**
 * Coarse A* navigation grid built from the same colliders used for player
 * collision. Cells are marked blocked with the agent radius baked in, so
 * sentinels naturally keep clear of cover and walls.
 */
export class NavigationGrid {
  constructor(world, cellSize = 1.1, agentRadius = 0.46) {
    this.world = world;
    this.cellSize = cellSize;
    this.agentRadius = agentRadius;
    const bounds = world.navBounds;
    this.minX = bounds.minX;
    this.minZ = bounds.minZ;
    this.cols = Math.max(1, Math.ceil((bounds.maxX - bounds.minX) / cellSize));
    this.rows = Math.max(1, Math.ceil((bounds.maxZ - bounds.minZ) / cellSize));
    this.total = this.cols * this.rows;
    this.blocked = new Uint8Array(this.total);
    this.gScore = new Float32Array(this.total);
    this.cameFrom = new Int32Array(this.total);
    this.closed = new Uint8Array(this.total);
    this._build();
  }

  _build() {
    const { cols, rows, cellSize, minX, minZ, agentRadius } = this;
    for (let z = 0; z < rows; z += 1) {
      for (let x = 0; x < cols; x += 1) {
        const wx = minX + (x + 0.5) * cellSize;
        const wz = minZ + (z + 0.5) * cellSize;
        const index = z * cols + x;
        let blocked = false;

        for (const collider of this.world.colliders) {
          const box = collider.box;
          if (box.max.y < 0.45) continue;
          if (
            wx > box.min.x - agentRadius &&
            wx < box.max.x + agentRadius &&
            wz > box.min.z - agentRadius &&
            wz < box.max.z + agentRadius
          ) {
            blocked = true;
            break;
          }
        }
        this.blocked[index] = blocked ? 1 : 0;
      }
    }
  }

  worldToCell(x, z) {
    return {
      x: Math.floor((x - this.minX) / this.cellSize),
      z: Math.floor((z - this.minZ) / this.cellSize),
    };
  }

  cellToWorld(x, z) {
    return new THREE.Vector3(
      this.minX + (x + 0.5) * this.cellSize,
      0,
      this.minZ + (z + 0.5) * this.cellSize,
    );
  }

  isInside(x, z) {
    return x >= 0 && z >= 0 && x < this.cols && z < this.rows;
  }

  isWalkableCell(x, z) {
    if (!this.isInside(x, z)) return false;
    return this.blocked[z * this.cols + x] === 0;
  }

  isWalkablePoint(x, z) {
    const cell = this.worldToCell(x, z);
    return this.isWalkableCell(cell.x, cell.z);
  }

  findNearestWalkable(x, z) {
    const cell = this.worldToCell(x, z);
    if (this.isWalkableCell(cell.x, cell.z)) return cell;

    for (let radius = 1; radius <= 8; radius += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          if (Math.abs(dx) !== radius && Math.abs(dz) !== radius) continue;
          const cx = cell.x + dx;
          const cz = cell.z + dz;
          if (this.isWalkableCell(cx, cz)) return { x: cx, z: cz };
        }
      }
    }
    return null;
  }

  /**
   * A* with diagonal corner checks. Returns world-space waypoints including
   * the destination approximation, smoothed where the grid remains clear.
   */
  findPath(start, goal) {
    const startCell = this.findNearestWalkable(start.x, start.z);
    const goalCell = this.findNearestWalkable(goal.x, goal.z);
    if (!startCell || !goalCell) return [];

    const startIndex = startCell.z * this.cols + startCell.x;
    const goalIndex = goalCell.z * this.cols + goalCell.x;
    if (startIndex === goalIndex) {
      return [this.cellToWorld(goalCell.x, goalCell.z)];
    }

    this.gScore.fill(Infinity);
    this.cameFrom.fill(-1);
    this.closed.fill(0);
    this.gScore[startIndex] = 0;

    const open = new MinHeap();
    open.push(startIndex, this._heuristic(startCell.x, startCell.z, goalCell.x, goalCell.z));

    let found = false;
    let iterations = 0;
    const maxIterations = this.total * 2;

    while (open.size > 0 && iterations < maxIterations) {
      iterations += 1;
      const current = open.pop();
      if (current === goalIndex) {
        found = true;
        break;
      }
      if (this.closed[current]) continue;
      this.closed[current] = 1;

      const cx = current % this.cols;
      const cz = Math.floor(current / this.cols);

      for (let dz = -1; dz <= 1; dz += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          if (dx === 0 && dz === 0) continue;
          const nx = cx + dx;
          const nz = cz + dz;
          if (!this.isWalkableCell(nx, nz)) continue;
          if (dx !== 0 && dz !== 0) {
            if (!this.isWalkableCell(cx + dx, cz) || !this.isWalkableCell(cx, cz + dz)) continue;
          }
          const nIndex = nz * this.cols + nx;
          if (this.closed[nIndex]) continue;

          const stepCost = dx !== 0 && dz !== 0 ? 1.414 : 1;
          const tentative = this.gScore[current] + stepCost;
          if (tentative < this.gScore[nIndex]) {
            this.gScore[nIndex] = tentative;
            this.cameFrom[nIndex] = current;
            const f = tentative + this._heuristic(nx, nz, goalCell.x, goalCell.z);
            open.push(nIndex, f);
          }
        }
      }
    }

    if (!found) return [];

    const path = [];
    let cursor = goalIndex;
    let guard = 0;
    while (cursor !== startIndex && cursor !== -1 && guard < this.total) {
      guard += 1;
      const x = cursor % this.cols;
      const z = Math.floor(cursor / this.cols);
      path.push(this.cellToWorld(x, z));
      cursor = this.cameFrom[cursor];
    }
    path.reverse();

    return this._smooth(start, path);
  }

  _heuristic(x, z, gx, gz) {
    const dx = Math.abs(x - gx);
    const dz = Math.abs(z - gz);
    return dx + dz + (Math.SQRT2 - 2) * Math.min(dx, dz);
  }

  _smooth(start, path) {
    if (path.length < 3) return path;
    const result = [];
    let anchor = new THREE.Vector3(start.x, 0, start.z);

    for (let i = 0; i < path.length; i += 1) {
      const next = path[Math.min(i + 1, path.length - 1)];
      const canSkip = i + 1 < path.length && this._clearLine(anchor, path[i + 1]);
      if (!canSkip) {
        result.push(path[i]);
        anchor = path[i];
      } else {
        // Look ahead further while the line remains clear.
        let furthest = i + 1;
        for (let j = i + 2; j < path.length; j += 1) {
          if (this._clearLine(anchor, path[j])) furthest = j;
          else break;
        }
        if (furthest > i + 1) {
          result.push(path[furthest]);
          anchor = path[furthest];
          i = furthest;
        } else {
          result.push(path[i]);
          anchor = path[i];
        }
      }
      if (next) {
        // Guard prevents odd loops in malformed grids.
      }
    }
    return result;
  }

  _clearLine(from, to) {
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const distance = Math.hypot(dx, dz);
    const steps = Math.ceil(distance / (this.cellSize * 0.45));
    if (steps <= 0) return true;
    for (let i = 1; i <= steps; i += 1) {
      const t = i / steps;
      if (!this.isWalkablePoint(from.x + dx * t, from.z + dz * t)) return false;
    }
    return true;
  }
}
