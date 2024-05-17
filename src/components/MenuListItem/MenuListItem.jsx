import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const MenuListItem = ({ text, selected, onClick, disabled }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton selected={selected} onClick={onClick} disabled={disabled}>
        <ListItemText primary={text} sx={{ wordWrap: 'break-word' }} />
      </ListItemButton>
    </ListItem>
  )

};

export const IconMenuListItem = ({ text, selected, onClick, onIconClick, icon, label}) => {
  return (
    <ListItem disablePadding secondaryAction={
      <IconButton edge="end" aria-label={label || "delete"} onClick={onIconClick}>
        {icon || <DeleteIcon />}
      </IconButton>
    }>
      <ListItemButton selected={selected} onClick={onClick}>
        <ListItemText primary={text} sx={{ wordWrap: 'break-word' }} />
      </ListItemButton>
    </ListItem>
  )
}