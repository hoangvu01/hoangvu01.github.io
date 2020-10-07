import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ArcLayer, ScatterplotLayer, PointCloudLayer } from '@deck.gl/layers';
import { MapView } from '@deck.gl/core';
import GL from '@luma.gl/constants';

import tokens from '../secret/tokens.json';
import airports from './DataViz/Data/airports.json';
import routes from './DataViz/Data/routes.json';

// Set your mapbox token here
const MAPBOX_TOKEN = tokens.mapbox; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 30,
  zoom: 1.5,
  maxZoom: 15,
  pitch: 30,
  bearing: 15
};

function getSourceColor(d) {
  return [d.from[0] * 1.5, d.to[1], d.from[2] * 0.3, d.from[2]];
}


function getTargetColor(d) {
  return [d.to[0] * 1.5, d.from[1], d.to[2] * 0.3, d.from[2]];

}

/* eslint-disable react/no-deprecated */
export default class FlightFlat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewState: INITIAL_VIEW_STATE,
      hoveredObject: null
    };

    this._onHover = this._onHover.bind(this);
    this._renderTooltip = this._renderTooltip.bind(this);
  }

  _onHover({x, y, object}) {
    this.setState({x, y, hoveredObject: object});
  }

  _renderTooltip() {
    const {hoveredObject, x, y} = this.state || {};
    return hoveredObject && (
      <div id='mapTooltip' style={{left: x, top: y}}>
        <h4> { hoveredObject.name } </h4>
      </div>
    );
  }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/dark-v9'} = this.props;

    const layers = [
      new ScatterplotLayer({
        id: 'airports',
        data: airports,
        pickable: true,
        opacity: 1,
        stroked: true,
        filled: true,
        radiusScale: 6,
        getRadius: 3500,
        getPosition: d => d.position,
        getFillColor: [113, 200, 235],
        transitions: {
          getRadius: {
            type: 'interpolation',
            duration: 5000,
            easing: value => value * 1.1 // grow from size 0
          },
          getFillColor: {
            duration: 3000,
            enter: value => [0, 0, 0]
          }
        },
        onHover: this._onHover
      }),
      new ArcLayer({
        id: 'flights',
        data: routes,
        pickable: true,
        getHeight: () => Math.random() * 0.3 + 0.3,
        getWidth: 0.2,
        getSourcePosition: d => d.from,
        getTargetPosition: d => d.to,
        getSourceColor: getSourceColor,
        getTargetColor: getTargetColor,
        transitions: {
          getSourceColor : {
            duration: 5000,
            enter: value => [0, 0, 0]
          },
          getTargetColor: {
            duration: 3000,
            enter: value => [0, 0, 0]
          }
        },
      })
    ];

    return (
        <DeckGL
          views={new MapView({repeat: false})}
          position='relative'
          layers={layers}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          parameters={{
            blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
            blendEquation: GL.FUNC_ADD
          }}
        >
          { this._renderTooltip() }
          <StaticMap
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />

        </DeckGL>
    );
  }
}
