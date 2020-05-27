<template>
    <section>
        <h1>Добавить категорию</h1>

        <form submit.prevent>
            <label for="">Наименование</label>
            <input type="text" v-model="form.name" />

            <label for="">Описание категории</label>
            <ckeditor :editor="editor" v-model="form.description"></ckeditor>

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
            v-on:click="sendRequest"
            v-text="`Сохранить изменения`"
            v-if="!responseStatus"
        />

        <response-handler />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return {
            editor: ClassicEditor,
            form: {
                image: '',
            },
        }
    },
    computed: {
        ...mapGetters({
            responseStatus: 'responseStatus',
        }),
    },
    methods: {
        ...mapActions('Category', ['create']),

        handleImage(e) {
            this.createBase64Image(e.target.files[0])
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = e => {
                this.form.image = e.target.result
            }
            reader.readAsDataURL(fileObject)
        },
        sendRequest() {
            this.create(this.form)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
