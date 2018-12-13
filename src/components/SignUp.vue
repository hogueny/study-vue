<template>
  <div id="SignUp">
    <div> Sign Up </div>
    Name : <input v-model="user.name" placeholder="name"> <br/>
    Password : <input v-model="user.password" type="password" placeholder="password"> <br/>
    Age : <input v-model="user.age" placeholder="age"> <br/>
    Email : <input v-model="user.email" placeholder="email"> <br/>
    <button v-on:click="signUp" >SUBMIT</button>
    <button v-on:click="reset" >RESET</button>
    
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
          user: this.user

        }).then((response) => {
            if (response.data.result === 0) {
              alert('Error')
            }
            if (response.data.result === 1) {
              alert('Success')
              this.$router.push('/join_ok') // Login 페이지로 보내줌
            }
          })
          .catch(function (err) {
            alert('err')
          })
      }
    }
  }
</script>
