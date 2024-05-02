import * as React from 'react';
import Map from 'react-map-gl';

const App = () => {
  return (
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 10
        }}
        style={{width: 1000, height: 800}}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
    />
  );
}

export default App
