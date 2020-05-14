<template>
    <div>
        <h1>Список категорий</h1>
        <table>
            <thead>
                <tr>
                    <th>Наименование</th>
                    <th>Описание категории</th>
                    <th>Номер категории</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in category" :key="item.id">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.public_id }}</td>
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
            category: 'Category/responseData',
        }),
    },
    async mounted() {
        await this.$store.dispatch('Category/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
