// Audius API: https://audiusproject.github.io/api-docs/?http#audius-api-docs
// const fetch = require('node-fetch');
const axios = require('axios').default;

const selectHost = () => {
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return axios({
    method: 'GET',
    url: 'https://api.audius.co',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((r) => r.data)
    .then((j) => j.data)
    .then((d) => sample(d))
    .catch((err) => console.log('Unable to /GET Audius host:', err));
};

module.exports = selectHost;
