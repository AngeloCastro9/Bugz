<template>
  <div class="auth-content" style="background-color: rgb(83, 80, 80)">
    <div class="auth-modal" style="background-color: rgb(143, 136, 136)">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro Restaurante' : 'Login Restaurante' }}</div>
      <b v-if="showSignup">Selecione abaixo a imagem do seu restaurante:</b>
      <input v-if="showSignup" type="file" @change="onFileSelected" name="bugzUploadedFile" placeholder="Url da imagem do seu restaurante" accept="image/*">
      <input v-if="showSignup" v-model="restaurant.name" type="text" placeholder="Nome"/>
      <input v-if="showSignup" v-model="restaurant.description" type="text" placeholder="Descrição"/>
      <input v-if="showSignup" v-model="restaurant.street" type="text" placeholder="Rua" />
      <input v-if="showSignup" v-model="restaurant.number" type="text" placeholder="Número" 
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
      <input v-if="showSignup" v-model="restaurant.neighborhood" type="text" placeholder="Bairro" />
      <input v-if="showSignup" v-model="restaurant.cnpj" type="text" placeholder="CNPJ"
      onkeypress="return event.charCode >= 48 && event.charCode <= 57"/>
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

      <b-button v-if="showSignup" @click="signup" variant="primary">Registrar</b-button>
      <b-button v-else @click="signinRestaurant" variant="primary">Entrar</b-button>
      <b-button v-if="!showSignup" @click="redirectUser" variant="primary" style="margin-top : 10px">Área do cliente</b-button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup" style="color: red">Já tem cadastro? Acesse o Login!</span>
        <span v-else style="color: red">Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey, uploadFile } from "@/global";
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
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/homeRestaurant" });
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
    },
    redirectUser() {
        this.$router.push({name: 'auth'})
    },
    onFileSelected(event) {
      const selectedImage = event.target.files[0]

      const selectedImageFormData = new FormData()
      selectedImageFormData.append('bugzUploadedFile', selectedImage, selectedImage.name)

      uploadFile(selectedImageFormData).then( nameOfSavedImage => {
        this.restaurant.urlimage = `${baseApiUrl}/${nameOfSavedImage}`
      })
    }
  }
};
</script>

<style>
.auth-content {
  background-color: beige;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: beige;
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
