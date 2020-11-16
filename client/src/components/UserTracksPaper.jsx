/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SongRowCard from './SongRowCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    backgroundColor: '#121212',
    paddingBottom: theme.spacing(8),
  },
  content: {
    margin: 'auto',
    maxWidth: 550,
    minWidth: 350,
  },
  icon: {
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  topRoot: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    backgroundColor: '#303030',
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#01CECE',
    }
  },
  empty: {
    padding: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-tracks-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.topRoot}>
        {children}
      </div>
    </Zoom>
  );
};

const UserTracksPaper = ({ children, tracks }) => {
  const classes = useStyles();
  const { value } = useState(0);

  return (
    <Paper className={classes.root} square>
      {tracks && (
        <div className={classes.content}>
          <Paper square className={classes.paper}>
            <Tabs
              className={classes.tabs}
              value={value}
              textColor="inherit"
            >
              <Tab label="Tracks" disableFocusRipple disableRipple/>
            </Tabs>
          </Paper>
          {tracks && tracks.map((item) => (
            <SongRowCard key={item.id} track={item} />
          ))}
          <ScrollTop {...children}>
            <Fab color="default" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
      )}
      {tracks.length === 0 && (
        <Typography
          className={classes.empty}
          color="error"
          variant="inherit"
          component="h4"
          align="center"
        >
          No tracks yet...
        </Typography>
      )}
    </Paper>
  );
};

export default UserTracksPaper;
