<template>
    <div class="page-dashboard">
        <div class="column is-multiline">
            <div class="column is-12">
                <h1 class="title"> Dashboard </h1>
            </div>

            <div class="column is-12">
                <div class="box">
                    <h2 class="subtitle"> Unpaid invoices </h2>
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Client</th>
                                <th>Amount </th>
                                <th>Due date </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="invoice in unPaidInvoices" :key="invoice.id">
                                <td>{{invoice.invoice_number}}</td>
                                <td>{{invoice.client_name}}</td>
                                <td>{{invoice.gross_amount}}</td>
                                <td>{{invoice.get_due_date_formatted}}</td>
                                <td><router-link :to="{name:'InvoiceDetail', params:{id:invoice.id}}"> Detail </router-link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="column is-6">
                <div class="box">
                    <h2 class="subtitle">Newest Clients</h2>
                    <div v-for="client in clients" :key="client.id">
                        <div class="box mb-2">
                            <h3 class="is-size-4 mb-4"> {{client.name}}</h3>
                            <router-link :to="{name:'ClientDetail', params:{id:client.id}}" class="button is-light"> Detail </router-link>
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
    name: 'Dashboard',
    data(){
        return{
            invoices: [],
            clients: []
        }
    },
    mounted(){
        this.getInvoices()
        this.getClients()
    },

    methods:{
        getInvoices(){
            axios
                .get('/api/v1/invoices/')
                .then(response => {
                    this.invoices = response.data
                })
                .catch(err => {
                    console.log(JSON.stringify(err));
                })
        },
        getClients(){
            axios
            .get('/api/v1/client/')
            .then(response => {
                this.clients = response.data
                console.log(this.clients);
            })
        }
    },
    computed :{
        unPaidInvoices(){
            return this.invoices.filter(invoice => invoice.is_paid === false)
        },

    }

}
</script>