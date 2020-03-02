<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" />
    <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
      <b-card
        title="Card Title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>{{restaurant}}</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { baseApiUrl } from '@/global'


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
