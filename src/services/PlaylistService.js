import API from "../API";
import constants from "../../constants";

const key = constants.VUE_APP_API_KEY;
const baseSearchUrl = "playlistItems?";
let playlistApi = {
  id: "",
  parts: ["snippet"],
  type: null,
  maxResults: 10
};

export default class PlaylistService {
  static getPlaylistVideos(id) {
    let newApi = this.getPlaylistApi();
    newApi.id = id;
    newApi.maxResults = 10;
    this.setPlaylistApi(newApi);
    return API.get(this.getPlaylistApiUrl());
  }

  static getPlaylistApiUrl() {
    let url =
      baseSearchUrl +
      "playlistId=" +
      playlistApi.id +
      "&maxResults=" +
      playlistApi.maxResults;
    playlistApi.parts.forEach(part => {
      url += "&part=" + part;
    });
    url += "&key=" + key;
    return url;
  }

  static getPlaylistApi() {
    return playlistApi;
  }

  static setPlaylistApi(newApi) {
    playlistApi = newApi;
  }
}
