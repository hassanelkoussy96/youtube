import API from "../API";

const key = "AIzaSyDzfj0UMKAesKB3EVdx2Xm444lLKmhxAtY";
const baseSearchUrl = "search?";
let api = {
  q: "",
  part: "snippet",
  type: null,
  uploadDate: null,
  order: "relevance",
  maxResults: 10,
  relatedToVideoId: null
};

export default class SearchService {
  static search(searchString) {
    let newApi = this.getApi();
    newApi.q = searchString;
    newApi.order = "relevance";
    newApi.type = null;
    newApi.uploadDate = null;
    newApi.maxResults = 10;
    newApi.relatedToVideoId = null;
    this.setApi(newApi);
    return this.doSearch();
  }

  static applyFilters(filterType, value) {
    filterType === "uploadDate"
      ? (api.uploadDate = value)
      : filterType === "type"
      ? (api.type = value)
      : (api.order = value);
    return this.doSearch();
  }

  static getRelevantVideos(videoId) {
    this.getApi().relatedToVideoId = videoId.id;
    return this.doSearch();
  }

  static doSearch() {
    if (this.getApi().q !== "" || this.getApi().relatedToVideoId) {
      return API.get(this.getApiUrl());
    }
  }

  static getApiUrl() {
    let url =
      baseSearchUrl + "&part=" + api.part + "&maxResults=" + api.maxResults;

    !api.relatedToVideoId ? (url += "&order=" + api.order) : null;
    api.q ? (url += "&q=" + api.q) : null;
    api.uploadDate ? (url += "&uploadDate=" + api.uploadDate) : null;

    if (api.relatedToVideoId) {
      url += "&relatedToVideoId=" + api.relatedToVideoId;
      url += "&type=video";
    } else {
      api.type ? (url += "&type=" + api.type) : null;
    }
    url += "&key=" + key;
    return url;
  }

  static getApi() {
    return api;
  }

  static setApi(newApi) {
    api = newApi;
  }
}
