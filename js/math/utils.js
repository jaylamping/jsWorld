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

export function getIntersection(a, b, c, d) {
  const tTop = (a.y - c.y) * (d.x - c.x) - (a.x - c.x) * (d.y - c.y);
  const uTop = (a.y - c.y) * (b.x - a.x) - (a.x - c.x) * (b.y - a.y);
  const bot = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);

  if (bot === 0) {
    return null;
  }

  const t = tTop / bot;
  const u = uTop / bot;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      offset: t
    };
  }
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}
