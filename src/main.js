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
import "./utils/DateTimeFormattingService";
import Embed from "v-video-embed";

library.add(faYoutube, faSearch, faTimes, faFilter, faBars);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Embed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  moment,
  render: h => h(App)
}).$mount("#app");
