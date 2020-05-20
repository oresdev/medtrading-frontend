<template>
    <section>
        <h1>Добавить товар</h1>

        <form submit.prevent>
            <label for="">Наименование</label>
            <input type="text" v-model="form.name" />

            <label for="">Описание товара</label>
            <textarea v-model="form.description" />

            <label for="">Стоимость</label>
            <input type="text" v-model="form.price" v-filter="'[0-9]'" />

            <label for="">Колличество</label>
            <input type="text" v-model="form.quantity" v-filter="'[0-9]'" />

            <label for="">Номер товара</label>
            <input type="text" v-model="form.batch_id" v-filter="'[0-9]'" />

            <label for="">Категория</label>
            <select v-model="selected">
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

            <label for="">Минимальный заказ</label>
            <input
                type="text"
                v-model="form.minimal_order"
                v-filter="'[0-9]'"
            />

            <label for="">Вес партии</label>
            <input type="text" v-model="form.weight" v-filter="'[0-9]'" />

            <label for="">Дополнительная информация о товаре</label>
            <textarea name="body" v-model="form.body" />

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
            selected: '',
            form: {
                name: '',
                public_name: '',
                description: '',
                body: '',
                price: '',
                quantity: '',
                batch_id: '',
                category_id: '',
                manufacturer: '',
                country: 'Китай',
                minimal_order: '',
                weight: '',
                image: '',
            },
        }
    },
    computed: {
        ...mapGetters({
            status: 'Product/responseStatus',
            category: 'Category/responseData',
        }),
    },
    methods: {
        ...mapActions('Product', ['create']),

        handleImage(e) {
            const selectedImage = e.target.files[0]
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
