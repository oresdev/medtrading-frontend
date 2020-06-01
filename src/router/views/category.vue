<template>
    <section class="wrapper" v-if="get_category">
        <h1 v-text="get_category.name" />
        <p v-html="get_category.description" />

        <div class="articles">
            <!-- Articles -->
            <article v-for="item in get_product_by_category" :key="item.id">
                <header>
                    <img :src="getImgUrl(item.image)" alt="" />
                </header>

                <ul>
                    <li><span v-text="item.name" /></li>
                    <li v-if="item.price == 0">
                        Цена: договорная <span class="articles__price" />
                    </li>
                    <li v-else>
                        Цена:
                        <span class="articles__price" v-text="item.price" />
                        ₽
                    </li>
                </ul>

                <router-link
                    class="button button__filled"
                    tag="button"
                    :to="
                        `/category/${get_category.public_name}/${item.public_name}`
                    "
                    v-text="`Подробнее`"
                />
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
            category: 'Category/responseData',
            product: 'Product/responseData',
        }),
        get_category: self =>
            self.category
                .filter(c => c.public_name === self.$route.params.slug)
                .first(),

        get_product_by_category: self =>
            self.product.filter(
                p => p.category_id === self.get_category.public_id
            ),
    },
    methods: {
        ...mapActions('Product', ['get_all']),

        getImgUrl(pic) {
            return '/img/product/' + pic
            // return 'https://medtrading.org/img/product/' + pic
            // return require('@/assets/images/product/' + pic)
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
