import publisher from "@renderer/publisher";
//import sphero from "sphero";
const sphero = () => { return { roll() { debugger; } }; };

export default class SpheroManager {
  constructor(port) {
    this.orb = sphero(port);
    this.iterator = null;
    publisher.subscribe("run", this.run.bind(this));
    publisher.subscribe("pressedEnter", this.stepCommands.bind(this));
  }
  run(commands) {
    this.iterator = this.generateSequence(commands);
    console.log(this.iterator);
  }
  stepCommands() {
    if (this.iterator) {
      this.iterator.next();
    }
  }
  generateSequence = function*(commands) {
    let index = 0;
    console.log("B");
    for (let command of commands) {
      index++;
      if (command.name === "roll") {
        console.log("AAA");
        this.orb.roll(command.speed, command.degree);
        yield;
      }
    }
  }
}
