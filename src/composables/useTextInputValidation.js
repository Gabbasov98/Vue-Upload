import { ref } from 'vue'

export function useTextInputValidation(initialValue  = '', minWidth = 0) {
    const value = ref(initialValue)

    function isCorrect() {
        if(value.value.trim() === ''){
            return 'Field is Required'
        }

        if(value.value.trim().length < minWidth){
            return `Field should have as less ${minWidth} characters`
        }

        return ''
    }

    return {
        value,
        isCorrect
    }
}
