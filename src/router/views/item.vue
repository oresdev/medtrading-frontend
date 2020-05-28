<template>
    <section class="wrapper" v-if="product">
        <div class="articles card">
            <!-- Articles -->
            <article>
                <header>
                    <img :src="getImgUrl(product.image)" alt="" />
                </header>
            </article>

            <ul>
                <li><span v-text="`Наименование : `" />{{ product.name }}</li>
                <li>
                    <span v-text="`Стоимость : `" />{{ product.price }}
                    USD
                </li>
                <li>
                    <span v-text="`Номер товара : `" />#{{ product.batch_id }}
                </li>
                <li>
                    <button
                        class="button button__filled"
                        v-text="`Добавить в корзину`"
                        @click="
                            addToCart({
                                name: product.name,
                                price: product.price,
                                quantity: 1,
                                batch_id: product.batch_id,
                            })
                        "
                    />
                </li>
                <hr />
                <li>
                    <span v-text="`Колличество партии : `" />{{
                        product.quantity
                    }}
                </li>
                <li>
                    <span v-text="`Вес партии : `" />{{ product.weight }} Кг
                </li>
                <li>
                    <span v-text="`Производитель : `" />{{
                        product.manufacturer
                    }}
                </li>
                <li><span v-text="`Страна : `" />{{ product.country }}</li>
                <li>
                    <span v-text="`Минимальная поставка : `" />{{
                        product.minimal_order
                    }}
                </li>
                <li v-if="product.description">
                    <span v-html="`Описание товара : `" />
                </li>
                <li
                    v-if="product.description"
                    v-html="product.description"
                ></li>
                <hr v-if="product.body" />
                <li v-if="product.body">
                    <span v-html="`Дополнительная информация : `" />
                </li>
                <li v-if="product.body" v-html="product.body"></li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            productData: 'Product/responseData',
            cart: 'Product/stock',
        }),
        product: self =>
            self.productData
                .filter(p => p.public_name === self.$route.params.item)
                .first(),
    },
    methods: {
        ...mapActions('Product', ['get_all', 'to_cart']),

        getImgUrl(pic) {
            return '/img/product/' + pic
            // return 'https://medtrading.org/img/product/' + pic
            // return require('@/assets/images/product/' + pic)
        },
        addToCart(item) {
            this.to_cart(item)
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
