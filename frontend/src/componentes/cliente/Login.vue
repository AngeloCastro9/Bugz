<template>
  <v-container fluid style="width: 50%">
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Login</h1>
          <v-divider class="mb-3" />
          <div v-if="erros">
            <Erros :erros="erros" />
          </div>
          <v-text-field label="E-mail" v-model="cliente.email" />
          <v-text-field label="Senha" v-model="cliente.senha" type="password" />
          <v-btn color="primary" class="ml-0 mt-3" @click="loginCliente">Logar</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
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
    ...mapActions(["setcliente"]),
    loginCliente() {
      this.$api
        .query({
          query: gql`
            query($email: String!, $senha: String!) {
              login(dados: { email: $email, senha: $senha }) {
                email
                senha           
              }
            }
          `,
          variables: {
            email: this.cliente.email,
            senha: this.cliente.senha
          }
        })
        .then(resultado => {
          this.dados = resultado.data.loginCliente;
          this.cliente = {};
          this.erros = null;
          this.setcliente(this.dados);
        })
        .catch(e => {
          this.erros = e;
        });
    }
  }
};
</script>

<style>
</style>
