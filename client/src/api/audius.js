const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://audius-tree-api.vercel.app/api/v1';

const getUserInfo = async (handle) => {
  const response = await fetch(`${API_URL}/user/${handle}`);
  return response.json();
};

const getUsersQuery = async (query) => {
  const response = await fetch(`${API_URL}/users/search?query=${query}`);
  return response.json();
};

const getFavorites = async (id) => {
  const response = await fetch(`${API_URL}/${id}/favorites`);
  return response.json();
};

const getTrack = async (id) => {
  const response = await fetch(`${API_URL}/tracks/${id}`);
  return response.json();
};

const getTrending = async (genre, time) => {
  const response = await fetch(`${API_URL}/tracks/trending?genre=${genre}&time=${time}`);
  return response.json();
};

const getTrackSource = async (id) => {
  const response = await fetch(`${API_URL}/tracks/${id}/stream`);
  return response.json();
};

export {
  getUserInfo,
  getUsersQuery,
  getFavorites,
  getTrack,
  getTrending,
  getTrackSource,
};
