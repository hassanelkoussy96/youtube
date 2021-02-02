import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faFilter,
  faSearch,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import moment from "moment";

library.add(faYoutube, faSearch, faTimes, faFilter, faBars);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.filter("formatVideoDuration", function(value) {
//   if (!value) return "";
//   return moment(value.toString()).format("hh:mm");
// });

Vue.filter("formatVideoDuration", function(value) {
  if (!value) return "";
  let timeInput = value.substring(2, value.length);
  let time = "";
  const hours_time = timeInput.split("H");
  let minutes_seconds;
  if (hours_time.length > 1) {
    time += hours_time[0] + ":";
    minutes_seconds = hours_time[1].split("M");
  } else {
    minutes_seconds = hours_time[0].split("M");
  }
  const minutes = minutes_seconds[0];
  const seconds = minutes_seconds[1].substring(
    0,
    minutes_seconds[1].length - 1
  );
  minutes.length === 1 ? (time += "0" + minutes) : (time += minutes);
  time += ":";
  seconds.length === 1 ? (time += "0" + seconds) : (time += seconds);
  return time;
  // return moment(value, "PThhHmmMssS").format("hh:mm:ss");
});

new Vue({
  router,
  store,
  axios,
  moment,
  render: h => h(App)
}).$mount("#app");
