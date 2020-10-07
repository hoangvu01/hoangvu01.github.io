/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import DeckGL from '@deck.gl/react';
import { COORDINATE_SYSTEM, OrbitView, LinearInterpolator,
         PointLight, LightingEffect, } from '@deck.gl/core';
import { PointCloudLayer, LineLayer } from '@deck.gl/layers';

import deerVertices from './PointCloud/deerVertices.json';
import deerEdges from './PointCloud/deerEdges.json';
import wolfVertices from './PointCloud/wolfVertices.json';
import wolfEdges from './PointCloud/wolfEdges.json';
import catVertices from './PointCloud/catVertices.json';
import catEdges from './PointCloud/catEdges.json';


const INITIAL_VIEW_STATE = {
  height: 981,
  maxRotationX: 90,
  maxZoom: 4,
  minRotationX: -90,
  minZoom: 1.5,
  orbitAxis: "Y",
  rotationOrbit: 145,
  rotationX: -10,
  target: [21.118023647139864, 85.00000000000024, -22.091639154636486],
  width: 1081,
  zoom: 3
};

const pointCloudData = [ 
  { vertices : deerVertices, 
    edges : deerEdges
  }, 
  { vertices : wolfVertices, 
    edges : wolfEdges
  },
  {
    vertices : catVertices,
    edges : catEdges
  }
];

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [0, 100, 100]
});

const lightingEffect = new LightingEffect({pointLight});

const transitionInterpolator = new LinearInterpolator(['rotationOrbit']);



export default class DeerCloud extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: INITIAL_VIEW_STATE,
      rotating: true,
      dataPointer: 0
    };

    this._onViewStateChange = this._onViewStateChange.bind(this);
    this._rotateCamera = this._rotateCamera.bind(this);
    this._stopRotate = this._stopRotate.bind(this);
  }

  _onViewStateChange({viewState}) {
    this.setState({viewState});
  }

  _rotateCamera() {
    const { viewState, rotating } = this.state;
    if (!rotating) return;

    this.setState({
      viewState: {
        ...viewState,
        rotationOrbit: viewState.rotationOrbit + 60,
        transitionDuration: 3000,
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

  componentDidMount() {
    setInterval(() => {
      this._rotateCamera();
    }, 1);

    setInterval(() => {
      this.setState({
        dataPointer: (this.state.dataPointer + 1) % pointCloudData.length
      });
      this.forceUpdate();
    }, 15000);
  }


  render() {
    const { dataPointer, viewState } = this.state;

    const layers = [
      new PointCloudLayer({
        id: 'point-cloud-layer',
        data: pointCloudData[dataPointer].vertices,
        getPosition: d => d.position,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getColor: [250, 250, 250],
        opacity: 1,
        pointSize: 1.5,
        transitions : {
          getColor : {
            duration: 10000,
            enter: value => [0,0,0,0]
          }
        }
      }),
      new LineLayer({
       id: 'arc-layer',
       data: pointCloudData[dataPointer].edges,
       coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
       pickable: true,
       getWidth: 1.3,
       getSourcePosition: edge => edge.from,
       getTargetPosition: edge => edge.to,
       getColor: [255, 255, 255],
       transitions: {
         getSourcePosition: {
           duration: 1800,
           enter: value => [0, 0, 0]
         },
         getTargetPosition: {
           duration: 1800,
           enter: value => value.map(x => -x)
         }
       }
     })
    ];

    return (
      <DeckGL
        views={new OrbitView()}
        viewState={viewState}
        controller={true}
        onViewStateChange={this._onViewStateChange}
        layers={layers}
        effects={[lightingEffect]}
        parameters={{
          clearColor: [0, 0, 0, 0]
        }}
      >
      </DeckGL>
    );
  }
}
