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
  const drawnZoneOptions = ['Avoid Zone', 'Geo Fence', 'Terminal Area'];
  const menuOptions = ['Save Zone', 'Saved Zones'];
  const store = useStore();
  const { action, drawFeatureID, savedZones } = store;
  const [selectedZone, setSelectedZone] = useState('');
  const [showSavedZones, setShowSavedZones] = useState(false);
  const [showSwitchZoneModal, setShowSwitchZoneModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const toggleSaveZoneModal = () => {
    store.setDisplaySavedZones(false);
    setShowSaveModal(!showSaveModal);

    if (selectedZone !== action) {
      store.setAction(selectedZone)
    }
  }

  const toggleMenuOptions = (option) => {
    store.setDisplaySavedZones(false);

    if (option === 'Save Zone') {
      toggleSaveZoneModal()
    }
    if (option === 'Saved Zones') {
      setShowSavedZones(!showSavedZones)
    }
  }

  const setZone = (zone) => {
    setSelectedZone(zone)
    store.setAction(zone)
  }

  const handleZoneSelection = (zone) => {
    // will only stop changing the type of zone if the selected polygon is saved, does not prevent switch for unselected polygons
    store.setDisplaySavedZones(false);
    store.addFeatureID(null);
    const savedZone = savedZones.find((zone) => zone.id === drawFeatureID);

    if (!drawFeatureID || savedZone) {
      setZone(zone)
    } else {
      setSelectedZone(zone)
      setShowSwitchZoneModal(true)
    }
  }

  const switchToSaveModal = (isSaving) => {
    store.setDisplaySavedZones(false);
    setShowSwitchZoneModal(false)

    if (isSaving) {
      toggleSaveZoneModal();
    } else {
      setZone(selectedZone)
    }
  }

  const checkSavedZone = (zone) => {
    setZone(zone.properties.area)
    store.addFeatureID(zone.id)
    store.setDisplaySavedZones(true);
  }

  return (
    <Drawer
      anchor="right"
      open={true}
      variant="permanent"
      sx={{
        width: 150,
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
        {menuOptions.map(text => (
          <MenuListItem key={text} text={text} onClick={() => toggleMenuOptions(text)} />
        ))}
      </List>
      {showSavedZones && 
        <div>
          <Divider />
          <List>
            {savedZones.length > 0 && savedZones.map((zone) => {
              return (
                <MenuListItem key={zone.properties.name} selected={drawFeatureID === zone.id && store.displaySavedZones} text={zone.properties.name} onClick={() => checkSavedZone(zone)} />
              )
            })}
          </List>
        </div>
      }
      <div>
        <Divider />
        <h2>Available Zones</h2>
        <List>
          {drawnZoneOptions.map((text, index) => (
            <MenuListItem key={text} text={text} selected={text === selectedZone} onClick={() => handleZoneSelection(text)} />
          ))}
        </List>
      </div>
      {showSwitchZoneModal && <SwitchZoneModal open={showSwitchZoneModal} handleClose={switchToSaveModal} />}
      {(drawFeatureID && showSaveModal) && 
        <SaveZoneModal open={showSaveModal} handleClose={toggleSaveZoneModal} />
      }
    </Drawer>
  )
})

export default MenuDrawer;