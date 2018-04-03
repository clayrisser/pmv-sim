import { Bodies } from 'matter-js';

export default {
  ground: Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
  box: Bodies.rectangle(400, 200, 80, 80, { angle: 1 })
};
