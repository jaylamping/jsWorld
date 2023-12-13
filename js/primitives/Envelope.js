import { Polygon } from './index';

export class Envelope {
  constructor(skeleton, width) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width);
  }

  #generatePolygon(width) {
    const { p1, p2 } = this.skeleton;
    const radius = width / 2;
    const alpha = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    const alphaClockwise = alpha + Math.PI / 2;
    const alphaCounterClockwise = alpha - Math.PI / 2;
    const p1Clockwise = translate(p1, alphaClockwise, radius);
    const p2Clockwise = translate(p2, alphaClockwise, radius);
    const p1CounterClockwise = translate(p1, alphaCounterClockwise, radius);
    const p2CounterClockwise = translate(p2, alphaCounterClockwise, radius);

    return new Polygon([p1Clockwise, p2Clockwise, p1CounterClockwise, p2CounterClockwise]);
  }
}
