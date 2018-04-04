import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import autobind from 'autobind-decorator';
import keydown from 'react-keydown';
import { Body } from 'matter-js';
import { RaisedButton, Slider } from 'material-ui';
import { WIDTH } from './constants';

const setVelocity = _.throttle(Body.setVelocity, 1000);

@autobind
export default class Controls extends Component {
  static propTypes = {
    items: PropTypes.object.isRequired
  };
  state = { ballMass: 10, boxMass: 10000, ballVelocity: 5 };

  componentWillMount() {
    this.updateBallMass({}, this.state.massSlider);
  }

  @keydown('up')
  up() {
    const { ball } = this.props.items;
    setVelocity(ball, { x: 0, y: -this.state.ballVelocity });
  }

  @keydown('left')
  left() {
    const { ball } = this.props.items;
    setVelocity(ball, { x: -this.state.ballVelocity, y: 0 });
  }

  @keydown('right')
  right() {
    const { ball } = this.props.items;
    setVelocity(ball, { x: this.state.ballVelocity, y: 0 });
  }

  start() {
    const { ball } = this.props.items;
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: 0.5, y: 0 }
    );
  }

  updateBallMass(e, ballMass = this.state.ballMass) {
    const { ball } = this.props.items;
    this.setState({
      ballMass: Number(ballMass)
    });
    Body.setMass(ball, this.state.ballMass);
  }

  updateBoxMass(e, boxMass = this.state.boxMass) {
    const { box } = this.props.items;
    this.setState({
      boxMass: Number(boxMass)
    });
    Body.setMass(box, this.state.boxMass);
  }

  updateBallVelocity(e, ballVelocity = this.state.ballVelocity) {
    this.setState({
      ballVelocity: Number(ballVelocity)
    });
  }

  style = {
    parentControl: {
      display: 'flex',
      justifyContent: 'space-around',
      width: `${WIDTH}px`
    },
    ballControl: {
      width: '400px'
    },
    boxControl: {
      width: '400px'
    },
    row: {
      display: 'flex'
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <div style={this.style.parentControl}>
          <div style={this.style.ballControl}>
            <RaisedButton label="Start" onClick={this.start} />
            <div style={this.style.row}>
              <Slider
                style={{ width: '120px' }}
                min={10}
                max={100}
                defaultValue={this.state.ballMass}
                onChange={this.updateBallMass}
              />
              {this.state.ballMass}
            </div>
            <div style={this.style.row}>
              <Slider
                style={{ width: '120px' }}
                min={0}
                max={100}
                defaultValue={this.state.ballVelocity}
                onChange={this.updateBallVelocity}
              />
              {this.state.ballVelocity}
            </div>
          </div>
          <div style={this.style.boxControl}>
            <RaisedButton label="Start" onClick={this.start} />
            <div style={this.style.row}>
              <Slider
                style={{ width: '120px' }}
                min={10}
                max={10000}
                defaultValue={this.state.boxMass}
                onChange={this.updateBoxMass}
              />
              {this.state.boxMass}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
