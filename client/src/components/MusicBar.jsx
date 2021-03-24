/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MusicControls from './MusicControls';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrTrack,
  setCurrIndex,
  setIsPlaying,
} from '../redux/player/playerSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#212121',
    zIndex: 1500,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    borderRadius: 5,
  },
  icon: {
    color: 'white',
  },
  name: {
    color: 'darkgray',
  },
  slider: {
    marginTop: '-12px',
  },
  margin: {
    color: 'white',
  },
}));

const MusicBar = (props) => {
  const classes = useStyles();
  const defaultMedia = 'https://i.imgur.com/iajv7J1.png';
  const currTrack = useSelector((state) => state.player.currTrack);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar disableGutters>
        <Container maxWidth="xl">
          <Grid container justify="space-between" alignItems="center">
            <Grid
              item
              container
              spacing={1}
              alignContent="center"
              alignItems="center"
              wrap="nowrap"
              xs={6}
            >
              <Grid item>
                <Avatar
                  alt="Track Artwork"
                  src={currTrack ? currTrack.artwork.x150 : defaultMedia}
                  variant="square"
                  className={classes.media}
                />
              </Grid>

              <Grid item zeroMinWidth>
                <Typography variant="inherit" component="h5" noWrap>
                  {currTrack?.title}
                </Typography>
                <Typography
                  variant="caption"
                  component="p"
                  className={classes.name}
                  noWrap
                >
                  {currTrack?.user?.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              wrap="nowrap"
              xs={6}
            >
              <Grid item>
                <MusicControls />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default MusicBar;
