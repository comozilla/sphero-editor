<template>
  <md-whiteframe md-tag="md-toolbar" md-elevation="1" class="md-whiteframe-1dp">
    <h1 class="md-title">スフィロを動かそう</h1>
    <md-button class="md-icon-button" @click.native="togglePlay">
      <md-icon>{{ icon }}</md-icon>
    </md-button>
    <md-button :class="calibrationClasses" @click.native="toggleCalibration">
      <md-icon>nfc</md-icon>
    </md-button>
  </md-whiteframe>
</template>

<script>
import appModel from "@renderer/app-model";
import publisher from "@renderer/publisher";

export default {
  data() {
    return {
      isPlaying: appModel.isPlaying,
      isCalibrating: appModel.isCalibrating
    };
  },
  created() {
    publisher.subscribe("run", () => {
      this.isPlaying = true;
    });
    publisher.subscribe("stop", () => {
      this.isPlaying = false;
    });
    publisher.subscribe("updateCalibrating", isCalibrating => {
      this.isCalibrating = isCalibrating;
    });
  },
  methods: {
    togglePlay() {
      if (!this.isCalibrating) {
        if (this.isPlaying) {
          publisher.publish("stop");
        } else {
          publisher.publish("play");
        }
      }
    },
    toggleCalibration() {
      publisher.publish("updateCalibrating", !this.isCalibrating);
    }
  },
  computed: {
    icon() {
      return this.isPlaying ? "stop" : "play_arrow";
    },
    calibrationClasses() {
      return {
        "md-icon-button": true,
        "md-accent": this.isCalibrating
      };
    }
  }
};
</script>

<style scoped>
h1 {
  flex: 1;
}
</style>
