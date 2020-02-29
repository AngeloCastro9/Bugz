<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome" />
      <input v-if="showSignup" v-model="user.description" type="text" placeholder="Descrição" />
      <input v-if="showSignup" v-model="user.street" type="text" placeholder="Rua" />
      <input v-if="showSignup" v-model="user.number" type="text" placeholder="Número" />
      <input v-if="showSignup" v-model="user.neighborhood" type="text" placeholder="Bairro" />
      <input v-if="showSignup" v-model="user.cpf_cnpj  " type="text" placeholder="cpf/cnpj" />
      <input v-model="user.email" name="email" type="text" placeholder="E-mail" />
      <input v-model="user.password" name="password" type="password" placeholder="Senha" />
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirme a Senha"
      />

      <div v-if="showSignup">
        <b-form-checkbox 
          id="vegan"
          v-model="user.vegan"
          name="vegan"
          value="true"
          unchecked-value="false"
        >Você é vegano?</b-form-checkbox>
      </div>

      <div v-if="showSignup">
        <b-form-checkbox 
          id="rest"
          v-model="user.is_restaurant"          
          name="rest"
          value="true"
          unchecked-value="false"
        >Cadastrar como restaurante</b-form-checkbox>
      </div>

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
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
  background-color: #fff;
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
