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
import SpheroManager from "@renderer/sphero-manager";
import GamepadController from "@renderer/gamepad-controller";
import Backup from "@renderer/backup";
import { remote } from "electron";
import "@renderer/app-model";

const sphero = !config.sphero.isTestMode ? remote.require("sphero") : () => {
  return {
    roll() {},
    connect() {},
    disconnect() {},
    startCalibration() {},
    finishCalibration() {},
    color() {}
  };
};

new Parser();
new SpheroManager(sphero, config.sphero.COMPort);
new GamepadController();
new Backup();

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount("#app");
