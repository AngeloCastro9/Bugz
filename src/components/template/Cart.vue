<template>
  <div class="cart" style="color: white">

    <div>
      <h1>Seu carrinho</h1>
        <div v-show="!products.length">
          <p>
            <i>Seu carrinho está vazio!</i>
          </p>
          <router-link to="/">
            <b-button variant="info">Shopping</b-button>
          </router-link>
        </div>

        <md-table md-card class="table is-striped" v-show="products.length" style="color: white">
          <md-table-row>
                <md-table-head style="font-size: 17px">Nome</md-table-head>
                <md-table-head style="font-size: 17px">Quantidade</md-table-head>
                <md-table-head style="font-size: 17px">Preço</md-table-head>
          </md-table-row>
          
          <md-table-row v-for="product in products" v-bind:key="product.id">
            <md-table-cell>{{product.name}}</md-table-cell>
            <md-table-cell>
              <md-button class="md-icon md-raised" @click="removeFromCart(product)">
                <md-icon>remove</md-icon>
              </md-button>
              <span class="quantity">{{product.quantity}}</span>
              <md-button class="md-icon md-raised" @click="addToCart(product)">
                <md-icon>add</md-icon>
              </md-button>
            </md-table-cell>
            <md-table-cell>R$ {{product.price.toFixed(2)}}</md-table-cell>
          </md-table-row>

          <md-table-row>
            <md-table-cell>
              <b>Total:</b>
            </md-table-cell>
            <md-table-cell></md-table-cell>
            <md-table-cell>
              <b>R$ {{total}}</b>
            </md-table-cell>
          </md-table-row>
        </md-table>

        <p>
          <b-button
            v-show="products.length"
            class="button is-primary"
            variant="info"
            v-b-modal.modal-confirmation
          >Finalizar pedido</b-button>
        </p>

        <div>
          <b-modal id="modal-confirmation" ref='modalConfirmation' size="lg" centered hide-footer
            header-bg-variant="dark"
            body-bg-variant="dark"
            body-text-variant="light"
            scrollable
            no-stacking
            title="Estamos quase lá! Só confirme abaixo :)">
            <b-table hover :items="products" :fields="fields"></b-table>
            <b>O total da sua compra é R$ {{total}}</b>
            <b-button class="mt-2" variant="outline-success" block v-b-modal.modal-multi-receipt>Confirmar</b-button>
            <b-button class="mt-3" variant="outline-danger" block>Cancelar</b-button>
          </b-modal>

          <b-modal id="modal-multi-receipt" ref="receiptModal" size="lg" centered 
            header-bg-variant="dark"
            body-bg-variant="dark"
            body-text-variant="light"
            footerBgVariant= "dark"
            footerTextVariant= "light"
            title="Tudo pronto! Abaixo está o resumo da sua compra 😁"
            ok-only @ok="handleOk" ok-variant="info">
            <b-table striped hover :items="resumeProductList"></b-table>
          </b-modal>
        </div>
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
        const result = total + product.price * product.quantity;
        return result;
      }, 0);
      return result.toFixed(2);
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
          nome: `${product.name}  ( ${product.quantity} )` ,
          valor: `R$ ${product.price * product.quantity}`
        }
      })
    },
    handleOk() {
        this.cleanCart()
    },
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

  .jumbotron {
    padding-top: 34px;
    padding-bottom: 34px;
    background-color: #383f474d;
  }

  button.md-icon {
    height: 20px;
    width: 20px;
    min-width: 20px;
    color: rgb(235, 235, 235);
  }

  .quantity {
    margin-right: 10px;
    margin-left: 10px;
  }

  .b-table {
    color: rgb(233, 232, 232);
  }

  .b-table th{
    color: rgb(235, 235, 235);
    font-weight: bold;
  }

  .b-table:hover td{
    color: rgb(255, 255, 255);
  }

  .close {
    color: rgb(233, 232, 232);
  }
</style>