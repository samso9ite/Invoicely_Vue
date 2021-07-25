<template>
    <div class="page-clients">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li class="is-active"><router-link to="/dashboard/clients" aria-current="true"> Clients</router-link></li>
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title"> Clients </h1>
            </div>
            <div class="column is-12">
                <router-link to="/dashboard/add_client" class="button is-light mt-4"> Add Client </router-link>
            </div>
            <div class="column is-3" v-for="client in clients" :key='client.id'> 
                <div class="box">
                    <h3 class="is-size-4">{{client.name}}</h3>
                   <router-link :to="{name:'ClientDetail', params: {id:client.id}}" class="button is-light mt-4">Details </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Clients',
    data(){
        return {
            clients: []
        }
    },
    mounted(){
        this.getClients()
    },
    methods: {
        getClients(){
            axios
                .get('/api/v1/client/')
                .then(response => {
                     this.clients = response.data
                        })
                .catch(error => {
                console.log(JSON.stringify(error));
                })
        }
    }
} 
</script>   