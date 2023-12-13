import { Point } from './primitives';
import { getNearestPoint } from './math/utils';

class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext('2d');

    this.selected = null;
    this.hovered = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', event => {
      // right click
      if (event.button == 2) {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      // left click
      if (event.button == 0) {
        const mouse = new Point(event.offsetX, event.offsetY);
        if (this.hovered) {
          this.selected = this.hovered;
          return;
        }
        this.graph.addPoint(mouse);
        this.selected = mouse;
      }
    });
    this.canvas.addEventListener('mousemove', event => {
      const mouse = new Point(event.offsetX, event.offsetY);
      this.hovered = getNearestPoint(mouse, this.graph.points, 20);
    });
    // prevent context menu
    this.canvas.addEventListener('contextmenu', event => event.preventDefault());
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.selected = null;
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export default GraphEditor;
