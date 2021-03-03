/* eslint-disable react/prop-types */
import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';
import { FEATURED_TRACKS } from '../graphql';
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

const FeaturedTracks = (props) => {
  const classes = useStyles();
  const { userId, setCurrentSong } = props;
  const [getTracks, { loading, error, data }] = useLazyQuery(FEATURED_TRACKS);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    // console.log('FeaturedTracks', props);
    getTracks({ variables: { userId } }); // lazy query
  }, []);

  useEffect(() => {
    if (data?.getUserFavorites) {
      const start = Math.floor(Math.random() * 50) + 1;
      const end = start + 24;
      setFavorites([...data.getUserFavorites].reverse().slice(start, end));
    }
  }, [data]);

  if (error) return `${error}`;

  return (
    <Grid item container className="featured-songs">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
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
            <Chip
              className={classes.chip}
              label="ELECTRONIC & MORE"
              icon={<i className="fas fa-bolt"></i>}
            />
            <Chip
              className={classes.chip}
              label="WTF"
              icon={<i className="fas fa-fire"></i>}
            />
          </Grid>
        </Hidden>
      </Grid>
      <Grid item container>
        {favorites &&
          favorites.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.favorite_item_id}>
              <TrackTileCard
                trackId={item.favorite_item_id}
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
            component="h6"
          >
            <Link
              color="inherit"
              href={`https://audius.co/jessie`}
              underline="always"
            >
              See All
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeaturedTracks;
