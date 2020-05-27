import axios from '../../common/api'

const state = {
    data: [],
}

const getters = {
    responseData: state => (state.data ? state.data : null),
}

const actions = {
    async get_all({ commit }) {
        await axios
            .get('category/')
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
            .post('category/', data)
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
            .put('category/' + data.public_id, data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('Category/get_all', null, { root: true }) // refresh
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async remove({ commit, dispatch }, data) {
        axios.init()

        await axios
            .delete('category/' + data.public_id)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('Category/get_all', null, { root: true }) // refresh
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
