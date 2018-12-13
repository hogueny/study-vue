<template>
  <div>
    <router-link :to="{ name: 'ReadAllUser'}"> 모든 유저 </router-link> <br/>
    <router-link :to="{ name: 'SignUp'}"> 회원 가입 </router-link>
  </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>
