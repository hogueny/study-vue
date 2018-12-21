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
import * as TYPE from "../../config/mutation-types";
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
      if (!result) {
        console.error("에러가 발생했습니다!!");
        return false;
      }
      console.log("access token : ", this.token.accessToken);
      console.log("refresh token : ", this.token.refresshToken);
      const getUser = await this.$store.dispatch(`${TYPE.GET_USER}`) // token 으로 가져오기 때문에 넘길 필요가 없음 
      if (!getUser) {
        console.error("유저를 가져오다 에러남!!");
        return false;
      }
      localStorage.setItem('token', this.token.accessToken);
      localStorage.setItem('refreshToken', this.token.refresshToken);
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
