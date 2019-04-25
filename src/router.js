import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import home from "./views/home.vue";
import categories from "./views/categories.vue";
import rank from "./views/rank.vue";
import bookDetail from "./views/bookDetail.vue";
import book from "./views/book.vue";
// import bookDetail from './views/bookDetail.vue'
import chapter from "./views/chapter.vue";
import about from "./views/about.vue";
export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/categories",
      name: "categories",
      component: categories
    },
    {
      path: "/rank",
      name: "rank",
      component: rank
    },
    {
      path: "/bookDetail",
      name: "bookDetail",
      component: bookDetail
    },
    {
      path: "/chapter",
      name: "chapter",
      component: chapter
    },
    {
      path: "/book",
      name: "book",
      component: book
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: about
    }
  ]
});
