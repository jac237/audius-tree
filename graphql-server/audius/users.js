const axios = require('axios').default;
const selectHost = require('./selectHost');
const MAX_NUM_TAGS = 8;

const appName = 'AudiusTree';

const getUserById = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getUserByHandle = async (handle) => {
  const host = await selectHost();
  const url = `https://audius.co/${handle}`;
  return axios({
    method: 'GET',
    url: `${host}/v1/resolve?url=${url}&app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getUserTracks = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/tracks?app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getUserFavorites = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/favorites?app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getUserReposts = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/reposts?app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

const getUserTags = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/tags?app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => {
      const trimmed = json.data.slice(1, MAX_NUM_TAGS);
      return trimmed;
    })
    .catch((err) => console.log(err));
};

const getUsersBySearch = async (query) => {
  if (!query) return [];
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/search?query=${query}&app_name=${appName}`,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
};

module.exports = {
  getUserById,
  getUserByHandle,
  getUserTracks,
  getUserFavorites,
  getUsersBySearch,
  getUserFavorites,
  getUserReposts,
  getUserTags,
};
