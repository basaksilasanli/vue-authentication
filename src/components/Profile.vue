<template>
  <div>
    <h1>Profile</h1>
    <div v-if="unclickedUpdate">
      <p>Name: {{currentUser.name}}</p>
      <p>Surname: {{currentUser.surname}}</p>
      <p>Mobile Phone: {{currentUser.mobilePhone}}</p>
      <p>Email: {{currentUser.email}}</p>
      <b-button @click="clickLogout" variant="outline-danger" class="mr-3">Logout</b-button>
      <b-button @click="clickUpdate" variant="outline-primary">Update</b-button>
    </div>

    <b-form v-if="clickedUpdate" class="col-md-6 mx-auto">
      <b-form-group label="Email:" label-for="email">
        <b-form-input
          v-validate.persist="'required|email'"
          v-model="updatedEmail"
          type="email"
          name="email"
          id="email"
          class="form-control"
          :placeholder="currentUser.email"
        />
        <b-form-text v-show="submitted && errors.has('email')">{{ errors.first('email') }}</b-form-text>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          v-model="updatedPassword"
          v-validate.persist="{ required: true, min: 6 }"
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="******"
        />
        <b-form-text v-show="submitted && errors.has('password')">{{ errors.first('password') }}</b-form-text>
      </b-form-group>

      <b-form-group label="Name:" label-for="name">
        <b-form-input
          v-model="updatedName"
          v-validate.persist="'required'"
          type="text"
          name="name"
          id="name"
          class="form-control"
          :placeholder="currentUser.name"
        />
        <b-form-text v-show="submitted && errors.has('name')">{{ errors.first('name') }}</b-form-text>
      </b-form-group>

      <b-form-group label="Surname:" label-for="surname">
        <b-form-input
          v-model="updatedSurname"
          v-validate.persist="'required'"
          type="text"
          name="surname"
          id="surname"
          class="form-control"
          :placeholder="currentUser.surname"
        />
        <b-form-text v-show="submitted && errors.has('surname')">{{ errors.first('surname') }}</b-form-text>
      </b-form-group>

      <b-form-group label="Mobile Phone:" label-for="phone">
        <b-form-input
          v-model="updatedMobilePhone"
          v-validate.persist="'required'"
          type="number"
          name="phone"
          id="phone"
          class="form-control"
          :placeholder="currentUser.mobilePhone"
        />
        <b-form-text v-show="submitted && errors.has('phone')">{{ errors.first('phone') }}</b-form-text>
      </b-form-group>
      <b-button v-on:click="clickBack" variant="outline-primary" class="mr-3">Geri Dön</b-button>
      <b-button v-on:click="clickSave" variant="primary">Kaydet</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      unclickedUpdate: true,
      clickedUpdate: false,
      updatedName: "",
      updatedSurname: "",
      updatedMobilePhone: "",
      updatedEmail: "",
      updatedPassword: "",
      submitted: false
    };
  },

  computed: {
    ...mapState({
      currentUser: state => state.users.authUser
    })
  },

  methods: {
    ...mapActions({
      getAuthUser: "users/getAuthUser",
      logout: "users/logout",
      update: "users/update"
    }),
    clickLogout() {
      this.logout()
        .then(() => this.$router.push({ name: "login" }))
        .catch(err => console.log(err));
    },
    clickUpdate() {
      this.unclickedUpdate = false;
      this.clickedUpdate = true;
    },
    clickBack(){
      this.unclickedUpdate = true;
      this.clickedUpdate = false;  
      this.submitted = false;
    },
    clickSave() {
      this.submitted = true;
      this.$validator.validateAll().then(valid => {
        if(valid) {
          let data = {
            email: this.updatedEmail,
            password: this.updatedPassword,
            name: this.updatedName,
            surname: this.updatedSurname,
            mobilePhone: this.updatedMobilePhone
          }
          this.update(data).then((res) => {
            this.clickBack()
            this.updatedEmail = ''
            this.updatedPassword = ''
            this.updatedName = ''
            this.updatedSurname = ''
            this.updatedMobilePhone = ''
          })

        }
      });
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
  color: #42b983;
}
</style>
