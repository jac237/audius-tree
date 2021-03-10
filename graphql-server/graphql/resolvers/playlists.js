const audius = require('../../audius');

module.exports = {
  Query: {
    searchPlaylists(_, { query }) {
      return audius
        .searchPlaylists(query)
        .then((playlists) => playlists)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getPlaylist(_, { playlistId }) {
      return audius
        .getPlaylist(playlistId)
        .then((playlist) => playlist)
        .catch((err) => {
          throw new Error(err);
        });
    },
    getPlaylistTracks(_, { playlistId }) {
      return audius
        .getPlaylistTracks(playlistId)
        .then((tracks) => tracks)
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
};
