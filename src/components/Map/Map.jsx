import React, { useState, useCallback } from 'react';
// import React, { memo } from 'react';
import Map, { Source } from 'react-map-gl';
import { observer } from 'mobx-react';
import DrawControl from '../DrawControl/DrawControl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { AvoidZonesStyles } from '../DrawControl/AvoidZone.styles';
import { GeoFencesStyles } from '../DrawControl/GeoFence.styles';
import { TerminalAreasStyles } from '../DrawControl/TerminalArea.styles';
import { useStore } from '../../Providers/RootStoreProvider';

const MainMap = observer(function MainMap() {
  const store = useStore();
  /* 
  - calls draw.create 2 on first choice
  - calls an additional 2 times each time the action is changed
  - if you stay on an action and draw additional polygons, it'll call draw.create the same number of times
  ex: if draw.create is called 8 times, each additional polygon will call draw.create 8 times
  */

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {area: store.action}}
    ]
  };

  return (
    <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        style={{width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onRender={(e) => e.target.resize()}
    >
      <Source id="geojson" type="geojson" data={geojson}>
        {store.action === 'Avoid Zone' && 
          <DrawControl
            currentStyle={AvoidZonesStyles} 
            currentAction={store.action}
          />
        }
        {store.action === 'Geo Fence' &&
          <DrawControl
            currentStyle={GeoFencesStyles}
            currentAction={store.action}
          />
        }
        {store.action === 'Terminal Area' &&
          <DrawControl
            currentStyle={TerminalAreasStyles}
            currentAction={store.action}
          />
        }
      </Source>
    </Map>
  )
});

export default MainMap;