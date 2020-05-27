<template>
    <section>
        <h1>Изменить заказ</h1>

        <form submit.prevent v-if="checkout">
            <label for="">Имя</label>
            <input
                type="text"
                v-model="checkout.name"
                :disabled="checkout.status == true"
            />

            <label for="">Адрес почты</label>
            <input type="text" v-model="checkout.email" disabled />

            <label for="">Список</label>
            <div
                class=""
                style="padding: 1em; background-color: #f0f0f0; border: 1px solid #cccccc;"
            >
                <ul v-for="i in pars(checkout.positions)" :key="i.id">
                    <li style="line-height: 2em">
                        {{ i.data.name }} -
                        {{ i.data.quantity }}
                    </li>
                </ul>
            </div>

            <label for="">Сумма</label>
            <input type="text" v-model="checkout.total" disabled />

            <label for="">Статус</label>
            <select v-model="checkout.status">
                <option disabled>Выберите статус заказа</option>
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.text }}
                </option>
            </select>

            <label for="">Номер заказа</label>
            <input type="text" v-model="checkout.batch_id" disabled />

            <label for="">Номер телефона</label>
            <input
                type="text"
                v-model="checkout.phone"
                :disabled="checkout.status == true"
            />
        </form>

        <button
            class="button button__filled"
            v-on:click="sendRequest"
            v-text="`Сохранить изменения`"
            v-if="!responseStatus"
        />

        <response-handler />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            options: [
                { text: 'В ожидании', value: false },
                { text: 'Выполнен', value: true },
            ],
        }
    },
    computed: {
        ...mapGetters({
            checkoutData: 'Checkout/responseData',
            responseStatus: 'responseStatus',
        }),
        checkout: self =>
            self.checkoutData
                .filter(c => c.batch_id === self.$route.params.id)
                .first(),
    },
    methods: {
        ...mapActions('Checkout', ['get_all', 'update']),

        pars: positions => JSON.parse(positions.replace(/'/gi, '"')),

        sendRequest() {
            this.update(this.checkout)
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
