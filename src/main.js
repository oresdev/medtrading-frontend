import Vue from 'vue'

import app from './router/views/app'

import './components'

import router from './router'

import store from './store'

import i18n from './locales'

import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.use(CKEditor)

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

Array.prototype.first
    ? ''
    : (Array.prototype.first = function() {
          return this[0]
      })

new Vue({
    router,
    store,
    i18n,
    render: h => h(app),
}).$mount('#app')
