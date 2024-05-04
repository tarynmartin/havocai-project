import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';

const NewUseControl = (props) => {
  useControl(
    () => new MapboxDraw({...{ styles: props.drawStyle}, ...props}),
    ({map}) => {
      const { id } = map.getAll().features[0];
      map.setFeatureProperty(id, 'user_valid', )
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
      position: props.position
    }
  );

  return null;
}

export default NewUseControl;