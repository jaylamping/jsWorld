import { Point, Segment } from './primitives';
import { getNearestPoint } from './math/utils';

class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext('2d');

    this.mouse = null;
    this.selected = null;
    this.hovered = null;
    this.dragging = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', event => {
      // right click
      if (event.button == 2) {
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      // left click
      if (event.button == 0) {
        this.mouse = new Point(event.offsetX, event.offsetY);
        if (this.hovered) {
          this.#selectPoint(this.hovered);
          this.selected = this.hovered;
          this.dragging = true;
          return;
        }
        this.graph.addPoint(this.mouse);
        this.#selectPoint(this.mouse);
        this.selected = this.mouse;
        this.hovered = this.mouse;
      }
    });
    this.canvas.addEventListener('mousemove', event => {
      this.mouse = new Point(event.offsetX, event.offsetY);
      this.hovered = getNearestPoint(this.mouse, this.graph.points, 25);
      if (this.dragging) {
        this.selected.x = this.mouse.x;
        this.selected.y = this.mouse.y;
      }
    });
    // prevent context menu
    this.canvas.addEventListener('contextmenu', event => event.preventDefault());
    this.canvas.addEventListener('mouseup', () => (this.dragging = false));
    this.canvas.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.selected = null;
      }
    });
  }

  #selectPoint(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    if (this.selected === point) {
      this.selected = null;
    }
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { width: 2, dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export default GraphEditor;
