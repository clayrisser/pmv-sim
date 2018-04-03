import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Body } from 'matter-js';
import { RaisedButton, Slider } from 'material-ui';

export default class Controls extends Component {
  static propTypes = {
    items: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.updateMass = this.updateMass.bind(this);
    this.start = this.start.bind(this);
  }

  state = { mass: 10 };

  componentWillMount() {
    this.updateMass({}, this.state.massSlider);
  }

  start() {
    const { box } = this.props.items;
    Body.applyForce(
      box,
      { x: box.position.x, y: box.position.y },
      { x: 0, y: -0.5 }
    );
  }

  updateMass(e, mass = this.state.mass) {
    const { box } = this.props.items;
    this.setState({
      mass: Number(mass)
    });
    Body.setMass(box, this.state.mass);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton label="Start" onClick={this.start} />
          <Slider
            min={5}
            max={15}
            defaultValue={this.state.mass}
            onChange={this.updateMass}
          />
          {this.state.mass}
        </div>
      </MuiThemeProvider>
    );
  }
}
