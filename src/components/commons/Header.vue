<template>
  <div id="custom-header">
    <login-button v-if="user.id === -1"></login-button>
    <logout-button v-else></logout-button>
  </div>
</template>

<script>
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { mapGetters } from "vuex";
export default {
  components: {
    LoginButton,
    LogoutButton
  },
  computed: {
    ...mapGetters(["user"])
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
