<template>
    <li class="search-bar">
        <input
            type="text"
            :value="value"
            v-on:input="$emit('input', $event.target.value)"
        />
        <i v-if="value.length < 1" id="icon" class="search"></i>
    </li>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: null,
        },
    },
    data() {
        return {}
    },
}
</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped></style>
