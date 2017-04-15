<template>    
  <div id="wrapper">
    <div id="editor"></div>
  </div>
</template>

<script>
import publisher from "@renderer/publisher";
import ace from "brace";
import "brace/mode/javascript";
import "brace/theme/xcode";

export default {
  data() {
    return {
      editor: null,
      isSetupEditor: false,
    };
  },
  mounted() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/xcode");
    this.editor.setShowInvisibles(true);
    this.editor.setShowPrintMargin(false);
    const session = this.editor.getSession();
    session.setMode("ace/mode/javascript");
    session.setTabSize(2);
    session.setUseSoftTabs(true);
    this.isSetupEditor = true;
    publisher.subscribe("play", this.submitMotion);
  },
  methods: {
    submitMotion() {
      publisher.publish("parse", this.editor.getValue());
    }
  }
};
</script>

<style scoped>
#wrapper {
  display: block;
  width: 100%;
  flex: 1;
  background-color: #34495e;
}
#editor {
  width: 100%;
  height: 100%;
}
</style>
