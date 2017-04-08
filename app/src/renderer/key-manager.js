import publisher from "@renderer/publisher";

export default class KayManager {
  constructor() {
    window.addEventListener("keydown", event => {
      if (event.key === "Enter" && event.shiftKey) {
        publisher.publish("pressedEnter");
      }
    });
  }
}
