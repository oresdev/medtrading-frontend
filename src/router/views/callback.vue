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
                <tr v-for="i in users" :key="i.id">
                    <td>
                        {{ i.name }}
                    </td>
                    <td>{{ i.phone }}</td>
                    <td style="text-align: center;">
                        <svg viewBox="0 0 24 24" @click="remove(i.id)">
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
            users: 'User/responseData',
        }),
    },
    methods: {
        ...mapActions('User', ['get_callback', 'remove_callback']),

        remove(id) {
            this.remove_callback({ id: id })
        },
    },
    mounted() {
        this.get_callback()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
