import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "lib-flexible";
import "normalize.css";
import VueLazyload from "vue-lazyload";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import http from "./api/http";
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(VueLazyload, {
  observer: true,
  preLoad: 1.3,
  error: require("../public/loading.gif"),
  loading: require("../public/loading.gif"),
  attempt: 3
});
import { Button, Header, Range, Loadmore } from "mint-ui";
new Vue({
  router,
  components: {
    Button,
    Header,
    Range,
    Loadmore
  },
  store,
  render: h => h(App)
}).$mount("#app");
