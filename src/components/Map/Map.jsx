import { useMemo, useState, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import { observer } from 'mobx-react';  
import { useStore } from '../../Providers/RootStoreProvider';
// components/utils
import DrawControl from '../DrawControl/DrawControl';
import { labelLayout } from '../../utils/utils';
// styles
import { AvoidZonesStyles } from '../../utils/AvoidZone.styles';
import { GeoFencesStyles } from '../../utils/GeoFence.styles';
import { TerminalAreasStyles } from '../../utils/TerminalArea.styles';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const MainMap = observer(() => {
  const store = useStore();
  const GeoJSON = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', properties: {area: store.action}}]
  }
  const { displaySavedZones, action, selectedSavedZone } = store;
  const [drawnFeatures, setDrawnFeatures] = useState(GeoJSON);

  useEffect(() => {
    if (!displaySavedZones) return;
    ;
    selectedSavedZone.geometry.type = 'Polygon';

    const JSONObject = {
      type: 'FeatureCollection',
      features: [selectedSavedZone]
    }

    setDrawnFeatures(JSONObject);
  }, [displaySavedZones, selectedSavedZone])

  const findStyles = useMemo(() => {
    switch(action) {
      case('Avoid Zone'):
        return "#D20C0C";
      case('Geo Fence'):
        return "#f2f213";
      case('Terminal Area'):
        return "#eb9707";
      default:
        return "#000000";
    }
  }, [displaySavedZones, store.action])

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
      {(displaySavedZones && drawnFeatures) && 
        <Source id="saved zone" type="geojson" data={drawnFeatures}>
          <Layer 
            id="saved zone"
            type="fill"
            source="saved zone"
            paint={{
              "fill-color": findStyles,
              "fill-outline-color": findStyles,
              "fill-opacity": 0.1
            }} 
          />
          <Layer 
            id="saved zone line"
            type="line"
            source="saved zone"
            paint={{
              "line-color": findStyles,
              "line-dasharray": [0.2, 2],
              "line-width": 2}} 
            layout={{
              "line-cap": "round",
              "line-join": "round"
            }}
          />
          <Layer 
            id="label layer"
            type="symbol"
            source="saved zone"
            layout={labelLayout}
            paint={{ 'text-color': '#000000' }}
          />
        </Source>
        // TODO: add ability to interact w/the saved zones 
      }
      {!displaySavedZones && 
         <Source id="geojson" type="geojson" data={drawnFeatures}>
          {action === 'Avoid Zone' && 
            <DrawControl
              currentStyle={AvoidZonesStyles} 
            />
          }
          {action === 'Geo Fence' &&
            <DrawControl
              currentStyle={GeoFencesStyles}
            />
          }
          {action === 'Terminal Area' &&
            <DrawControl
              currentStyle={TerminalAreasStyles}
            />
          }
        </Source>
      }
    </Map>
  )
});

export default MainMap;