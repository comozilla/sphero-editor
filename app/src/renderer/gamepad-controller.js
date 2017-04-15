export default class GamepadController {
  constructor() {
    window.addEventListener("gamepadconnected", connectedGamepad);
    this.gamepad = null;
    loop();
  }
  connectedGamepad = event => {
    this.gamepad = navigator.getGamepads()[event.gamepad.index];
  }
  disconnectedGamepad = () => {
    this.gamepad = null;
  }
  loop() {
    requestAnimationFrame(loop);
  }
}