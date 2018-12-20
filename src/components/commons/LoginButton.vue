<template>
  <div id="login-button">
    <button class="login-button" @click="goToLoginPage">로그인</button>
  </div>
</template>

<script>
export default {
  name: "login-button",
  created: function() {
    console.log("야호 login button");
  },
  methods: {
      goToLoginPage: function () {
          console.log("go to login page")
          this.$router.push("/login")
      }
  }
};
</script>

<style>
.login-button {
  width: 50px;
  height: 50px;
}
#login-button {
  border: 1px solid black;
  width: 60px;
  height: 60px;
}
</style>
