import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        savedCartProducts: [],
        isMenuVisible: false,
        user: null
    },
    getters: {
        allRawProducts: state => state.savedCartProducts,
        getNumberOfProducts: state => (state.savedCartProducts) ? state.savedCartProducts.length : 0,
        cartProducts: state => {
            const productsResult = state.savedCartProducts.map(product => {
                return {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity
                }
            })
            return productsResult
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }
            
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                // state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                // state.isMenuVisible = false
            }
        },
        addToCart(state, product) {
            const record = state.savedCartProducts.find(newProduct => newProduct.id === product.id)
            if (!record) {
                state.savedCartProducts.push({
                ...product,
                quantity: 1
                })
            } else {
                record.quantity++
            }
        }
    }
})