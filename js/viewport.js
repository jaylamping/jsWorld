import { Point } from './primitives/index';
import { add, subtract, scale } from './math/utils';

class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.zoom = 1;
    this.minZoom = 1;
    this.maxZoom = 10;

    this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);

    this.offset = scale(this.center, -1);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false
    };

    this.#addEventListeners();
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  getMouse(event, subtractDragOffset = false) {
    const p = new Point(
      (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      (event.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener('wheel', event => this.#handleWheel(event));
    this.canvas.addEventListener('mousedown', event => this.#handleMouseDown(event));
    this.canvas.addEventListener('mousemove', event => this.#handleMouseMove(event));
    this.canvas.addEventListener('mouseup', event => this.#handleMouseUp(event));
  }

  #handleWheel(event) {
    const dir = Math.sign(event.deltaY);
    this.zoom += dir * 0.2;
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom));
  }

  #handleMouseDown(event) {
    // middle click
    if (event.button == 1) {
      this.drag.start = this.getMouse(event);
      this.drag.active = true;
    }
  }

  #handleMouseMove(event) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleMouseUp(event) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false
      };
    }
  }
}

export default Viewport;
