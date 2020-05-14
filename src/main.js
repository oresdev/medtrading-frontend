import Vue from 'vue'

import app from './router/views/app'

import './components'

import router from './router'

import store from './store'

import i18n from './locales'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(app),
}).$mount('#app')
