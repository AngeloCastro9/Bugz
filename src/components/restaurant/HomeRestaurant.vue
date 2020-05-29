<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" v-bind:main="'Administração do Restaurante ' + user.name"
            sub="Cadastros & Cia" style="color: white" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Produtos">
                        <AddProducts />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import CategoryRestaurant from './CategoryRestaurant'
import AddProducts from './AddProducts'
import { mapState } from 'vuex'
export default {
    name: 'HomeRestaurant',
    components: { PageTitle, CategoryRestaurant, AddProducts },
    computed: mapState(['user']),
}
</script>

<style>
</style>