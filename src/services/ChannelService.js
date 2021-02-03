import API from "../API";
import constants from "../../constants";

const key = constants.VUE_APP_API_KEY;
const baseSearchUrl = "channels?";
let channelApi = {
  id: "",
  parts: ["snippet", "brandingSettings", "contentDetails"],
  type: null,
  maxResults: 10
};

export default class ChannelService {
  static getChannelDetails(id) {
    let newApi = this.getChannelApi();
    newApi.id = id;
    newApi.maxResults = 10;
    this.setChannelApi(newApi);
    return API.get(this.getChannelApiUrl());
  }

  static getChannelApiUrl() {
    let url =
      baseSearchUrl +
      "id=" +
      channelApi.id +
      "&maxResults=" +
      channelApi.maxResults;
    channelApi.parts.forEach(part => {
      url += "&part=" + part;
    });
    url += "&key=" + key;
    return url;
  }

  static getChannelApi() {
    return channelApi;
  }

  static setChannelApi(newApi) {
    channelApi = newApi;
  }
}
