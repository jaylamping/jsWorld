import { Envelope } from '../js/primitives';

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
  }

  draw(ctx) {
    this.envelopes.forEach(envelope => envelope.draw(ctx));
  }
}

export default World;
