<template>
  <md-snackbar md-position="bottom center" ref="snackbar">
    <span>{{ errorText }}</span>
    <md-button class="md-accent" @click.native="$refs.snackbar.close()">Close</md-button>
  </md-snackbar>
</template>

<script>
import publisher from "@renderer/publisher";

export default {
  data() {
    return {
      errorText: ""
    };
  },
  created() {
    publisher.subscribe("catchParseError", this.showError);
  },
  methods: {
    showError(error) {
      this.errorText = error;
      this.$refs.snackbar.open();
    }
  }
};
</script>
