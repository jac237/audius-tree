/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TrackRowCard } from '../Track';
import { USER_TRACKS } from '../../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#121212',
  },
  content: {
    margin: 'auto',
    flexGrow: 1,
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
  const { loading, error, data: tracksData } = useQuery(USER_TRACKS, {
    variables: { userId },
  });
  //{ getUserTracks: tracks }
  if (error) {
    console.log(error.message);
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid item container spacing={1}>
        {tracksData?.getUserTracks &&
          tracksData.getUserTracks.map((track, index) => (
            <Grid item key={track.id} xs={12}>
              <TrackRowCard
                key={track.id}
                track={track}
                index={index}
                playlist={tracksData.getUserTracks}
              />
            </Grid>
          ))}
      </Grid>

      {!loading &&
        tracksData?.getUserTracks &&
        tracksData.getUserTracks.length === 0 && (
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
    </Container>
  );
};

export default UserTracksPaper;
