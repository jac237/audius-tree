/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { MusicContext } from './MusicContext';
import ReactHowler from 'react-howler';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import MusicControls from './MusicControls';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#212121',
    padding: theme.spacing(0.5, 0, 0.5, 0),
    zIndex: 1500,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
}));

const MusicBar = (props) => {
  const classes = useStyles();
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currPlaylist, setCurrPlaylist, currTrack, setCurrTrack] = useContext(
    MusicContext
  );
  // const { currentSong, trackSource } = props;
  const defaultMedia = 'https://i.imgur.com/iajv7J1.png';

  useEffect(() => {
    console.log('current track source:', currTrack);
    audioEl.current.load();
  }, [currTrack]);

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const playSong = () => {
    setIsPlaying(true);
    // const track = playlist[index];

    // console.log(`playSong() - index(${index}), currIndex(${currIndex})`);
    // if (currIndex && currIndex === index) {
    //   // we already have the track loaded
    //   console.log("track already playing");
    //   return;
    // } else {
    //   console.log(`playSong() - setting new track, index(${index})`);
    //   setCurrTrack(track);
    //   setCurrIndex(index);
    //   setIsPlaying(true);
    // }
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Container>
          <Grid container justify="space-between" alignItems="center">
            <Grid
              item
              container
              spacing={1}
              alignContent="center"
              alignItems="center"
              wrap="nowrap"
              xs={5}
              sm={6}
              md={7}
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
              xs={7}
              sm={6}
              md={5}
            >
              {/* <MusicControls currTrack={currTrack} /> */}
              <Grid item>
                <audio
                  style={{ height: 34, width: '30vw' }}
                  ref={audioEl}
                  crossOrigin="anonymous"
                  type="audio/mpeg"
                  preload="auto"
                  controls
                  autoPlay
                >
                  <source src={currTrack?.streamUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {/** REACT HOWLER */}
                {/* <ReactHowler
                  html5={true}
                  playing={isPlaying}
                  src={[currTrack?.streamUrl]}
                  onPlay={() => {
                    console.log('playing sound!');
                  }}
                  onEnd={() => {
                    console.log('ongEnd(): calling nextSong()');
                  }}
                />
                {isPlaying ? (
                  <IconButton
                    aria-label="pause"
                    style={classes.margin}
                    onClick={() => pauseSong()}
                  >
                    <PauseIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="play"
                    style={classes.margin}
                    onClick={() => playSong()}
                  >
                    <PlayArrowIcon fontSize="inherit" />
                  </IconButton>
                )} */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default MusicBar;
