<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" style="color : white" />
    <b-container>
      <b-row>
        <div v-for="product in products" v-bind:key="product.id">
          <b-card
            :img-src="product.urlimage"            
            :img-alt="product.name"
            img-top
            style="max-width: 20rem; margin: 5%; left: 30%; min-width: 17rem" 
            class="mb-3"
            bg-variant="dark"
            text-variant="white"
            :header="product.name"
          >
            <b-card-text><b>Descrição:</b> {{product.description}}</b-card-text>
            <b-card-text>R$ {{product.price.toFixed(2)}}</b-card-text>
            <b-button @click="addToCart(product)" variant="info">Adicionar ao carrinho</b-button>
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

<style>
  img.card-img-top {
    width: 100%;
    height: 15vw !important;
    object-fit: cover;
  }

  .card-header {
    font-size: 15px;
  }

  .card-body {
    color: rgb(194, 194, 194)
  }

  .btn-info {
    background-color: #137e8f;
    border-color: #178c9e;
    color: rgb(233, 232, 232)
  }
</style>
