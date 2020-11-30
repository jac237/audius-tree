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
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Navbar from '../components/Navbar';
import SongTileCard from '../components/SongTileCard';
import UserTileCard from '../components/UserTileCard';
import MusicBar from '../components/MusicBar';
import Alert from '@material-ui/lab/Alert';

import { getFavorites, getTrending, getTrackSource } from '../api/audius';
import featuredArtists from '../components/featuredArtists';

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  caption: {
    color: 'darkgray',
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
    '& > *': {
      margin: theme.spacing(0.5),
    },
    '& .MuiChip-root': {
      fontSize: 11,
      fontWeight: 550,
      color: 'white',
      backgroundColor: '#CC0000',
      height: 24,
    }
  },
  scrollRoot: {
    position: 'fixed',
    bottom: theme.spacing(11),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-suggested-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollRoot}>
        {children}
      </div>
    </Zoom>
  );
};

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
  const [alert, setAlert] = useState(true);

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
        <Navbar />
        <Container>
          <div className={classes.content}>
            <Grid container className="Main Grid">
              <Collapse in={alert} style={{ width: '100%' }}>
                <Grid item style={{ paddingTop: 16}}>
                  <Alert
                    icon={false}
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setAlert(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                  >
                    Made with <span role="img" aria-label="heart">❤️</span> using
                    the <Link color="primary" href="https://audiusproject.github.io/api-docs/">
                    Audius API</Link>. Follow me on <Link color="primary" href="https://audius.co/jessie">
                    Audius</Link> for more favorites!
                  </Alert>
                </Grid>
              </Collapse>
              <Grid item container className="Featured Favorite Song(s) Section">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography
                      className={classes.header}
                      variant="inherit"
                      component="p"
                      id="back-to-suggested-anchor"
                    >
                      Featured Tracks
                    </Typography>
                    <Typography
                      className={classes.caption}
                      variant="caption"
                      component="p"
                    >
                      Must listen-to  tracks on Audius. Don't miss out!
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                        <Chip label="ELECTRONIC & MORE ⚡️" />
                        <Chip label="WTF 🔥" />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {favorites && favorites.map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl="auto" key={item.favorite_item_id}>
                      <SongTileCard id={item.favorite_item_id} setCurrentSong={setCurrentSong} />
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
              <Grid item container className="Featured Artists Section">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography
                      className={classes.header}
                      variant="inherit"
                      component="p"
                    >
                      Featured Artists
                    </Typography>
                    <Typography
                      className={classes.caption}
                      variant="caption"
                      component="p"
                    >
                      Artists that you will love
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                      <Chip label="FAVORITES 🖤" />
                      <Chip label="GROUPCHATCLUB 💬" />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {artists && artists.map((item) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl="auto" key={item.id}>
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
              <Grid item container className="Trending Song(s) Section">
                <Grid item container direction="row" alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography
                      className={classes.header}
                      variant="inherit"
                      component="p"
                    >
                      Trending on Audius
                    </Typography>
                    <Typography
                      className={classes.caption}
                      variant="caption"
                      component="p"
                    >
                      New & Hot on Audius
                    </Typography>
                  </Grid>
                  <Hidden only="xs">
                    <Grid item className={classes.chips}>
                      <Chip label="MOOMBAHTON 🎉" />
                      <Chip label="THIS WEEK 🌎" />
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item container>
                  {trending && trending.map((track) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl="auto" key={track.id}>
                      <SongTileCard trackData={track} setCurrentSong={setCurrentSong} />
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
            <ScrollTop {...props}>
              <Fab color="default" size="medium" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
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
