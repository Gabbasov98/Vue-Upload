<template>
    <div class="custom-check">
        <input
                type="checkbox"
                :checked="modelValue"
                @change="onChange"
                :disabled="disabled"
        />
        <label>
            <span>{{label}}</span>
        </label>
    </div>
</template>

<script setup>
    import {defineProps, defineEmits, computed} from 'vue'


    defineOptions({
        name: 'BaseCheckbox'
    })

    const props = defineProps({
        modelValue: {
            type: [Boolean, Array],
            required: true
        },
        label: {
            type: String,
        },
    })

    const emit = defineEmits(['update:modelValue'])

    function onChange(event) {
        emit('update:modelValue', event.target.checked)
    }

</script>

<style scoped lang="scss">
    .custom-check{
        position: relative;
        input{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
            &:checked~label{
                &:before{
                    background-color: transparent;
                }
            }
        }
        label{
            padding-left: 1.5em;
            position: relative;
            min-height: 1em;
            &:before{
                content: '';
                position: absolute;
                top: 50%;
                left: .09375em;
                transform: translateY(-50%);
                background-image: url(../../assets/img/check.svg);
                width: .875em;
                height: .875em;
                @include bgImgSize(100%);
                border-radius: .125em;
                background-color: $primary;
            }
        }
    }

    @media screen and (max-width: 576px) {
        .custom-check{
            &__inner{
                padding: .5em 1em;
            }
            &__icon{
                font-size: .75em;
            }
        }
    }
</style>
