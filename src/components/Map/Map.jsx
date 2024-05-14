import React from 'react';
import Map, { Source } from 'react-map-gl';
import DrawControl from '../DrawControl/DrawControl';
import { getGeoJSON } from '../../utils/utils';

// styles
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { AvoidZonesStyles } from '../../utils/AvoidZone.styles';
import { GeoFencesStyles } from '../../utils/GeoFence.styles';
import { TerminalAreasStyles } from '../../utils/TerminalArea.styles';

const MainMap = ({ action }) => {
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
      <Source id="geojson" type="geojson" data={() => getGeoJSON(action)}>
        {action === 'Avoid Zone' && 
          <DrawControl
            currentStyle={AvoidZonesStyles} 
            currentAction={action}
          />
        }
        {action === 'Geo Fence' &&
          <DrawControl
            currentStyle={GeoFencesStyles}
            currentAction={action}
          />
        }
        {action === 'Terminal Area' &&
          <DrawControl
            currentStyle={TerminalAreasStyles}
            currentAction={action}
          />
        }
      </Source>
    </Map>
  )
};

export default MainMap;