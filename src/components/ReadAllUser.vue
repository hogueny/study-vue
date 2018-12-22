<template>
  <div class="users">
    <h1>All User Name</h1>
    <div v-for="user in users" class="user" :key="user.id">
      <div :id="index">
        <strong></strong>
        {{user.name}}
        <i></i>
        <router-link :to="{ name: 'ReadById', params: { id: user.id }}">=> Detail</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$http.get("/users").then(response => {
      this.users = response.data;
    });
  },
  data() {
    return {
      users: []
    };
  }
};
</script>
