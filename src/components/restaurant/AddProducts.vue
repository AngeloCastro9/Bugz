<template>
    <div class="product-admin">
        <b-form>
            <input id="product-id" type="hidden" v-model="product.id" />
            <b-row>
                <b-col md="5" sm="12">
                    <b-form-group label="Nome do produto:" label-for="product-name" style="color: white">
                        <b-form-input id="product-name" type="text"
                            v-model="product.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Produto..." />
                    </b-form-group>
                </b-col>
                <b-col md="5" sm="12">
                    <b-form-group label="Descrição" label-for="product-description" style="color: white">
                        <b-form-input id="product-description" type="text"
                            v-model="product.description" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a descrição do produto..." />
                    </b-form-group>
                </b-col>
                <b-col md="1" sm="12">
                    <b-form-group label="Preço:" label-for="product-price" style="color: white">
                        <b-form-input id="product-price" type="text"
                            v-model="product.price" required
                            placeholder="Preço" />
                    </b-form-group>
                </b-col>
                <b-col md="1" sm="12">
                    <b-form-group label="URL da imagem:" label-for="product-url" style="color: white">
                        <b-form-input id="product-url" type="text"
                            v-model="product.urlimage" required
                            placeholder="Url da imagem do produto" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="info" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="products" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadProduct(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadProduct(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
    name: 'AddProducts',
    computed: mapState(['user']),
    data: function() {
        return {
            mode: 'save',
            product: {},
            products: [],
            fields: [
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true},
                { key: 'price', label: 'Preço', sortable: true},
                { key: 'vegan', label: 'Vegano', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadProducts() {
            const id = this.user.id
            const url = `${baseApiUrl}/getProductsByRestaurant/${id}`
            axios.get(url).then(res => {
                this.products = res.data.data
            })
        },
        reset() {
            this.mode = 'save'
            this.product = {}
            this.loadProducts()
        },
        save() {
            const method = this.product.id ? 'put' : 'post'
            const id = this.product.id ? `/${this.product.id}` : ''
            axios[method](`${baseApiUrl}/products${id}`, {...this.product, restaurantId: this.user.id})
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.product.id
            axios.delete(`${baseApiUrl}/products/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadProduct(product, mode = 'save') {
            this.mode = mode
            this.product = { ...product }
        }
    },
    mounted() {
        this.loadProducts()
    }
}
</script>

<style>
    .vegan {
        color: rgb(233, 232, 232);
        vertical-align: sub;
    }
</style>