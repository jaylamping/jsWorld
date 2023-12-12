class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point));
  }

  containsSegment(segment) {
    return this.segments.find(s => s.equals(segment));
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  tryAddSegment(segment) {
    if (!this.containsSegment(segment)) {
      this.addSegment(segment);
      return true;
    }
    return false;
  }

  removePoint(point) {
    const index = this.points.findIndex(p => p.equals(point));
    if (index !== -1) {
      this.points.splice(index, 1);
    }
  }

  removeSegment(segment) {
    const index = this.segments.findIndex(s => s.equals(segment));
    if (index !== -1) {
      this.segments.splice(index, 1);
    }
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const p of this.points) {
      p.draw(ctx);
    }
  }
}

export default Graph;
