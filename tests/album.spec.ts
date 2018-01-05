import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbums, getAlbumTracks } from './../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe('Album', () => {

  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {

    it('Should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('Should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('Should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('Should call fetch', () => {

      const album = getAlbum();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTz');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });

  });

  describe('getAlbums', () => {

    it('Should call fetch', () => {

      const albums = getAlbums();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const albums = getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc');

      const albums2 = getAlbums(['4aawyAB9vmqN3uQ7FjRGTz']);
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums?ids=4aawyAB9vmqN3uQ7FjRGTz');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const album = getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']);

      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });

  });

  describe('getAlbumTracks', () => {

    it('Should call fetch', () => {

      const albumTracks = getAlbumTracks();
      expect(stubedFetch).to.be.calledOnce;

    });

    it('Should call correct URL', () => {

      const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

      const albumTracks2 = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTz');
      expect(stubedFetch).to.be.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTz/tracks');

    });

    it('Should return the correct data from Promise', () => {

      promise.resolves({ album: 'name' });
      const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(albumTracks.resolveValue).to.be.eql({ album: 'name' });

    });

  });

});
