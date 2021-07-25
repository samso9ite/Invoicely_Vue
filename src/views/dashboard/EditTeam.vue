<template>
  <div class="page-edit-team ">
       <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li class="is-active"><router-link to="/dashboard/edit_team" aria-current="true"> Edit Team</router-link></li>
            </ul>
        </nav>
      <div class="is-multiline">
        <div class="is-12 column">
            <h1 class="title"> Edit Team </h1>
        </div>
        <div class="is-12 column">
            <div class="field">
                <label>Name</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.name">
                </div>
            </div>
        </div>
        <div class="is-12 column">
            <div class="field">
                <label>Organisation Number</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.org_number">
                </div>
            </div>
        </div>
        <div class="is-12 column">
            <div class="field">
                <label>First Invoice Number</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.first_invoice_number">
                </div>
            </div>
        </div>

        <div class="is-12 column">
            <div class="field">
                <label>Bank Account</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.bank_account">
                </div>
            </div>
        </div>

        <div class="is-12 column">
            <div class="field">
                <label>Email</label>
                <div class="control">
                    <input type="email" class="input" v-model="team.email">
                </div>
            </div>
        </div>


        <div class="is-12 column">
            <div class="field">
                <label>Address </label>
                <div class="control">
                    <input type="text" class="input" v-model="team.address">
                </div>
            </div>
        </div>

        <div class="is-12 column">
            <div class="field">
                <label>Place</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.place">
                </div>
            </div>
        </div>

        <div class="is-12 column">
            <div class="field">
                <label>Zipcode</label>
                <div class="control">
                    <input type="text" class="input" v-model="team.zipcode">
                </div>
            </div>
        </div>
        
        <button @click="submitForm" class="button is-success"> Submit Form </button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
export default {
    name: 'EditTeam',
    data(){
        return{
            team: {}
        }
    },
    async mounted(){
        await this.getOrCreateTeam()
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
        submitForm(){
            axios
                .patch(`/api/v1/teams/${this.team.id}/`, this.team)
                .then(respone => {
                    toast({
                        message: 'Team has been created',
                        type: 'is-success',
                        dismissable: true,
                        pauseOnHover: true,
                        duration:2000,
                        position: 'bottom-right'
                    })
                    this.$router.push('/dashboard/my_account')
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }
}
</script>