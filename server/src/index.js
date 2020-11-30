/* eslint-disable no-unused-vars */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const {
  getUsersQuery,
  getUserByHandle,
  getTracksById,
  getFavoritesById,
  getTrackById,
  getTrendingTracks,
  getTrackSource,
} = require('./api/audius');

const app = express();

// Middlewares
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Adius Tree: Currently in Production. 🦺',
  });
});

/* AUDIUS API */

// Search Users
app.use('/users/search', async (req, res) => {
  // console.log('Search Users Query: ', req.query);
  let error = false;
  const query = req.query.query === (undefined || '') ? null : req.query.query;
  const users = await getUsersQuery(query)
    .then((item) => item)
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'User Results',
    query: req.query,
    users,
    error,
  });
});

// Get User by Handle
app.use('/user/:handle', async (req, res) => {
  // console.log('Handle Parameter: ', req.params);
  let tracks;
  let error = false;
  const user = await getUserByHandle(req.params.handle)
    .then(async (item) => {
      tracks = await getTracksById(item.id);
      return item;
    })
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'Get user by handle',
    params: req.params,
    user,
    tracks,
    error,
  });
});

// Get User's Favorite Tracks by ID
app.use('/:id/favorites', async (req, res) => {
  // console.log('ID Parameter: ', req.params);
  let error = false;
  const favorites = await getFavoritesById(req.params.id)
    .then((item) => item)
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'Get favorites by ID',
    params: req.params,
    favorites,
    error,
  });
});

// Get (Top 100) TRENDING tracks on Audius
app.use('/tracks/trending', async (req, res) => {
  // console.log('Trending Tracks Request: ', req.query);
  let error = false;
  const genre = req.query.genre === undefined ? '' : req.query.genre;
  const time = req.query.time === undefined ? '' : req.query.time;
  const trending = await getTrendingTracks(genre, time)
    .then((item) => item)
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'Trending Tracks',
    query: req.query,
    trending,
    error,
  });
});

// Get TRACK by ID
app.use('/tracks/:id/stream', async (req, res) => {
  // console.log('Tracks Parameter: ', req.params);
  let error = false;
  const source = await getTrackSource(req.params.id)
    .then((item) => item)
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'Streamable Track Source by ID',
    params: req.params,
    source,
    error,
  });
});

app.use('/tracks/:id', async (req, res) => {
  // console.log('Tracks Parameter: ', req.params);
  let error = false;
  const track = await getTrackById(req.params.id)
    .then((item) => item)
    .catch(() => {
      error = true;
    });

  res.json({
    message: 'Tracks by ID',
    params: req.params,
    track,
    error,
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
