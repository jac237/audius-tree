/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';

import featuredArtists from '../components/featuredArtists';
import { TrackTileCard } from '../components/Track';
import { UserTileCard } from '../components/User';
import MusicBar from '../components/MusicBar';
import HomeAlert from '../components/HomeAlert';
import { getFavorites, getTrending, getTrackSource } from '../api/audius';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#121212',
  },
  content: {
    paddingBottom: theme.spacing(11),
  },
  header: {
    margin: theme.spacing(2, 0, 0, 0),
    fontSize: 26,
    fontWeight: 'bold',
  },
  caption: {
    color: 'darkgray',
    fontSize: 15,
    margin: theme.spacing(0, 0, 1, 0),
  },
  infoLink: {
    color: 'darkgray',
    padding: theme.spacing(0, 2, 0, 2),
    margin: theme.spacing(2, 0, 0, 0),
    '&:hover': {
      color: 'white',
    },
  },
  chips: {
    padding: theme.spacing(1.5, 0, 1, 0),
    '& > *': {
      margin: theme.spacing(0.5),
    },
    '& .MuiChip-root': {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#CC0000',
      height: 24,
    },
    '& .MuiChip-icon': {
      paddingLeft: theme.spacing(1),
      fontSize: 14,
      color: 'white',
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const randomRangeLimit = 80;
  const trendingSongTileLimit = 12;
  const featuredArtistTileLimit = 12;
  const featuredSongTileLimit = 12;
  const userID = 'DBkVA';
  const trendingGenre = 'Moombahton';
  const trendingTime = 'week';
  const artists = featuredArtists.slice(0, featuredArtistTileLimit);
  
  const [currentSong, setCurrentSong] = useState(null);
  const [trackSource, setTrackSource] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending(trendingGenre, trendingTime)
      .then((result) => {
        setTrending(result.trending.reverse().slice(0, trendingSongTileLimit));
      })
      .catch(() => {});
  }, [trendingGenre, trendingTime]);
    
  useEffect(() => {
    getFavorites(userID)
      .then((result) => {
        const start = Math.floor(Math.random() * randomRangeLimit);
        const end = start + featuredSongTileLimit;
        const newFavorites = result.favorites.reverse().slice(start, end)
        setFavorites(newFavorites);
      })
      .catch(() => {});
  }, [userID]);
  
  useEffect(() => {
    if (currentSong?.id) {
      getTrackSource(currentSong.id)
        .then((result) => {
          setTrackSource(result.source);
        });
    }
  }, [currentSong]);

  return (
    <Router>
      <div className={classes.root}>
        <Container>
          <div className={classes.content}>
            <Grid container className="content-root">
              <HomeAlert />
              <Grid item container className="featured-songs">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography className={classes.header} variant="inherit">
                      Featured Tracks
                    </Typography>
                    <Typography className={classes.caption}>
                      Must listen-to tracks on Audius. Don't miss out!
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                        <Chip label="ELECTRONIC & MORE" icon={<i className="fas fa-bolt"></i>} />
                        <Chip label="WTF" icon={<i className="fas fa-fire"></i>} />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {favorites && favorites.map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.favorite_item_id}>
                      <TrackTileCard id={item.favorite_item_id} setCurrentSong={setCurrentSong} />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justify="flex-end">
                  <Grid item>
                    <Typography
                      className={classes.infoLink}
                      variant="caption"
                      component="h6"
                    >
                      <Link color="inherit" href={`https://audius.co/jessie`} underline="always">
                        See All
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container className="featured-artists">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography className={classes.header} variant="inherit">
                      Featured Artists
                    </Typography>
                    <Typography className={classes.caption}>
                      Artists that you will love
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                      <Chip label="FAVORITES" icon={<i className="fas fa-heart"></i>} />
                      <Chip label="GROUPCHATCLUB" icon={<i className="fas fa-comments"></i>} />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {artists && artists.map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
                      <UserTileCard handle={item.handle} />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justify="flex-end">
                  <Grid item>
                    <Typography
                      className={classes.infoLink}
                      variant="caption"
                      component="h6"
                    >
                      <Link color="inherit" href={`https://audius.co/jessie`} underline="always">
                        See All
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container className="trending-tracks">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography className={classes.header} variant="inherit">
                      Trending on Audius
                    </Typography>
                    <Typography className={classes.caption}>
                      New & Hot on Audius
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                      <Chip label="MOOMBAHTON" icon={<i className="fab fa-teamspeak"></i>} />
                      <Chip label="THIS WEEK" icon={<i className="fas fa-hourglass-end"></i>} />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {trending && trending.map((track) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl="auto" key={track.id}>
                      <TrackTileCard trackData={track} setCurrentSong={setCurrentSong} />
                    </Grid>
                  ))}
                </Grid>
                <Grid item container justify="flex-end">
                  <Grid item>
                  <Typography
                    className={classes.infoLink}
                    variant="caption"
                    component="p"
                  >
                    <Link color="inherit" underline="always" href={`https://audius.co/trending?genre=${trendingGenre}&?time=${trendingTime}`}>
                      See All
                    </Link>
                  </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
        <MusicBar
          currentSong={currentSong}
          trackSource={trackSource}
        />
      </div>
    </Router>
  );
};

export default Home;
