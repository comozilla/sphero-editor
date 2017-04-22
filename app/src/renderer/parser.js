import publisher from "@renderer/publisher";

function checkArguments(args, expectedArgs) {
  const errors = [];
  if (args.length !== expectedArgs.length) {
    errors.push(`引数の長さが違います。${args}`);
  } else {
    expectedArgs.forEach((arg, index) => {
      if (typeof args[index] !== arg) {
        errors.push(`${index}番目の引数の型が違います。 ${args[index]} は ${arg} ではありませんでした。`);
      }
    });
  }
  return errors;
}

export default class Parser {
  constructor() {
    publisher.subscribe("parse", this.parse);
  }


  parse = motion => {
    const commands = [];
    let errors = [];
    const functions = {
      roll(speed, degree) {
        errors = errors.concat(checkArguments(arguments, ["number", "number"]));
        commands.push({ name: "roll", speed, degree });
      },
      stop() {
        commands.push({ name: "roll", speed: 0, degree: 0 });
      }
    };
    try {
      const motionFunction = Function(...Object.keys(functions), motion);
      motionFunction(...Object.values(functions));
      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }
      publisher.publish("run", commands);
    } catch (error) {
      publisher.publish("catchParseError", error.message);
    }
  }
}
