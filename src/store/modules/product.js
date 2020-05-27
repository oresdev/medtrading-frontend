import axios from '../../common/api'

const state = {
    data: [],
    cart: window.localStorage.getItem('cart')
        ? JSON.parse(window.localStorage.getItem('cart'))
        : [],
    forSale: [],
}

const getters = {
    stock: state => (state.cart ? state.cart : false),
    totalPrice: state => {
        if (!state.cart) {
            return 0
        }

        return state.cart.reduce(function(total, value) {
            return total + Number(value.data.price * value.data.quantity)
        }, 0)
    },

    responseData: state => (state.data ? state.data : null),
}

const actions = {
    async get_all({ commit }) {
        await axios
            .get('product/')
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async create({ commit }, data) {
        axios.init()

        await axios
            .post('product/', data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async update({ commit, dispatch }, data) {
        axios.init()

        await axios
            .put('product/' + data.batch_id, data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('Product/get_all', null, { root: true }) // refresh
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async remove({ commit, dispatch }, data) {
        axios.init()

        await axios
            .delete('product/' + data.batch_id)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('Product/get_all', null, { root: true }) // refresh
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    to_cart(context, item) {
        context.commit('ADD_TO_CART', item)
    },
    removeFromCart(context, item) {
        context.commit('REMOVE_FROM_CART', item)
    },
}

const mutations = {
    ADD_TO_CART(state, item) {
        let found = state.cart.find(
            product => product.data.batch_id == item.batch_id
        )
        if (found) {
            found.data.quantity++
        } else {
            state.cart.push({ data: item })
        }

        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_FROM_CART(state, item) {
        let found = state.cart.find(
            product => product.data.batch_id == item.batch_id
        )
        if (found) {
            found.data.quantity--
            if (found.data.quantity == 0) {
                state.cart.splice(item, 1)
            }
        } else {
            state.cart.splice(item, 1)
        }
        window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    responseData(state, data) {
        state.data = data
        state.forSale = data
    },
    responseCart(state, data) {
        state.cart = data
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
