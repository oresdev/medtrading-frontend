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
                        {{ item.status }}
                    </td>
                    <td>
                        {{ item.batch_id }}
                    </td>
                    <td>
                        {{ item.description }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            list: '',
        }
    },
    methods: {
        pars(positions) {
            return JSON.parse(positions.replace(/'/gi, '"'))
        },
    },
    computed: {
        ...mapGetters({
            checkout: 'Checkout/responseData',
        }),
    },
    async mounted() {
        await this.$store.dispatch('Checkout/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
