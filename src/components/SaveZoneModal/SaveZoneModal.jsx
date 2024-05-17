import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../Providers/RootStoreProvider';
// styling
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import './styles.css';

const SaveZoneModal = observer(({ open, handleClose }) => {
  const store = useStore();
  const { action } = store;
  const [zoneData, setZoneData] = useState({});
  const [zoneName, setZoneName] = useState('');
  const [zoneNotes, setZoneNotes] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const featureID = store.drawFeatureID;
    const feature = store.getFeature(featureID);

    setZoneData(feature);
  }, [open]);

  const ShowCoordinates = () => {
    const terminalPoints = ['Staging Point', 'Terminal Point', 'Egress Point', 'Additional Point'];

    return zoneData?.geometry?.coordinates && zoneData?.geometry?.coordinates.map((coord, index) => {
      return coord.map((point, i) => {
        return (
          <div key={i} className='coordinateContainer'>
            <strong>{action !== 'Terminal Area' ? `Point ${i + 1}: ` : i > 2 ? terminalPoints[3] : terminalPoints[i]}</strong>
            <span className='coordinates'>{`Latitude: ${point[1]}, Longitude: ${point[0]}`}</span>
          </div>
        )
      })
    })
  }

  const onSave = () => {
    const savedFeature = {...zoneData, properties: {...zoneData.properties, name: zoneName, notes: zoneNotes}};

    const response = store.addSavedZone(savedFeature)

    if (response) { 
      setShowSnackbar(true);
      handleClose();
    } else {
      setErrorMessage('Zone name already exists, please enter a different name');
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Zone</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Zone Type
          </DialogContentText>
          <p>{zoneData?.properties?.area}</p>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Zone Coordinates
          </DialogContentText>
          <div className='coordinatesContainer'>
            {(action=== 'Terminal Area' && zoneData?.geometry?.coordinates[0].length > 4) && 
              <p className='terminalAreaWarning'>Terminal Areas only have 3 points; if you have more than that, please adjust your zone</p>
            }
            <ShowCoordinates />
          </div>
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Please enter a name for the zone
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="zone-name"
            label="Zone Name"
            type="text"
            fullWidth
            required
            onChange={(e) => setZoneName(e.target.value)}
            error={errorMessage.length > 0}
            helperText={errorMessage}
          />
          <DialogContentText sx={{ marginTop: '0.5rem' }}>
            Notes on the Zone
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="zone-notes"
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
      <Snackbar autoHideDuration={2500} open={showSnackbar} onClose={() => setShowSnackbar(false)} message="Zone Saved Successfully!" anchorOrigin={{ horizontal: 'center', vertical: 'top' }}/>
    </>
  )
});

export default SaveZoneModal;