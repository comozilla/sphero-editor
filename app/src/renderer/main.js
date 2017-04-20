import Vue from "vue";
import VueMaterial from "vue-material";
import Electron from "vue-electron";
import "vue-material/dist/vue-material.css";
import config from "@renderer/config";

Vue.use(Electron);
Vue.use(VueMaterial);
Vue.config.debug = config.vue.isDebug;

import App from "./App";
import Parser from "@renderer/parser";
import KeyManager from "@renderer/key-manager";
import SpheroManager from "@renderer/sphero-manager";
import GamepadController from "@renderer/gamepad-controller";
import { remote } from "electron";

// const sphero = remote.require("sphero");
const sphero = () => { return { roll() {}, connect() {}, disconnect() {}, startCalibration() {}, finishCalibration() {} }};

new Parser();
new KeyManager();
new SpheroManager(sphero, config.sphero.COMPort);
new GamepadController();

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount("#app");
