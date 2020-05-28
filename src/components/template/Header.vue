<template>
  <header class="header">
    <a class="toggle" @click="$router.go(-1)">
      <i class="fa fa-lg fa-angle-left"></i>
    </a>
    <!-- <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a> -->
    <h1 class="title">
      <router-link to="/">{{title}}</router-link>
    </h1>

    <template v-if="user && user.hasOwnProperty('cpf')">
      <div class="cart-option">
        <div :class="{ 'active-bottom-border': $route.name === 'cart' }">
          <router-link to="/cart">
            <span>
              <i class="cart-icon fa fa-shopping-cart"></i>
            </span>
            <span class="cart-title">Meu carrinho ({{itemsInCart}})</span>
          </router-link>
        </div>
      </div>
    </template>

    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>


<script>
import { mapState } from 'vuex'
import UserDropdown from "./UserDropdown";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    ...mapState(['user']),
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    },
    itemsInCart() {
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0);
    }
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}

.title a:hover {
  color: #fff;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}

.cart-option {
  margin-right: 10px;
}

.active-bottom-border {
  border-bottom: 3px solid #00d1b2;
  color: #00d1b2;
  padding-bottom: calc(0.75rem - 8px);
}

.cart-icon {
  color: #fff;
}

.cart-title {
  color: #fff;
  margin-left: 5px;
}
</style>
