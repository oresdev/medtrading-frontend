<template>
    <div>
        <h1>Добавить категорию</h1>
        <form submit.prevent>
            <input
                type="text"
                v-model="form.name"
                :placeholder="`Наименование`"
            />
            <input
                type="text"
                v-model="form.description"
                :placeholder="`Описание категории`"
            />
            <input
                type="text"
                v-model="form.public_id"
                :placeholder="`Номер категории`"
            />
            <p
                v-if="status"
                :class="[status == 'fail' ? 'error' : 'success', 'message']"
                v-text="status"
            />
        </form>

        <div class="card bg-white">
            <img style="" :src="form.image" alt="" />
            <input
                @change="handleImage"
                class="custom-input"
                type="file"
                accept="image/*"
            />
        </div>

        <button type="submit" v-on:click="sendRequest" v-text="`sendRequest`" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            remoteUrl: '',
            form: {
                image: '',
                name: '',
                description: 'Описание категории',
                public_id: '',
            },
        }
    },
    computed: {
        ...mapGetters({
            status: 'Category/responseStatus',
        }),
    },
    methods: {
        ...mapActions('Category', ['create']),

        handleImage(e) {
            const selectedImage = e.target.files[0] // get first file
            this.createBase64Image(selectedImage)
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = e => {
                this.form.image = e.target.result
            }
            reader.readAsDataURL(fileObject)
        },

        async sendRequest() {
            await this.create(this.form)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
