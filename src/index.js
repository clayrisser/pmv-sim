import 'babel-polyfill';
import React from 'react';
import _ from 'lodash';
import { Engine, Render, World } from 'matter-js';
import { render } from 'react-dom';
import Controls from './controls';
import items from './items';

const engine = Engine.create();
const renderer = Render.create({
  // eslint-disable-next-line no-undef
  element: document.getElementById('engine'),
  engine
});
World.add(engine.world, _.map(items, item => item));
Engine.run(engine);
Render.run(renderer);

// eslint-disable-next-line no-undef
render(<Controls items={items} />, document.getElementById('controls'));
