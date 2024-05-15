import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const SwitchZoneModal = ({ open, handleClose }) => {
  return (
    <>
      <Dialog open={open} onAbort={handleClose}>
        <DialogTitle>Switch Zone</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You haven't saved your current zone. Are you sure you want to switch zones?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Don't Save</Button>
          <Button onClick={() => handleClose(true)}>Save Zone</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default SwitchZoneModal;