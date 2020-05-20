<template>
    <section class="wrapper" v-if="get_product[0]">
        <h1 v-text="get_product[0].name"></h1>
        <p v-text="get_product[0].description"></p>

        <div class="articles">
            <!-- Articles -->
            <article>
                <header>
                    <img :src="getImgUrl(get_product[0].image)" alt="" />
                </header>
            </article>

            <ul>
                <li>
                    <span v-text="`Наименование : `" />{{ get_product[0].name }}
                </li>
                <li>
                    <span v-text="`Стоимость : `" />{{ get_product[0].price }}
                    USD
                </li>
                <li>
                    <span v-text="`Номер товара : `" />#{{
                        get_product[0].batch_id
                    }}
                </li>
                <hr />
                <li>
                    <span v-text="`Колличество партии : `" />{{
                        get_product[0].quantity
                    }}
                    Кг
                </li>
                <li>
                    <span v-text="`Производитель : `" />{{
                        get_product[0].manufacturer
                    }}
                </li>
                <li>
                    <span v-text="`Страна : `" />{{ get_product[0].country }}
                </li>
                <li>
                    <span v-text="`Минимальная поставка : `" />{{
                        get_product[0].minimal_order
                    }}
                    Кг
                </li>
                <li>
                    <span v-text="`Описание товара : `" />{{
                        get_product[0].description
                    }}
                </li>
            </ul>
        </div>
        <button
            class="button button__filled"
            v-text="`Добавить в корзину`"
            @click="
                addToCart({
                    name: get_product[0].name,
                    price: get_product[0].price,
                    quantity: 1,
                    batch_id: get_product[0].batch_id,
                })
            "
        />
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            product: 'Product/responseData',
            cart: 'Product/stock',
        }),
        get_product: self =>
            self.product.filter(p => p.public_name === self.$route.params.item),
    },
    methods: {
        getImgUrl(pic) {
            return '/img/product/' + pic
            // return 'https://medtrading.org/img/product/' + pic
            // return require('@/assets/images/product/' + pic)
        },
        addToCart(product) {
            this.$store.dispatch('Product/addToCart', product)
        },
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
