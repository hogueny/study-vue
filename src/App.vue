<template>
  <router-view></router-view>
</template>

<script>
import * as TYPE from "./config/mutation-types";
export default {
  name: 'app',
  created: async function() {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

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
    } else {
      this.$store.commit(`${TYPE.GET_USER}`, {
        id: -1,
        name: "",
        email: "",
        regDate: "",
        modDate: "",
        age: "",
        role: "",
        uuid: ""
      })
    }
  }
}
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
