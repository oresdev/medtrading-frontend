<template>
    <section class="wrapper">
        <div class="cpanel">
            <aside>
                <ul>
                    <li>
                        <router-link
                            to="/cpanel/products"
                            v-text="`Управление товаром`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/products/create"
                            v-text="`Добавить товар`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/categories"
                            v-text="`Управление категориями`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/categories/create"
                            v-text="`Добавить категорию`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/users"
                            v-text="`Список пользователей`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/checkout"
                            v-text="`Список заказов`"
                        />
                    </li>
                    <li>
                        <router-link
                            to="/cpanel/callme"
                            v-text="`Список заявок`"
                        />
                    </li>
                </ul>
            </aside>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
