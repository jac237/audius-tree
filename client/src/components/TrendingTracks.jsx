/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';
import { TRENDING_TRACKS } from '../graphql';
import TrackTileCard from './Track/TrackTileCard';

const useStyles = makeStyles((theme) => ({
  root: {},
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
  chip: {
    borderRadius: 5,
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

const TrendingTracks = (props) => {
  const classes = useStyles();

  const { genre, time, setCurrentSong } = props;
  // const { loading, error, data } = useQuery(TRENDING_TRACKS, {
  //   variables: { genre, time },
  // });
  const [getTrending, { loading, error, data }] = useLazyQuery(TRENDING_TRACKS);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending({ variables: { genre, time } });
  }, []);

  useEffect(() => {
    // console.log(data, genre, time);
    if (data?.getTrendingTracks) {
      // console.log('TrendingTracks', data.getTrendingTracks);
      setTrending([...data.getTrendingTracks].reverse().slice(0, 24));
    }
  }, [data]);

  if (loading) return 'Loading Trending Tracks...';
  if (error) return `${error}`;

  return (
    <Grid item container className="trending-tracks">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
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
            <Chip
              className={classes.chip}
              label="MOOMBAHTON"
              icon={<i className="fab fa-teamspeak"></i>}
            />
            <Chip
              className={classes.chip}
              label="THIS WEEK"
              icon={<i className="fas fa-hourglass-end"></i>}
            />
          </Grid>
        </Hidden>
      </Grid>
      <Grid item container>
        {trending &&
          trending.map((track) => (
            <Grid item xs={6} sm={4} md={3} lg={2} xl="auto" key={track.id}>
              <TrackTileCard
                trackData={track}
                setCurrentSong={setCurrentSong}
              />
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
            <Link
              color="inherit"
              underline="always"
              href={`https://audius.co/trending?genre=${genre}&?time=${time}`}
            >
              See All
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrendingTracks;
