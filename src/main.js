import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFilter, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import moment from "moment";

library.add(faYoutube, faSearch, faTimes, faFilter);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.filter("formatVideoDuration", function(value) {
//   if (!value) return "";
//   return moment(value.toString()).format("hh:mm");
// });

Vue.filter("formatDate", function(value) {
  if (!value) return "";
  const diff = new Date(new Date() - new Date(value));
  // const moment = moment(diff.toISOString().toString());

  if (diff.getMonth() > 12) {
    return moment(diff.toISOString().toString()).format("YYYY") + " years ago";
  } else if (diff.getDay() > 30) {
    return moment(diff.toISOString().toString()).format("MM") + " months ago";
  } else if (diff.getHours() > 24) {
    return moment(diff.toISOString().toString()).format("DD") + " days ago";
  } else if (diff.getMinutes() > 60) {
    return moment(diff.toISOString().toString()).format("HH") + " hours ago";
  }
});

new Vue({
  router,
  store,
  axios,
  moment,
  render: h => h(App)
}).$mount("#app");
