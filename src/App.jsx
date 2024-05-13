import React, { useState, useCallback, useMemo } from 'react';
import Map from 'react-map-gl';
import SpeedDial from './components/SpeedDial/SpeedDial.jsx';
import DrawControl from './components/DrawControl/DrawControl.js';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import { AvoidZonesStyles } from './components/DrawControl/AvoidZone.styles.js';
import { GeoFencesStyles } from './components/DrawControl/GeoFence.styles.js';
import { TerminalAreasStyles } from './components/DrawControl/TerminalArea.styles.js';

const App = () => {
  const [action, setAction] = useState(null);
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};

      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div className='app'>
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
      {action === 'Avoid Zone' && <DrawControl
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        currentStyle={AvoidZonesStyles} 
        currentAction={action}
      />}
      {action === 'Geo Fence' && <DrawControl
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        currentStyle={GeoFencesStyles}
        currentAction={action}
      /> }
      {action === 'Terminal Area' && <DrawControl
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        currentStyle={TerminalAreasStyles}
        currentAction={action}
      /> }
    </Map>
    <SpeedDial setChoice={setAction} />
    </div>
  );
}

export default App
