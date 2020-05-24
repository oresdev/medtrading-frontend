<template>
    <section>
        <h1>Изменить товар</h1>

        <form submit.prevent v-if="product">
            <label for="">Наименование</label>
            <input type="text" v-model="product.name" />

            <label for="">Описание товара</label>
            <ckeditor :editor="editor" v-model="product.description"></ckeditor>

            <label for="">Стоимость</label>
            <input type="text" v-model="product.price" v-filter="'[0-9]'" />

            <label for="">Колличество</label>
            <input
                type="text"
                v-model="product.quantity"
                placeholder="Например: 1000 Шт/Кг"
            />

            <label for="">Номер товара</label>
            <input type="text" v-model="product.batch_id" disabled />

            <label for="">Категория</label>
            <select v-model="product.category_id">
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
            <input type="text" v-model="product.manufacturer" />

            <label for="">Страна</label>
            <input type="text" v-model="product.country" />

            <label for="">Минимальная поставка</label>
            <input
                type="text"
                v-model="product.minimal_order"
                placeholder="Например: 1000 Шт/Кг/Упаковок"
            />

            <label for="">Вес партии</label>
            <input type="text" v-model="product.weight" v-filter="'[0-9]'" />

            <label for="">Дополнительная информация о товаре</label>
            <ckeditor :editor="editor" v-model="product.body"></ckeditor>

            <p
                v-if="status"
                :class="[status == 'fail' ? 'error' : 'success', 'message']"
                v-text="status"
            />
            <figure v-if="product.image">
                <img v-if="upload" :src="getImgUrl(product.image)" alt="" />
                <img v-else :src="product.image" alt="" />
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

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    data() {
        return {
            editor: ClassicEditor,
            upload: true,
        }
    },
    computed: {
        ...mapGetters({
            status: 'Product/responseStatus',
            category: 'Category/responseData',
            productData: 'Product/responseData',
        }),
        product: self =>
            self.productData
                .filter(p => p.batch_id === self.$route.params.id)
                .first(),
    },
    methods: {
        ...mapActions('Product', ['update']),

        getImgUrl(image) {
            return '/img/product/' + image
            // return 'https://medtrading.org/img/product/' + image
            // return require('@/assets/images/product/' + image)
        },
        handleImage(e) {
            const selectedImage = e.target.files[0]
            this.createBase64Image(selectedImage)
        },
        createBase64Image(fileObject) {
            const reader = new FileReader()
            reader.onload = e => {
                this.product.image = e.target.result
                this.upload = false
            }
            reader.readAsDataURL(fileObject)
        },

        async sendRequest() {
            await this.update(this.product)
        },
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
