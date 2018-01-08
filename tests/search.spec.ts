import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { SpotifyWrapper } from './../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {

  let fetchedStub;
  let promise;
  let spotifyWrapper;

  beforeEach(() => {
    spotifyWrapper = new SpotifyWrapper({
      token: 'foo'
    });

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('Should have search method', () => {
      expect(spotifyWrapper.search).to.exist;
    });

    it('Should have spotifyWrapper.search.albums method', () => {
      expect(spotifyWrapper.search.albums).to.exist;
    });

    it('Should have spotifyWrapper.search.artists method', () => {
      expect(spotifyWrapper.search.artists).to.exist;
    });

    it('Should have spotifyWrapper.search.tracks method', () => {
      expect(spotifyWrapper.search.tracks).to.exist;
    });

    it('Should have spotifyWrapper.search.playlists method', () => {
      expect(spotifyWrapper.search.playlists).to.exist;
    });

  });

  describe('Artist Search', () => {

    it('Should call fetch function', () => {
      const artists = spotifyWrapper.search.artists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const artists = spotifyWrapper.search.artists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = spotifyWrapper.search.artists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('Album Search', () => {

    it('Should call fetch function', () => {
      const albums = spotifyWrapper.search.albums('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const albums = spotifyWrapper.search.albums('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = spotifyWrapper.search.albums('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });

  describe('Track Search', () => {

    it('Should call fetch function', () => {
      const tracks = spotifyWrapper.search.tracks('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const tracks = spotifyWrapper.search.tracks('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      const tracks2 = spotifyWrapper.search.tracks('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });

  describe('Playlist Search', () => {

    it('Should call fetch function', () => {
      const playlists = spotifyWrapper.search.playlists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });


    it('Should call correct url', () => {
      const playlists = spotifyWrapper.search.playlists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlists2 = spotifyWrapper.search.playlists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
