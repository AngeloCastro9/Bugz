<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro Restaurante' : 'Login Restaurante' }}</div>

      <input v-if="showSignup" v-model="restaurant.name" type="text" placeholder="Nome"/>
      <input v-if="showSignup" v-model="restaurant.description" type="text" placeholder="Descrição"/>
      <input v-if="showSignup" v-model="restaurant.street" type="text" placeholder="Rua" />
      <input v-if="showSignup" v-model="restaurant.number" type="text" placeholder="Número" />
      <input v-if="showSignup" v-model="restaurant.neighborhood" type="text" placeholder="Bairro" />
      <input v-if="showSignup" v-model="restaurant.cnpj" type="text" placeholder="cnpj"/>
      <input v-model="restaurant.email" name="email" type="text" placeholder="E-mail" />
      <input v-model="restaurant.password" name="password" type="password" placeholder="Senha" />
      <input v-if="showSignup" v-model="restaurant.confirmPassword" type="password" placeholder="Confirme a Senha"/>

      <div v-if="showSignup">
        <b-form-checkbox 
          id="vegan"
          v-model="restaurant.vegan"
          name="vegan"
          value="true"
          unchecked-value="false"
        >Você é vegano?</b-form-checkbox>
      </div>

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signinRestaurant">Entrar</button>
      <b-button v-if="!showSignup" :href="'/authRestaurant'" variant="primary">Área do cliente</b-button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, restaurantKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      restaurant: {},
      vegan: false
    };
  },
  methods: {
    signinRestaurant() {
      axios
        .post(`${baseApiUrl}/signinRestaurant`, this.restaurant)
        .then(res => {
          this.$store.commit("setRestaurant", res.data);
          localStorage.setItem(restaurantKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signupRestaurant`, this.restaurant)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.restaurant = {};
          this.showSignup = false;
        })
        .catch(showError)
    }
  }
};
</script>

<style>
.auth-content {
  background-color: rgb(85, 84, 84);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: gray;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: flex;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
