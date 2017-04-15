<template>
  <div id="app">
    <md-whiteframe md-tag="md-toolbar" md-elevation="1" class="md-whiteframe-1dp">
      <h1 class="md-title" style="flex: 1;">スフィロを動かそう</h1>
      <md-button class="md-icon-button" @click="submitMotion">
        <md-icon>play_arrow</md-icon>
      </md-button>
    </md-whiteframe>
    <editor></editor>
  </div>
</template>

<script>
import Editor from "@components/Editor";
export default {
  components: {
    Editor
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
