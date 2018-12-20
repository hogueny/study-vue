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
export default {
  components: {
    "custom-header": Header,
    "custom-footer": Footer
  },
  name: "App"
};
</script>

<style>
#app {
  width: auto;
  height: 1506px;
  border: 1px solid red;
}
</style>
