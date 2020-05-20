import Vue from 'vue'

import app from './router/views/app'

import './components'

import router from './router'

import store from './store'

import i18n from './locales'

Vue.config.productionTip = false

Vue.directive('filter', {
    bind: function(el, binding) {
        el.inputHandler = function(e) {
            var ch = String.fromCharCode(e.which)
            var re = new RegExp(binding.value)
            if (!ch.match(re)) {
                e.preventDefault()
            }
        }
        el.addEventListener('keypress', el.inputHandler)
    },
    unbind: function(el) {
        el.removeEventListener('keypress', el.inputHandler)
    },
    inputHandler: null,
})
Vue.filter('phone', function(phone) {
    return phone
        .replace(/[^0-9]/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
})
new Vue({
    router,
    store,
    i18n,
    render: h => h(app),
}).$mount('#app')
