const axios = require('axios').default;
const selectHost = require('./selectHost');

const appName = 'AudiusTree';

const searchPlaylists = async (query) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/playlists/search?query=${query}&app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getPlaylist = async (playlistId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/playlists/${playlistId}?app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then(
      (json) => json.data[0]
    ) /** Returns first element in array due to API issue with single element array. */
    .catch((err) => console.log(err));
};

const getPlaylistTracks = async (playlistId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/playlists/${playlistId}/tracks`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

module.exports = {
  searchPlaylists,
  getPlaylist,
  getPlaylistTracks,
};
