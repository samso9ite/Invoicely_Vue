<template>
    <div class="page-invoice">
         <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li><router-link to="/dashboard/invoices"> Invoices</router-link></li>
                <li class="is-active"><router-link :to="{name:'InvoiceDetail', params: {id: invoice_id}}" aria-current="true"> {{invoice.client_name}}</router-link></li>
            </ul>
        </nav>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Invoice - {{invoice.invoice_number}}</h1>
                <hr>
                <div class="button">
                    <button @click="getPdf()" class="button is-dark"> Download Pdf </button>
                    
                    <template v-if="!invoice.is_credited && invoice.is_credit_for">
                        <button @click="setasPaid()" class="is-success button" v-if="!invoice.is_paid"> Set as Paid </button>
                        <button @click="createCreditNote()" class="button is-danger" v-if="!invoice.is_paid"> Create Credit Note </button>
                    </template> 
                    <button @click="send_reminder()" class="button is-info" v-if="!invoice.is_paid"> Send Reminder </button>
                </div>
            </div>
            <div class="column is-12">
                <div class="box">
                    <h3 class="is-size-4 mb-4" >  Client </h3>
                        <p><strong>{{invoice.client_address1}}</strong></p>
                        <p>{{invoice.client_email}}</p>
                        <p v-if="invoice.client_address_number1">{{invoice.client_address_number1}}</p>
                        <p v-if="invoice.client_address_number2">{{invoice.client_address_number2}}</p>
                        <p v-if="invoice.client_zipcode || invoice.client_place">{{invoice.client_zipcode}}{{invoice.client_place}}</p>
                        <p v-if="invoice.client_country">{{invoice.client_country}}</p>
                </div>
              
            </div>
            <div class="column is-12 ">
                <div class="box">
                    <h3 class="is-size-4 mb-4">Items</h3>
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Vat Rate</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="item" v-for="item in invoice.items" :key="item.id">
                                <td>{{item.title}}</td>
                                <td>{{item.quantity}}</td>
                                <td>{{item.vat_rate}} %</td>
                                <td>{{getInvoiceTotal(item)}} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="column is-12">
                <div class="box">
                    <h3 class="is-size-4 mb-5"> Summary </h3>
                    <div class="columns">
                        <div class="column is-6">
                            <p><strong> Net Amount </strong>: {{invoice.net_amount}}</p>
                            <p><strong>Vat Amount</strong>: {{invoice.vat_amount}}</p>
                            <p><strong>Gross Amount </strong>: {{invoice.gross_amount}}</p>
                            <p><strong> Bank Account </strong>:{{invoice.bank_account}}</p>
                        </div>
                        <div class="column is-6">
                            <p><strong> Our Reference </strong>: {{invoice.sender_reference}}</p>
                            <p><strong> client Reference </strong>: {{invoice.contact_reference}}</p>
                            <p><strong> Due Date </strong>: {{invoice.get_due_date_formatted}}</p>
                            <p><strong> Status </strong>: {{getStatusLabel()}}</p>
                            <p><strong> Invoice Type </strong>: {{getInvoiceType()}}</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
const fileDownload = require('js-file-download')
export default {
    name:'InvoiceDetail',
    data(){
        return{
            invoice: {},
            items: []
        }
    },
    mounted(){
        this.getInvoiceDetail()
    },
    methods: {
        getInvoiceDetail(){
            const invoice_id = this.$route.params.id
            console.log(invoice_id);
            axios
                .get(`/api/v1/invoices/${invoice_id}`)
                .then(response => {
                    this.invoice = response.data
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
        getPdf(){
            const invoice_id = this.$route.params.id
            axios
                .get(`api/v1/invoices/${invoice_id}/generate_pdf`, {responseType:'blob'})
                .then(res =>{
                    fileDownload(res.data, `invoice_${invoice_id}.pdf`);
                }).catch(err => console.log(err));
        },
        getStatusLabel(){
            if(this.invoice.is_paid == true){
                status = 'Paid'
            }else{
                status =' Not paid'
            }
            return status
           },

        getInvoiceType(){
            if (this.invoice.invoice_type === 'credit_note'){
                return 'Credit Note'
            } else{
                return 'Invoice'
            }
        },
        getInvoiceTotal(item){
            const unit_price = item.unit_price
            const quantity = item.quantity 
            const total = item.net_amount + (item.net_amount * (item.vat_rate/100))
            return parseFloat(total).toFixed(2)
        },
        async setasPaid(){
           this.invoice.is_paid = true
           let items = this.invoice.items
           await axios
                .patch(`api/v1/invoices/${invoice_id}/`, this.invoice)
                .then( response => {
                    toast({
                            message: 'Invoice status set to paid',
                            type: 'is-success',
                            dismissable: true,
                            pauseOnHover: true,
                            duration:2000,
                            position: 'bottom-right'
                            })
                .catch(err => console.log(JSON.stringify(err)))
            }
            )
            return items
        }, 
        async createCreditNote(){
            this.invoice.is_credited = true
            let items = this.invoice.items
            delete this.invoice['items']

            await axios
                .patch(`api/v1/invoices/${this.invoice.id}/`, this.invoice)
                .then( response => {
                    toast({
                        message: 'The changes was saved',
                        type: 'is-success',
                        dismissable: true,
                        pauseOnHover: true,
                        duration:2000,
                        position: 'bottom-right'
                    })
                })
                .catch(err => console.log(JSON.stringify(err)))
                this.invoice.items = items

                let creditNote = this.invoice
                creditNote.is_credit_for = this.invoice.id
                creditNote.is_credited = false
                creditNote.invoice_type = 'credit_note'
                delete creditNote['id']
                await axios
                    .post('api/v1/invoices/', creditNote)
                    .then(response => {
                        toast({
                        message: 'Credit Note was Created',
                        type: 'is-success',
                        dismissable: true,
                        pauseOnHover: true,
                        duration:2000,
                        position: 'bottom-right'
                    })
                    this.$router.push('/dashboard/invoices')
                    .catch(err => console.log(JSON.stringify(err)))
                    })
        },
        send_reminder(){
            axios
                .get(`api/v1/invoices/${this.invoice.id}/send_reminder/`)
                .then(response => {
                        toast({
                        message: 'Remider Sent Successfully',
                        type: 'is-success',
                        dismissable: true,
                        pauseOnHover: true,
                        duration:2000,
                        position: 'bottom-right'
                    })
                .catch(err => {console.log(JSON.stringify(err))})
                })
       
        // getItems(){
        //     const item_id = this.$route.params.id
        //     axios  
        //         .get(`/api/v1/items/?invoice_id=${item_id}`)
        //         .then(response => {
        //             this.items = response.data
        //         })
        //         .catch(error => {
        //             console.log(error.response);
        //         })
        // }
    }
    
}}
</script>