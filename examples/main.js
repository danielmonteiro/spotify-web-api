global.fetch = require('node-fetch');

import { SpotifyWrapper } from './../src/index';

const spotifyWrapper = new SpotifyWrapper({
  token: 'BQAcB-sL2B7M1my7dDBLv3X3X4p5PktEaES1nM11ONK9he7jECch4C2V96oBONplCrLi3HKAIWm90IzA987M5t8XB91ZiL9gIg3tlbD8Th8O5aeobwHMikX39tNwisqmVMKh94AKirWcysaU-orlh2V0mg',
});

spotifyWrapper.search.albums('Incubus').then(data => data.albums.items.map(item => console.log(item.name)));
