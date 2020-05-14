<template>
    <div>
        <h1>Список товаров</h1>
        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Стоимость</th>
                    <th>Колличество</th>
                    <th>Номер товара</th>
                    <th>Категория</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in product" :key="item.id">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.batch_id }}</td>
                    <td>{{ item.category_id }}</td>
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
            product: 'Product/responseData',
        }),
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
