import publisher from "@renderer/publisher";
import appModel from "@renderer/app-model";
import config from "@renderer/config";

export default class GamepadController {
  isPressing = [];
  constructor() {
    this.loop();
  }
  isButtonPressed(button) {
    const isPressed = typeof button === "object" ? button.pressed : button === 1;
    const index = this.isPressing.indexOf(button);
    if (isPressed) {
      if (index === -1) {
        this.isPressing.push(button);
        return true;
      }
      return false;
    }
    if (index >= 0) {
      this.isPressing.splice(index, 1);
    }
    return false;
  }
  loop = () => {
    const gamepad = navigator.getGamepads()[config.gamepad.index];
    if (gamepad) {
      if (this.isButtonPressed(gamepad.buttons[config.gamepad.playButton])) {
        if (!appModel.isCalibrating) {
          if (appModel.isPlaying) {
            publisher.publish("stop");
          } else {
            publisher.publish("play");
          }
        }
      }
      if (this.isButtonPressed(gamepad.buttons[config.gamepad.calibrationButton])) {
        publisher.publish("updateCalibrating", !appModel.isCalibrating);
      }
    }
    requestAnimationFrame(this.loop);
  }
}
