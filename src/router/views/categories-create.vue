<template>
    <section>
        <h1>Добавить категорию</h1>

        <form submit.prevent>
            <label for="">Наименование</label>
            <input type="text" v-model="form.name" />

            <label for="">Описание категории</label>
            <wysiwyg v-model="form.description" />

            <label for="">Номер категории</label>
            <input type="text" v-model="form.public_id" v-filter="'[0-9]'" />
            <p
                v-if="status"
                :class="[status == 'fail' ? 'error' : 'success', 'message']"
                v-text="status"
            />
            <figure v-if="form.image">
                <img :src="form.image" alt="" />
            </figure>
        </form>

        <input
            type="file"
            name="file"
            id="file"
            class="inputfile"
            accept="image/*"
            @change="handleImage"
        />
        <label for="file" class="button button__base">Прикрепить файл</label>

        <button
            class="button button__filled"
            type="submit"
            v-on:click="sendRequest"
            v-text="`Сохранить изменения`"
        />
    </section>
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
                description: '',
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
