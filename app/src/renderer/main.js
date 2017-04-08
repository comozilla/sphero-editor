import Vue from "vue";
import Electron from "vue-electron";

Vue.use(Electron);
Vue.config.debug = true;

import App from "./App";
import Parser from "@renderer/parser";
import KeyManager from "@renderer/key-manager";
import SpheroManager from "@renderer/sphero-manager";
new Parser();
new KeyManager();
new SpheroManager();

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount("#app");
