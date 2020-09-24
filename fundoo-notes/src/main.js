import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes.js";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import axios from "axios";

axios.defaults.baseURL = "http://fundoonotes.incubation.bridgelabz.com/api";

Vue.use(VueRouter);
Vue.use(VueMaterial);

const router = new VueRouter({
  mode: "history",
  routes: Routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
