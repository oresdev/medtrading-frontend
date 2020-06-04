<template>
    <section>
        <h1>Изменить категорию</h1>

        <form submit.prevent v-if="category">
            <label for="">Наименование</label>
            <input type="text" v-model="category.name" />

            <label for="">Номер категории</label>
            <input type="text" v-model="category.public_id" disabled />

            <label for="">Описание категории</label>
            <ckeditor
                :editor="editor"
                v-model="category.description"
            ></ckeditor>

            <figure>
                <img v-if="upload" :src="category.image" alt="" />
                <img v-else :src="getImgUrl(category.image)" alt="" />
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
            upload: false,
        }
    },
    computed: {
        ...mapGetters({
            responseStatus: 'responseStatus',
            categoryData: 'Category/responseData',
        }),
        category: self =>
            self.categoryData
                .filter(p => p.public_id === self.$route.params.id)
                .first(),
    },
    methods: {
        ...mapActions('Category', ['update']),

        getImgUrl(image) {
            return '/img/category/' + image
            // return 'https://medtrading.org/img/category/' + image
            // return require('@/assets/images/category/' + image)
        },
        handleImage(e) {
            this.createBase64Image(e.target.files[0])
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = e => {
                this.category.image = e.target.result
                this.upload = true
            }
            reader.readAsDataURL(fileObject)
        },
        sendRequest() {
            this.update(this.category)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
