const express = require('express');

const router = express.Router();
const {
  getUsersQuery,
  getUserByHandle,
  getTracksById,
  getFavoritesById,
  getTrackById,
  getTrendingTracks,
  getTrackSource,
} = require('./audius');

router.get('/', (req, res) => {
  res.json({
    message: 'AudiusTree: API v1',
  });
});

/* AUDIUS API */

// Search Users
router.use('/users/search', async (req, res) => {
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
router.use('/user/:handle', async (req, res) => {
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
router.use('/:id/favorites', async (req, res) => {
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
router.use('/tracks/trending', async (req, res) => {
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
router.use('/tracks/:id/stream', async (req, res) => {
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

router.use('/tracks/:id', async (req, res) => {
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

module.exports = router;
