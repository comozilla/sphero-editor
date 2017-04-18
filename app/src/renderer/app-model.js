import publisher from "@renderer/publisher";

export class AppModel {
  constructor() {
    this.isPlaying = false;
    publisher.subscribe("play", this.setToPlaying);
    publisher.subscribe("stop", this.setToStopping);
  }
  setToPlaying = () => {
    this.isPlaying = true;
  }
  setToStopping = () => {
    this.isPlaying = false;
  }
}

export default new AppModel();
