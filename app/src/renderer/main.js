import Vue from "vue";
import VueMaterial from "vue-material";
import Electron from "vue-electron";
import "vue-material/dist/vue-material.css";

Vue.use(Electron);
Vue.use(VueMaterial);   
Vue.config.debug = true;

import App from "./App";
import Parser from "@renderer/parser";
import KeyManager from "@renderer/key-manager";
import SpheroManager from "@renderer/sphero-manager";
const sphero = () => { return { roll() { } }; };
new Parser();
new KeyManager();
new SpheroManager(sphero, "COM5");

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount("#app");
