import axios from 'axios'

axios.defaults.baseURL = 'https://api.dev.hrvenue.com/api/'

if (localStorage.getItem('token')){
    axios.defaults.headers.common['Authorization'] = 'Berear' + localStorage.getItem('token')
}

const state = {
    loginError: null,
    isLoginLoading: false,

    isRegisterLoading: false,
    registerError: null,
    
    token: localStorage.getItem('token') || '',


    authUser: {}
    


};

const mutations = {
    auth_request(state) {
        state.isLoginLoading = true
    },
    auth_success(state,token) {
        state.isLoginLoading = false
        state.token = token
        
    },
    auth_error(state, err) {
        state.isLoginLoading = false
        state.loginError = err
    },
    logout(state) {
        state.authUser = { }
        state.token = null
    },

    register_request(state) {
        state.isRegisterLoading = true
    },
    register_success(state,token) {
        state.isRegisterLoading = false
        state.token = token
    },
    register_error(state, err) {
        state.isRegisterLoading = false
        state.registerError = err
    },

    authUser(state, data) {
        state.authUser = data
    }

};

const actions = {
    login({commit,dispatch },payload) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({
                url: 'candidate/me',
                data: payload,
                method: 'POST'
            })
            .then(resp => {
                const token = 'Bearer '+ resp.data.access_token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success',token)
                dispatch('getAuthUser')
                resolve(resp)
                })
                .catch(err => {
                  commit('auth_error', err)
                  reject(err)
                })
        })
        
    },
    register({commit,dispatch}, data ) {
        return new Promise((resolve, reject) => {
            commit('register_request')
            axios({
                url:'candidate/register',
                data,
                method:'POST'
            }).then(resp => {
                const token = 'Bearer ' + resp.data.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('register_success', token)
                dispatch('getAuthUser')
                resolve(resp)
            
            }).catch(err => {
                commit('register_error', err)
                reject(err)

            })
        })

    },
    getAuthUser({commit}) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'candidate/profile/',
                method: 'GET'
            }).then(resp => {
                let data = {
                    email: resp.data.data.email,
                    name: resp.data.data.profile.name,
                    surname: resp.data.data.profile.surname,
                    mobilePhone: resp.data.data.profile.mobilePhone,
                }
                commit('authUser',data)
                resolve(resp)
            }).catch(err =>{
                reject(err)

            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },

    update({commit,dispatch}, data) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'candidate/profile/',
                method: 'PUT',
                data
            }).then(resp => {
                dispatch('getAuthUser')
                resolve(resp)
            }).catch(err =>{
                reject(err)

            })
        })

    }

    
 
};

export const users = {
    namespaced : true,
    state,
    actions,
    mutations
}