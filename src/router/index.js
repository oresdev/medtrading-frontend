import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'
import category from './views/category.vue'
import item from './views/item.vue'

import cabinet from './views/cabinet.vue'
import cpanel from './views/cpanel.vue'

import products from './views/products.vue'
import products_create from './views/products-create.vue'

import categories from './views/categories.vue'
import categories_create from './views/categories-create.vue'

import users from './views/users.vue'
import checkout from './views/checkout.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/category/:slug',
            name: 'category',
            component: category,
        },
        {
            path: '/category/:slug/:item',
            name: 'item',
            component: item,
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: cabinet,
            meta: { requiresAuth: true, residentAuth: true, adminAuth: false },
        },
        {
            path: '/cpanel',
            name: 'cpanel',
            component: cpanel,
            meta: { requiresAuth: true, adminAuth: true, residentAuth: false },
            children: [
                {
                    path: '/cpanel/products',
                    component: products,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/products/create',
                    component: products_create,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/categories',
                    component: categories,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/categories/create',
                    component: categories_create,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/users',
                    component: users,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/checkout',
                    component: checkout,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
            ],
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('session_data'))

        if (!authUser || !authUser.user.token) {
            next({ name: 'home' })
        } else if (to.meta.adminAuth) {
            const authUser = JSON.parse(
                window.localStorage.getItem('session_data')
            )

            if (
                authUser.user.verification_token ===
                '74d30871-5464-47e7-bf5f-25dc1063871a'
            ) {
                next()
            } else {
                console.log('Connected as user')
                next('/cabinet')
            }
        } else if (to.meta.residentAuth) {
            const authUser = JSON.parse(
                window.localStorage.getItem('session_data')
            )

            if (
                authUser.user.verification_token !==
                '74d30871-5464-47e7-bf5f-25dc1063871a'
            ) {
                next()
            } else {
                console.log('Connected as administrator')
                next('/cpanel')
            }
        }
    } else {
        next()
    }
})

export default router
