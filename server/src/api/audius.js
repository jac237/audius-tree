const fetch = require('node-fetch');
const selectHost = require('./selectHost');

const appName = 'AudiusTree';

const headers = {
  Accept: 'application/json',
};

const getUserByHandle = async (handle) => {
  const host = await selectHost();
  const url = `https://audius.co/${handle}`;
  const res = await fetch(`${host}/v1/resolve?url=${url}&app_name=${appName}`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

const getUsersQuery = async (query) => {
  if (!query) return [];
  const host = await selectHost();
  const res = await fetch(`${host}/v1/users/search?query=${query}`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

const getTracksById = async (id) => {
  const host = await selectHost();
  const res = await fetch(`${host}/v1/users/${id}/tracks`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

const getFavoritesById = async (id) => {
  const host = await selectHost();
  const res = await fetch(`${host}/v1/users/${id}/favorites`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

const getTrackById = async (id) => {
  const host = await selectHost();
  const res = await fetch(`${host}/v1/tracks/${id}`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

const getTrendingTracks = async (genre, time) => {
  const host = await selectHost();
  const res = await fetch(`${host}/v1/tracks/trending?genre=${genre}&time=${time}`, {
    method: 'GET',
    headers,
  }).catch(() => {});
  const json = await res.json();
  return json.data;
};

module.exports = {
  getUsersQuery,
  getUserByHandle,
  getTracksById,
  getFavoritesById,
  getTrackById,
  getTrendingTracks,
};
