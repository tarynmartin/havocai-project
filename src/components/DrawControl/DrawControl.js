import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { observer } from 'mobx-react';
import { useControl } from 'react-map-gl';
import { useAvoidZonesStore, useGeoFencesStore, useTerminalAreasStore, useStore } from '../../Providers/RootStoreProvider';

const DrawControl = observer(function DrawControl(props) {
  const avoidZonesStore = useAvoidZonesStore();
  const geoFencesStore = useGeoFencesStore();
  const terminalAreasStore = useTerminalAreasStore();
  const store = useStore();

  const defaultProps = {
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
    defaultMode: 'draw_polygon'
  }

  const addToStore = (e) => {
    switch (props.currentAction) {
      case 'Avoid Zone':
        avoidZonesStore.addAvoidZone(e.features[0]);
        break;
      case 'Geo Fence':
        geoFencesStore.addGeoFence(e.features[0]);
        break;
      case 'Terminal Area':
        terminalAreasStore.addTerminalArea(e.features[0]);
        break;
      default:
        break;
    }
  }

  useControl(
    () => new MapboxDraw({...{ styles: props.currentStyle, userProperties: true }, ...props, ...defaultProps}),
    ({ map }) => {
      map.on('draw.create', (e) => {
        e.features[0].geometry.area = props.currentAction
        if (store.drawFeatureID !== e.features[0].id) {
          console.log('Polygon Created', e.features[0])
          addToStore(e);
          store.setFeatures(e);
        } else {
          store.deleteFeatures(e);
        }
      });
      map.on('draw.update', store.setFeatures)
      map.on('draw.delete', store.deleteFeatures)
    },
    ({map}) => {
      map.off('draw.create', store.setFeatures);
      map.off('draw.update', store.setFeatures);
      map.off('draw.delete', store.deleteFeatures);
    },
    {
      position: 'top-left',
    }
  );

  return null;
});

export default DrawControl;