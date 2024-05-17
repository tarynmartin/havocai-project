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
import './styles.css'

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
          padding: '0.5rem 0.25rem 0 0.5rem'
        },
      }}
    >
      <div>
        {(currentSelectedZone && drawFeatureID) && 
          <DownloadCSV 
            buttonText='Download Coordinates'
            fileName={currentSelectedZone.properties.fileName} 
            data={convertToCSV(currentSelectedZone.geometry.coordinates, 'Points, Longitude, Latitude', 'Point')} 
          />
        }
        <List>
          {menuOptions.map(text => (
            <MenuListItem key={text} text={text} onClick={() => toggleMenuOptions(text)} disabled={text === 'Save Zone' ? !drawFeatureID : Object.keys(savedZones).length === 0}/>
          ))}
        </List>
        {showSavedZones && Object.keys(savedZones).length > 0 && 
          <div>
            <Divider />
            <List sx={{ maxHeight: '22rem', overflow: 'auto'}}>
              {Object.values(savedZones).map((zone) => {
                return (
                  <IconMenuListItem 
                    key={zone?.properties?.name}
                    text={zone?.properties?.name} 
                    onClick={() => checkSavedZone(zone)} 
                    onIconClick={() => store.removeSavedZone(zone.properties.name)}
                    selected={drawFeatureID === zone?.id && store.selectedSavedZone?.properties?.name === zone?.properties?.name} 
                  />
                )
              })}
            </List>
          </div>
        }
      </div>
      <div>
        <Divider />
        <p className='zonesTitle'>Zones</p>
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