import { useState, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../Providers/RootStoreProvider';
// components
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import SwitchZoneModal from '../SwitchZoneModal/SwitchZoneModal';
import SaveZoneModal from '../SaveZoneModal/SaveZoneModal';
import { MenuListItem, IconMenuListItem } from '../MenuListItem/MenuListItem';
import DownloadCSV from '../DownloadCSV/DownloadCSV';
import { convertToCSV } from '../../utils/utils';

const MenuDrawer = observer(() => {
  const drawnZoneOptions = ['Avoid Zone', 'Geo Fence', 'Terminal Area'];
  const menuOptions = ['Save Zone', 'Saved Zones'];
  const store = useStore();
  const { action, drawFeatureID, savedZones, selectedSavedZone } = store;
  const [selectedZone, setSelectedZone] = useState('');
  const [showSavedZones, setShowSavedZones] = useState(false);
  const [showSwitchZoneModal, setShowSwitchZoneModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const currentSelectedZone = useMemo(() => {
    if (drawFeatureID) {
      const currentZone = selectedSavedZone || store.getFeature(drawFeatureID)
      const fileName = selectedSavedZone?.id ? `${currentZone.properties.name}-` : '';

      if (currentZone) {
        currentZone.properties.fileName = `${fileName}${currentZone.properties.area}-coordinates`;
      }

      return currentZone;
    }
    return null;
  }, [drawFeatureID, savedZones]);

  const savedZonesArray = useMemo(() => {
    const savedKeys = Object.keys(savedZones)
    const result = savedKeys.map((keyID) => {
      const nameKeys = Object.keys(savedZones[keyID])
      return nameKeys.map(name => savedZones[keyID][name])
    })

    return result.flat();
  }, [savedZones])

  const toggleSaveZoneModal = () => {
    store.displaySavedZones = false;
    setShowSaveModal(!showSaveModal);

    if (selectedZone !== action) {
      store.setAction(selectedZone)
    }
  }

  const toggleMenuOptions = (option) => {
    store.displaySavedZones = false; 

    if (option === 'Save Zone') {
      toggleSaveZoneModal()
    }
    if (option === 'Saved Zones') {
      setShowSavedZones(!showSavedZones)
      store.drawFeatureID = null;
    }
  }

  const setZone = (zone) => {
    setSelectedZone(zone)
    store.setAction(zone)
  }

  const handleZoneSelection = (zone) => {
    // will only stop changing the type of zone if the selected polygon is saved, does not prevent switch for unselected polygons
    store.displaySavedZones = false; 
    store.addFeatureID(null);

    if (!drawFeatureID || selectedSavedZone || selectedSavedZone?.id === drawFeatureID) {
      setZone(zone)
      store.selectedSavedZone = null;
      store.drawFeatureID = null;
    } else {
      setSelectedZone(zone)
      setShowSwitchZoneModal(true)
    }
  }

  const switchToSaveModal = (isSaving) => {
    store.displaySavedZones = false; 
    setShowSwitchZoneModal(false)

    isSaving ? toggleSaveZoneModal() : setZone(selectedZone)
  }

  const checkSavedZone = (zone) => {
    setZone(zone.properties.area)
    store.setSelectedSavedZone(zone);
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
      {(currentSelectedZone && drawFeatureID) && 
        <DownloadCSV 
          buttonText='Download Coordinates'
          fileName={currentSelectedZone.properties.fileName} 
          data={convertToCSV(currentSelectedZone.geometry.coordinates, 'Points, Longitude, Latitude', 'Point')} 
        />
      }
      {showSavedZones && savedZonesArray.length > 0 && 
        <div>
          <Divider />
          <List sx={{ maxHeight: '15rem', overflow: 'auto'}}>
            {savedZonesArray.map((zone) => {
              return (
                <IconMenuListItem 
                  key={zone?.properties?.name}
                  text={zone?.properties?.name} 
                  onClick={() => checkSavedZone(zone)} 
                  onIconClick={() => store.removeSavedZone(zone.id, zone.properties.name)}
                  selected={drawFeatureID === zone?.id && store.selectedSavedZone?.properties?.name === zone?.properties?.name} 
                />
              )
            })}
          </List>
        </div>
      }
      <div>
        <Divider />
        <h2>Available Zones</h2>
        <List>
          {drawnZoneOptions.map((text) => (
            <MenuListItem key={text} text={text} selected={text === selectedZone} onClick={() => handleZoneSelection(text)} />
          ))}
        </List>
      </div>
      <SwitchZoneModal open={showSwitchZoneModal} handleClose={switchToSaveModal} />
      <SaveZoneModal open={!!drawFeatureID && showSaveModal} handleClose={toggleSaveZoneModal} />
    </Drawer>
  )
})

export default MenuDrawer;