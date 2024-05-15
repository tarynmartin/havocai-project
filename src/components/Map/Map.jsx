import { useMemo } from 'react';
import Map, { Source } from 'react-map-gl';
import { observer } from 'mobx-react';  
import { useStore } from '../../Providers/RootStoreProvider';
// components/utils
import DrawControl from '../DrawControl/DrawControl';
import { getGeoJSON } from '../../utils/utils';
// styles
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { AvoidZonesStyles } from '../../utils/AvoidZone.styles';
import { GeoFencesStyles } from '../../utils/GeoFence.styles';
import { TerminalAreasStyles } from '../../utils/TerminalArea.styles';

const MainMap = observer(() => {
  const store = useStore();
  const displaySavedZones = store.displaySavedZones;

  const GeoJSON = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', properties: {area: store.action}}]
  }

  const createJSON = useMemo(() => {
    if (!displaySavedZones) {
      return GeoJSON;
    }
    
    const savedZone = store.getSavedZone(store.drawFeatureID);
    savedZone.geometry.type = 'Polygon';

    const JSONObject = {
      type: 'FeatureCollection',
      features: [savedZone]
    }
    console.log('made object: ', JSONObject)
    return JSONObject;
  }, [displaySavedZones])

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
      <Source id="geojson" type="geojson" data={createJSON}>
        <DrawControl />
        {/* {store.action === 'Avoid Zone' && 
          <DrawControl
            currentStyle={AvoidZonesStyles} 
          />
        }
        {store.action === 'Geo Fence' &&
          <DrawControl
            currentStyle={GeoFencesStyles}
          />
        }
        {store.action === 'Terminal Area' &&
          <DrawControl
            currentStyle={TerminalAreasStyles}
          />
        } */}
      </Source>
    </Map>
  )
});

export default MainMap;