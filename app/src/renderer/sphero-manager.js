import publisher from "@renderer/publisher";
import config from "@renderer/config";

export default class SpheroManager {
  orb = null;
  iterator = null;
  isConnecting = false;
  timeoutId = null;
  constructor(sphero, port) {
    this.orb = sphero(port);
    publisher.subscribe("run", this.run);
    publisher.subscribe("pressedEnter", this.stepCommands);
    publisher.subscribe("stop", this.stop);
    publisher.subscribe("updateCalibrating", this.updateCalibration);
    this.connect();
    window.addEventListener("beforeunload", this.disconnect);
  }
  run = commands => {
    this.iterator = this.generateSequence(commands);
    this.stepCommands();
  }
  stepCommands = () => {
    if (this.iterator) {
      const it = this.iterator.next();
      if (it.done) {
        publisher.publish("stop");
      }
    }
  }
  stop = () => {
    this.iterator = null;
  }
  generateSequence = function*(commands) {
    let index = 0;
    for (let command of commands) {
      index++;
      if (command.name === "roll") {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
        this.roll(command.speed, command.degree);
        yield index;
      }
    }
  }
  connect() {
    this.orb.connect(() => {
      this.orb.color("purple");
      this.isConnecting = true;
    });
  }
  disconnect = () => {
    if (this.isConnecting) {
      this.orb.disconnect();
    }
  }
  updateCalibration = isCalibrating => {
    if (isCalibrating) {
      this.orb.startCalibration();
    } else {
      this.orb.finishCalibration();
    }
  }
  roll = (speed, degree) => {
    this.orb.roll(speed, degree);
    this.timeoutId = setTimeout(this.roll, config.sphero.rollInterval, speed, degree);
  }
}
