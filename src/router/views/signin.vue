<template>
    <section class="wrapper">
        <form submit.prevent>
            <fieldset>
                <input
                    type="email"
                    v-model="form.email"
                    :placeholder="`email`"
                />

                <!--  -->
                <input
                    type="password"
                    v-model="form.password"
                    :placeholder="`password`"
                />
            </fieldset>

            <p v-if="status" v-text="status" />
        </form>

        <button type="submit" v-on:click="sendRequest" v-text="`submit`" />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        }
    },

    methods: {
        ...mapActions('Session', ['signin']),
        async sendRequest() {
            await this.signin(this.form)
        },
    },

    computed: {
        ...mapGetters('Session', ['responseError', 'responseStatus']),
        status: self => (self.responseStatus ? self.responseStatus : false),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
