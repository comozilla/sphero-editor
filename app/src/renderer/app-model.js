import publisher from "@renderer/publisher";

export class AppModel {
  constructor() {
    this.isPlaying = false;
    this.isCalibrating = false;
    publisher.subscribe("run", this.setToPlaying);
    publisher.subscribe("stop", this.setToStopping);
    publisher.subscribe("updateCalibrating", this.updateCalibrating);
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
}

export default new AppModel();
