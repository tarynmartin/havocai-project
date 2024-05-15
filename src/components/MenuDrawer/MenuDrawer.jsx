import { useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../Providers/RootStoreProvider';
// components
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import SwitchZoneModal from '../SwitchZoneModal/SwitchZoneModal';
import SaveZoneModal from '../SaveZoneModal/SaveZoneModal';
import MenuListItem from '../MenuListItem/MenuListItem';

const MenuDrawer = observer(() => {
  const store = useStore();
  const { action, drawFeatureID, savedZones } = store;
  const [selectedZone, setSelectedZone] = useState('');
  const [showSwitchZoneModal, setShowSwitchZoneModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const toggleSaveZoneModal = () => {
    setShowSaveModal(!showSaveModal);
    if (selectedZone !== action) {
      store.setAction(selectedZone)
    }
  }

  const toggleMenuOptions = (option) => {
    if (option === 'Save Zone') {
      toggleSaveZoneModal()
    }
  }

  const setZone = (zone) => {
    setSelectedZone(zone)
    store.setAction(zone)
  }

  const handleZoneSelection = (zone) => {
    // will only stop changing the type of zone if the selected polygon is saved, does not prevent switch for unselected polygons
    const savedZone = savedZones.find((zone) => zone.id === drawFeatureID);

    if (!drawFeatureID || savedZone) {
      setZone(zone)
    } else {
      setSelectedZone(zone)
      setShowSwitchZoneModal(true)
    }
  }

  const switchToSaveModal = (isSaving) => {
    setShowSwitchZoneModal(false)
    if (isSaving) {
      toggleSaveZoneModal();
    } else {
      setZone(selectedZone)
    }
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
        {['Save Zone', 'Saved Zones'].map(text => (
          <MenuListItem key={text} text={text} onClick={() => toggleMenuOptions(text)} />
        ))}
      </List>
      <div>
        <Divider />
        <h2>Available Zones</h2>
        <List>
          {['Avoid Zone', 'Geo Fence', 'Terminal Area'].map((text, index) => (
            <MenuListItem key={text} text={text} selected={text === selectedZone} onClick={() => handleZoneSelection(text)} />
          ))}
        </List>
      </div>
      {showSwitchZoneModal && <SwitchZoneModal open={showSwitchZoneModal} handleClose={switchToSaveModal} />}
      {showSaveModal && 
        <SaveZoneModal open={showSaveModal} handleClose={toggleSaveZoneModal} />
      }
    </Drawer>
  )
})

export default MenuDrawer;