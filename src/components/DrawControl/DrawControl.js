import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { useMemo, memo, useCallback } from 'react';
import NewUseControl from './NewUseControl';

// styles
import { AvoidZonesStyles } from './AvoidZone.styles';
import { GeoFencesStyles } from './GeoFence.styles';
import { TerminalAreasStyles } from './TerminalArea.styles';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const DrawControl = (props) => {
  useControl(
    () => {
      console.log('useControl');
      return new MapboxDraw({...{ styles: props.currentStyle, userProperties: true }, ...props})
    },
    ({map}) => {
      map.on('draw.create', props.onCreate);
      map.on('draw.update', props.onUpdate);
      map.on('draw.delete', props.onDelete);
    },
    ({map}) => {
      map.off('draw.create', props.onCreate);
      map.off('draw.update', props.onUpdate);
      map.off('draw.delete', props.onDelete);
    },
    {
      position: props.position,
    }
  );

  return null;
  // return (
  //   <NewUseControl
  //     drawStyle={drawStyle}
  //     props={props}
  //   />
  // );
};

export default DrawControl;