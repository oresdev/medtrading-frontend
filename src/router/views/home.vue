<template>
    <section>
        <carousel />

        <div class="articles">
            <!-- Articles -->
            <article v-for="item in category" :key="item.id">
                <header>
                    <img :src="item.image" alt="" />
                </header>
                <router-link
                    class="button"
                    :to="`/category/${item.public_name}`"
                    v-text="item.name"
                />
            </article>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            category: 'Category/responseData',
        }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
