import publisher from "@renderer/publisher";
import config from "@renderer/config";

export default class SpheroManager {
  orb = null;
  iterator = null;
  isConnecting = false;
  timeoutId = null;
  stepTimeoutId = null;
  constructor(sphero, port) {
    this.orb = sphero(port);
    publisher.subscribe("run:after", this.run);
    publisher.subscribe("stop", this.stop);
    publisher.subscribe("updateCalibrating", this.updateCalibration);
    this.connect();
    window.addEventListener("beforeunload", this.disconnect);
  }
  run = commands => {
    this.orb.color("purple");
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
    clearTimeout(this.timeoutId);
    this.orb.stop();
  }
  generateSequence = function*(commands) {
    let index = 0;
    let currentDegree = 0;
    const useMillisecond = config.Millisecond === true ? 1000 : 0;
    for (let command of commands) {
      index++;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      if (command.name === "roll") {
        currentDegree = command.degree;
        this.orb.roll(0, command.degree);
        setTimeout(() => {
          this.roll(command.speed, command.degree, command.time * useMillisecond);
          this.stepTimeoutId = setTimeout(this.stepCommands, command.time * useMillisecond);
        }, config.sphero.rotateInterval);
      } else if (command.name === "stop") {
        this.orb.roll(0, currentDegree);
        this.stepTimeoutId = setTimeout(this.stepCommands, command.time * useMillisecond);
      }
      yield index;
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
  roll = (speed, degree, time) => {
    this.orb.roll(speed, degree);
    this.timeoutId = setTimeout(this.roll, config.sphero.rollInterval, speed, degree)
  }
}
