<template>
    <div>
        <h1>Список товаров</h1>
        <table>
            <thead>
                <tr>
                    <th>Адрес эл.почты</th>
                    <th>Список</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Номер заказа</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in checkout" :key="item.id">
                    <td>
                        {{ item.email }}
                    </td>
                    <td style="max-width: 500px;">{{ item.positions }}</td>
                    <td>{{ item.total }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.batch_id }}</td>
                </tr>
            </tbody>
        </table>
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
    async mounted() {
        await this.$store.dispatch('Checkout/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
