<template>
  <div id="custom-root">
    <p v-show="user.id !== -1">안녕? {{user.name}}야, 난, </p>
    루트야
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "root",
  computed: {
    ...mapGetters(["user"])
  },
  created: function() {
    console.log("root user : ", this.user)
  }
};
</script>

<style scoped>
#custom-root {
  height: 1300px;
  border: 1px solid blue;
}
</style>
