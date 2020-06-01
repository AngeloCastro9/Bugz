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
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    quantity: product.quantity
                }
            })
            return productsResult
        },
        isRestaurant: state => state.user && state.user.hasOwnProperty('cnpj'),
        isClient: state => state.user && state.user.hasOwnProperty('cpf')
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
        addToCart(state, newProduct) {
            const record = state.savedCartProducts.find(product => product.id === newProduct.id)
            if (!record) {
                state.savedCartProducts.push({
                ...newProduct,
                quantity: 1
                })
            } else {
                record.quantity++
            }
        },
        cleanCart(state) {
            state.savedCartProducts = []
        }
        ,
        removeFromCart(state, existingProduct) {
            const record = state.savedCartProducts.find(product => product.id === existingProduct.id)
            if (record) {
                if( record.quantity > 1)
                    record.quantity--
                else {
                    const index = state.savedCartProducts.indexOf(record)
                    state.savedCartProducts.splice(index, 1)
                }
            }
        }
    }
})