<template>
    <transition name="modal">
        <div class="modal__mask">
            <div class="modal__container">
                <svg viewBox="0 0 18 18" v-on:click="$emit('close')">
                    <path
                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                    />
                </svg>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
