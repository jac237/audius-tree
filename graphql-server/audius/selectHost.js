// Audius API:
// https://audiusproject.github.io/api-docs/?http#audius-api-docs
const axios = require('axios').default;

const selectHost = () => {
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return axios({
    method: 'GET',
    url: 'https://api.audius.co',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((r) => r.data)
    .then((j) => j.data)
    .then((d) => {
      if (d) {
        return sample(d);
      } else {
        return sample(backup);
      }
    })
    .catch((err) => console.log('Unable to /GET Audius host:', err));
};

module.exports = selectHost;

const backup = [
  'https://discoveryprovider.audius5.prod-us-west-2.staked.cloud',
  'https://discovery-au-01.audius.openplayer.org',
  'https://discoveryprovider2.audius.co',
  'https://audius-disco.ams-x01.nl.supercache.org',
  'https://discoveryprovider3.audius.co',
  'https://audius-metadata-1.figment.io',
  'https://discoveryprovider.audius.prod-us-west-2.staked.cloud',
  'https://discoveryprovider.audius6.prod-us-west-2.staked.cloud',
  'https://discovery-c.mainnet.audius.radar.tech',
  'https://dn1.monophonic.digital',
  'https://discoveryprovider.mumbaudius.com',
  'https://disc-gru01.audius.hashbeam.com',
  'https://discoveryprovider.audius4.prod-us-west-2.staked.cloud',
  'https://discoveryprovider.audius2.prod-us-west-2.staked.cloud',
  'https://discoveryprovider.audius1.prod-us-west-2.staked.cloud',
  'https://audius-discovery-1.altego.net',
  'https://discoveryprovider.audius.co',
  'https://discovery-d.mainnet.audius.radar.tech',
  'https://audius-metadata-3.figment.io',
  'https://audius-discovery.nz.modulational.com',
  'https://dp01.audius.endl.net',
  'https://discovery-us-01.audius.openplayer.org',
  'https://audius-metadata-4.figment.io',
  'https://audius-dp.johannesburg.creatorseed.com',
  'https://audius-metadata-2.figment.io',
  'https://dn-usa.audius.metadata.fyi',
  'https://dn-jpn.audius.metadata.fyi',
  'https://discoveryprovider.audius3.prod-us-west-2.staked.cloud',
  'https://audius-disco.dfw-x01.us.supercache.org',
];
