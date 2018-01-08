"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = album;
function album() {
  var _this = this;

  return {
    getAlbum: function getAlbum(id) {
      return _this.request(_this.apiUrl + "/albums/" + id);
    },
    getAlbums: function getAlbums(ids) {
      return _this.request(_this.apiUrl + "/albums?ids=" + ids);
    },
    getAlbumTracks: function getAlbumTracks(id) {
      return _this.request(_this.apiUrl + "/albums/" + id + "/tracks");
    }
  };
}