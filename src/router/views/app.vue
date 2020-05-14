<template>
    <body id="app">
        <header>
            <header-navbar
                v-on:modal="modal = true"
                v-on:signin_modal="signin_modal = true"
                v-on:signup_modal="signup_modal = true"
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

            <form>
                <input type="text" placeholder="Ваше имя" />
                <input type="text" placeholder="Номер телефона" />
            </form>
            <button>Перезвонить</button>
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
                    v-model="form.username"
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
    </body>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            modal: false,
            signin_modal: false,
            signup_modal: false,
            form: {
                email: '',
                username: '',
                password: '',
            },
        }
    },
    methods: {
        routeName(...name) {
            return [...name].indexOf(this.$route.name) > -1
        },

        ...mapActions('Session', ['signin', 'signup']),

        async sendRequest() {
            await this.signin(this.form)
            this.status == 'success'
                ? setTimeout(() => {
                      this.signin_modal = false
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
    },

    computed: {
        ...mapGetters('Session', ['responseError', 'responseStatus']),
        status: self => (self.responseStatus ? self.responseStatus : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '~@/assets/sass/main.scss';
</style>
