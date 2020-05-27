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
                        <router-link
                            :to="`/cpanel/categories/update/${item.public_id}`"
                            v-text="item.name"
                        />
                    </td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.public_id }}</td>
                    <td style="text-align: center;">
                        <svg
                            viewBox="0 0 24 24"
                            @click="removeCategory(item.public_id)"
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
            category: 'Category/responseData',
        }),
    },
    methods: {
        ...mapActions('Category', ['get_all', 'remove']),

        removeCategory(public_id) {
            this.remove({ public_id: public_id })
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
