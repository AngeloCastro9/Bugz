<template >
  <div class="home">
    <PageTitle icon="fa fa-home" main="Bem vindo!" sub="Bugz" style="color: white" />
    <nav class="mb-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">Home</li>
      </ol>
    </nav>
    <b-container fluid>
      <b-row>
        <div v-for="restaurant in restaurants" v-bind:key="restaurant.id">
          <b-col>
            <b-card
              :img-src="restaurant.urlimage"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem; margin: 5%; left: 6%; max-height: 50rem; min-width: 17rem"
              class="mb-3"
              bg-variant="dark"
              text-variant="white"
              :header="restaurant.name"
            >
              <b-card-text>
                <!-- <b>Descrição:</b> -->
                {{restaurant.description}}
              </b-card-text>
              <br>
              <br>
              <router-link :to="'/restaurantMenu/' + restaurant.id">
                <b-button variant="info">Explorar</b-button>
              </router-link>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { baseApiUrl } from "@/global";
import { mapState, mapGetters } from 'vuex'

export default {
  name: "Home",
  components: { PageTitle },
  computed: {
    ...mapState(['user']),
    ...mapGetters([
        "isClient",
        "isRestaurant"
      ])
  },
  data: function() {
    return {
      restaurants: []
    };
  },
  methods: {
    getRestaurants() {
      const reqType = this.user && this.user.vegan?'veganRestaurants':'restaurants'
      const url = `${baseApiUrl}/${reqType}`;
      axios.get(url).then(res => {
        this.restaurants = res.data.data;
      });
    },
    validateClient() {
      if(!this.isClient) {
        if(this.isRestaurant) {
          this.$router.push({ name: 'homeRestaurant' })
        } else {
          this.$router.push({ name: 'auth' })
        }
      }
    }
  },
  mounted() {
    this.validateClient();
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
  color: rgb(194, 194, 194);
}

.btn-info {
  background-color: #137e8f;
  border-color: #178c9e;
  color: rgb(233, 232, 232);
}

.breadcrumb {
  background: linear-gradient(to right, #176975, #0f97ac);
  padding-top: 5px;
  height: 30px;
}

.breadcrumb-item > a.router-link-active {
  color: #683e00;
}

.breadcrumb-item {
  color:rgb(194, 194, 194) !important;
}
</style>