<template>
    <div>
        <h1>Список товаров</h1>
        <table>
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Адрес эл.почты</th>
                    <th>Список</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Номер заказа</th>
                    <th>Номер телефона</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in checkout" :key="item.id">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        {{ item.email }}
                    </td>
                    <td style="max-width: 500px;">
                        <ul
                            style="margin: 0; padding: 0;"
                            v-for="i in pars(item.positions)"
                            :key="i.id"
                        >
                            <li>
                                {{ i.data.name }} -
                                {{ i.data.quantity }}
                            </li>
                        </ul>
                    </td>
                    <td>
                        {{ item.total }}
                    </td>
                    <td>
                        {{ item.status == true ? 'Выполнен' : 'В ожидании' }}
                    </td>
                    <td>
                        <router-link
                            :to="`/cpanel/checkout/update/${item.batch_id}`"
                            v-text="item.batch_id"
                        />
                    </td>
                    <td>
                        {{ item.phone }}
                    </td>
                    <td style="text-align: center;">
                        <svg
                            viewBox="0 0 24 24"
                            @click="removeCheckout(item.batch_id)"
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
            </tbody>
        </table>

        <response-handler />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            checkout: 'Checkout/responseData',
        }),
    },
    methods: {
        ...mapActions('Checkout', ['get_all', 'remove']),

        removeCheckout(batch_id) {
            this.remove({ batch_id: batch_id })
        },
        pars(positions) {
            return JSON.parse(positions.replace(/'/gi, '"'))
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
