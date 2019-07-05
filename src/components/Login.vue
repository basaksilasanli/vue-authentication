<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 mx-auto offset-sm-2">
          <h1>Login</h1>
          <div class="login" v-if="isLoginLoading">
            <div class="container-loading">
              <img src="../assets/loading.gif" alt="Loading Icon" class="gif"/>
            </div>
          </div>

          <b-form>
            <b-form-group label="Email address:" label-for="email">
              <b-form-input
                v-validate="'required|email'"
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="form-control"
              />
              <b-form-text v-show="submitted && errors.has('email')">{{ errors.first('email') }}</b-form-text>
            </b-form-group>

            <b-form-group label="Password:" label-for="password">
              <b-form-input
                v-validate="'required'"
                v-model="password"
                type="password"
                name="password"
                id="password"
                class="form-control"
              />
              <b-form-text
                v-show="submitted && errors.has('password')"
              >{{ errors.first('password') }}</b-form-text>
            </b-form-group>

            <b-button variant="primary" @click="login">Login</b-button>
            <b-button variant="primary">
              <router-link to="/register">Register</router-link>
            </b-button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
 
  computed: {
    ...mapState({
      isLoginLoading: state => state.users.isLoginLoading
    })
  },

  methods: {
    ...mapActions({
      requestLogin: "users/login"
    }),

    login() {
      this.submitted = true;
      let email = this.email;
      let password = this.password;
      this.requestLogin({ email, password })
        .then(() => this.$router.push({name:'profile'}))
        .catch(err => console.log(err));
    }
  }
};
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
  color: white;
}
.login {
    padding: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    
}
.container-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gif {
  width: 2rem;
  height: 2rem;
}
      

</style>
