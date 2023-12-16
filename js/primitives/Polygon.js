import { Point, Segment } from './index';

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
    const ints = [];
    for (const seg1 of poly1.segments) {
      for (const seg2 of poly2.segments) {
        const int = getIntersection(seg1.p1, seg1.p2, seg2.p1, seg2.p2);
        if (int && int.offset != 1 && int.offset != 0) {
          ints.push(new Point(int.x, int.y));
        }
      }
    }
    return ints;
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
