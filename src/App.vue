<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"> <strong> Invoicely </strong> </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">
            <router-link class="button is-success" to="/dashboard/add_invoice"> Add Invoice </router-link>
            <router-link class="navbar-item" to="/dashboard"> Dashboard</router-link>
            <router-link class="navbar-item" to="/dashboard/clients">Clients </router-link>
            <router-link class="navbar-item" to="/dashboard/invoices"> Invoices </router-link>
          
          </template>
          <template v-else>
            <div class="navbar-item">
              <div class="buttons">
                <router-link class="button is-light" to="/login">  Log in</router-link>
                <router-link class="button is-success" to="/sign-up">  Sign Up</router-link>
              </div>
            </div>
               
          </template>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view/>
    </section>
    <footer class="footer">
      <p class="has-text-centered"> Copyright Samso9ite Invoicely 2021</p>
    </footer>
  </div>
</template>

<style lang="scss">
  @import '../node_modules/bulma';
</style>

<script>
import axios from 'axios'
export default{
  name: 'App',
  beforeCreate(){
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token){
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } 
    else{
      axios.defaults.headers.common['Authorization'] = ''
    }
  }

} 
</script>