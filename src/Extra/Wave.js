/* eslint-disable no-unused-vars */
import React, { PureComponent, Component, useState, useEffect} from 'react';
import { render} from 'react-dom';
import DeckGL, {FlyToInterpolator} from 'deck.gl';
import { COORDINATE_SYSTEM, OrbitView, LinearInterpolator} from '@deck.gl/core';
import { PointCloudLayer, LineLayer, ScatterplotLayer } from '@deck.gl/layers';
import Deer from '../Projects/Deer';

import puddle from './components/puddle.json';

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 20,
  rotationOrbit: 5,
  fov: 50,
  minZoom: 3.5,
  maxZoom: 15,
  zoom: 6
};

const TOP_DOWN_VIEW = {
  target: [0, 0, 0],
  rotationX: 90,
  rotationOrbit: 5,
  fov: 50,
  minZoom: 3.5,
  maxZoom: 15,
  zoom: 5.5,
  transitionDuration: 8000,
  transitionInterpolator: new FlyToInterpolator()
}

const transitionInterpolator = new LinearInterpolator(['rotationOrbit']);

export default class Wave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: INITIAL_VIEW_STATE,
      rotating: true
    };

    this._onViewStateChange = this._onViewStateChange.bind(this);
    this._rotateCamera = this._rotateCamera.bind(this);
    this._stopRotate = this._stopRotate.bind(this);
    this._calculateColour = this._calculateColour.bind(this);
    this._goToTop = this._goToTop.bind(this);
  }

  _onViewStateChange({ viewState }) {
    this.setState({ viewState });
  }


    _rotateCamera() {
      const { viewState, rotating } = this.state;
      if (!rotating) return;
      this.setState({
        viewState: {
          ...viewState,
          rotationOrbit: viewState.rotationOrbit + 60,
          transitionDuration: 5000,
          transitionInterpolator,
          onTransitionEnd: this._rotateCamera
        }
      });
    }

    _stopRotate({info}){
      this.setState({
        rotating: false
      })
    }

    _calculateColour(values) {
      const rangeFrom = [69,162,71];
      const rangeTo = [40,60,134];
      return [
              rangeTo[0] + (rangeFrom[0] - rangeTo[0]) * values[0] / 30,
              rangeTo[1] + (rangeFrom[1] - rangeTo[1]) * values[1] / 30,
              rangeTo[2] + (rangeFrom[2] - rangeTo[2]) * values[2] / 30
              ];
    }


    _goToTop(){

    }

    componentDidMount() {
      setInterval(() => {
        this._rotateCamera();
      }, 1);

    }


  render() {
    const { viewState } = this.state;

    const layers = [
      new PointCloudLayer({
        id: 'wave',
        data: puddle,
        getPosition: d => d.position,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getColor: d => this._calculateColour(d.position),
        opacity: 1,
        pointSize: 1.5,
        transitions: {
          getColor: {
            duration: 3000,
            enter: value => [0,0,0]
          },
          getPosition : {
            duration: 30000,
            type: 'spring',
            stiffness: 0.001,
            damping: 0.005,
            enter: value => [value[0], value[1], 3 * Math.cos(0.5 * Math.sqrt(value[1] ** 2 + value[0] ** 2))]
          },
        },
        onClick: () => this._goToTop(),
      })
    ];

    return (
      <DeckGL
        views={new OrbitView()}
        viewState={viewState}
        controller={true}
        onLoad={this._goToTop}
        onViewStateChange={this._onViewStateChange}
        layers={layers}
        parameters={{
          clearColor: [0, 0, 0, 0]
        }}
      >
      </DeckGL>
    );
  }
}
