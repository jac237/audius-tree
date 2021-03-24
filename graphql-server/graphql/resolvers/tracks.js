const audius = require('../../audius');

module.exports = {
  Query: {
    getTrackById(_, { trackId }) {
      return audius
        .getTrackById(trackId)
        .then((user) => user)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getTrendingTracks(_, { genre, time }) {
      return audius
        .getTrendingTracks(genre, time)
        .then((user) => user)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getTrackSource(_, { trackId }) {
      return audius
        .getTrackSource(trackId)
        .then((source) => source)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getTracksBySearch(_, { query }) {
      return audius
        .getTracksBySearch(query)
        .then((tracks) => tracks)
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
};
