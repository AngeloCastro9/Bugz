<template>
  <div class="cart" style="color: white">
    <h1>Seu carrinho</h1>
    <p v-show="!products.length">
      <i>Seu carrinho está vazio!</i>
    </p>
    <table class="table is-striped" v-show="products.length" style="color: white">
      <thead>
        <tr>
          <td>Nome</td>
          <td>Preço</td>
          <td>Quantidade</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" v-bind:key="product.id">
          <td>{{product.name}}</td>
          <td>R${{product.price}}</td>
          <td>
            <b-button class="increase-decrease-button fa fa-minus-circle" @click="removeFromCart(product)"/>
            {{product.quantity}}
            <b-button class="increase-decrease-button fa fa-plus-circle" v-on:click="addToCart(product)"/>
          </td>
        </tr>
        <tr>
          <td>
            <b>Total:</b>
          </td>
          <td></td>
          <td>
            <b>R${{total}}</b>
          </td>
        </tr>
      </tbody>
    </table>

    <p>
      <b-button
        v-show="products.length"
        class="button is-primary"
        variant="success"
        v-b-modal.modal-2
      >Finalizar pedido</b-button>
    </p>

    <b-button to="/" variant="primary">Voltar</b-button>

    <div>
      <b-modal id="modal-2" ref='modalConfirmation' size="lg" centered hide-footer scrollable title="Estamos quase lá! Só confirma abaixo :)">
        <p class="my-4">Testando dados</p>
        <b-button class="mt-2" variant="outline-success" block v-b-modal.modal-multi-receipt>Confirmar</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hide('modalConfirmation')">Cancelar</b-button>
      </b-modal>

      <b-modal id="modal-multi-receipt" centered title="Tudo pronto! 😁" ok-only>
        <p class="my-2">Tudo pronto</p>
      </b-modal>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    }
  },
  methods: {
    ...mapMutations(["addToCart", "removeFromCart"]),
    hide(modalName) {
      this.$refs[modalName].hide()
    }
  }
};
</script>

<style>
  .increase-decrease-button {
    color: white;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
  }

  .modal-header {
    color: #4AAE9B;
  }

  .modal-body {
    color: black;
  }
</style>