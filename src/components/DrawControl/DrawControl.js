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
      // map.on('draw.load', store.deleteFeatures);
      // map.on('draw.modechange', (e) => { console.log('mode change???', e)});
      // map.on('draw.render', (e) => { console.log('render', e)});
      // map.on('draw.actionable', (e) => { console.log('actionable', e)});
      // map.on('load', function() {
      //   console.log('check on load', draw.getAll())
      // });
      map.on('draw.create', (e) => {
        // why is this being called so many times????
        e.features[0].geometry.area = store.action
        // console.log('outside create', map.getAll())
        // for (const f of store.features) {
        //   console.log('inside', f.id)
        // }
        // console.log('store features', store.features)
        if (store.drawFeatureID !== e.features[0].id) {
          console.log('inside create')
          addToStore(e);
          // store.addFeatureID(e.features[0].id);
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
      map.off('draw.delete', store.deleteFea);
    },
    {
      position: 'top-left',
    }
  );

  return null;
});

export default DrawControl;