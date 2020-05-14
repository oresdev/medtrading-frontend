<template>
    <section class="wrapper">
        <h1 v-text="get_category[0].name" />
        <p v-text="get_category[0].description" />

        <div class="articles">
            <!-- Articles -->
            <article v-for="item in get_product_by_category" :key="item.id">
                <header>
                    <img :src="item.image" alt="" />
                </header>
                <router-link
                    class="button"
                    :to="
                        `/category/${get_category[0].public_name}/${item.public_name}`
                    "
                    v-text="item.name"
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
            self.category.filter(
                c => c.public_name === self.$route.params.slug
            ),
        get_product_by_category: self =>
            self.product.filter(
                p => p.category_id === self.get_category[0].public_id
            ),
    },
    async mounted() {
        await this.$store.dispatch('Product/getAll')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
