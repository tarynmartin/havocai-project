import * as React from 'react';
import Map from 'react-map-gl';
import SpeedDial from './components/SpeedDial/SpeedDial.jsx';

const App = () => {
  return (
    <div className='app.'>
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
    />
    <SpeedDial />
    </div>
  );
}

export default App
