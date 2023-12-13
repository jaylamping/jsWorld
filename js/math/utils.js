import { Point } from '../primitives/index';

export function getNearestPoint(location, points, threshold = Infinity) {
  let nearest = null;
  let minDistance = Infinity;
  points.forEach(point => {
    const distance = distanceTo(point, location);
    if (distance < minDistance && distance < threshold) {
      minDistance = distance;
      nearest = point;
    }
  });
  return nearest;
}

export function distanceTo(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}

export function subtract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}

export function scale(p, scaler) {
  return new Point(p.x * scaler, p.y * scaler);
}

export function translate(location, angle, offset) {
  return new Point(location.x + Math.cos(angle) * offset, location.y + Math.sin(angle) * offset);
}

export function angle(p) {
  return Math.atan2(p.y, p.x);
}
