<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Login</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="E-mail"
                            v-model="restaurante.email" />
                        <v-text-field label="Senha"
                            v-model="restaurante.senha" type="password" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="login">
                            Logar
                        </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
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
                this.dados.perfis.map(p => p.nome).join(',')
        }
    },
    methods: {
        ...mapActions(['setrestaurante']),
        login() {
            this.$api.query({
                query: gql`
                    query (
                        $email: String!
                        $senha: String!
                    ) {
                        login(
                            dados: {
                                email: $email
                                senha: $senha
                            }
                        ) {
                            id nome email token perfis { nome rotulo }
                        }
                    }
                `,
                variables: {
                    email: this.restaurante.email,
                    senha: this.restaurante.senha,
                }
            }).then(resultado => {
                this.dados = resultado.data.login
                this.restaurante = {}
                this.erros = null
                this.setrestaurante(this.dados)
            }).catch(e => {
                this.erros = e
            })
        }
    }
}
</script>

<style>

</style>
