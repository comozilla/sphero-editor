<template>
  <div id="editor">
    <textarea v-model="motion" placeholder="コードを入力してください"></textarea>
    <button @click="submitMotion">送信</button>
  </div>
</template>

<script>
import publisher from "@renderer/publisher";

export default {
  data() {
    return {
      motion: ""
    };
  },
  methods: {
    submitMotion() {
      publisher.publish("parse", this.motion);
    }
  }
};
</script>

<style scoped>
#editor {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #34495e;
}
</style>
