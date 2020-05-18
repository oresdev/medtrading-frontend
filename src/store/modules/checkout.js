import storage from '../../common/storage'
import axios from '../../common/api'

const state = {
    data: [],
    status: '',
}

const getters = {
    responseData: state => (state.data ? state.data : null),
    responseStatus: state => (state.status ? state.status : false),
}

const actions = {
    async getAll({ commit }) {
        axios.init()
        await axios
            .get('checkout/')
            .then(response => {
                commit('responseData', response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },
    async getUserAll({ commit }) {
        const email = storage.get('session_data').user.email
        axios.init()
        await axios
            .get('checkout/' + email)
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },

    async create({ commit }, data) {
        axios.init()
        const checkout = {
            email: data.email,
            positions: JSON.parse(localStorage.getItem('cart')),
            total: data.total,
            description: 'positions',
        }
        await axios
            .post('checkout/', checkout)
            .then(response => {
                commit('responseStatus', response.data.status)
                localStorage.removeItem('cart')
            })
            .catch(error => {
                commit('responseStatus', error.response.data.status)
            })
    },
}

const mutations = {
    responseData(state, data) {
        state.data = data
    },

    responseStatus(state, status) {
        state.status = status
        setTimeout(() => {
            state.status = ''
        }, 3000)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
