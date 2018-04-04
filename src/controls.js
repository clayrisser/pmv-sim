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
  state = {
    ballMass: 10,
    boxMass: 10000,
    ballVelocity: 1,
    ballRestitution: 0,
    boxRestitution: 0
  };

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

  updateBallMass(e, ballMass = this.state.ballMass) {
    const { ball } = this.props.items;
    this.setState({
      ballMass: Number(ballMass)
    });
    Body.setMass(ball, this.state.ballMass);
  }

  updateBallRestitution(e, ballRestitution = this.state.ballRestitution) {
    const { ball } = this.props.items;
    ballRestitution = Number(ballRestitution);
    this.setState({ ballRestitution });
    ball.restitution = ballRestitution;
  }

  updateBoxRestitution(e, boxRestitution = this.state.boxRestitution) {
    const { box } = this.props.items;
    boxRestitution = Number(boxRestitution);
    this.setState({ boxRestitution });
    box.restitution = boxRestitution;
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
      width: '520px'
    },
    boxControl: {
      width: '520px'
    },
    row: {
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      padding: '0px 24px',
      margin: '0px',
      width: '80px'
    },
    unit: {
      display: 'flex',
      alignItems: 'center',
      padding: '0px 24px',
      margin: '0px'
    },
    slider: {
      marginBottom: '6px',
      marginTop: '6px'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',

      width: `${WIDTH}px`
    },
    header: {
      textAlign: 'center'
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div style={this.style.buttons}>
            <RaisedButton label="Left" onClick={this.left} />
            <RaisedButton label="Up" onClick={this.up} />
            <RaisedButton label="Right" onClick={this.right} />
          </div>
          <div style={this.style.parentControl}>
            <div style={this.style.ballControl}>
              <h2 style={this.style.header}>Ball</h2>
              <div style={this.style.row}>
                <h3 style={this.style.label}>Mass</h3>
                <Slider
                  style={{ width: '120px' }}
                  min={10}
                  max={100}
                  defaultValue={this.state.ballMass}
                  onChange={this.updateBallMass}
                  sliderStyle={this.style.slider}
                />
                <h3 style={this.style.unit}>{this.state.ballMass} kg</h3>
              </div>
              <div style={this.style.row}>
                <h3 style={this.style.label}>Velocity</h3>
                <Slider
                  style={{ width: '120px' }}
                  min={1}
                  max={100}
                  defaultValue={this.state.ballVelocity}
                  onChange={this.updateBallVelocity}
                  sliderStyle={this.style.slider}
                />
                <h3 style={this.style.unit}>{this.state.ballVelocity} m/s</h3>
              </div>
              <div style={this.style.row}>
                <h3 style={this.style.label}>Elasticity</h3>
                <Slider
                  style={{ width: '120px' }}
                  min={0}
                  max={1}
                  defaultValue={this.state.ballRestitution}
                  onChange={this.updateBallRestitution}
                  sliderStyle={this.style.slider}
                />
                <h3 style={this.style.unit}>
                  {this.state.ballRestitution} restitution
                </h3>
              </div>
            </div>
            <div style={this.style.boxControl}>
              <h2 style={this.style.header}>Box</h2>
              <div style={this.style.row}>
                <h3 style={this.style.label}>Mass</h3>
                <Slider
                  style={{ width: '120px' }}
                  min={10}
                  max={10000}
                  defaultValue={this.state.boxMass}
                  onChange={this.updateBoxMass}
                  sliderStyle={{ marginBottom: '24px' }}
                />
                <h3 style={this.style.unit}>{this.state.boxMass} kg</h3>
              </div>
              <div style={this.style.row}>
                <h3 style={this.style.label}>Elasticity</h3>
                <Slider
                  style={{ width: '120px' }}
                  min={0}
                  max={1}
                  defaultValue={this.state.boxRestitution}
                  onChange={this.updateBoxRestitution}
                  sliderStyle={this.style.slider}
                />
                <h3 style={this.style.unit}>
                  {this.state.boxRestitution} restitution
                </h3>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
