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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VideoPlayer")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
