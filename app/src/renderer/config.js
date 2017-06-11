export default {
  vue: {
    isDebug: true
  },
  sphero: {
    COMPort: "COM5",
    defaultColor: "purple",
    isTestMode: false,
    rollInterval: 1000,
    rotateInterval: 750,
    // コマンドの時間を、秒にするかどうか
    isSecondUnit: false
  },
  gamepad: {
    index: 0,
    playButton: 7,
    calibrationButton: 6
  }
};
