/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
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
