<template>
  <v-container fluid style="width: 50%">
    <v-layout>
      <v-flex>
        <template>
          <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item v-for="(slide, i) in slides" :key="i">
              <v-sheet :color="colors[i]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3">{{ slide }} Slide</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </template>
      </v-flex>
    </v-layout>
    <br>
    <v-layout fluid class="ma-3">
      <v-card width="300">
        <v-img
          class="white--text align-end"
          height="300px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>

        <v-card-subtitle class="pb-0">TOP LANCHES</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Bons preços!</div>
          <div>Temos promoção</div>
        </v-card-text>
      </v-card>


      <v-card width="300" padding-right="100">
        <v-img
          class="white--text align-end"
          height="300px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>

        <v-card-subtitle class="pb-0">TOP LANCHES</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Bons preços!</div>
          <div>Temos promoção</div>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>



<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  }
};
</script>