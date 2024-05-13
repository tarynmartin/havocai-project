import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';

const DrawControl = (props) => {
  const defaultProps = {
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    },
    defaultMode: 'draw_polygon'
  }

  useControl(
    () => {
      return new MapboxDraw({...{ styles: props.currentStyle, userProperties: true }, ...props, ...defaultProps})
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
      position: 'top-left',
    }
  );

  return null;
};

export default DrawControl;