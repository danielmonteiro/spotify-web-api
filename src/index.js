import search from './search';

import album from './album';

export class SpotifyWrapper {
  constructor(options) {
    this.apiUrl = options.apiUrl || 'https://api.spotify.com/v1';
    this.token = options.token;

    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }

  request(url) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    };

    return fetch(url, headers);
  }
}
