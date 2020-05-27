import axios from '../../common/api'

const state = {
    data: [],
}

const getters = {
    responseData: state => (state.data ? state.data : null),
}

const actions = {
    // user model
    async get_all({ commit }) {
        axios.init()

        await axios
            .get('user/')
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async remove_user({ commit, dispatch }, data) {
        axios.init()

        await axios
            .delete('user/' + data.public_id)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('User/get_all', null, { root: true }) // refresh
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    // callback model
    async callback({ commit }, data) {
        await axios
            .post('callback/', data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async get_callback({ commit }) {
        axios.init()

        await axios
            .get('callback/')
            .then(response => {
                commit('responseData', response.data)
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async remove_callback({ commit, dispatch }, data) {
        axios.init()

        await axios
            .delete('callback/' + data.id)
            .then(response => {
                commit('responseStatus', response.data, { root: true })

                dispatch('User/get_callback', null, { root: true }) // refresh
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
