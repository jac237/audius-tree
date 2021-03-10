const audius = require('../../audius');

module.exports = {
  Query: {
    getUserById(_, { userId }) {
      return audius
        .getUserById(userId)
        .then((user) => user)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUserByHandle(_, { handle }) {
      return audius
        .getUserByHandle(handle)
        .then((user) => user)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUserTracks(_, { userId }) {
      return audius
        .getUserTracks(userId)
        .then((tracks) => tracks)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUserFavorites(_, { userId }) {
      return audius
        .getUserFavorites(userId)
        .then((tracks) => tracks)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUserReposts(_, { userId }) {
      return audius
        .getUserReposts(userId)
        .then((reposts) => reposts)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUserTags(_, { userId }) {
      return audius
        .getUserTags(userId)
        .then((tags) => tags)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getUsersBySearch(_, { query }) {
      return audius
        .getUsersBySearch(query)
        .then((user) => user)
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
};
