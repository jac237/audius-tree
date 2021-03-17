import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    fontWeight: 500,
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
    background: '#1b1b1b',
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
  navLogo: {
    margin: 'auto',
  },
  navImage: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-2.5rem',
    },
  },
}));

function SidebarContainer(props) {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Link to="/">
        <img src="https://i.imgur.com/YsNnnJW.png" width="100%" />
      </Link>
      <Divider />
      {/** NAVIGATION */}
      <List
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
        <ListItem button disabled key="search" component={Link} to="/search">
          <ListItemIcon>
            <SearchIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Search" />
        </ListItem>

        <ListItem button key="home" component={Link} to="/">
          <ListItemIcon>
            <QueueMusicIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Home" />
        </ListItem>

        <ListItem button disabled key="request" component={Link} to="/request">
          <ListItemIcon>
            <AddIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Request Playlist" />
        </ListItem>

        <ListItem
          button
          disabled
          key="howitworks"
          component={Link}
          to="/howitworks"
        >
          <ListItemIcon>
            <HelpIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="How it Works" />
        </ListItem>

        <ListItem
          button
          disabled
          key="feedback"
          component={Link}
          to="/feedback"
        >
          <ListItemIcon>
            <FeedbackIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Feedback" />
        </ListItem>
      </List>

      <Divider />
      {/** SOCIALS */}
      <List
        subheader={
          <ListSubheader color="inherit" className={classes.subheader}>
            Socials
          </ListSubheader>
        }
      >
        <ListItem
          key="audius"
          button
          component="a"
          href="https://audius.co/jessie"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <img src="https://i.imgur.com/UVSBxyJ.png" width="24px" />
          </ListItemIcon>
          <ListItemText disableTypography primary="Audius" />
        </ListItem>

        <ListItem
          key="twitter"
          button
          component="a"
          href="https://twitter.com/audiustree"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <TwitterIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Twitter" />
        </ListItem>

        <ListItem
          key="github"
          button
          component="a"
          href="https://github.com/jac237/audius-tree"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <GitHubIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Github" />
        </ListItem>

        <ListItem
          key="pizza"
          button
          component="a"
          href="https://www.buymeacoffee.com/jcruz"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <LocalPizzaIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="Buy me Pizza" />
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
          <div className={classes.navLogo}>
            <Link to="/">
              <img
                src="https://i.imgur.com/rGCPLa8.png"
                width="35vmin"
                className={classes.navImage}
              />
            </Link>
          </div>
          <div className={classes.navRight}></div>
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
        {children}
      </main>
    </div>
  );
}

SidebarContainer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SidebarContainer;
