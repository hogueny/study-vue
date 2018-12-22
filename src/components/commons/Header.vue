<template>
  <div id="custom-header">
    <div v-if="user.id === -1">
      <login-button></login-button>
    </div>
    <div v-else>
      <logout-button></logout-button>
      <change-my-info-button></change-my-info-button>
    </div>
  </div>
</template>

<script>
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ChangeMyInfoButton from "./ChangeMyInfoButton";
import { mapGetters } from "vuex";
export default {
  components: {
    LoginButton,
    LogoutButton,
    ChangeMyInfoButton
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
