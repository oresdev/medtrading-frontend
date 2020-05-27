<template>
    <section>
        <h1>Добавить товар</h1>

        <form submit.prevent>
            <label for="">Наименование</label>
            <input type="text" v-model="form.name" />

            <label for="">Описание товара</label>

            <ckeditor :editor="editor" v-model="form.description"></ckeditor>

            <label for="">Стоимость</label>
            <input type="text" v-model="form.price" v-filter="'[0-9]'" />

            <label for="">Колличество</label>
            <input
                type="text"
                v-model="form.quantity"
                placeholder="Например: 1000 Шт/Кг"
            />

            <label for="">Категория</label>
            <select v-model="form.category_id">
                <option disabled value="">Выберите категорию товара</option>
                <option
                    v-for="option in category"
                    v-bind:key="option.name"
                    v-bind:value="option.public_id"
                >
                    {{ option.name }}
                </option>
            </select>

            <label for="">Производитель</label>
            <input type="text" v-model="form.manufacturer" />

            <label for="">Страна</label>
            <input type="text" v-model="form.country" />

            <label for="">Минимальная поставка</label>
            <input
                type="text"
                v-model="form.minimal_order"
                placeholder="Например: 1000 Шт/Кг/Упаковок"
            />

            <label for="">Вес партии</label>
            <input type="text" v-model="form.weight" v-filter="'[0-9]'" />

            <label for="">Дополнительная информация о товаре</label>
            <ckeditor :editor="editor" v-model="form.body"></ckeditor>

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
            category: 'Category/responseData',
        }),
    },
    methods: {
        ...mapActions('Product', ['create']),

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
