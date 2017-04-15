import publisher from "@renderer/publisher";
import appModel from "@renderer/app-model";

export default class GamepadController {
  constructor() {
    this.isPressingStep = false;
    this.isPressingStart = false;
    this.loop();
  }
  getButtonPressed(button) {
    if (typeof button === "object") {
      return button.pressed ? "pressed" : "unpressed";
    }
    return button === 1 ? "pressed" : "undefined";
  }
  loop = () => {
    const gamepad = navigator.getGamepads()[2];
    if (gamepad) {
      if (this.getButtonPressed(gamepad.buttons[0]) === "pressed") {
        if (!this.isPressingStep) {
          this.isPressingStep = true;
          publisher.publish("pressedEnter");
        }
      } else {
        this.isPressingStep = false;
      }
      if (this.getButtonPressed(gamepad.buttons[7]) === "pressed") {
        if (!this.isPressingStart) {
          this.isPressingStart = true;
          if (appModel.isPlaying) {
            publisher.publish("stop");
          } else {
            publisher.publish("play");
          }
        }
      } else {
        this.isPressingStart = false;
      }
    }
    requestAnimationFrame(this.loop);
  }
}