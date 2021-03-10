// import functions
const users = require('./users');
const tracks = require('./tracks');
const playlists = require('./playlists');

module.exports = {
  ...users,
  ...tracks,
  ...playlists,
};
