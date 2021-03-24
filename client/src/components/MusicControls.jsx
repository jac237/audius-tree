/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReactHowler from 'react-howler';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsPlaying,
  playNextSong,
  playPrevSong,
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
  controlButton: {
    margin: '0px 15px',
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const MusicControls = () => {
  const classes = useStyles();
  const player = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currTrack = useSelector((state) => state.player.currTrack);
  const currIndex = useSelector((state) => state.player.currIndex);
  const currPlaylist = useSelector((state) => state.player.currPlaylist);

  const pauseSong = () => {
    dispatch(setIsPlaying(false));
  };

  const playSong = () => {
    dispatch(setIsPlaying(true));
  };

  const nextSong = () => {
    dispatch(playNextSong({ index: currIndex, playlist: currPlaylist }));
  };

  const prevSong = () => {
    dispatch(playPrevSong({ index: currIndex, playlist: currPlaylist }));
  };

  return (
    <Box>
      <ReactHowler
        html5={true}
        playing={currTrack ? isPlaying : false}
        src={[currTrack?.streamUrl]}
        onPlay={() => {
          console.log('playing sound!');
        }}
        onStop={() => {
          console.log('player stop');
        }}
        onEnd={() => {
          console.log('onEnd(): calling nextSong()');
          nextSong();
        }}
        onLoad={() => {
          console.log('onLoad(): setting isPlaying to true');
        }}
        onLoadError={() => {
          console.log('onLoadError(): could not load');
        }}
        ref={player}
      />
      <Grid item container alignItems="center" justify="center" wrap="nowrap">
        <span
          aria-label="previous"
          className={classes.controlButton}
          onClick={() => prevSong()}
        >
          <SkipPreviousIcon fontSize="default" />
        </span>

        {isPlaying ? (
          <span
            aria-label="play/pause"
            className={classes.controlButton}
            onClick={() => pauseSong()}
          >
            <PauseCircleFilledIcon fontSize="large" />
          </span>
        ) : (
          <span
            aria-label="play/pause"
            className={classes.controlButton}
            onClick={() => playSong()}
          >
            <PlayCircleFilledIcon fontSize="large" />
          </span>
        )}

        <span
          aria-label="next"
          className={classes.controlButton}
          onClick={() => nextSong()}
        >
          <SkipNextIcon fontSize="default" />
        </span>
      </Grid>

      {/* <Grid item container justify="center">
        <Grid item xs={10} sm={6} md={4}>
          <StyledSlider
            value={value}
            min={0}
            max={currTrack?.duration}
            onChange={handleSliderChange}
            onChangeCommitted={onChangeCommitted}
            aria-labelledby="seek music"
            ValueLabelComponent={ValueLabelComponent}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default MusicControls;
