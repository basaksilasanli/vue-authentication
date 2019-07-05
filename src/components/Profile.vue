<template>
  <div>
    <h1>Profile</h1>
    <div>   
      <p>Name: {{currentUser.name}} </p>
      <p>Surname: {{currentUser.surname}} </p>
      <p>Mobile Phone: {{currentUser.mobilePhone}} </p>
      <p>Email: {{currentUser.email}} </p>
    </div>
    <b-button @click="clickLogout">Logout</b-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Profile',
  data() {
    return {
    }
  },

  computed: {
    ...mapState({
       currentUser: state => state.users.authUser
    })

  },
  
  methods: {
    ...mapActions({
      getAuthUser: 'users/getAuthUser',
      logout: 'users/logout'
    }),
    clickLogout(){
      this.logout().then(() => this.$router.push({name:'login'}))
        .catch(err => console.log(err));

    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
