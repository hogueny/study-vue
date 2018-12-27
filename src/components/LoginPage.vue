<template>
  <div id="login-page">
    <b-card>
          <div slot="header">
            로그인
          </div>
          <b-form @submit.prevent="login">
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" placeholder="Email" autocomplete="email" v-model="user.email"></b-form-input>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-input-group>
                <b-input-group-prepend>
                  <b-input-group-text><i class="fa fa-asterisk"></i></b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="password" placeholder="Password" autocomplete="current-password" v-model="user.password"></b-form-input>
              </b-input-group>
            </b-form-group>
            <div class="form-group form-actions">
              <b-button type="submit" size="sm" variant="success">Submit</b-button>
            </div>
          </b-form>
        </b-card>

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
