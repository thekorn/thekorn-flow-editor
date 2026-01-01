import type { Vec } from '@/types';

/**
 * Adds two 2D vectors together.
 * @param a - The first vector.
 * @param b - The second vector to add to the first.
 * @returns A new vector representing the sum of the two input vectors.
 */
export function addVec(a: Vec, b: Vec): Vec {
  return { x: a.x + b.x, y: a.y + b.y };
}

/**
 * Subtracts one 2D vector from another.
 * @param a - The vector to subtract from.
 * @param b - The vector to subtract.
 * @returns A new vector representing the difference of the two input vectors.
 */
export function subVec(a: Vec, b: Vec): Vec {
  return { x: a.x - b.x, y: a.y - b.y };
}

/**
 * Snaps a 2D vector to the nearest points on a grid.
 * @param vec - The vector to snap.
 * @param gridSize - The size of each grid cell.
 * @returns A new vector snapped to the nearest grid points.
 */
export function snapToGrid(vec: Vec, gridSize: number): Vec {
  return {
    x: Math.round(vec.x / gridSize) * gridSize,
    y: Math.round(vec.y / gridSize) * gridSize,
  };
}
