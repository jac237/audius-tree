import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '@audius/stems/dist/stems.css';
import '@audius/stems/dist/avenir.css';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

import LoadingGrid from './components/LoadingGrid';
const Home = lazy(() => import('./routes/Home'));
const User = lazy(() => import('./routes/User'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    background: 'black',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: 'rgb(0,0,0)',
    background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    background: '#121212',
    color: 'white',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  listIcon: {
    color: 'white',
  },
  subheader: {
    fontWeight: 'bold',
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src="https://i.imgur.com/YsNnnJW.png" width="100%" />
      <Divider />
      <List
        dense
        subheader={
          <ListSubheader color="inherit" className={classes.subheader}>
            Made with{' '}
            <FavoriteIcon
              color="secondary"
              style={{ fontSize: 15, verticalAlign: 'middle' }}
            />{' '}
            using Audius API
          </ListSubheader>
        }
      >
        <ListItem button disabled key="search">
          <ListItemIcon>
            <SearchIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>

        <ListItem button disabled key="home">
          <ListItemIcon>
            <AudiotrackIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button disabled key="request">
          <ListItemIcon>
            <AddIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Request Playlist" />
        </ListItem>

        <ListItem button disabled key="about">
          <ListItemIcon>
            <HelpIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="How it Works" />
        </ListItem>

        <ListItem button disabled key="feedback">
          <ListItemIcon>
            <FeedbackIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
      </List>

      <Divider />

      <List
        dense
        subheader={
          <ListSubheader color="inherit" className={classes.subheader}>
            Socials
          </ListSubheader>
        }
      >
        <ListItem button disabled key="twitter">
          <ListItemIcon>
            <TwitterIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>

        <ListItem button disabled key="github">
          <ListItemIcon>
            <GitHubIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Github" />
        </ListItem>

        <ListItem button disabled key="pizza">
          <ListItemIcon>
            <LocalPizzaIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary="Buy me Pizza" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <AppsIcon />
          </IconButton>
          <div style={{ margin: 'auto' }}>
            <img src="https://i.imgur.com/rGCPLa8.png" width="35vmin" />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Suspense fallback={<LoadingGrid />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/user/:handle" component={User} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
// export default App;
