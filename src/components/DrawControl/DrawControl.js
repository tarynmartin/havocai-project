import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';
import { useMemo, memo } from 'react';
import NewUseControl from './NewUseControl';

// styles
import { AvoidZonesStyles } from './AvoidZone.styles';
import { GeoFencesStyles } from './GeoFence.styles';
import { TerminalAreasStyles } from './TerminalArea.styles';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

const DrawControl = memo(function DrawControl(props) {
  // currentAction for selection
  console.log('props', props.currentAction, props)
  const drawStyle = useMemo(() => {
    console.log('inside', props.currentAction)
    switch (props.currentAction) {
      case 'Avoid Zone':
        return AvoidZonesStyles;
      case 'Geo Fence':
        return GeoFencesStyles;
      case 'Terminal Area':
      default:
        return TerminalAreasStyles
    }
  }, [props.currentAction]);

  console.log('memo', drawStyle[0].paint['line-color'])
  
  // const
  useControl(
    () => new MapboxDraw({...{ styles: drawStyle, userProperties: true }, ...props}),
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
});

export default DrawControl;