import chai, { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from './../src/search';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('Should have search method', () => {
      expect(search).to.exist;
    });

    it('Should have search method', () => {
      expect(searchAlbums).to.exist;
    });

    it('Should have search method', () => {
      expect(searchArtists).to.exist;
    });

    it('Should have search method', () => {
      expect(searchTracks).to.exist;
    });

    it('Should have search method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic Search', () => {

    it('Should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {

      context('Passing one type', () => {
        const artists = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('Passing more than one types', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });


    it('Should return the JSON data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });


  });

  describe('Artist Search', () => {

    it('Should call fetch function', () => {
      const artists = searchArtists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const artists = searchArtists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = searchArtists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('Album Search', () => {

    it('Should call fetch function', () => {
      const albums = searchAlbums('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const albums = searchAlbums('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = searchAlbums('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });

  describe('Track Search', () => {

    it('Should call fetch function', () => {
      const tracks = searchTracks('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const tracks = searchTracks('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      const tracks2 = searchTracks('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });

  describe('Playlist Search', () => {

    it('Should call fetch function', () => {
      const playlists = searchPlaylists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const playlists = searchPlaylists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlists2 = searchPlaylists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
