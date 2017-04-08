import Vue from "vue";
import Electron from "vue-electron";

Vue.use(Electron);
Vue.config.debug = true;

import App from "./App";
import Parser from "@renderer/parser";
new Parser();

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount("#app");
