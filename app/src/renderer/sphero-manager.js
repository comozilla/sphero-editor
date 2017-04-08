import publisher from "@renderer/publisher";
//import sphero from "sphero";
const sphero = () => { return { roll() { } }; };

export default class SpheroManager {
  constructor(port) {
    this.orb = sphero(port);
    this.iterator = null;
    publisher.subscribe("run", this.run.bind(this));
    publisher.subscribe("pressedEnter", this.stepCommands.bind(this));
  }
  run(commands) {
    this.iterator = this.generateSequence(commands);
    this.iterator.next();
  }
  stepCommands() {
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
