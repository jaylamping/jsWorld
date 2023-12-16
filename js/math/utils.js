import { Point } from '../primitives/index';

export function getNearestPoint(loc, points, threshold = Infinity) {
  let minDist = Infinity;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minDist && dist < threshold) {
      minDist = dist;
      nearest = point;
    }
  }
  return nearest;
}

export function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function average(p1, p2) {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
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

export function translate(loc, angle, offset) {
  return new Point(loc.x + Math.cos(angle) * offset, loc.y + Math.sin(angle) * offset);
}

export function angle(p) {
  return Math.atan2(p.y, p.x);
}

export function getIntersection(A, B, C, D) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
      };
    }
  }

  return null;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function getRandomColor() {
  const hue = 290 + Math.random() * 260;
  return 'hsl(' + hue + ', 100%, 60%)';
}
