export default function album() {
  return {
    getAlbum: id => this.request(`${this.apiUrl}/albums/${id}`),
    getAlbums: ids => this.request(`${this.apiUrl}/albums?ids=${ids}`),
    getAlbumTracks: id => this.request(`${this.apiUrl}/albums/${id}/tracks`),
  };
}
