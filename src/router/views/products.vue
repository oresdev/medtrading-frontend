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
                        <router-link
                            :to="`/cpanel/products/update/${item.batch_id}`"
                            v-text="item.name"
                        />
                    </td>

                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.batch_id }}</td>
                    <td>{{ item.category_id }}</td>
                    <td style="text-align: center;">
                        <svg
                            viewBox="0 0 24 24"
                            @click="removeProduct(item.batch_id)"
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
        <p
            v-if="status"
            :class="[status == 'fail' ? 'error' : 'success', 'message']"
            v-text="status"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            product: 'Product/responseData',
            status: 'Product/responseStatus',
        }),
    },
    methods: {
        ...mapActions('Product', ['remove']),
        async removeProduct(batch_id) {
            await this.remove({ batch_id: batch_id })
        },
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
