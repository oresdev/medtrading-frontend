<template>
    <div class="wrapper images">
        <figure>
            <img :src="getImgUrl('1.png')" alt="" />
        </figure>
        <figure>
            <img :src="getImgUrl('2.png')" alt="" />
        </figure>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/images/' + pic)
        },
    },
}
</script>

<style lang="scss" scoped></style>
