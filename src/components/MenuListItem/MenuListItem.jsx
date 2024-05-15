import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const MenuListItem = ({ text, selected, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton selected={selected} onClick={onClick}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )

}

export default MenuListItem;