<template>
    <!-- check response status -->
    <p
        v-if="responseStatus"
        :class="[
            responseStatus.status == 'fail' ? 'error' : 'success',
            'message',
        ]"
        v-html="responseStatus.message"
    />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            responseStatus: 'responseStatus',
        }),
    },
}
</script>

<style lang="scss" scoped></style>
