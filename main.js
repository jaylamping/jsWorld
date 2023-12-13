import Graph from './js/math/graph';
import GraphEditor from './js/graphEditor';
import Viewport from './js/viewport';
import { Point, Segment } from './js/primitives';

const world = document.getElementById('world');

world.width = 1200;
world.height = 800;

const ctx = world.getContext('2d');

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
const viewport = new Viewport(world);
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
  viewport.reset();
  graphEditor.display();

  requestAnimationFrame(animate);
}

graph.draw(ctx);
