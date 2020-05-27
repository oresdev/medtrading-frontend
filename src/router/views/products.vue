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
                    <td v-if="get_category">
                        {{ get_category(item.category_id).name }}
                    </td>
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

        <response-handler />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            product: 'Product/responseData',
            categoryData: 'Category/responseData',
        }),
    },
    methods: {
        ...mapActions('Product', ['get_all', 'remove']),

        get_category(id) {
            return (
                this.categoryData.filter(c => c.public_id === id).first() ||
                false
            )
        },

        removeProduct(batch_id) {
            this.remove({ batch_id: batch_id })
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
