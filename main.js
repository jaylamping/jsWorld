import Graph from './js/math/graph';
import { Point, Segment } from './js//primitives';

const world = document.getElementById('world');
const addPointBtn = document.getElementById('add-point-btn');
const addSegmentBtn = document.getElementById('add-segment-btn');

world.width = 600;
world.height = 600;

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
graph.draw(ctx);

addPointBtn.addEventListener('click', () => {
  const success = graph.tryAddPoint(new Point(Math.random() * world.width, Math.random() * world.height));
  ctx.clearRect(0, 0, world.width, world.height);
  graph.draw(ctx);
  console.log('success:', success);
});

addSegmentBtn.addEventListener('click', () => {
  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);
  index1 != index2 ? graph.tryAddSegment(new Segment(graph.points[index1], graph.points[index2])) : null;
  ctx.clearRect(0, 0, world.width, world.height);
  graph.draw(ctx);
});
