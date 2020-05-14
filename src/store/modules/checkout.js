import axios from '../../common/api'

const state = {
    data: [],
}

const getters = {
    responseData: state => (state.data ? state.data : null),
}

const actions = {
    async getAll({ commit }) {
        axios.init()
        await axios
            .get('http://localhost:5000/checkout/')
            .then(response => {
                commit('responseData', response.data.data)
            })
            .catch(error => {
                console.log(error)
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
