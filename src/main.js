import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import router from './helpers/router'
import BootstrapVue from 'bootstrap-vue'
import store from './store/index'

Vue.use(BootstrapVue )
Vue.use(VeeValidate )


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
