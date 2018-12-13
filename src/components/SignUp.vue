<template>
  <div id="SignUp">
    <div> Sign Up </div>
    Name : <input v-model="user.name" placeholder="name"> <br/>
    Password : <input v-model="user.password" type="password" placeholder="password"> <br/>
    Age : <input v-model="user.age" placeholder="age"> <br/>
    Email : <input v-model="user.email" placeholder="email"> <br/>
    <button v-on:click="signUp"> Submit </button>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        user: {
          name: '',
          password: '',
          age: '',
          email: ''

        }
      }
    },
    methods: {
      signUp: function (event) {
        this.$http.post('/users', { //axios 사용 $http
          name: this.user.name,
          password: this.user.password,
          age: this.user.age,
          email: this.user.email
        }).then((response) => {
              this.$router.push({path : '/home'}) // home화면으로 이동

        })
      }
    }
  }
</script>
