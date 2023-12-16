import { Point, Segment } from './index';
import { getIntersection } from '../math/utils';

export class Polygon {
  constructor(points) {
    this.points = points;
    this.segments = [];
    for (let i = 0; i <= points.length; i++) {
      // loop around and connect the last point to the first
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  // static break(poly1, poly2) {
  //   const ints = [];
  //   for (const seg1 of poly1.segments) {
  //     for (const seg2 of poly2.segments) {
  //       const int = getIntersection(seg1.p1, seg1.p2, seg2.p1, seg2.p2);
  //       console.log(int);
  //       if (int && int.offset != 1 && int.offset != 0) {
  //         ints.push(new Point(int.x, int.y));
  //       }
  //     }
  //   }
  //   return ints;
  // }

  static break(poly1, poly2) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;
    const ints = [];
    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        console.log(segs1[i], segs2[j]);
        const int = getIntersection(segs1[i].p1, segs1[i].p2, segs2[j].p1, segs2[j].p2);
        if (int && int.offset != 1 && int.offset != 0) {
          const point = new Point(int.x, int.y);
          console.log('point', point);
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
    for (const point of points) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
