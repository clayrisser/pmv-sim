import 'babel-polyfill';
import React from 'react';
import _ from 'lodash';
import { Engine, Render, World } from 'matter-js';
import { render } from 'react-dom';
import './style.scss';
import Controls from './controls';
import items from './items';
import { WIDTH, HEIGHT } from './constants';

const engine = Engine.create();
const renderer = Render.create({
  // eslint-disable-next-line no-undef
  element: document.getElementById('engine'),
  engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    showAngleIndicator: false,
    wireframes: false
  }
});
World.add(engine.world, _.map(items, item => item));
Engine.run(engine);
Render.run(renderer);

// eslint-disable-next-line no-undef
render(<Controls items={items} />, document.getElementById('controls'));
