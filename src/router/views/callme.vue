<template>
    <div>
        <h1>Список заявок</h1>
        <table>
            <thead>
                <tr>
                    <th>Имя пользователя</th>
                    <th>Номер телефона</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users" :key="item.id">
                    <td>
                        {{ item.username }}
                    </td>
                    <td>{{ item.phone }}</td>
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
        await this.$store.dispatch('User/getCallto')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
