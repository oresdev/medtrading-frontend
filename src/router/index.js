import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'
import o_kompanii from './views/o-kompanii.vue'
import kak_kupit from './views/kak-kupit.vue'
import oplata from './views/oplata.vue'
import dostavka from './views/dostavka.vue'
import kontakty from './views/kontakty.vue'
import vozvrat from './views/vozvrat-i-obmen.vue'
import obyazatelstva from './views/garantijnye-obyazatelstva.vue'
import dokumenty from './views/dokumenty-i-sertifikaty.vue'

import category from './views/category.vue'
import item from './views/item.vue'

import cabinet from './views/cabinet.vue'
import cpanel from './views/cpanel.vue'

import products from './views/products.vue'
import products_create from './views/products-create.vue'
import products_update from './views/products-update.vue'

import categories from './views/categories.vue'
import categories_create from './views/categories-create.vue'
import categories_update from './views/categories-update.vue'

import users from './views/users.vue'
import callback from './views/callback.vue'

import checkout from './views/checkout.vue'
import checkout_update from './views/checkout-update.vue'

import checkoutUser from './views/checkout-user.vue'
import _404 from './views/_404.vue'

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
            path: '/o-kompanii',
            name: 'o_kompanii',
            component: o_kompanii,
        },
        {
            path: '/kak-kupit',
            name: 'kak_kupit',
            component: kak_kupit,
        },
        {
            path: '/oplata',
            name: 'oplata',
            component: oplata,
        },
        {
            path: '/dostavka',
            name: 'dostavka',
            component: dostavka,
        },
        {
            path: '/kontakty',
            name: 'kontakty',
            component: kontakty,
        },
        {
            path: '/vozvrat-i-obmen',
            name: 'vozvrat',
            component: vozvrat,
        },
        {
            path: '/garantijnye-obyazatelstva',
            name: 'obyazatelstva',
            component: obyazatelstva,
        },
        {
            path: '/dokumenty-i-sertifikaty',
            name: 'dokumenty',
            component: dokumenty,
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
            children: [
                {
                    path: '/cabinet/checkout',
                    component: checkoutUser,
                    meta: {
                        requiresAuth: true,
                        residentAuth: true,
                        adminAuth: false,
                    },
                },
            ],
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
                    path: '/cpanel/products/update/:id',
                    component: products_update,
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
                    path: '/cpanel/categories/update/:id',
                    component: categories_update,
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
                {
                    path: '/cpanel/checkout/update/:id',
                    component: checkout_update,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/callback',
                    component: callback,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
            ],
        },
        {
            path: '*',
            name: '404',
            component: _404,
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
                "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTAxMDIyNjAsImlhdCI6MTU5MDAxNTg1NSwic3ViIjoib3Jlc2hraW4uZGV2QG91dGxvb2suY29tIn0.YA4KQ9Qr9o7NmRmEpr95qLNeeCiVlv5U_iub0RP-G6w'"
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
                "b'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTAxMDIyNjAsImlhdCI6MTU5MDAxNTg1NSwic3ViIjoib3Jlc2hraW4uZGV2QG91dGxvb2suY29tIn0.YA4KQ9Qr9o7NmRmEpr95qLNeeCiVlv5U_iub0RP-G6w'"
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
