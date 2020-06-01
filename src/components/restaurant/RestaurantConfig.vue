<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" v-bind:main="'Alteração de dados: ' + user.name"
            sub="Cadastros & Cia" style="color: white" />
        <div class="admin-pages-tabs">
            <b-jumbotron class="b-card-products">
                <b-card bg-variant="dark" no-body>
                    <div class="product-admin">
                        <b-form id="crud-form">
                            <input id="product-id" type="hidden" v-model="restaurant.id" />
                            <b-row>
                                <b-col md="3" sm="12">
                                    <b-form-group class="item-form" label="Nome:" label-for="product-name" >
                                        <b-form-input id="product-name" type="text"
                                            v-model="restaurant.name" required
                                            placeholder="Nome do restaurante..." />
                                    </b-form-group>
                                </b-col>

                                <b-col md="4" sm="12">
                                    <b-form-group class="item-form" label="Descrição" label-for="product-description" >
                                        <b-form-input id="product-description" type="text"
                                            v-model="restaurant.description" required
                                            placeholder="Informe a descrição..." />
                                    </b-form-group>
                                </b-col>

                                <b-col md="2" sm="12">
                                    <b-form-group class="item-form" label="Rua" label-for="product-description" >
                                        <b-form-input id="product-description" type="text"
                                            v-model="restaurant.street" required
                                            placeholder="Informe a rua..." />
                                    </b-form-group>
                                </b-col>

                                <b-col md="1" sm="12">
                                    <b-form-group class="item-form" label="Número" label-for="product-description" >
                                        <b-form-input id="product-description" type="text"
                                            v-model="restaurant.number" required
                                            placeholder="Número..." />
                                    </b-form-group>
                                </b-col>

                                <b-col md="2" sm="12">
                                    <b-form-group class="item-form" label="Bairro" label-for="product-description" >
                                        <b-form-input id="product-description" type="text"
                                            v-model="restaurant.neighborhood" required
                                            placeholder="Informe o bairro..." />
                                    </b-form-group>
                                </b-col>

                                <b-col md="2" sm="12">
                                    <b-form-group class="item-form" label="CNPJ:" label-for="product-price" >
                                        <b-form-input id="product-price" type="text"
                                            v-model="restaurant.cnpj" required
                                            placeholder="Informe o CNPJ..." />
                                    </b-form-group>
                                </b-col>
                                
                                <b-col md="3" sm="12">
                                    <b-form-group class="item-form" label="Email:" label-for="product-price" >
                                        <b-form-input id="product-price" type="text"
                                            v-model="restaurant.email" required
                                            placeholder="Informe o email..." />
                                    </b-form-group>
                                </b-col>
                                
                                <b-col md="2" sm="12">
                                    <b-form-group class="item-form" label="Senha:" label-for="product-price" >
                                        <b-form-input id="product-price" type="text"
                                            v-model="restaurant.password" required
                                            placeholder="Informe a senha..." />
                                    </b-form-group>
                                </b-col>
                                
                                <b-col md="2" sm="12">
                                    <b-form-group class="item-form" label="Senha:" label-for="product-price" >
                                        <b-form-input id="product-price" type="text"
                                            v-model="restaurant.confirmPassword" required
                                            placeholder="Confirme a senha..." />
                                    </b-form-group>
                                </b-col>

                                <b-col id="vegan-col" md="1" sm="12">
                                    <b-form-group class="item-form" label-for="product-vegan" >
                                        <b-form-checkbox
                                            id="vegan"
                                            class="vegan"
                                            v-model="restaurant.vegan"
                                            name="vegan">
                                            <span label-for="vegan">Vegano</span>
                                        </b-form-checkbox>
                                    </b-form-group>
                                </b-col>
                            
                                <b-col md="1" sm="12">
                                    <b-form-group class="item-form">
                                        <form class="image-upload" enctype="multipart/form-data">
                                            <label for="image-input-product">
                                                <i class="upload-picture fa fa-image"></i>
                                            </label>
                                            <input
                                                id="image-input-product"
                                                type="file"
                                                @change="onFileSubmited"
                                                ref="imageFileRestaurant"
                                                name="urlimage"/>
                                            <label id="image-label" for="image-input-product">
                                                Carregar imagem...
                                                <br><small>(jpg, png ou gif)</small>
                                            </label>
                                        </form>
                                    </b-form-group>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col xs="12">
                                    <b-button variant="info"
                                        @click="update">Salvar</b-button>
                                    <!-- <b-button variant="danger" v-if="mode === 'remove'"
                                        @click="remove">Excluir</b-button> -->
                                    <!-- <b-button class="ml-2" @click="reset">Voltar</b-button> -->
                                </b-col>
                            </b-row>
                        </b-form>
                    </div>
                </b-card>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'RestaurantConfig',
    components: { PageTitle },
    data: function() {
        return {
            restaurant: {},
            file: "",
            message: "",
            error: false
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters({isRestaurant: 'isRestaurant'}),
    },
    methods: {
        update() {
            delete this.restaurant.token
            delete this.restaurant.exp
            delete this.restaurant.iat
            axios.post(`${baseApiUrl}/updateRestaurant`, { ...this.restaurant })
                    .then(() => {
                        this.$toasted.global.defaultSuccess();
                        this.restaurant = {};
                        this.showSignup = false;
                        this.user = this.restaurant;
                })
                .catch(showError);
        },
        validateRestaurant() {
            if(!this.isRestaurant){
                this.$router.push({ name: 'home' })
            } 
        },
        onFileSubmited() {
            const file = this.$refs.imageFileRestaurant.files[0]
            if(!file) return
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
            const MAX_SIZE = 10000000
            const tooLarge = file.size > MAX_SIZE
            if(!allowedTypes.includes(file.type) || tooLarge) {
                this.error = true
                this.message = tooLarge ? `Imagem excedeu limite de ${MAX_SIZE/1000000}MB` : "Somente imagens são permitidas"
                return
            }
            this.file = file
            const formData = new FormData();
            formData.append('bugzUploadedFile', this.file)
            axios.post(`${baseApiUrl}/uploadFile`, formData)
                .then(res => {
                    this.restaurant.urlimage = res.data.file
                    this.message = "Imagem salva com sucesso!"
                    this.error = false
                })
                .catch(err => {
                    this.message = err.response.data.error
                    this.error = true
                })
        }
    },
    mounted() {
        this.restaurant = { ...this.user }
        this.validateRestaurant()
    }
}
</script>