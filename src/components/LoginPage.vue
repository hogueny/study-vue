<template>
  <div id="login-page">
    <label>이메일</label>
    <input type="email" v-model="user.email">
    <label>비밀번호</label>
    <input type="password" v-model="user.password">
    <button @click="login">로그인</button>
    {{token}}
  </div>
</template>

<script>
import * as TYPE from "../config/mutation-types";
import { mapGetters } from "vuex";
export default {
  name: "login-page",
  data: function() {
    return {
      user: {
        name: "",
        password: "",
        age: "",
        email: ""
      }
    };
  },
  created: function() {
    console.log("야호 login-page");
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    login: async function() {
      console.log("user : ", this.user);
      const result = await this.$store.dispatch(`${TYPE.LOGIN}`, this.user);
      if (result !== 200) {
        if (result === 404) {
          console.error("유저가 없습니다.");
        }
        if (result === 400) {
          console.error("패스워드가 잘못되었습니다.");
        }
        if (result === 500) {
          console.error("서버에 문제가 있습니다.");
        }
        return false;
      }
      console.log("access token : ", this.token.accessToken);
      console.log("refresh token : ", this.token.refreshToken);
      const getUser = await this.$store.dispatch(`${TYPE.GET_USER}`); // token 으로 가져오기 때문에 넘길 필요가 없음
      if (getUser !== 200) {
        console.error("유저를 가져오다 에러남!!");
        if (getUser === 401) {
          console.error("토큰 이상");
        }
        if (getUser === 500) {
          console.error("유저를 가져오다 다른 오류!!");
        }
        return false;
      }
      localStorage.setItem("token", this.token.accessToken);
      localStorage.setItem("refreshToken", this.token.refreshToken);
      this.$router.push({ path: "/" }); // home화면으로 이동
    }
  }
};
</script>

<style>
#login-page {
  height: 500;
  width: auto;
  border: 1px solid rgb(128, 0, 0);
}
</style>
