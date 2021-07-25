import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      username: '',
      id: ''
    }, 
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    initializeStore(state){
      if (localStorage.getItem('token')){
        state.token= localStorage.getItem('token'),
        state.isAuthenticated=true
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('id') 
      }
      else{
        state.user.username = ''
        state.user.id = ''
        state.token = ''
        state.isAuthenticated= false
      }
    },
    setToken(state, token){
      state.token = token,
      state.isAuthenticated = true
    }, 
    removeToken(state){
      state.user.username = ''
      state.user.id = ''
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
