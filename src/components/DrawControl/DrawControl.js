import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { observer } from 'mobx-react';
import { useControl } from 'react-map-gl';
// stores
import { useStore } from '../../Providers/RootStoreProvider';

const DrawControl = observer(function DrawControl(props) {
  const store = useStore();

  const defaultProps = {
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
    defaultMode: 'draw_polygon'
  }

  useControl(
    () => new MapboxDraw({...{ userProperties: true }, ...props, ...defaultProps}),
    ({ map }) => {
      map.on('render', () => {
        if (store.displaySavedZones) {
          // const retrievedMap = map.getMapboxMap();
          console.log('inside', map)
          map.addSource('saved zone', () => {
            console.log('inside add source')
            if (store.displaySavedZones) {

              const savedZone = store.getSavedZone(store.drawFeatureID);
              savedZone.geometry.type = 'Polygon';

              console.log('check saved', savedZone)
              return {
                type: 'geojson',
                data: store.savedZones
              }
            }
          })
        }
        // const check = map.isSourceLoaded('saved zone')
        // console.log('loaded?', check)
      })
      map.on('draw.create', (e) => {
        const feature = map.queryRenderedFeatures(e.point)[0];
        console.log('feature', feature)
        map.setFeatureState({ id: e.features[0].id , source: "mapbox-gl-draw-hot"}, { area: store.action } )
        map.setFeatureState({ id: e.features[0].id , source: "mapbox-gl-draw-cold"}, { area: store.action } )
        console.log('get', map.getFeatureState({ id: e.features[0].id , source: "mapbox-gl-draw-hot"}))
        e.features[0].properties.area = store.action
        if (store.drawFeatureID !== e.features[0].id) {
          store.setFeatures(e);
          console.log('Polygon Created', e.features[0])
        }
      });
      // map.on('click', (e) => {
      //   // const feature = map.queryRenderedFeatures(e.point)[0];
      //   // console.log('feature', feature)
      //   if (feature?.properties?.active === 'false') {
      //     store.addFeatureID(feature?.properties?.id || feature?.properties?.parent);
      //   }
      // });
      map.on('draw.update', (e) => store.setFeatures(e))
      map.on('draw.delete', (e) => store.deleteFeatures(e))
    },
    ({map}) => {
      map.off('draw.create', (e) => store.setFeatures(e));
      map.off('draw.update', (e) => store.setFeatures(e));
      map.off('draw.delete', (e) => store.deleteFeatures(e));
    },
    {
      position: 'top-left',
    }
  );

  return null;
});

export default DrawControl;