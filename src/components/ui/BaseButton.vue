<template>
    <button
            :class="['m-btn', `m-btn-${variant}`]"
            :disabled="disabled"
            :type
            @click="handleClick"
    >
        <slot />
    </button>
</template>

<script setup>
    defineOptions({
        name: 'BaseButton'
    })

    import { defineEmits } from 'vue'

    const emit = defineEmits(['click'])

    const props = defineProps({
        variant: {
            type: String,
            default: 'primary',
        },
        type: {
            type: String,
            default: 'button',
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    })

    function handleClick(event) {
        if (!props.disabled) {
            emit('click', event)
        }
    }
</script>

<style lang="scss" scoped>
.m-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all ease-out .225s;
    padding: 0 1em;
    height: 3em;
    border-radius: .5em;
    font-weight: 600;
    &:disabled{
        opacity: .7;
        pointer-events: none;
    }
    &:focus {
        box-shadow: none;
    }
    & :slotted(span){
        font-size: 1em;
        line-height: 111%;
    }
}

.m-btn-primary-outline{
    border: 1px solid $primary;
    color: $primary;
    &:hover{
        background-color: $primary;
        color: $white;
    }
}

.m-btn-primary{
    background-color: $primary;
    color: $white;
    &:hover{
        background-color: darken($primary,10%);
        color: $white;
    }
}


@media screen and (max-width: 576px){
    .m-btn{
        padding: 0 1.5em;
    }
}
</style>
