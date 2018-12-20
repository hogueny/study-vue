<template>
  <div id="login-page">
    <label>이메일</label>
    <input type="email" v-model="user.email">
    <label>비밀번호</label>
    <input type="password" v-model="user.password">
    <button @click="login">로그인</button>
  </div>
</template>

<script>
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
  methods: {
    login: function() {
      console.log("user : ", this.user);
      this.$http
        .post("http://localhost:3000/users/login", {
          email: this.user.email,
          password: this.user.password
        })
        .then(response => {
          console.log("로그인 했어", response.data);
          this.$router.push({ path: "/" }); // home화면으로 이동
        });
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
