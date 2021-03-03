/* eslint-disable react/prop-types */
import { useQuery, gql } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';
import UserTileCard from './User/UserTileCard';
import artists from './artists';

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

const featuredArtistTileLimit = 12;
const featuredArtists = artists.slice(0, featuredArtistTileLimit);

const FeaturedArtists = () => {
  const classes = useStyles();

  return (
    <Grid item container className="featured-artists">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Typography className={classes.header} variant="inherit">
            Featured Artists
          </Typography>
          <Typography className={classes.caption}>
            Artists that you should know!
          </Typography>
        </Grid>
        <Hidden only="xs">
          <Grid item className={classes.chips}>
            <Chip
              className={classes.chip}
              label="FAVORITES"
              icon={<i className="fas fa-heart"></i>}
            />
            <Chip
              className={classes.chip}
              label="GROUPCHATCLUB"
              icon={<i className="fas fa-comments"></i>}
            />
          </Grid>
        </Hidden>
      </Grid>
      <Grid item container>
        {featuredArtists &&
          featuredArtists.map((user) => (
            <Grid item xs={6} sm={3} md={3} lg={2} key={user.id}>
              <UserTileCard userId={user.id} />
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

export default FeaturedArtists;
