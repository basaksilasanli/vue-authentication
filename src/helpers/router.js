import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'
import Profile from "../components/Profile";
import Login from "../components/Login";
import Register from "../components/Register";

Vue.use(VueRouter);


const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/profile", component: Profile, name:'profile' },
    { path: "/login", component: Login , name:'login'},
    { path: "/register", component: Register ,name:'register'},
  
  ]
});

router.beforeEach((to, from, next) => {
    // next();
     const publicPages = ['login', 'register'];

     
     const authRequired = !publicPages.includes(to.name);

     const loggedIn = localStorage.getItem('token');
   
    if (authRequired && !loggedIn) {
       return next('/login');
    }
    if (!authRequired && loggedIn) {
      return next('/profile');
    }
   
    if (loggedIn && Object.keys(store.state.users.authUser).length === 0) {
      store
        .dispatch('users/getAuthUser')
        .then(res => {
          
        })
        .catch(e => {
          return next('/login');
        });
    }
      
    return next();
   });


export default router;