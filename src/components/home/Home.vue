<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" style="color: white" />
    <b-container fluid>
      <b-row>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <b-card
              :img-src="restaurant.urlimage"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem; margin: 5%; left: 25%; max-height: 50rem; min-width: 17rem"
              class="mb-3"
              bg-variant="dark"
              text-variant="white"
              :header="restaurant.name"
            >
              <b-card-text><b>Descrição:</b> {{restaurant.description}}</b-card-text>
              <router-link :to="'/restaurantMenu/' + restaurant.id">
                <b-button variant="info">Explorar</b-button>
              </router-link>
            </b-card>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: { PageTitle },
  data: function() {
    return {
      restaurants: []
    };
  },
  methods: {
    getRestaurants() {
      const url = `${baseApiUrl}/restaurants`;
      axios.get(url).then(res => {
        this.restaurants = res.data.data;
      });
    }
  },
  mounted() {
    this.getRestaurants();
  }
};
</script>

<style>
  img.card-img-top {
    width: 100%;
    height: 15vw;
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