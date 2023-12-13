class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.zoom = 1;
    this.minZoom = 1;
    this.maxZoom = 5;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener('wheel', event => this.#handleWheel(event));
  }

  #handleWheel(event) {
    const dir = Math.sign(event.deltaY);
    this.zoom += dir * 0.1;
    this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoom));
  }
}

export default Viewport;
