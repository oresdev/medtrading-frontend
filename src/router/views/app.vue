<template>
    <body id="app">
        <header>
            <header-navbar
                v-on:modal="modal = true"
                v-on:signin_modal="signin_modal = true"
                v-on:signup_modal="signup_modal = true"
                v-on:cart_modal="cart_modal = true"
            />
        </header>

        <main>
            <router-view />

            <section class="about">
                <strong v-text="`MedTrading.org`" />
                <p v-text="`by STO EXPORT & LOGISTIC COMPANY`" />
                <b
                    v-text="
                        `На этом сайте предоставлена информация о товарах, необходимых для борьбы с эпидемией коронавируса - тесты на коронавирус, медицинские маски, средства защиты и дезинфекции, аппараты ИВЛ (искуственной вентиляции легких). Их можно купить с помощью заключения стандартного контракта на поставку.`
                    "
                />
            </section>
        </main>

        <footer>
            <footer-navbar v-on:modal="modal = true" />

            <div class="copyright">
                <p v-html="$t(`footer.copyright.title`)" />
            </div>
        </footer>

        <!-- use the modal component, pass in the prop -->
        <modal v-if="modal" @close="modal = false">
            <h3><strong>Обратный звонок</strong></h3>
            <p>Заполните поля ниже и мы свяжемся с вами в ближайшее время.</p>

            <form submit.prevent>
                <input
                    type="text"
                    v-model="caller.name"
                    :placeholder="`Ваше имя`"
                />

                <!--  -->
                <input
                    type="text"
                    v-model="caller.phone"
                    :placeholder="`Номер телефона`"
                />

                <p
                    v-if="callStatus"
                    :class="[
                        callStatus == 'fail' ? 'error' : 'success',
                        'message',
                    ]"
                    v-text="callStatus"
                />
            </form>
            <button
                type="submit"
                v-on:click="sendCall"
                v-text="`Перезвонить`"
            />
        </modal>

        <!-- use the modal component, pass in the prop -->
        <modal v-if="signin_modal" v-on:close="signin_modal = false">
            <h3 v-text="`Авторизация`" />
            <span
                v-text="`Заполните поля ниже для того чтобы войти в систему.`"
            />

            <form submit.prevent>
                <input
                    type="email"
                    v-model="form.email"
                    :placeholder="`Адрес эл.почты`"
                />

                <!--  -->
                <input
                    type="password"
                    v-model="form.password"
                    :placeholder="`Пароль`"
                />

                <p
                    v-if="status"
                    :class="[status == 'fail' ? 'error' : 'success', 'message']"
                    v-text="status"
                />
            </form>
            <button type="submit" v-on:click="sendRequest" v-text="`Войти`" />
        </modal>

        <!-- use the modal component, pass in the prop -->
        <modal v-if="signup_modal" v-on:close="signup_modal = false">
            <h3 v-text="`Регистрация`" />
            <span
                v-text="`Заполните поля ниже для того чтобы войти в систему.`"
            />

            <form submit.prevent>
                <input
                    type="email"
                    v-model="form.email"
                    :placeholder="`Адрес эл.почты`"
                />

                <input
                    type="text"
                    v-model="form.name"
                    :placeholder="`Имя пользователя`"
                />

                <!--  -->
                <input
                    type="password"
                    v-model="form.password"
                    :placeholder="`Пароль`"
                />

                <p
                    v-if="status"
                    :class="[status == 'fail' ? 'error' : 'success', 'message']"
                    v-text="status"
                />
            </form>
            <button
                type="submit"
                v-on:click="signupUser"
                v-text="`Подтвердить`"
            />
        </modal>

        <!-- use the modal component, pass in the prop -->
        <modal v-if="cart_modal && cart != 0" v-on:close="cart_modal = false">
            <h3 v-text="`Корзина`" />
            <table>
                <tbody>
                    <tr v-for="item in cart" :key="item.data">
                        <td>
                            {{ item.data.name }}
                        </td>
                        <td>{{ item.data.price }}</td>
                        <td>{{ item.data.quantity }} шт</td>
                        <td>
                            <ul class="rounded">
                                <li @click="addToCart(item.data)">+</li>
                                <li @click="removeFromCart(item.data)">-</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td data-label="Итого: ">{{ total }}</td>
                    </tr>
                </tbody>
            </table>

            <p
                v-if="checkStatus"
                :class="[
                    checkStatus == 'fail' ? 'error' : 'success',
                    'message',
                ]"
                v-text="checkStatus"
            />
            <button v-if="session" v-on:click="checkoutCreate">Оформить</button>
            <button
                v-else
                v-on:click=";(cart_modal = false), (signin_modal = true)"
            >
                Войти
            </button>
        </modal>
    </body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            cs: JSON.parse(localStorage.getItem('cart')),
            modal: false,
            signin_modal: false,
            signup_modal: false,
            cart_modal: false,
            form: {
                email: '',
                name: '',
                password: '',
            },
            caller: {
                name: '',
                phone: '',
            },
        }
    },
    methods: {
        routeName(...name) {
            return [...name].indexOf(this.$route.name) > -1
        },

        ...mapActions({
            signin: 'Session/signin',
            signup: 'Session/signup',
            create: 'Checkout/create',
            callme: 'User/callme',
        }),

        async sendRequest() {
            await this.signin(this.form)
            this.status == 'success'
                ? setTimeout(() => {
                      this.signin_modal = false
                  }, 3000)
                : ''
        },
        async sendCall() {
            await this.callme(this.caller)
            this.callStatus == 'success'
                ? setTimeout(() => {
                      this.modal = false
                  }, 3000)
                : ''
        },
        async signupUser() {
            await this.signup(this.form)
            this.status == 'success'
                ? setTimeout(() => {
                      this.signup_modal = false
                  }, 3000)
                : ''
        },
        async checkoutCreate() {
            await this.create({
                email: this.data.user.email,
                total: this.total,
            })
            this.checkStatus == 'success'
                ? setTimeout(() => {
                      this.cart_modal = false
                      this.$store.commit('Product/responseCart', [])
                  }, 3000)
                : ''
        },
        addToCart(product) {
            this.$store.dispatch('Product/addToCart', product)
        },

        removeFromCart(index) {
            this.$store.dispatch('Product/removeFromCart', index)
        },
    },

    computed: {
        ...mapGetters({
            data: 'Session/responseData',
            responseError: 'Session/responseError',
            responseStatus: 'Session/responseStatus',
            cart: 'Product/stock',
            checkoutStatus: 'Checkout/responseStatus',
            total: 'Product/totalPrice',
            callStatus: 'User/responseStatus',
        }),
        session: self => (self.data ? self.data.user : false),
        status: self => (self.responseStatus ? self.responseStatus : false),
        checkStatus: self =>
            self.checkoutStatus ? self.checkoutStatus : false,
        /* snip */
        // cart() {
        //     return this.inCart.map(cartItem => {
        //         return this.forSale.find(forSaleItem => {
        //             return cartItem === forSaleItem.batch_id
        //         })
        //     })
        // },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/assets/sass/main.scss';
</style>
