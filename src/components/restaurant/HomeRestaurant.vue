<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" v-bind:main="'Administração do Restaurante ' + user.name"
            sub="Cadastros & Cia" style="color: white" />
        <div class="admin-pages-tabs">
            <b-jumbotron class="b-card-products">
                <b-card bg-variant="dark" no-body>
                    <CrudProducts />
                </b-card>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import CrudProducts from './CrudProducts'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'HomeRestaurant',
    components: { PageTitle, CrudProducts },
    computed: {
        ...mapState(['user']),
        ...mapGetters({isRestaurant: 'isRestaurant'}),
    },
    methods: {
        validateRestaurant() {
            if(!this.isRestaurant){
                this.$router.push({ name: 'home' })
            } 
        }
    },
    mounted() {
        this.validateRestaurant()
    }
}
</script>

<style>
    div.b-card-products {
        background-color: #343a40;
        padding: 15px;
    }
</style>