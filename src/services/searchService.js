import API from "../API";

const key = "AIzaSyDzfj0UMKAesKB3EVdx2Xm444lLKmhxAtY";
const baseSearchUrl = "search?";
let api = {
  q: "",
  part: "snippet",
  type: null,
  uploadDate: null,
  order: "relevance",
  maxResults: 10
};

export default class SearchService {
  static search(searchString) {
    let newApi = this.getApi();
    newApi.q = searchString;
    newApi.order = "relevance";
    newApi.type = null;
    newApi.uploadDate = null;
    newApi.maxResults = 10;
    this.setApi(newApi);
    return this.doSearch(searchString);
  }

  static applyFilters(filterType, value) {
    filterType === "uploadDate"
      ? (api.uploadDate = value)
      : filterType === "type"
      ? (api.type = value)
      : (api.order = value);
    return this.doSearch(this.getApi().q);
  }

  static doSearch(searchString) {
    if (searchString !== "") {
      return API.get(this.getApiUrl(searchString));
    }
  }

  static getApiUrl(searchString) {
    let url =
      baseSearchUrl +
      "q=" +
      searchString +
      "&part=" +
      api.part +
      "&maxResults=" +
      api.maxResults +
      "&order=" +
      api.order +
      "&uploadDate=" +
      api.uploadDate +
      "&key=" +
      key;
    api.type ? (url += "&type=" + api.type) : null;
    return url;
  }

  static getApi() {
    return api;
  }

  static setApi(newApi) {
    api = newApi;
  }
}
