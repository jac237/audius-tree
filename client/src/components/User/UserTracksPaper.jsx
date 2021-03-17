/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { TrackRowCard } from '../Track';
import { USER_TRACKS } from '../../graphql';

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
    },
  },
  empty: {
    padding: theme.spacing(2),
  },
}));

const UserTracksPaper = (props) => {
  const classes = useStyles();
  const { userId } = props;
  const [getTracks, { loading, error, data }] = useLazyQuery(USER_TRACKS);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks({ variables: { userId } });
  }, []);

  useEffect(() => {
    if (data?.getUserTracks) {
      // console.log(data.getUserTracks);
      setTracks(data.getUserTracks);
    }
  }, [data]);

  if (error) return `${error}`;

  return (
    <Paper className={classes.root} square>
      <div className={classes.content}>
        {/* <Paper square className={classes.paper}>
          <Tabs className={classes.tabs} value={0} textColor="inherit">
            <Tab
              label="Tracks"
              id="back-to-tracks-anchor"
              disableFocusRipple
              disableRipple
            />
          </Tabs>
        </Paper> */}
        {tracks.map((track) => (
          <TrackRowCard key={track.id} track={track} />
        ))}
      </div>
      {tracks.length === 0 && !loading && !data && (
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
