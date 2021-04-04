/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistCarousel from '../components/PlaylistCarousel';
import { UserReposts } from '../components/User';

const playlists = require('../data/featuredPlaylists.json');

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: '#121212',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div>
          <Typography
            variant="inherit"
            align="center"
            component="p"
            style={{ fontWeight: 'bold', fontSize: 13, marginTop: '-8px' }}
          >
            Made with{' '}
            <FavoriteIcon
              color="secondary"
              style={{ fontSize: 13, verticalAlign: 'middle' }}
            />{' '}
            using the Audius API
          </Typography>
          <Grid container>
            {playlists.map((playlist) => (
              <PlaylistCarousel key={playlist.id} playlistId={playlist.id} />
            ))}
          </Grid>
          <UserReposts />
        </div>
      </Container>
    </div>
  );
};

export default Home;
