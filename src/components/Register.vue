<template>
  <div>
    <div class="container">
          <div class="row">
              <div class="col-sm-6 mx-auto offset-sm-2">
                <h1>Register</h1>
                <div class="login" v-if="isRegisterLoading">
                    <div class="container-loading">
                      <img src="../assets/loading.gif" alt="Loading Icon" class="gif"/>
                    </div>
                </div>
                <b-form>

                  <b-form-group label="Email:" label-for="email" description="We'll never share your email with anyone else.">         
                    <b-form-input v-validate="'required|email'" v-model="user.email" type="email" name="email" id="email" class="form-control"/>
                    <b-form-text v-show="submitted && errors.has('email')" >{{ errors.first('email') }}</b-form-text>
                  </b-form-group>
                  
                  <b-form-group label="Password:" label-for="password">
                    <b-form-input v-model="user.password" v-validate="{ required: true, min: 6 }" type="password" name="password" id="password" class="form-control"/>
                    <b-form-text v-show="submitted && errors.has('password')" >{{ errors.first('password') }}</b-form-text>
                  </b-form-group>
                  
                  <b-form-group label="Name:" label-for="name">
                    <b-form-input v-model="user.name"  v-validate="'required'" type="text" name="name" id="name" class="form-control" />
                    <b-form-text v-show="submitted && errors.has('name')" >{{ errors.first('name') }}</b-form-text>
                  </b-form-group>
                  
                  <b-form-group label="Surname:" label-for="surname">          
                    <b-form-input v-model="user.surname" v-validate="'required'" type="text" name="surname" id="surname" class="form-control"/>
                    <b-form-text v-show="submitted && errors.has('surname')" >{{ errors.first('surname') }}</b-form-text>
                  </b-form-group>
                
                  <b-form-group label="Mobile Phone:" label-for="phone">
                    <b-form-input v-model="user.mobilePhone" v-validate="'required'" type="number" name="phone" id="phone" class="form-control"/>
                    <b-form-text v-show="submitted && errors.has('phone')" >{{ errors.first('phone') }}</b-form-text>
                  </b-form-group>
                      
                  <b-button v-on:click="handleSubmit" variant="primary"> Register</b-button>
                  <b-button  type="reset" variant="danger"> Reset  </b-button>
              
                
                </b-form>
              </div>
          </div>
    </div>              
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
export default {
  name: 'Register',
  data(){
    return {
      user: {
        email:'',
        password:'',
        confirmPassword:'',
        name:'',
        surname:'',
        mobilePhone:''
      },
      submitted: false
      
    }
  },
  computed: {
    ...mapState({
      isRegisterLoading: state => state.users.isRegisterLoading
    })

  },
  methods: {
    ...mapActions({
      register: 'users/register',
      
    }),

    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          let data = {
            email: this.user.email,
            password: this.user.password,
            name: this.user.name,
            surname: this.user.surname,
            mobilePhone: this.user.mobilePhone
          }
          this.register(data)
          .then((res) => {this.$router.push({name:'profile'})})
        }
      });
      

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
