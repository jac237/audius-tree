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

const Home = () => {
  const classes = useStyles();
  // Move to MusicProvider
  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);
  const [getTrackSource, { loading, data }] = useLazyQuery(TRACK_SOURCE);

  // const [trending, setTrending] = useState([]);
  // const [favorites, setFavorites] = useState([]);

  // const { trendingLoading, trendingError, trending } = useQuery(TRENDING_TRACKS, { variables: { genre, time } });
  // const { favoritesLoading, favoritesError, favorites } = useQuery(FAVORITE_TRACKS, { variables: { userId } });

  // useEffect(() => {
  //   console.log(trending, trendingError);
  //   if (trending) {
  //     console.log(trending);
  //     // trending = trending.reverse().slice(0, trendingSongTileLimit);
  //     return;
  //   };
  //   // if (!trendingLoading) {
  //   // }
  //   // getTrending(trendingGenre, trendingTime)
  //   //   .then((result) => {
  //   //   })
  //   //   .catch(() => {});
  // }, [trending]);

  // useEffect(() => {
  //   if (favorites) {
  //     console.log(favorites);
  //     const start = Math.floor(Math.random() * randomRangeLimit);
  //     const end = start + featuredSongTileLimit;
  //     // favorites = favorites.reverse().slice(start, end)
  //   }
  //   // if (!favoritesLoading) {
  //   // }
  //   // getFavorites(userID)
  //   //   .then((result) => {
  //   //     setFavorites(newFavorites);
  //   //   })
  //   //   .catch(() => {});
  // }, [favorites]);

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
              <FeaturedArtists />
              <FeaturedTracks userId={userId} setCurrentSong={setCurrentSong} />
              <TrendingTracks
                genre={genre}
                time={time}
                setCurrentSong={setCurrentSong}
              />
            </Grid>
          </div>
        </Container>
        <MusicBar currentSong={currentSong} trackSource={trackSource} />
      </div>
    </Router>
  );
};

export default Home;
