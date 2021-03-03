const usersResolvers = require('./users');
const tracksResolvers = require('./tracks');

module.exports = {
  // Post: {
  //   // likeCount: (parent) => parent.likes.length,
  //   // commentCount: (parent) => parent.comments.length
  // },
  Query: {
    ...usersResolvers.Query,
    ...tracksResolvers.Query
  },
  Banner: {
    x640: (root, args, context, info) => {
      return root['640x'];
    },
    x2000: (root, args, context, info) => {
      return root['2000x'];
    },
  },
  Image: {
    x150: (root, args, context, info) => {
      return root['150x150'];
    },
    x480: (root, args, context, info) => {
      return root['480x480'];
    },
    x1000: (root, args, context, info) => {
      return root['1000x1000'];
    }
  }
  // Mutation: {
  //   // ...xResolvers.Mutation,
  //   // ...yResolvers.Mutation,
  //   // ...zResolvers.Mutation
  // },
  // Subscription: {
  //   // ...xResolvers.Subscription
  // }
};