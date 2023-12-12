import Graph from './js/math/graph';
import { Point, Segment } from './js//primitives';

const world = document.getElementById('world');

world.width = 600;
world.height = 600;

const ctx = world.getContext('2d');

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const graph = new Graph([p1, p2, p3, p4]);
graph.draw(ctx);
