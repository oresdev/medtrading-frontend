<template>
    <div>
        <h1>Добавить товар</h1>
        <form submit.prevent>
            <input
                type="text"
                v-model="form.name"
                :placeholder="`Наименование`"
            />
            <input
                type="text"
                v-model="form.description"
                :placeholder="`Описание товара`"
            />
            <input
                type="text"
                v-model="form.price"
                :placeholder="`Стоимость`"
            />
            <input
                type="text"
                v-model="form.quantity"
                :placeholder="`Колличество`"
            />
            <input
                type="text"
                v-model="form.batch_id"
                :placeholder="`Номер товара`"
            />
            <input
                type="text"
                v-model="form.category_id"
                :placeholder="`Категория`"
            />
            <input
                type="text"
                v-model="form.manufacturer"
                :placeholder="`Производитель`"
            />
            <input type="text" v-model="form.country" :placeholder="`Страна`" />
            <input
                type="text"
                v-model="form.minimal_order"
                :placeholder="`Минимальный заказ`"
            />
            <input
                type="text"
                v-model="form.weight"
                :placeholder="`Вес партии`"
            />
            <textarea
                name="body"
                v-model="form.body"
                cols="30"
                rows="10"
            ></textarea>
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
                name: '',
                public_name: '',
                description: 'Описание товара',
                body: 'Дополнительная информация о товаре',
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
        }),
    },
    methods: {
        ...mapActions('Product', ['create']),

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
