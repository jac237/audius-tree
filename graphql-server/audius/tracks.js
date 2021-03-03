const axios = require('axios').default;
const selectHost = require('./selectHost');

const appName = 'AudiusTree';

const getTrackById = async (trackId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/tracks/${trackId}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getTrendingTracks = async (genre, time) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/tracks/trending?genre=${genre}&time=${time}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getTrackSource = async (trackId) => {
  const host = await selectHost();
  return `${host}/v1/tracks/${trackId}/stream?app_name=${appName}`;
};

module.exports = {
  getTrackById,
  getTrendingTracks,
  getTrackSource,
};
