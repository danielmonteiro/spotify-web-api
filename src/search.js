//const HttpsProxyAgent = require('https-proxy-agent');
import { API_URL } from './config';
import { toJSON } from './utils';

export const search = (query, type) => {
  return fetch(
    `${API_URL}/search?q=${query}&type=${type}`
    , {
       // agent: new HttpsProxyAgent('http://danmonte:Dapimon3@lnx237in.sjk.emb:9090'),
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + 'BQBUl0lQXCUdy0GY_ILF9FQUixaJdUSNsL0PaaBWmbwOyJP53KGYj8xSgFNOwxBLx5tkjsxQ0k0Fv63Vzx0v4XOOKg4op9gEp3CUrT1IucpRhRRTOM8FGdThyRgRCbQSA6ItjZaGVoaE0Hh2STbw0L2pog'
        }
      }
    )
    .then(toJSON);
};

export const searchAlbums = (query) =>
  search(query, 'album');

export const searchArtists = (query) =>
  search(query, 'artist');

export const searchTracks = (query) =>
  search(query, 'track');

export const searchPlaylists = (query) =>
  search(query, 'playlist');

