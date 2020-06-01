<template>
  <div class="auth-content">
    <div class="auth-modal" style="background-color: rgb(143, 136, 136)">
      <img src="@/assets/logo.png" width="200" alt="Logo" />
      <hr />

      <md-card-header>
        <div
          class="auth-title"
        >{{ showSignup ? 'Cadastro do restaurante' : 'Login do restaurante' }}</div>
      </md-card-header>

      <div class="image-upload">
        <form v-if="showSignup" enctype="multipart/form-data">
          <label class="image-upload-label" for="image-input-restaurant">
            <i class="upload-picture fa fa-image"></i>
          </label>
          <input
            id="image-input-restaurant"
            v-if="showSignup"
            type="file"
            ref="imageFile"
            name="urlimage"
            @change="onFileSubmited"
          />
        </form>
        <label v-if="showSignup" for="image-input-restaurant">Carregar imagem...</label>
      </div>

      <input v-if="showSignup" v-model="restaurant.name" type="text" placeholder="Nome" />
      <input v-if="showSignup" v-model="restaurant.description" type="text" placeholder="Descrição" />
      <input v-if="showSignup" v-model="restaurant.street" type="text" placeholder="Rua" />
      <input
        v-if="showSignup"
        v-model="restaurant.number"
        type="text"
        placeholder="Número"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
      />
      <input v-if="showSignup" v-model="restaurant.neighborhood" type="text" placeholder="Bairro" />
      <input
        v-if="showSignup"
        v-model="restaurant.cnpj"
        type="text"
        placeholder="CNPJ"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
      />

      <form v-on:keyup.enter="showSignup?signup():signinRestaurant()">
        <input v-model="restaurant.email" name="email" type="text" placeholder="E-mail" />
        <input v-model="restaurant.password" name="password" type="password" placeholder="Senha" />
      </form>

      <input
        v-if="showSignup"
        v-model="restaurant.confirmPassword"
        type="password"
        placeholder="Confirme a Senha"
      />

      <b-form-group id="vegan-group" v-if="showSignup">
        <label id="vegan-label" for="vegan-checkbox">Vegano</label>
        <b-form-checkbox id="vegan-checkbox" v-model="restaurant.vegan" name="vegan" />
      </b-form-group>

      <div class="btn-group">
        <b-button pill v-if="showSignup" @click="signup" variant="info">Registrar</b-button>
        <b-button pill v-else @click="signinRestaurant" variant="info ">Entrar</b-button>
        <b-button
          class="btn-toggle-area"
          pill
          v-if="!showSignup"
          @click="redirectUser"
          variant="info"
        >Área do cliente</b-button>
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
      restaurant: {
        vegan: false
      },
      file: "",
      message: "",
      error: false
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
        .catch(showError);
    },
    redirectUser() {
      this.$router.push({ name: "auth" });
    },
    onFileSubmited() {
      const file = this.$refs.imageFile.files[0];
      if (!file) return;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const MAX_SIZE = 10000000;
      const tooLarge = file.size > MAX_SIZE;

      if (!allowedTypes.includes(file.type) || tooLarge) {
        this.error = true;
        this.message = tooLarge
          ? `Imagem excedeu limite de ${MAX_SIZE / 1000000}MB`
          : "Somente imagens são permitidas";
        return;
      }

      this.file = file;

      const formData = new FormData();
      formData.append("bugzUploadedFile", this.file);

      axios
        .post(`${baseApiUrl}/uploadFile`, formData)
        .then(res => {
          this.restaurant.urlimage = res.data.file;

          this.message = "Imagem salva com sucesso!";
          this.error = false;
        })
        .catch(err => {
          this.message = err.response.data.error;
          this.error = true;
        });
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

.link-toggle {
  color: #764f15 !important;
}

.image-upload-label {
  margin-bottom: 0px;
  /* font-size: 500%; */
  color: rgb(226, 226, 226);
}

.btn-info {
  background-color: #137e8f !important;
  border-color: #178c9e !important;
  color: rgb(233, 232, 232) !important;
}

#image-input-restaurant {
  display: none;
  margin-bottom: 0px;
}

#upload-text {
  /* color: #764f15; */
  font-size: 90%;
}

#vegan-group {
  position: relative;
  width: 280px;
  float: left;
}

#vegan-label {
  margin-bottom: 50px;
  margin-right: 10px;
}

div.custom-checkbox {
  position: absolute;
  left: 20;
  top: -2px;
}

body {
  color: #523811;
}

#btn-toggle-area {
  margin-left: 10px;
}
</style>
