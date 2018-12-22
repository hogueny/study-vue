<template>
  <div id="logout-button">
    <button class="logout-button" @click="logout">로그 아웃</button>
  </div>
</template>

<script>
import * as TYPE from "../../config/mutation-types";
export default {
  name: "logout-button",
  methods: {
      logout: function () {
          this.$store.commit(`${TYPE.LOGOUT}`)
          this.$router.push("/")
      }
  }
};
</script>

<style>
.logout-button {
  width: 50px;
  height: 50px;
}
#logout-button {
  border: 1px solid black;
  width: 60px;
  height: 60px;
}
</style>
