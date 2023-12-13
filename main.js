import Graph from './js/math/graph';
import GraphEditor from './js/GraphEditor';
import Viewport from './js/Viewport';
import { Polygon, Envelope } from './js/primitives';

const world = document.getElementById('world');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');

world.width = 1200;
world.height = 750;

const ctx = world.getContext('2d');

const localStorageGraph = localStorage.getItem('graph');
const graphInfo = localStorageGraph ? JSON.parse(localStorageGraph) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const viewport = new Viewport(world);
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
  viewport.reset();
  graphEditor.display();
  new Envelope(graph.segments[0].points).draw(ctx);
  // new Polygon(graph.points).draw(ctx);
  requestAnimationFrame(animate);
}

clearBtn.addEventListener('click', () => graphEditor.dispose());

saveBtn.addEventListener('click', () => localStorage.setItem('graph', JSON.stringify(graph)));

graph.draw(ctx);
