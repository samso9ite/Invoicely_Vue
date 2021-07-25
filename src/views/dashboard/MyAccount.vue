<template>
    <div class="page-my-account">
        <h1 class="title"> My Account </h1>

        <strong>Team: {{team.name}} </strong><br>
        <strong> Username: {{$store.state.user.username}} </strong>
        <div class="buttons">
            <router-link to="/dashboard/edit_team" class="button  is-light" style="margin-right:20px"> Edit Team </router-link>
            <button @click="logout" class="button is-danger">Logout </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
 name: 'MyAccount',
    data(){
        return{
            team: {}
        }
    },
    mounted(){
        this.getOrCreateTeam()
    },
    methods: {
        getOrCreateTeam(){
            axios  
                .get('api/v1/teams/').then(response => {
                    this.team=response.data[0]})
                .catch(() => {
                    console.log(JSON.stringify(error));
               
                })
        },
        logout(){
            axios
                .post('api/v1/token/logout')
                .then(response =>{
                    axios.defaults.headers.common["Authorization"] = ""
                    localStorage.removeItem("token")
                    this.$store.commit("removeToken")
                    this.$router.push('/login')
                })
        }
 }
}
</script>