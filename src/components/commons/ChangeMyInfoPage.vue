<template>
  <div id="change-my-info-page-page">
    <label>이메일</label>
    <input type="email" v-model="user.email">
    <label>이름</label>
    <input type="text" v-model="user.name">
    <label>나이</label>
    <input type="text" v-model="user.age">
    <button @click="modify">수정</button>
  </div>
</template>

<script>
import * as TYPE from "../../config/mutation-types";
import { mapGetters } from "vuex";
export default {
  name: "change-my-info-page",
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    modify: async function() {
      const result = await this.$store.dispatch(`${TYPE.CHANGE_MY_INFO}`, this.user);
      if (result !== 200) {
        if (result === 404) {
          console.error("유저가 없음")
        }
        if (result === 500) {
          console.error("서버 에러")
        }
        if (result === 401) {
          console.error("토큰 만료")
        }
      }
      this.$router.push({ path: "/" }); // home화면으로 이동
    }
  }
};
</script>

<style>
#change-my-info-page-page {
  height: 500;
  width: auto;
  border: 1px solid rgb(128, 0, 0);
}
</style>
