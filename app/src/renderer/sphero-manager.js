import publisher from "@renderer/publisher";

export default class SpheroManager {
  orb = null;
  iterator = null;
  constructor(sphero, port) {
    this.orb = sphero(port);
    publisher.subscribe("run", this.run);
    publisher.subscribe("pressedEnter", this.stepCommands);
  }
  run = commands => {
    this.iterator = this.generateSequence(commands);
    this.stepCommands();
  }
  stepCommands = () => {
    if (this.iterator) {
      const it = this.iterator.next();
      if (it.done) {
        this.iterator = null;
      }
    }
  }
  generateSequence = function*(commands) {
    let index = 0;
    for (let command of commands) {
      index++;
      if (command.name === "roll") {
        this.orb.roll(command.speed, command.degree);
        yield index;
      }
    }
  }
}
