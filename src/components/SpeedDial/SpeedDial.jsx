import React from 'react';
import { SpeedDial as SpeedDialMUI, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import FenceIcon from '@mui/icons-material/Fence';
import RouteIcon from '@mui/icons-material/Route';
import { observer } from 'mobx-react';
import { useStore } from '../../Providers/RootStoreProvider';

const SpeedDial = observer(function SpeedDial() {
  const store = useStore();
  const actions = [
    { icon: <BlockIcon />, name: 'Avoid Zone' },
    { icon: <FenceIcon />, name: 'Geo Fence' },
    { icon: <RouteIcon />, name: 'Terminal Area' },
  ]
  return (
    <div>
      <SpeedDialMUI ariaLabel="SpeedDial actions"
        sx={{ position: 'absolute', bottom: 35, right: 16 }}
        icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => { store.setAction(action.name) }}
          />
        ))}
      </SpeedDialMUI>
    </div>
  )
});

export default SpeedDial;