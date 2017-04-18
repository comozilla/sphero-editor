<template>
  <div id="app">
    <md-whiteframe md-tag="md-toolbar" md-elevation="1" class="md-whiteframe-1dp">
      <h1 class="md-title" style="flex: 1;">スフィロを動かそう</h1>
      <md-button class="md-icon-button" @click.native="togglePlay">
        <md-icon>{{ icon }}</md-icon>
      </md-button>
    </md-whiteframe>
    <editor></editor>
  </div>
</template>

<script>
import Editor from "@components/Editor";
import publisher from "@renderer/publisher";
import appModel from "@renderer/app-model";

export default {
  components: {
    Editor
  },
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

<style>
html {
  height: 100%;
}
body {
  margin: 0px;
  height: 100%;
}
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
