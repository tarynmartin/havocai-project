import React, { useState, useCallback, useMemo } from 'react';
import Map from 'react-map-gl';
import SpeedDial from './components/SpeedDial/SpeedDial.jsx';
import DrawControl from './components/DrawControl/DrawControl.js';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const App = () => {
  const [action, setAction] = useState(null);
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      console.log('features', e.features)

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
      {/* when switching actions, should auto select draw option */}
      <DrawControl position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true
        }}
        defaultMode="draw_polygon"
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={onDelete}
        currentAction={action}
      />
    </Map>
    <SpeedDial setChoice={setAction} />
    </div>
  );
}

export default App
