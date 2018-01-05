global.fetch = require('node-fetch');

import { searchAlbums } from './../src/main';

searchAlbums('Incubus').then(data => data.albums.items.map(item => console.log(item.name)));
