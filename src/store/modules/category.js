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
        await axios
            .get('https://medtrading.org/api/category/')
            .then(response => {
                commit('responseData', response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    },

    async create({ commit }, data) {
        axios.init()

        await axios
            .post('https://medtrading.org/api/category/', data)
            .then(response => {
                commit('responseStatus', response.data.status)
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