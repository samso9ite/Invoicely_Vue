<template>
    <div class="page-clients">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li ><router-link to="/dashboard/clients"> Clients</router-link></li>
                 <li class="is-active"><router-link :to="{name: 'ClientDetail', params:{id: client_id}}" aria-current="true">Client Detail </router-link></li>
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title"> {{client.name}} </h1>
            </div>
            <div class="column is-12">
                <router-link :to="{name:'EditClient', params: {id:client.id}}" class="button is-light"> Edit Client </router-link>
            </div>
            <div class="column is-12"> 
                <div class="subtitle">Contact Details </div>
                    <p><strong>{{client.name}}</strong></p>
                    <p v-if="client.address1">{{client.address1}}</p>
                    <p v-if="client.address2">{{client.address2}}</p>
                    <p v-if="client.zipcode || client.place">{{client.zipcode}}{{client.place}}</p>
                    <p v-if="client.country">{{client.country}}</p>
                </div>
        
            <div class="column is-12" v-if="unPaidInvoices.length"> 
                <div class="box">
                    <h2 class="subtitle"> Unpaid Invoices </h2>
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount </th>
                                <th>Due date </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in unPaidInvoices" :key="invoice.id">
                                <td>{{invoice.invoice_number}}</td>
                                <td>{{invoice.gross_amount}}</td>
                                <td>{{invoice.get_due_date_formatted}}</td>
                                <td>
                                    <router-link :to="{name:'InvoiceDetail', params: { id: invoice.id}}">Details </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

             <div class="column is-12" v-if="paidInvoices.length"> 
                <div class="box">
                    <h2 class="subtitle"> Paid Invoices </h2>
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount </th>
                                <th>Due date </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="invoice in paidInvoices" :key="invoice.id">
                                <td>{{invoice.invoice_number}}</td>
                                <td>{{invoice.gross_amount}}</td>
                                <td>{{invoice.get_due_date_formatted}}</td>
                                <td>
                                    <router-link :to="{name:'InvoiceDetail', params: { id: invoice.id}}">Details </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
   
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ClientDetail',
    data(){
        return{
            client: {
                invoices: []
            },
        }
    },
    mounted(){
        this.getClientDetail()
    },
    methods: {
        getClientDetail(){
            const clientID = this.$route.params.id
            axios
                .get(`/api/v1/client/${clientID}`)
                .then(response => {this.client=response.data})
                
                .catch(error => {
                    console.log(JSON.stringify(error));
                    
            })
        }
    },
    computed: {
        unPaidInvoices(){
            return this.client.invoices.filter(invoice => invoice.is_paid === false)
        },

        paidInvoices(){
            return this.client.invoices.filter(invoices => invoices.is_paid === true)
        }
    }
}
</script>