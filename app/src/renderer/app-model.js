import publisher from "@renderer/publisher";

export class AppModel {
  constructor() {
    this.isPlaying = false;
    this.isCalibrating = false;
    this.currentMotion = "";
    publisher.subscribe("run", this.setToPlaying);
    publisher.subscribe("stop", this.setToStopping);
    publisher.subscribe("updateCalibrating", this.updateCalibrating);
    publisher.subscribe("parse", this.setCurrentMotion);
  }
  setToPlaying = () => {
    this.isPlaying = true;
  }
  setToStopping = () => {
    this.isPlaying = false;
  }
  updateCalibrating = isCalibrating => {
    this.isCalibrating = isCalibrating;
  }
  setCurrentMotion = motion => {
    this.currentMotion = motion;
  }
}

export default new AppModel();
