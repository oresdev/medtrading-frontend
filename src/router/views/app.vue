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

        <carousel v-if="routeName('home')" />
        <main>
            <router-view />
        </main>

        <section class="about">
            <strong v-text="`MedTrading.org`" />
            <p v-text="`ООО«ГЛОБАЛЬНЫЕ ЦИФРОВЫЕ ТЕХНОЛОГИИ»`" />
            <b
                v-text="
                    `На этом сайте предоставлена информация о товарах, необходимых для борьбы с эпидемией коронавируса - тесты на коронавирус, медицинские маски, средства защиты и дезинфекции, аппараты ИВЛ (искуственной вентиляции легких). Их можно купить с помощью заключения стандартного контракта на поставку.`
                "
            />
        </section>

        <footer>
            <footer-navbar v-on:modal="modal = true" />

            <div class="copyright">
                <p>
                    © 2020 Все права защищены. Интернет-магазин MedTrading.org |
                    Designed by
                    <a href="https://stoexport.com/" target="_blank"
                        >STOExport</a
                    >
                </p>
            </div>
        </footer>

        <!-- use the modal component, pass in the prop -->
        <modal v-if="modal" @close="modal = false">
            <h3><strong>Обратный звонок</strong></h3>
            <p>Заполните поля ниже и мы свяжемся с вами в ближайшее время.</p>

            <form submit.prevent>
                <label for="">Ваше имя</label>
                <input
                    type="text"
                    v-model="caller.name"
                    v-filter="'[a-zA-Zа-яА-ЯёЁ]'"
                />

                <!--  -->
                <label for="">Номер телефона</label>
                <input type="text" v-model="caller.phone" v-filter="'[0-9]'" />

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
                class="button button__filled"
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
                <label for="">Адрес эл.почты</label>
                <input type="email" v-model="form.email" />

                <!--  -->
                <label for="">Пароль</label>
                <input type="password" v-model="form.password" />

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
                <label for="">Адрес эл.почты</label>
                <input type="email" v-model="form.email" />

                <!--  -->
                <label for="">Имя пользователя</label>
                <input
                    type="text"
                    v-model="form.name"
                    v-filter="'[a-zA-Zа-яА-ЯёЁ]'"
                />

                <!--  -->
                <label for="">Пароль</label>
                <input type="password" v-model="form.password" />

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
                    <tr v-for="item in cart" :key="item.name">
                        <td>
                            {{ item.data.name }}
                        </td>
                        <td>{{ item.data.price }}</td>
                        <td>{{ item.data.quantity }} шт</td>
                        <td style="text-align: center;">
                            <svg
                                viewBox="0 0 24 24"
                                @click="addToCart(item.data)"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </td>
                        <td style="text-align: center;">
                            <svg
                                viewBox="0 0 24 24"
                                @click="removeFromCart(item.data)"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </td>
                    </tr>
                    <tr>
                        <td>ИТОГО: {{ total }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="phone-field" v-if="session">
                <label for="phone">Контактная информация:</label>
                <input
                    type="text"
                    name="phone"
                    v-model="caller.phone"
                    v-filter="'[0-9]'"
                    placeholder="Номер телефона"
                />
            </div>
            <p
                v-if="checkStatus"
                :class="[
                    checkStatus == 'fail' ? 'error' : 'success',
                    'message',
                ]"
                v-text="checkStatus"
            />
            <button
                class="button button__filled"
                v-if="session"
                v-on:click="checkoutCreate"
                :disabled="caller.phone.length < 11"
                v-text="'Оформить заказ'"
            />

            <button
                v-else
                class="button button__filled"
                v-on:click=";(cart_modal = false), (signin_modal = true)"
                v-text="'Войти'"
            />
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
                name: this.data.user.name,
                phone: this.caller.phone,
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
