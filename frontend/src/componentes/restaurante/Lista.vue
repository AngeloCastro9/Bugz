<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="obterRestaurantes">
                    Obter Usuários
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="erros" class="mb-4">
                    <Erros :erros="erros" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="restaurantes" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.nome }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.perfis
                                .map(p => p.rotulo)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../comum/Erros'
import gql from 'graphql-tag'

export default {
    components: { Erros },
    data() {
        return {
            erros: null,
            restaurantes: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Endereço', value: 'endereco' },
                { text: 'Perfis', value: 'perfis' },
            ],
        }
    },
    methods: {
        obterrestaurantes() {
            this.$api.query({
                query: gql`
                    query {
                        restaurantes {
                            id nome email perfis { rotulo }
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(resultado => {
                this.restaurantes = resultado.data.restaurantes
                this.erros = null
            }).catch(e => {
                this.restaurantes = []
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
