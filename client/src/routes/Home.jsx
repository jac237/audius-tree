/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MusicBar from '../components/MusicBar';
import HomeAlert from '../components/HomeAlert';
import FeaturedTracks from '../components/FeaturedTracks';
import FeaturedArtists from '../components/FeaturedArtists';
import TrendingTracks from '../components/TrendingTracks';
import FearturedTracksSlide from '../components/FearturedTracksSlide';
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

const userId = 'DBkVA';
const genre = 'Moombahton';
const time = 'week';

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
  // Move to MusicProvider
  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);
  const [getTrackSource, { loading, data }] = useLazyQuery(TRACK_SOURCE);

  useEffect(() => {
    console.log(currentSong);
    if (currentSong?.id) {
      getTrackSource({ variables: { trackId: currentSong.id } });
    }
  }, [currentSong]);

  useEffect(() => {
    if (data?.getTrackSource) {
      setTrackSource(data.getTrackSource);
    }
  }, [data]);

  return (
    <Router>
      <div className={classes.root}>
        <Container>
          <div className={classes.content}>
            <Grid container className="content-root">
              <HomeAlert />
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
