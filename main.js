import Graph from './js/math/Graph';
import GraphEditor from './js/GraphEditor';
import Viewport from './js/Viewport';
import World from './js/World';

const canvas = document.getElementById('canvas');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');

canvas.width = 1200;
canvas.height = 750;

const ctx = canvas.getContext('2d');

const localStorageGraph = localStorage.getItem('graph');
const graphInfo = localStorageGraph ? JSON.parse(localStorageGraph) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);
const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

let prevGraphHash = graph.hash();

animate();

function animate() {
  viewport.reset();
  if (graph.hash() != prevGraphHash) {
    world.generate();
    prevGraphHash = graph.hash();
  }
  world.draw(ctx);
  ctx.globalAlpha = 0.3;
  graphEditor.display();
  requestAnimationFrame(animate);
}

clearBtn.addEventListener('click', () => graphEditor.dispose());

saveBtn.addEventListener('click', () => localStorage.setItem('graph', JSON.stringify(graph)));
