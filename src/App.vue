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
      console.log("app > getUser : ", getUser);
      if (getUser !== 200) {
        console.error("유저를 가져오다 에러남!!");
        if (getUser === 401) {
          console.error("토큰 이상");
          const refresh = await this.$store.dispatch(`${TYPE.REFRESH_TOKEN}`);
          if (refresh === 200) {
            await this.$store.dispatch(`${TYPE.GET_USER}`);
            return true;
          }
          if (refresh === 500 || refersh === 404 || refresh === 4404) {
            return false;
          }
        }
        return false;
      }
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
