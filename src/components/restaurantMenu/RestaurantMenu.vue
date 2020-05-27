<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" style="color : white" />
    <b-container>
      <b-button to="/" variant="primary" style="left : 50px">Voltar</b-button>
      <b-row>
        <div v-for="product in products" v-bind:key="product.id">
          <b-card
            :img-src="product.urlimage"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem; margin: 5%; left: 25%"
            class="mb-3"
          >
            <b-card-text>{{product.name}}</b-card-text>
            <br />
            <b-card-text>Descrição: {{product.description}}</b-card-text>
            <br />
            <b-card-text>Preço: {{product.price}}</b-card-text>
            <br />
            <b-button @click="addToCart(product)" variant="primary">Adicionar ao carrinho</b-button>
          </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { mapMutations } from "vuex";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle },
  data: function() {
    return {
      products: []
    };
  },
  methods: {
    ...mapMutations(["addToCart"]),
    getProductsByRestaurant() {
      const url = `${baseApiUrl}/getProductsByRestaurant/${this.$route.params.id}`;
      axios.get(url).then(res => {
        this.products = res.data.data;
      });
    }
  },
  mounted() {
    this.getProductsByRestaurant();
  }
};
</script>
