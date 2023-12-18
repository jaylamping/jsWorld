import { Envelope, Point, Polygon, Segment } from './primitives';
import { add, lerp, scale } from './math/utils';

class World {
  constructor(graph, roadWidth = 80, roadRoundness = 10, buildingWidth = 150, buildingMinLength = 150, spacing = 50) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.buildingWidth = buildingWidth;
    this.buildingMinLength = buildingMinLength;
    this.spacing = spacing;

    this.envelopes = [];
    this.roadBorders = [];
    this.buildings = [];
    this.trees = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(new Envelope(seg, this.roadWidth, this.roadRoundness));
    }

    this.roadBorders = Polygon.union(this.envelopes.map(e => e.poly));
    this.buildings = this.#generateBuildings();
    this.trees = this.#generateTrees();
  }

  draw(ctx) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#BBB', stroke: '#BBB', lineWidth: 15 });
    }
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: 'white', width: 4, dash: [10, 10] });
    }
    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: 'white', width: 4 });
    }
    for (const bld of this.buildings) {
      bld.draw(ctx);
    }
    for (const tree of this.trees) {
      tree.draw(ctx);
    }
  }

  #generateTrees(count = 10) {
    const points = [...this.roadBorders.map(s => [s.p1, s.p2]).flat(), ...this.buildings.map(b => b.points).flat()];
    const left = Math.min(...points.map(p => p.x));
    const right = Math.max(...points.map(p => p.x));
    const bottom = Math.min(...points.map(p => p.y));
    const top = Math.max(...points.map(p => p.y));

    const trees = [];
    while (trees.length < count) {
      const p = new Point(lerp(left, right, Math.random()), lerp(bottom, top, Math.random()));
      trees.push(p);
    }
    return trees;
  }

  #generateBuildings() {
    const tempEnvelopes = [];
    for (const seg of this.graph.segments) {
      tempEnvelopes.push(new Envelope(seg, this.roadWidth + this.buildingWidth + this.spacing * 2, this.roadRoundness));
    }

    const guides = Polygon.union(tempEnvelopes.map(e => e.poly));

    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i];
      if (seg.length() < this.buildingMinLength) {
        guides.splice(i, 1);
        i--;
      }
    }

    const supports = [];

    for (let seg of guides) {
      const len = seg.length() + this.spacing;
      const buildingCnt = Math.floor(len / (this.buildingMinLength + this.spacing));
      const buildingLen = len / buildingCnt - this.spacing;

      const dir = seg.directionVector();

      let q1 = seg.p1;
      let q2 = add(q1, scale(dir, buildingLen));
      supports.push(new Segment(q1, q2));

      for (let i = 2; i <= buildingCnt; i++) {
        q1 = add(q2, scale(dir, this.spacing));
        q2 = add(q1, scale(dir, buildingLen));
        supports.push(new Segment(q1, q2));
      }
    }

    const bases = [];

    for (const seg of supports) {
      bases.push(new Envelope(seg, this.buildingWidth).poly);
    }

    for (let i = 0; i < bases.length - 1; i++) {
      for (let j = i + 1; j < bases.length; j++) {
        if (bases[i].intersectsPoly(bases[j])) {
          bases.splice(j, 1);
          j--;
        }
      }
    }

    return bases;
  }
}

export default World;
