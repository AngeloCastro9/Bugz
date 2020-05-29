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
          <td>R$ {{product.price.toFixed(2)}}</td>
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
            <b>R$ {{total}}</b>
          </td>
        </tr>
      </tbody>
    </table>

    <p>
      <b-button
        v-show="products.length"
        class="button is-primary"
        variant="success"
        v-b-modal.modal-mult-confirmation
      >Finalizar pedido</b-button>
    </p>

    <div>
      <b-modal id="modal-mult-confirmation" size="lg" centered hide-footer
        no-stacking
        scrollable
        title="Estamos quase lá! Só confirme abaixo :)">
        <b-table hover :items="products" :fields="fields"></b-table>
        <b>O total da sua compra é R$ {{total}}</b>
        <b-button class="mt-2" variant="outline-success" block v-b-modal.modal-multi-receipt>Confirmar</b-button>
        <b-button class="mt-3" variant="outline-danger" block>Cancelar</b-button>
      </b-modal>

      <b-modal id="modal-multi-receipt" ref="receiptModal" size="lg" centered 
        title="Tudo pronto! Abaixo está o resumo da sua compra 😁"
        ok-only
        @ok="cleanCart"> 
        <b>Logo você receberá em casa os seguintes produtos:</b>
        <b-table striped hover :items="resumeProductList"></b-table>
      </b-modal>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      fields: [
        { key: 'id', label: 'Cód.' },
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
        { key: 'quantity', label: 'Quantidade' },
        { key: 'price', label: 'Preço' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      const result = this.products.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
      return result.toFixed(2) 
    }
  },
  methods: {
    ...mapMutations(["addToCart", "removeFromCart", "cleanCart"]),
    hide(modalName) {
      this.$refs[modalName].hide()
    },
    resumeProductList() {
      return this.products.map( product => {
        return {
          nome: product.name,
          valor: `R$ ${product.price}`
        }
      })
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