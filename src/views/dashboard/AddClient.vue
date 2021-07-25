<template>
    <div class="page-add-client">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li ><router-link to="/dashboard/clients"> Clients</router-link></li>
                <li class="is-active"><router-link to="/dashboard/add_client" aria-current="true"> Clients</router-link></li>
            </ul>
        </nav>
        <div class="is-multiline coluimns">
            <div class="column is-12">
                 <h1 class="title">Add Client </h1>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label> Name </label>
                    <div class="cotrol">
                        <input type="text" name="name" class="input" v-model="client.name">
                    </div>
                </div>

                 <div class="field">
                    <label> Email </label>
                    <div class="cotrol">
                        <input type="email" name="email" class="input" v-model="client.email">
                    </div>
                </div>

                 <div class="field">
                    <label> Address1 </label>
                    <div class="cotrol">
                        <input type="text" name="address1" class="input" v-model="client.address1">
                    </div>
                </div>

                 <div class="field">
                    <label> Address2 </label>
                    <div class="cotrol">
                        <input type="address2" name="address2" class="input" v-model="client.address2">
                    </div>
                </div>

            </div>
           

             <div class="column is-6">
                <div class="field">
                    <label> Zip Code </label>
                    <div class="cotrol">
                        <input type="text" name="zip_code" class="input" v-model="client.zipcode"> 
                    </div>
                </div>

                 <div class="field">
                    <label> Place </label>
                    <div class="cotrol">
                        <input type="email" name="place" class="input" v-model="client.place">
                    </div>
                </div>

                 <div class="field">
                    <label> Country </label>
                    <div class="cotrol">
                        <input type="text" name="country" class="input" v-model="client.country">
                    </div>
                </div>

                <div class="field">
                    <label> Contact Person </label>
                    <div class="cotrol">
                        <input type="text" name="country" class="input" v-model="client.contact_person">
                    </div>
                </div>

                <div class="field">
                    <label> Contact Reference </label>
                    <div class="cotrol">
                        <input type="text" name="country" class="input" v-model="client.contact_reference">
                    </div>
                </div>

                <div class="column is-12">
                    <div class="field">
                        <div class="control">
                            <button class="button is-success" @click="submitForm"> Submit </button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template> 

<script>
import axios from 'axios'
export default {
    name: 'AddClient',
    data(){
        return{
            client: {}
        }
    },
    methods: {
        submitForm(){
            axios
                .post("/api/v1/client/", this.client)
                .then(response => {
                    this.$router.push('/dashboard/clients')
                    })
                .catch(error => {
                    console.log(JSON.stringify(error));
                 console.log(error.response);
            })
        }
    }   
}
</script>