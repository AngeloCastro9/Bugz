<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" style="color: white" />
    <b-container>
      <b-row>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
            <b-card
              :img-src="restaurant.urlimage"
              img-alt="Image"
              img-top
              img-height="210px"
              tag="article"
              style="max-width: 20rem; margin: 5%; left: 25%; max-height: 50rem"
              class="mb-3"
            >
              <b-card-text>{{restaurant.name}}</b-card-text>
              <br />
              <b-card-text>Descrição: {{restaurant.description}}</b-card-text>
              <br />
              <b-button :href="'/restaurantMenu/' + restaurant.id" variant="primary">Explorar</b-button>
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
