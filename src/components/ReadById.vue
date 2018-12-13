<template>
  <div>
    <h1>해당 유저</h1>
      {{user}}
  </div>
</template>

<script>
  export default {
    created: function () {
      let id = this.$route.params.id
      this.$http.get(`/users/${id}`)
        .then((response) => {
          this.user = response.data
        })
    },
    data: function () {
      return {
        user : {}
      }
    }
  }
</script>
