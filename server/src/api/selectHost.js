// Audius API: https://audiusproject.github.io/api-docs/?http#audius-api-docs
const fetch = require('node-fetch');

const selectHost = async () => {
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const host = await fetch('https://api.audius.co')
    .then((r) => r.json())
    .then((j) => j.data)
    .then((d) => sample(d))
    .catch(() => {});
  return host;
};

module.exports = selectHost;
