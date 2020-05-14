<template>
    <label style="width: max-content;">
        <figure v-if="file">
            <img :src="url" />
        </figure>
        <input
            type="file"
            ref="file"
            v-on:change="upload()"
            style="display:none;"
        />
        <button
            v-if="!file"
            type="button"
            v-text="`Изображение`"
            v-on:click="choose()"
        />
        <p v-if="file" v-text="`Открепить`" v-on:click="clear()" />
    </label>
</template>

<script>
export default {
    data() {
        return {
            file: null,
            url: null,
        }
    },

    methods: {
        choose() {
            this.$refs.file.click()
        },
        upload() {
            this.file = event.target.files[0]

            this.url = URL.createObjectURL(this.file)

            this.$emit('input', this.file)
        },
        clear() {
            this.file = ''
            this.$emit('input', null)
        },
    },
}
</script>

<style lang="scss" scoped></style>
