<template>
  <div class="cart">
    <h1>Seu carrinho</h1>
    <p v-show="!products.length">
      <i>Seu carrinho está vazio!</i>
      <br />
      <router-link to="/">Voltar às compras.</router-link>
    </p>
    <table class="table is-striped" v-show="products.length">
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
      <button v-show="products.length" class="button is-primary" @click="checkout">Checkout</button>
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