import { useState } from 'react';
import { observer } from 'mobx-react';
// stores
import { useStore } from '../../Providers/RootStoreProvider';
// styling
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const MenuDrawer = observer(({ setSaveZoneModal }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const store = useStore();

  const toggleMenuOptions = (option) => {
    if (option === 'Save Zone') {
      setSaveZoneModal()
    }
  }

  const setZone = (zone) => {
    setSelectedZone(zone)
    store.setAction(zone)
  }

  return (
    <Drawer
      anchor="right"
      open={true}
      variant="permanent"
      sx={{
        width: 150,
        height: '50%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 150,
          boxSizing: 'border-box',
          justifyContent: 'space-between',
        },
      }}
    >
      <List>
        {/* TODO: disable save zone if there isn't one selected */}
        {['Save Zone', 'Saved Zones'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => toggleMenuOptions(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div>
        <Divider />
        <h2>Available Zones</h2>
        <List>
          {['Avoid Zone', 'Geo Fence', 'Terminal Area'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton selected={text === selectedZone} onClick={() => setZone(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
})

export default MenuDrawer;