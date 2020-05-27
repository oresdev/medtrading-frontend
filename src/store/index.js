import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Automatically imports all the modules and exports as a single module object
 */

const requireModule = require.context('./modules', false, /\.js$/)

const modules = {}

requireModule.keys().forEach(fileName => {
    const moduleName = fileName
        .replace(/(\.\/|\.js)/g, '')
        .replace(/^\w/, c => c.toUpperCase())

    modules[moduleName] =
        requireModule(fileName).default || requireModule(fileName)
})

export default new Vuex.Store({
    state: {
        loader: false,
        status: '',
    },
    getters: {
        responseStatus: state => (state.status ? state.status : ''),
    },
    mutations: {
        responseStatus(state, data) {
            state.status = data

            setTimeout(() => {
                state.status = ''
            }, 3000)
        },
    },
    modules,
})
