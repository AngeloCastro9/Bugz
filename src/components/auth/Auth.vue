<template>
  <div class="auth-content">
    <div class="auth-modal" style="background-color: rgb(143, 136, 136)">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />

      <md-card-header>
        <div class="auth-title">{{ showSignup ? 'Cadastro do cliente' : 'Login do cliente' }}</div>
      </md-card-header>

      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome"/>
      <input v-if="showSignup" v-model="user.street" type="text" placeholder="Rua" />
      <input v-if="showSignup" v-model="user.number" type="text" placeholder="Número" 
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
      <input v-if="showSignup" v-model="user.neighborhood" type="text" placeholder="Bairro" />
      <input v-if="showSignup" v-model="user.cpf" type="text" placeholder="CPF"
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>

      <form v-on:keyup.enter="showSignup?signup():signin()">
        <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
        <input  v-model="user.password" name="password" type="password" placeholder="Senha" />
      </form>
      
      <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme a Senha"/>

      <b-form-group id="vegan-group" v-if="showSignup">
        <label id="vegan-label" for="vegan-checkbox">Vegano</label>
        <b-form-checkbox id="vegan-checkbox" v-model="user.vegan" name="vegan" />
      </b-form-group>

      <div class="btn-group">
        <b-button v-if="showSignup" @click="signup" variant="info">Registrar</b-button>
        <b-button v-else @click="signin" variant="info">Entrar</b-button>
        
        <b-button class="btn-toggle-area" v-if="!showSignup" @click="redirectRestaurant" variant="info">Área do restaurante</b-button>
      </div>

        <a class="link-toggle" href @click.prevent="showSignup = !showSignup">
          <span v-if="showSignup">Fazer login</span>
          <span v-else>Fazer cadastro</span>
        </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      showSignup: false,
      user: {
        vegan: false
      },
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
      redirectRestaurant() {
        this.$router.push({name: 'authRestaurant'})
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
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

.btn-toggle-area {
  margin-left: 10px !important;
}
</style>
