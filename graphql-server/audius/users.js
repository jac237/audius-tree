const axios = require('axios').default;
const selectHost = require('./selectHost');

const appName = 'AudiusTree';

const getUserById = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}`,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
}

const getUserByHandle = async (handle) => {
  const host = await selectHost();
  const url = `https://audius.co/${handle}`;
  return axios({
    method: 'GET',
    url: `${host}/v1/resolve?url=${url}&app_name=${appName}`,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
}

const getUserTracks = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/tracks`,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
}

const getUserFavorites = async (userId) => {
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/${userId}/favorites`,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
}

const getUsersBySearch = async (query) => {
  if (!query) return [];
  const host = await selectHost();
  return axios({
    method: 'GET',
    url: `${host}/v1/users/search?query=${query}`,
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.data)
    .then((json) => json.data)
    .catch((err) => console.log(err));
}

module.exports = {
  getUserById,
  getUserByHandle,
  getUserTracks,
  getUserFavorites,
  getUsersBySearch
}
