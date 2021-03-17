/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MusicBar from '../components/MusicBar';
import Playlist from '../components/Playlist';

const playlists = require('../data/featuredPlaylists.json');

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#121212',
  },
  content: {
    paddingBottom: theme.spacing(11),
  },
}));

const Home = () => {
  const classes = useStyles();

  // Move to Music Storage using Redux
  // const [currentSong, setCurrentSong] = useState(null);
  // const [trackSource, setTrackSource] = useState(null);
  // useEffect(() => {
  //   console.log(currentSong);
  //   if (currentSong?.id) {
  //     setTrackSource(currentSong.streamUrl);
  //   }
  // }, [currentSong]);

  return (
    <Router>
      <div className={classes.root}>
        <Container>
          <div className={classes.content}>
            <Grid container className="content-root">
              {playlists.map((playlist) => (
                <Playlist
                  key={playlist.id}
                  id={playlist.id}
                  // setCurrentSong={setCurrentSong}
                />
              ))}
            </Grid>
          </div>
        </Container>
        {/* <MusicBar /> */}
      </div>
    </Router>
  );
};

export default Home;
