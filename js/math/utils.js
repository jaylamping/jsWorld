export function getNearestPoint(location, points) {
  let nearest = null;
  let minDistance = Infinity;
  points.forEach(point => {
    const distance = distanceTo(point, location);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = point;
    }
  });
  return nearest;
}

export function distanceTo(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
