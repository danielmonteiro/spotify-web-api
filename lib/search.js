'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchArtists = exports.searchAlbums = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

//const HttpsProxyAgent = require('https-proxy-agent');
var search = exports.search = function search(query, type) {
  return fetch(_config.API_URL + '/search?q=' + query + '&type=' + type, {
    // agent: new HttpsProxyAgent('http://danmonte:Dapimon3@lnx237in.sjk.emb:9090'),
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + 'BQBUl0lQXCUdy0GY_ILF9FQUixaJdUSNsL0PaaBWmbwOyJP53KGYj8xSgFNOwxBLx5tkjsxQ0k0Fv63Vzx0v4XOOKg4op9gEp3CUrT1IucpRhRRTOM8FGdThyRgRCbQSA6ItjZaGVoaE0Hh2STbw0L2pog'
    }
  }).then(_utils.toJSON);
};

var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};

var searchArtists = exports.searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};

var searchTracks = exports.searchTracks = function searchTracks(query) {
  return search(query, 'track');
};

var searchPlaylists = exports.searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};