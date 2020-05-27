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
          <td>quantidade</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" v-bind:key="product.id">
          <td>{{product.name}}</td>
          <td>R${{product.price}}</td>
          <td>
            <i class="increase-decrease fa fa-minus-circle" @click="removeFromCart(product)"></i>
            {{product.quantity}}
            <i class="increase-decrease fa fa-plus-circle" @click="addToCart(product)"></i>
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
        variant="primary"
        @click="checkout"
      >Finalizar Pedido</b-button>
    </p>
    <b-button to="/" variant="primary">Voltar</b-button>
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
    checkout() {
      alert("Quando o pedido chegar, pague R$" + this.total);
    }
  }
};
</script>

<style>
  .increase-decrease {
    margin-left: 8px;
    margin-right: 8px;
  }
</style>