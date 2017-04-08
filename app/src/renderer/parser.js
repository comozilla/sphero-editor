import publisher from "@renderer/publisher";

export default class Parser {
  constructor() {
    publisher.subscribe("parse", this.parse);
  }

  parse = motion => {
    const commands = [];
    const functions = {
      roll(speed, degree) {
        commands.push({ name: "roll", speed, degree });
      }
    };
    const motionFunction = Function(...Object.keys(functions), motion);
    motionFunction(...Object.values(functions));
    publisher.publish("run", commands);
  }
}
