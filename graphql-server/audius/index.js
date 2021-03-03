// import functions
const users = require('./users');
const tracks = require('./tracks');

module.exports = {
  ...users,
  ...tracks
};