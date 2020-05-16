<template>
    <section class="wrapper">
        <div class="cpanel">
            <aside>
                <ul>
                    <li>
                        <router-link
                            to="/cabinet/checkout"
                            v-text="`Мои заказы`"
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
