<template>
  <div class="auth-content" style="background-color: rgb(83, 80, 80)">
    <div class="auth-modal" style="background-color: rgb(143, 136, 136)">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro Cliente' : 'Login Cliente' }}</div>

      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome"/>
      <input v-if="showSignup" v-model="user.street" type="text" placeholder="Rua" />
      <input v-if="showSignup" v-model="user.number" type="text" placeholder="Número" 
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
      <input v-if="showSignup" v-model="user.neighborhood" type="text" placeholder="Bairro" />
      <input v-if="showSignup" v-model="user.cpf" type="text" placeholder="CPF"
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
      <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
      <input v-model="user.password" name="password" type="password" placeholder="Senha" />
      <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme a Senha"/>

      <div v-if="showSignup">
        <b-form-checkbox 
          id="vegan"
          v-model="user.vegan"
          name="vegan"
          value="true"
          unchecked-value="false"
        >Você é vegano?</b-form-checkbox>
      </div>

      <b-button v-if="showSignup" @click="signup" variant="primary">Registrar</b-button>
      <b-button v-else @click="signin" variant="primary">Entrar</b-button>
      
      <b-button v-if="!showSignup" @click="redirectRestaurant" variant="primary" style="margin-top : 10px">Área do restaurante</b-button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup" style="color: red">Já tem cadastro? Acesse o Login!</span>
        <span v-else style="color: red">Não tem cadastro? Registre-se aqui!</span>
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
      user: {},
      vegan: false
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
</style>
