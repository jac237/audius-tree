const usersResolvers = require('./users');
const tracksResolvers = require('./tracks');
const playlistsResolvers = require('./playlists');
const audius = require('../../audius');

module.exports = {
  // Post: {
  //   // likeCount: (parent) => parent.likes.length,
  //   // commentCount: (parent) => parent.comments.length
  // },
  Query: {
    ...usersResolvers.Query,
    ...tracksResolvers.Query,
    ...playlistsResolvers.Query,
  },
  Track: {
    streamUrl: (root, _args, _context, _info) => {
      return audius
        .getTrackSource(root.id)
        .then((source) => source)
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  Banner: {
    x640: (root, _args, _context, _info) => {
      return root['640x'];
    },
    x2000: (root, _args, _context, _info) => {
      return root['2000x'];
    },
  },
  Image: {
    x150: (root, _args, _context, _info) => {
      return root['150x150'];
    },
    x480: (root, _args, _context, _info) => {
      return root['480x480'];
    },
    x1000: (root, _args, _context, _info) => {
      return root['1000x1000'];
    },
  },
  RepostItem: {
    __resolveType: (obj, _context, _info) => {
      if (obj.playlist_name) {
        return 'Playlist';
      }

      if (obj.title) {
        return 'Track';
      }

      return null; // GraphQLError is thrown
    },
  },
  // Example:
  // Mutation: {
  //   // ...xResolvers.Mutation,
  //   // ...yResolvers.Mutation,
  //   // ...zResolvers.Mutation
  // },
  // Subscription: {
  //   // ...xResolvers.Subscription
  // }
};
