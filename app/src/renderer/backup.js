import publisher from "@renderer/publisher";
import appModel from "@renderer/app-model";

export default class Backup {
  constructor() {
    publisher.subscribe("parse", this.set);
    publisher.subscribe("loadedEditor", this.get);
  }
  contains = () => {
    return localStorage.getItem("backup") !== null;
  }
  get = () => {
    if (this.contains()) {
      publisher.publish("restore", localStorage.getItem("backup"));
    }
  }
  set = () => {
    localStorage.setItem("backup", appModel.currentMotion);
  }
}
