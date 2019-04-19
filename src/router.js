import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: resolve => require(["./views/Home.vue"], resolve),
      children: []
    },
    {
      path: "/categories",
      name: "categories",
      component: resolve => require(["./views/categories.vue"], resolve)
    },
    {
      path: "/rank",
      name: "rank",
      component: resolve => require(["./views/rank.vue"], resolve)
    },
    {
      path: "/bookDetail",
      name: "bookDetail",
      component: resolve => require(["./views/bookDetail.vue"], resolve)
    },
    {
      path: "/chapter",
      name: "chapter",
      component: resolve => require(["./views/chapter.vue"], resolve)
    },
    {
      path: "/book",
      name: "book",
      component: resolve => require(["./views/book.vue"], resolve)
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
