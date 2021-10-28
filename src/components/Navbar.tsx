import { 
  AppBar, 
  Box, 
  Toolbar, 
  Button,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { NavLink } from 'react-router-dom';
import { Fragment, useState } from 'react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setShowMenu(o => !o)}
            >
              <MenuIcon />
            </IconButton>            
            <Button color="inherit">Movies Favories</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {showMenu && (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <HomeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <NavLink exact to="/">Accueil</NavLink>
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <MovieIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <NavLink exact to="/movies">Tous les films</NavLink>
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <NavLink to="/favorites">Films favories</NavLink>
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CreateNewFolderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <NavLink to="/create">Ajouter un film</NavLink>
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      )}
    </Fragment>
  )
}

export default Navbar;
