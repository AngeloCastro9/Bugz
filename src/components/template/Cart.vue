<template>
  <div class="cart" style="color: white">
    <b-button to="/" variant="primary">Voltar</b-button>
    <h1>Seu carrinho</h1>
    <p v-show="!products.length">
      <i>Seu carrinho está vazio!</i>
      <br />
      <router-link to="/">Voltar às compras.</router-link>
    </p>
    <table class="table is-striped" v-show="products.length" style="color: white">4
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
          <td>{{product.quantity}}</td>
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
      <b-button v-show="products.length" class="button is-primary" variant="primary" @click="checkout">Checkout</b-button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    checkout() {
      alert("Pague-nos R$" + this.total);
    }
  }
};
</script>