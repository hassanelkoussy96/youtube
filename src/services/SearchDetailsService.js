import API from "../API";

const key = "AIzaSyDzfj0UMKAesKB3EVdx2Xm444lLKmhxAtY";
const baseVideosSearchUrl = "videos?";
const basePlaylistsSearchUrl = "playlists?";
const baseChannelsSearchUrl = "channels?";
let part = "contentDetails";

export default class SearchDetailsService {
  static getVideosDetails(queryString) {
    return API.get(
      baseVideosSearchUrl + queryString + "&part=" + part + "&key=" + key
    );
  }

  static getPlaylistsDetails(queryString) {
    return API.get(
      basePlaylistsSearchUrl + queryString + "&part=" + part + "&key=" + key
    );
  }

  static getChannelsDetails(queryString) {
    return API.get(
      baseChannelsSearchUrl + queryString + "&part=" + part + "&key=" + key
    );
  }
}
