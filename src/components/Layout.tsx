import { 
  Drawer, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  AppBar,
  Toolbar, 
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useHistory, useLocation } from "react-router";
import { Theme } from "@mui/system";
import { format } from 'date-fns';

// TypeScript
type LayoutProps =  { 
  children: React.ReactNode
}

// Some styles
const drawerWidth = 210;
const useStyles = makeStyles((theme: Theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      minHeight: '100vh',
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: "flex"
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)!important`
    },
    toolbar: {
      marginBottom: 60
    }
  }
})

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "Accueil",
      icon: <HomeIcon color="secondary" />,
      path: '/'
    },
    {
      text: "Tous les films",
      icon: <MovieIcon color="secondary" />,
      path: '/movies'
    },
    {
      text: "Films favories",
      icon: <FavoriteIcon color="secondary" />,
      path: '/favorites'
    },
    {
      text: "Ajouter un film",
      icon: <CreateNewFolderIcon color="secondary" />,
      path: '/create'
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appbar}
        elevation={0}
      >
        <Toolbar>
          <Typography>
            Ajourd'hui, { format(new Date(), 'do MMM Y') }
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography 
            variant="h5"
            className={classes.title}
          >
            sieliMovies
          </Typography>
        </div>

        <List>
          {menuItems.map(item => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path ? classes.active : ""}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout;
