<template>
  <md-whiteframe md-tag="md-toolbar" md-elevation="1" class="md-whiteframe-1dp">
    <h1 class="md-title">スフィロを動かそう</h1>
    <md-button class="md-icon-button" @click.native="togglePlay">
      <md-icon>{{ icon }}</md-icon>
    </md-button>
  </md-whiteframe>
</template>

<script>
import appModel from "@renderer/app-model";
import publisher from "@renderer/publisher";

export default {
  data() {
    return {
      isPlaying: appModel.isPlaying
    };
  },
  created() {
    publisher.subscribe("play", () => {
      this.isPlaying = true;
    });
    publisher.subscribe("stop", () => {
      this.isPlaying = false;
    });
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        publisher.publish("stop");
      } else {
        publisher.publish("play");
      }
    }
  },
  computed: {
    icon() {
      return this.isPlaying ? "stop" : "play_arrow";
    }
  }
};
</script>

<style scoped>
h1 {
  flex: 1;
}
</style>
