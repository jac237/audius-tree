/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { TrackRowCard } from '../Track';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    backgroundColor: '#121212',
    paddingBottom: theme.spacing(10),
  },
  content: {
    margin: 'auto',
    maxWidth: 550,
    minWidth: 320,
  },
  icon: {
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  topRoot: {
    position: 'fixed',
    bottom: theme.spacing(11),
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

const UserTracksPaper = (props) => {
  const classes = useStyles();
  const { tracks, setCurrentSong } = props;
  // const { value, setValue } = useState(0);

  return (
    <Paper className={classes.root} square>
      {tracks && (
        <div className={classes.content}>
          <Paper square className={classes.paper}>
            <Tabs
              className={classes.tabs}
              value={0}
              textColor="inherit"
            >
              <Tab label="Tracks" id="back-to-tracks-anchor" disableFocusRipple disableRipple/>
            </Tabs>
          </Paper>
          {tracks && tracks.map((item) => (
            <TrackRowCard key={item.id} track={item} setCurrentSong={setCurrentSong}/>
          ))}
        </div>
      )}
      {tracks.length === 0 && (
        <Typography
          className={classes.empty}
          color="inherit"
          variant="inherit"
          component="h4"
          align="center"
        >
          Uh Oh! This user has no tracks... Come back later!
        </Typography>
      )}
    </Paper>
  );
};

export default UserTracksPaper;
