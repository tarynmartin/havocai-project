import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
// stores
import { 
  useStore,
  useAvoidZonesStore,
  useGeoFencesStore,
  useTerminalAreasStore
} from '../../Providers/RootStoreProvider';
// styling
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './styles.css';

const SaveZoneModal = observer(({ open, handleClose }) => {
  // store declarations
  const avoidZonesStore = useAvoidZonesStore();
  const geoFencesStore = useGeoFencesStore();
  const terminalAreasStore = useTerminalAreasStore();
  const store = useStore();
  // state
  const [zoneData, setZoneData] = useState({});
  const [zoneName, setZoneName] = useState('');
  const [zoneNotes, setZoneNotes] = useState('');
  // constants
  const action = store.action

  useEffect(() => {
    const featureID = store.drawFeatureID;
    const feature = store.getFeature(featureID);

    setZoneData(feature);
  }, [open]);

  const showCoordinates = () => {
    const pointLabel = (i) => `Point ${i + 1}: `;
    const terminalPoints = ['Staging Point', 'Terminal Point', 'Egress Point', 'Additional Point'];

    return zoneData?.geometry?.coordinates && zoneData?.geometry?.coordinates.map((coord, index) => {
      return coord.map((point, i) => {
        return (
          <div key={i} className='coordinateContainer'>
            <strong>{action !== 'Terminal Area' ? pointLabel(i) : i > 2 ? terminalPoints[3] : terminalPoints[i]}</strong>
            <span className='coordinates'>{`Latitude: ${point[1]}, Longitude: ${point[0]}`}</span>
          </div>
        )
      })
    })
  }

  const onSave = () => {
    const savedFeature = {...zoneData, properties: {name: zoneName, notes: zoneNotes}};

    switch (zoneData.geometry.area) {
      case 'Avoid Zone':
        avoidZonesStore.addAvoidZone(savedFeature);
        handleClose();
        break;
      case 'Geo Fence':
        geoFencesStore.addGeoFence(savedFeature);
        handleClose();
        break;
      case 'Terminal Area':
        terminalAreasStore.addTerminalArea(savedFeature);
        handleClose();
        break;
      default:
        handleClose();
        break;
    }
    // TODO: add toast message for success?
  }

  return (
    <>
    {/* add PaperProps? What are the purpose? */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Zone</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Zone Type
          </DialogContentText>
          <div>{zoneData?.geometry?.area}</div>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Zone Coordinates
          </DialogContentText>
          <div className='coordinatesContainer'>
            {/* TODO: fix styling below */}
            {(action=== 'Terminal Area' && zoneData?.geometry?.coordinates && zoneData?.geometry?.coordinates[0].length > 4) && 
              <h6>Terminal Areas only have 3 points; if you have more than that, please adjust your zone</h6>
            }
            {/* TODO: add ability to copy/csv the coordinates from here? */}
            {showCoordinates()}
          </div>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Please enter a name for the zone
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Zone Name"
            type="text"
            fullWidth
            required
            onChange={(e) => setZoneName(e.target.value)}
          />
        <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Notes on the Zone
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Zone Notes"
            type="text"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setZoneNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
});

export default SaveZoneModal;