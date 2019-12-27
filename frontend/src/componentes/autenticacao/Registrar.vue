<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Registrar</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="Nome"
                            v-model="restaurante.nome" />
                        <v-text-field label="E-mail"
                            v-model="restaurante.email" />
                        <v-text-field label="Endereço"
                        v-model="restaurante.endereco" />
                        <v-text-field label="Senha"
                            v-model="restaurante.senha" type="password" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="registrar">
                            Registrar   
                        </v-btn>
                </v-layout>
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
            restaurante: {},
            dados: null,
            erros: null
        }
    },
    computed: {
        perfis() {
            return this.dados && this.dados.perfis &&
                this.dados.perfis.map(p => p.rotulo).join(',')
        }
    },
    methods: {
        registrar() {
            this.$api.mutate({
                mutation: gql`
                    mutation (
                        $nome: String!
                        $email: String!
                        $senha: String!
                        $endereco: String!
                    ) {
                        registrarrestaurante(
                            dados: {
                                nome: $nome
                                email: $email
                                senha: $senha
                                endereco: $endereco
                            }
                        ) {
                            id nome email endereco
                        }
                    }
                `,
                variables: {
                    nome: this.restaurante.nome,
                    email: this.restaurante.email,
                    senha: this.restaurante.senha,
                    endereco: this.restaurante.endereco,
                }
            }).then(resultado => {
                this.dados = resultado.data.registrarrestaurante
                this.restaurante = {}
                this.erros = null
            }).catch(e => {
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
