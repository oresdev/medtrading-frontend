<template>
    <section class="wrapper">
        <h1 v-text="get_product[0].name"></h1>
        <p v-text="get_product[0].description"></p>

        <div class="articles">
            <!-- Articles -->
            <article>
                <header>
                    <img src="@/assets/images/tests.jpg" alt="" />
                </header>
                <ul>
                    <li>
                        <span v-text="`Наименование: `" />{{
                            get_product[0].name
                        }}
                    </li>
                    <li>
                        <span v-text="`Стоимость: `" />{{
                            get_product[0].price
                        }}
                    </li>
                    <li>
                        <span v-text="`Колличество: `" />{{
                            get_product[0].quantity
                        }}
                    </li>
                    <li>
                        <span v-text="`Номер товара: `" />{{
                            get_product[0].batch_id
                        }}
                    </li>
                </ul>
                <button v-text="`Добавить в корзину`" />
            </article>
        </div>
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
        }),
        get_product: self =>
            self.product.filter(p => p.public_name === self.$route.params.item),
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
