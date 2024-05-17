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
    () => new MapboxDraw({...{ styles: props.currentStyle, userProperties: true }, ...props, ...defaultProps}),
    ({ map }) => {
      map.on('draw.create', (e) => {
        console.log('store?', !store.features)
        e.features[0].properties.area = store.action
        if (store.drawFeatureID !== e.features[0].id) {
          store.setFeatures(e);
          console.log('Polygon Created', e.features[0])
        }
      });
      map.on('click', (e) => {
        const feature = map.queryRenderedFeatures(e.point)[0];
        if (feature?.properties?.active === 'false') {
          store.addFeatureID(feature?.properties?.id || feature?.properties?.parent);
        }
      });
      map.on('draw.update', (e) => {
        e.features[0].properties.area = store.action
        store.setFeatures(e)
      })
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