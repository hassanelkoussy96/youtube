import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "Search",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SearchResults.vue"),
    props: true
  },
  {
    path: "/video/:id",
    name: "Video",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VideoPlayer")
  },
  {
    path: "/channel/:id",
    name: "Channel",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Channel")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
