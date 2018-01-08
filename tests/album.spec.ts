import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { SpotifyWrapper } from './../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {

  let stubedFetch;
  let promise;
  let spotifyWrapper

  beforeEach(() => {
    spotifyWrapper = new SpotifyWrapper({ token: 'foo' });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('Should have getAlbum method', () => {
      expect(spotifyWrapper.album.getAlbum).to.exist;
    });

    it('Should have getAlbums method', () => {
      expect(spotifyWrapper.album.getAlbums).to.exist;
    });

    it('Should have getAlbumTracks method', () => {
      expect(spotifyWrapper.album.getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('Should call fetch', () => {

      const album = spotifyWrapper.album.getAlbum();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const album = spotifyWrapper.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotifyWrapper.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTz');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const album = spotifyWrapper.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });

  });

  describe('getAlbums', () => {

    it('Should call fetch', () => {

      const albums = spotifyWrapper.album.getAlbums();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const albums = spotifyWrapper.album.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc');

      const albums2 = spotifyWrapper.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTz']);
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTz');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const album = spotifyWrapper.album.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);

      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });

  });

  describe('getAlbumTracks', () => {

    it('Should call fetch', () => {

      const albumTracks = spotifyWrapper.album.getAlbumTracks();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const albumTracks = spotifyWrapper.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

      const albumTracks2 = spotifyWrapper.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTz');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz/tracks');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const albumTracks = spotifyWrapper.album.getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(albumTracks.resolveValue).to.be.eql({ album: 'name' });

    });

  });

});
