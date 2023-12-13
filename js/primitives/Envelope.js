import { angle, subtract, translate } from '../math/utils';
import { Polygon } from './index';

export class Envelope {
  constructor(skeleton, width, roundness = 20) {
    this.skeleton = skeleton;
    this.roundness = roundness;
    this.poly = this.#generatePolygon(width, roundness);
  }

  draw(ctx) {
    this.poly.draw(ctx);
  }

  #generatePolygon(width, roundness) {
    const { p1, p2 } = this.skeleton;
    const radius = width / 2;
    const alpha = angle(subtract(p1, p2));
    const alphaClockwise = alpha + Math.PI / 2;
    const alphaCounterClockwise = alpha - Math.PI / 2;
    const p1Clockwise = translate(p1, alphaClockwise, radius);
    const p2Clockwise = translate(p2, alphaClockwise, radius);
    const p1CounterClockwise = translate(p1, alphaCounterClockwise, radius);
    const p2CounterClockwise = translate(p2, alphaCounterClockwise, radius);
    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    // adding epsilon to avoid artifacts
    const eps = step / 2;
    for (let i = alphaCounterClockwise; i <= alphaClockwise + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alphaCounterClockwise; i <= alphaClockwise + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }
}
