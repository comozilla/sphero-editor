<template>
  <div id="app">
    <s-header></s-header>
    <editor></editor>
    <error-tracker></error-tracker>
  </div>
</template>

<script>
import Editor from "@components/Editor";
import Header from "@components/Header";
import ErrorTracker from "@components/ErrorTracker";

export default {
  components: {
    Editor,
    SHeader: Header,
    ErrorTracker
  },
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
