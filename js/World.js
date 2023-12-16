import { Envelope, Polygon } from '../js/primitives';

class World {
  constructor(graph, roadWidth = 100, roadRoundness = 3) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    this.graph.segments.forEach(segment => {
      this.envelopes.push(new Envelope(segment, this.roadWidth, this.roadRoundness));
    });
    console.log(this.envelopes[0].poly, this.envelopes[1].poly);
    this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
  }

  draw(ctx) {
    this.envelopes.forEach(envelope => envelope.draw(ctx));
    this.intersections.forEach(intersection => intersection.draw(ctx, { color: 'red', size: 6 }));
  }
}

export default World;
