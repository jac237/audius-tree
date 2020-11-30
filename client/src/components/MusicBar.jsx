/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#212121',
    padding: theme.spacing(0.5, 0, 0.5, 0),
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: theme.spacing(6),
    height: theme.spacing(6),
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
  const { currentSong, trackSource } = props;
  const [media, setMedia] = useState('https://i.imgur.com/iajv7J1.png');
  
  useEffect(() => {
    console.log('loading track source:', trackSource);
    audioEl.current.load();
  }, [trackSource]);
  
  useEffect(() => {
    if (currentSong) {
      console.log('loading song', currentSong);
      const cover = currentSong?.artwork['150x150'];
      setMedia(cover);
    }
  }, [currentSong]);

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">

          <Grid item container xs={5} spacing={1} alignContent="center" wrap="nowrap">
            <Grid item>
              <Avatar alt="Track Artwork" src={media} variant="square" className={classes.media}/>
            </Grid>

            <Grid item zeroMinWidth>
              <Typography variant="inherit" component="h5" noWrap>
                {currentSong?.title}
              </Typography>
              <Typography variant="caption" component="p" className={classes.name} noWrap>
                {currentSong?.user?.name}
              </Typography>
            </Grid> 
          </Grid>
          
          <Grid item container xs={7} justify="center" alignItems="center" wrap="nowrap">
            <Grid item>
              <audio ref={audioEl} controls autoPlay style={{fontSize: 10, height: 34, width: '50vw'}}>
                <source src={trackSource} type="audio/mpeg"/>
              </audio>
            </Grid> 
          </Grid>

        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MusicBar;
