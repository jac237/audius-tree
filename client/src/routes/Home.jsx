/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MusicBar from '../components/MusicBar';
import Playlist from '../components/Playlist';
import { TRACK_SOURCE } from '../graphql';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#121212',
  },
  content: {
    paddingBottom: theme.spacing(11),
  },
}));

const playlists = [
  { id: 'LKO7w' },
  { id: 'LWKYo' },
  { id: 'D9lkj' },
  { id: 'nZJbq' },
  { id: 'e4P2b' },
  { id: 'ezJ6Z' },
  { id: 'ngy52' },
  { id: 'Dvbjm' },
  { id: 'epq5K' },
  { id: 'em2zv' },
  { id: 'Dyl4w' },
  { id: 'noqaX' },
  { id: 'DrqW8' },
  { id: 'LwKz1' },
  { id: 'D2xG0' },
  { id: 'n0xRV' },
  { id: 'e4P3Z' },
];

const Home = () => {
  const classes = useStyles();

  // Move to Music Storage using Redux
  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);
  useEffect(() => {
    console.log(currentSong);
    if (currentSong?.id) {
      setTrackSource(currentSong.streamUrl);
    }
  }, [currentSong]);

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
                  setCurrentSong={setCurrentSong}
                />
              ))}
            </Grid>
          </div>
        </Container>
        <MusicBar currentSong={currentSong} trackSource={trackSource} />
      </div>
    </Router>
  );
};

export default Home;
