<template>
  <v-container fluid style="width:50%">
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Registrar Cliente</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="Nome" v-model="cliente.nome" />
          <v-text-field label="E-mail" v-model="cliente.email" />
          <v-text-field label="Endereco" v-model="cliente.endereco" />
          <v-text-field label="Senha" v-model="cliente.senha" type="password" />
          <v-btn color="primary" class="ml-0 mt-3" @click="registrar">Registrar</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Erros from "../comum/Erros";
import gql from "graphql-tag";

export default {
  components: { Erros },
  data() {
    return {
      cliente: {},
      dados: null,
      erros: null
    };
  },
  computed: {},
  methods: {
    registrar() {
      this.$api
        .mutate({
          mutation: gql`
            mutation(
              $nome: String!
              $email: String!
              $senha: String!
              $endereco: String!
            ) {
              registrarCliente(
                dados: {
                  nome: $nome
                  email: $email
                  senha: $senha
                  endereco: $endereco
                }
              ) {
                id
                nome
                email
                senha
                endereco
              }
            }
          `,
          variables: {
            nome: this.cliente.nome,
            email: this.cliente.email,
            senha: this.cliente.senha,
            endereco: this.cliente.endereco
          }
        })
        .then(resultado => {
          this.dados = resultado.data.registrarCliente;
          this.cliente = {};
          this.erros = null;
        })
        .catch(e => {
          this.erros = e;
          console.log(e)
        });
    }
  }
};
</script>

<style>
</style>
