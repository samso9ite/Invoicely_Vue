<template>
     <div class="page-add-client">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><router-link to="/dashboard">Dashboard </router-link></li>
                <li class="is-active"><router-link to="/dashboard/add_invoice" aria-current="true"> Add Invoice</router-link></li>
            </ul>
        </nav>
        <div class="is-multiline coluimns">
            <div class="column is-12">
                 <h1 class="title">Add Invoice </h1>
            </div>
            <div class="is-6 column">
                <h2>Client</h2>
            </div>
            <div class="select is-6">
                <select name="client" v-model='invoice.client'>
                    <option value="" selected> - Select Client - </option>
                    <option v-for="client in clients" :key="client.id" :value="client">
                        {{client.name}}
                    </option>
                </select>
            </div>

            <div class="box mt-4 is-6" v-if="invoice.client">
                <p> <strong>{{invoice.client.name}}</strong></p>
                <p> <strong>Email: {{invoice.client.email}}</strong></p>
                <p v-if="invoice.client.address1">{{invoice.client.address1}}</p>
                <p v-if="invoice.client.address2">{{invoice.client.address2}}</p>
                <p v-if="invoice.client.zipcode || invoice.client.place">{{invoice.client.zipcode}} {{invoice.client.place}}</p>
                <p v-if="invoice.client.country">{{invoice.client.country}}</p>
            </div>

            <div class="is-12 column">
                <ItemForm v-for="item in invoice.items" :key="item.item_num" :initialItem="item" v-on:updatePrice="updateTotals"> </ItemForm>
            </div><br>
            <button class="is-light button" @click="addItem"> + </button>

             <div class="column is-12">
                <h3 class="title"> Total </h3>
                <h4>Net Amount = {{invoice.net_amount}}</h4>
                <h4>Vat Amount = {{invoice.vat_amount}} </h4>
                <h4>Gross Amount = {{invoice.gross_amount}} </h4>
            </div>
            <div class="IS-12 column">
                <div class="is-size-5 mb-4">
                    <div class="field">
                        <label> Due days </label>
                        <div class="control">
                            <input type="number" class="input" v-model="invoice.due_days">
                        </div>
                    </div>
                    <div class="field">
                        <label> Sender reference </label>
                        <div class="control">
                            <input type="text" class="input" v-model="invoice.sender_reference">
                        </div>
                    </div>
                </div>
            </div>
            <div class="is-12 column">
                <button class="is-success button" @click="createInvoice">Submit Invoice </button>
            </div>
        </div> 
    </div>
</template>
<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import ItemForm from '../../components/ItemForm.vue'
export default {
    name: 'CreateInvoice',
    components: {
        ItemForm
    },
    data(){
        return{
            invoice:{
                client: {},
                items: [
                    {
                        item_num: 0,
                        title: '',
                        unit_price: '',
                        quantity: 1,
                        vat_rate: 0,
                        net_amount: 0
                    }
                ],
                net_amount : 0,
                vat_amount: 0,
                gross_amount : 0,
                due_days: 14
            },
            clients: [],
        }
    },
    async mounted(){
        await this.getClients()
    },
    methods:{
        getClients(){
            axios
                .get('api/v1/client/')
                .then(response => {
                    this.clients = response.data
                })
                .catch(error => console.log(error.response))
        },
        addItem(){
            this.invoice.items.push({
                item_num: this.invoice.items.length,
                title: '',
                unit_price: '',
                quantity: 1,
                vat_rate: 0,
                net_amount: 0
            })
        },
        updateTotals(changedItem){
            let net_amount = this.invoice.net_amount
            let vat_amount = this.invoice.vat_amount

            let item = this.invoice.items.filter(i => i.item_num === changedItem.item_num)
            item = changedItem

            for (let i=0; i < this.invoice.items.length; i++){
                const vat_rate = this.invoice.items[i].vat_rate
                vat_amount += this.invoice.items[i].net_amount * (vat_rate/100)
                net_amount += this.invoice.items[i].net_amount
            }
            this.invoice.net_amount = net_amount
            this.invoice.vat_amount = vat_amount
            this.invoice.gross_amount = vat_amount + net_amount
            this.invoice.discount_amount = 0
        },
        createInvoice(){
            this.invoice.client_name = this.invoice.client.name
            this.invoice.client_email = this.invoice.client.email
            this.invoice.client_org_number = this.invoice.client.org_number
            this.invoice.client_address1 = this.invoice.client.address1
            this.invoice.client_address2 = this.invoice.client.client_address2
            this.invoice.client_zipcode = this.invoice.client.client_zipcode
            this.invoice.client.contact_person = this.invoice.client.contact_person
            this.invoice.client.contact_reference = this.invoice.client.contact_reference
            this.invoice.client = this.invoice.client.id
            axios
                .post('api/v1/invoices/', this.invoice)
                .then(response => {
                    toast({
                            message: 'Invoice has been created',
                            type: 'is-success',
                            dismissable: true,
                            pauseOnHover: true,
                            duration:2000,
                            position: 'bottom-right'
                        })
                    this.$router.push('/dashboard/invoices')
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    console.log(error.response);
                })
        }
    }
}
</script>

<style lang="scss">
    .select, .select select {
        width:100%
    }
</style>