import 'babel-polyfill';
import { Engine, Render, Bodies, World } from 'matter-js';

const engine = Engine.create();
const render = Render.create({
  element: document.getElementById('app'),
  engine
});
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const box = Bodies.rectangle(400, 200, 80, 80);
World.add(engine.world, [box, ground]);
Engine.run(engine);
Render.run(render);
