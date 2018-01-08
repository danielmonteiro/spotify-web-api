import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { SpotifyWrapper } from './../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper Class', () => {

  it('Should be an instace of SpotifyWrapper', () => {
    let spotifyWrapper = new SpotifyWrapper({});
    expect(spotifyWrapper).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('Should receive apiUrl as an option', () => {
    let spotifyWrapper = new SpotifyWrapper({ apiUrl: 'apiUrl' });
    expect(spotifyWrapper.apiUrl).to.be.equals('apiUrl');
  });

  it('Should have default apiUrl when not passed', () => {
    let spotifyWrapper = new SpotifyWrapper({});
    expect(spotifyWrapper.apiUrl).to.be.equals('https://api.spotify.com/v1');
  });

  it('Should receive token as an option', () => {
    let spotifyWrapper = new SpotifyWrapper({ token: 'foo' });
    expect(spotifyWrapper.token).to.be.equals('foo');
  });

  describe('Request Method', () => {

    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('Should have a request method', () => {
      let spotifyWrapper = new SpotifyWrapper({});
      expect(spotifyWrapper.request).to.exist;
    });

    it('Should call fetch once', () => {
      let spotifyWrapper = new SpotifyWrapper({ token: 'foo' });
      spotifyWrapper.request('http://blah');
      expect(fetchedStub).to.have.calledOnce;
    });

    it('Should call right url', () => {
      let spotifyWrapper = new SpotifyWrapper({ token: 'foo' });
      spotifyWrapper.request('http://blah');
      expect(fetchedStub).to.have.calledWith('http://blah');
    });

    it('Should call right headers', () => {
      let spotifyWrapper = new SpotifyWrapper({ token: 'foo' });

      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer foo`,
      };

      spotifyWrapper.request('http://blah');
      expect(fetchedStub).to.have.calledWith('http://blah', headers);
    });

  });

});
