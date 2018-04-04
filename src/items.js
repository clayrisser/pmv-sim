import { Bodies } from 'matter-js';
import {
  WALL_WIDTH,
  WIDTH,
  HEIGHT,
  BALL_RADIUS,
  CUBE_WIDTH
} from './constants';

export default {
  box: Bodies.rectangle(700, 200, CUBE_WIDTH, CUBE_WIDTH, { angle: 1 }),
  ball: Bodies.circle(WALL_WIDTH + BALL_RADIUS * 2, HEIGHT / 2, 40),
  wallTop: Bodies.rectangle(WIDTH / 2, WALL_WIDTH / 2, WIDTH, WALL_WIDTH, {
    isStatic: true
  }),
  wallBottom: Bodies.rectangle(
    WIDTH / 2,
    HEIGHT - WALL_WIDTH / 2,
    WIDTH,
    WALL_WIDTH,
    {
      isStatic: true
    }
  ),
  wallLeft: Bodies.rectangle(WALL_WIDTH / 2, HEIGHT / 2, WALL_WIDTH, HEIGHT, {
    isStatic: true
  }),
  wallRight: Bodies.rectangle(
    WIDTH - WALL_WIDTH / 2,
    HEIGHT / 2,
    WALL_WIDTH,
    HEIGHT,
    {
      isStatic: true
    }
  )
};
