<template>
    <div>
        <h1>Список товаров</h1>

        <table>
            <thead>
                <tr>
                    <th>Дата заказа</th>
                    <th>Список</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Номер заказа</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in checkout" :key="item.id">
                    <td>
                        {{ item.created_on }}
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
                        {{ item.status }}
                    </td>
                    <td>
                        {{ item.batch_id }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('Checkout', ['get_one']),

        pars(positions) {
            return JSON.parse(positions.replace(/'/gi, '"'))
        },
    },
    computed: {
        ...mapGetters({
            checkout: 'Checkout/responseData',
        }),
    },
    mounted() {
        this.get_one()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
