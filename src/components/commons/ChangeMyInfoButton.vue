<template>
  <div id="change-my-info-button">
    <button class="change-my-info-button" @click="goToChangeMyInfoPage">내 정보</button>
  </div>
</template>

<script>
export default {
  name: "change-my-info-button",
  methods: {
      goToChangeMyInfoPage: function () {
          this.$router.push("/myinfo")
      }
  }
};
</script>

<style>
.change-my-info-button {
  width: 50px;
  height: 50px;
}
#change-my-info-button {
  border: 1px solid black;
  width: 60px;
  height: 60px;
}
</style>
