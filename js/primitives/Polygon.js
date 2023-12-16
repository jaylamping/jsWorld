export class Polygon {
  constructor(points) {
    this.points = points;
    this.segments = [];
    for (let i = 0; i <= points.length; i++) {
      // loop around and connect the last point to the first
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  static break(poly1, poly2) {
    const intersections = [];
    for (const seg1 of poly1.segments) {
      for (const seg2 of poly2.segments) {
        const intersection = seg1.getIntersection(seg2);
        if (intersection) {
          intersections.push(intersection);
        }
      }
    }
    return intersections;
  }

  draw(ctx, { stroke = 'blue', lineWidth = 2, fill = 'rgba(0, 0, 255, 0.3)' } = {}) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
