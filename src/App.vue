<template>
  <div id="app">
    <custom-header></custom-header>
    <router-view></router-view>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import Header from "./components/commons/Header.vue";
import Footer from "./components/commons/Footer.vue";
import * as TYPE from "./config/mutation-types";

export default {
  components: {
    "custom-header": Header,
    "custom-footer": Footer
  },
  name: "App",
  created: async function() {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const asdf = localStorage.getItem("asdf");
    console.log("token : ", accessToken);
    console.log("refreshToken : ", refreshToken);
    if (accessToken) {
      this.$store.dispatch(`${TYPE.SET_TOKEN}`, {
        accessToken: accessToken,
        refreshToken: refreshToken
      });
      const getUser = await this.$store.dispatch(`${TYPE.GET_USER}`);
      if (!getUser) {
        console.error("유저를 가져오다 에러남!!");
        return false;
      }
      this.$router.push({ path: "/" }); // home화면으로 이동
    }
  }
};
</script>

<style>
#app {
  width: auto;
  height: 1506px;
  border: 1px solid red;
}
</style>
