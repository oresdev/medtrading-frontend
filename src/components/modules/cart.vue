<template>
    <div class="cart" v-if="cart != 0">
        <ul class="cart-item" v-for="item in cart" :key="item.name">
            <li class="cart-item__title">
                {{ item.data.name }}
            </li>
            <li class="cart-item__price">
                <span>{{ item.data.price }} USD</span>
            </li>
            <li class="cart-item__quant">
                <span>{{ item.data.quantity }} шт</span>
            </li>
            <ul class="cart-item__buttons">
                <li class="cart-item__button" v-on:click="addToCart(item.data)">
                    <span>+</span>
                </li>
                <li
                    class="cart-item__button"
                    v-on:click="removeFromCart(item.data)"
                >
                    <span>-</span>
                </li>
            </ul>
        </ul>

        <ul class="cart-item">
            <li class="cart-item__total">
                <strong>Итого :</strong>{{ total }} USD
            </li>
        </ul>
    </div>

    <p v-else>В корзине пока еще нет доступных товаров.</p>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            cart: 'Product/stock',
            total: 'Product/totalPrice',
        }),
    },
    methods: {
        addToCart(product) {
            this.$store.dispatch('Product/to_cart', product)
        },

        removeFromCart(index) {
            this.$store.dispatch('Product/removeFromCart', index)
        },
    },
}
</script>

<style lang="scss" scoped></style>
