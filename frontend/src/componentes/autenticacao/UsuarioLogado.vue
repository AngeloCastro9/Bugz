<template>
    <v-card v-if="restaurante" class="ma-3 pa-2">
        <v-layout fill-height align-center>
            <v-flex>
                <span class="ml-3 headline"><strong>ID: </strong></span>
                <span class="headline blue--text text--darken-2">
                    {{ restaurante.id }}</span>

                <span class="ml-3 headline"><strong>Nome: </strong></span>
                <span class="headline blue--text text--darken-2">
                    {{ restaurante.nome }}</span>

                <span class="ml-3 headline"><strong>Email: </strong></span>
                <span class="headline blue--text text--darken-2">
                    {{ restaurante.email }}</span>

                <span class="ml-3 headline"><strong>Perfis: </strong></span>
                <span class="headline red--text text--darken-2">
                    {{ perfis }}</span>
            </v-flex>
            <v-flex>
            </v-flex>
            <v-flex shrink>
                <v-btn color="error"
                    @click="setrestaurante(null)">
                    Sair
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['restaurante']),
        perfis() {
            if(!this.restaurante && !this.restaurante.perfis) return null
            return this.restaurante.perfis.map(p => p.rotulo).join(', ')
        }
    },
    methods: mapActions(['setRestaurante'])
}
</script>

<style>

</style>
