<template>
    <div class="fg">
        <label v-if="label">{{ label }}</label>

        <div class="fg__wrapper">
            <input
                    ref="inputRef"
                    v-bind="$attrs"
                    :type="type"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    @blur="handleBlur"
                    :value="modelValueComputed"
                    @input="handleInput"
            />
            <div class="fg__nav">
                <slot />
            </div>
        </div>

        <small v-if="errorMessage" class="fg__error">{{ errorMessage }}</small>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

    defineOptions({
        name: 'BaseInput'
    })


    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
    })

    const emit = defineEmits(['update:modelValue'])

    const modelValueComputed = computed({
        get: () => props.modelValue || '',
        set: (val) => emit('update:modelValue', val)
    })

    function handleInput(event) {
        modelValueComputed.value = event.target.value
    }

    onMounted(() => {

    })

    onBeforeUnmount(() => {

    })
</script>

<style scoped lang="scss">
    .fg{
        position: relative;
        label{
            font-size: 1em;
            line-height: 100%;
            font-weight: 600;
            display: block;
            margin-bottom: .5em;
        }
        input{
            font-size: 1em;
            line-height: 150%;
            padding: 0 1em;
            width: 100%;
            height: 3.5em;
            border-radius: .5em;
            border: 1px solid #B8D6BF;
            background: $white;
            &::placeholder{
                color: rgba($darkGreen,.4);
            }
        }
        &__error{
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: .25em;
            font-size: .75em;
            line-height: 120%;
            color: red;
        }
        &__wrapper{
            position: relative;
        }
        &__nav{
            position: absolute;
            right: 1em;
            top: 50%;
            transform: translateY(-50%);
        }
        & :deep(.fg__btn) {
            width: 1.5em;
            height: 1.5em;
            @include center;
            img{
                width: 100%;
            }
        }
    }
</style>
