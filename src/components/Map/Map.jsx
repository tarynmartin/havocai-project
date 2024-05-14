import React, { useState, useCallback } from 'react';
// import React, { memo } from 'react';
import Map from 'react-map-gl';
import { observer } from 'mobx-react';
import DrawControl from '../DrawControl/DrawControl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { AvoidZonesStyles } from '../DrawControl/AvoidZone.styles';
import { GeoFencesStyles } from '../DrawControl/GeoFence.styles';
import { TerminalAreasStyles } from '../DrawControl/TerminalArea.styles';
import { useStore } from '../../Providers/RootStoreProvider';

const MainMap = observer((props) => {
  const store = useStore();
  // console.log('main map', store.features, store.drawFeatureID)
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
      {props.action === 'Avoid Zone' && 
        <DrawControl
          // onCreate={onUpdate}
          // onUpdate={onUpdate}
          // onDelete={onDelete}
          currentStyle={AvoidZonesStyles} 
          currentAction={props.action}
        />
      }
      {props.action === 'Geo Fence' &&
        <DrawControl
          // onCreate={onUpdate}
          // onUpdate={onUpdate}
          // onDelete={onDelete}
          currentStyle={GeoFencesStyles}
          currentAction={props.action}
        />
      }
      {props.action === 'Terminal Area' &&
        <DrawControl
          // onCreate={onUpdate}
          // onUpdate={onUpdate}
          // onDelete={onDelete}
          currentStyle={TerminalAreasStyles}
          currentAction={props.action}
        />
      }
    </Map>
  )
});

export default MainMap;