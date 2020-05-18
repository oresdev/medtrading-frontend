<template>
    <div>
        <h1>Список товаров</h1>
        <table>
            <thead>
                <tr>
                    <th>Имя пользователя</th>
                    <th>Адрес эл.почты</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users" :key="item.id">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>{{ item.email }}</td>
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
            users: 'User/responseData',
        }),
    },
    async mounted() {
        await this.$store.dispatch('User/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
