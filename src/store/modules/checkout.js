import storage from '../../common/storage'
import axios from '../../common/api'

const state = {
    data: [],
}

const getters = {
    responseData: state => (state.data ? state.data : null),
}

const actions = {
    async get_all({ commit }) {
        axios.init()
        await axios
            .get('checkout/')
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },
    async get_one({ commit }) {
        const email = storage.get('session_data').user.email
        axios.init()
        await axios
            .get('checkout/' + email)
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async create({ commit }, data) {
        axios.init()
        const checkout = {
            name: data.name,
            email: data.email,
            positions: JSON.parse(localStorage.getItem('cart')),
            total: data.total,
            phone: data.phone,
        }
        await axios
            .post('checkout/', checkout)
            .then(response => {
                commit('responseStatus', response.data, { root: true })
                localStorage.removeItem('cart')
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async update({ commit }, data) {
        axios.init()

        await axios
            .put('checkout/' + data.batch_id, data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async remove({ commit, dispatch }, data) {
        axios.init()

        await axios
            .delete('checkout/' + data.batch_id)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('Checkout/get_all', null, { root: true }) // refresh
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },
}

const mutations = {
    responseData(state, data) {
        state.data = data
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
