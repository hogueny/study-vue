<template>
  <div id="custom-header">
    <login-button></login-button>
  </div>
</template>

<script>
import LoginButton from "./LoginButton";
export default {
  components: {
    LoginButton
  },
  name: "custom-header",
  created: function() {
    console.log("야호");
  }
};
</script>

<style>
#custom-header {
  border: 1px solid black;
  width: auto;
  height: 100px;
}
</style>
