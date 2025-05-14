<template>
    <Auth>
        <form @submit.prevent="handleRegister" class="auth-form">
            <div class="auth-form__text">
                <div class="text24 text20-tablet semi-bold-text">
                    Artificial Intelligence giving you travel recommendations
                </div>
                <div class="text16">
                    Please register your account
                </div>
            </div>

            <div class="auth-form__fields">
                <BaseInput
                        v-model="form.email"
                        label="Email "
                        placeholder="Email address"
                        :errorMessage="emailErrorMessage"
                >

                </BaseInput>
                <BaseInput
                        v-model="form.password"
                        label="Password"
                        placeholder="Password"
                        :type="passwordVisible ? 'text' : 'password'"
                        :errorMessage="passwordErrorMessage"
                >
                    <button
                            class="fg__btn"
                            type="button"
                            @click="togglePasswordVisible"
                    >
                        <img src="../../assets/img/eye.svg" alt="">
                    </button>
                </BaseInput>
                <BaseInput
                        v-model="form.password2"
                        label="Repeat Password"
                        placeholder="Repeat Password"
                        :type="passwordVisible2 ? 'text' : 'password'"
                        :errorMessage="passwordErrorMessage2"
                >
                    <button
                            class="fg__btn"
                            type="button"
                            @click="togglePasswordVisible2"
                    >
                        <img src="../../assets/img/eye.svg" alt="">
                    </button>
                </BaseInput>
            </div>

            <div v-if="error" class="auth-form__error">{{ error }}</div>

            <div class="auth-form__nav">
                <BaseButton
                        variant="primary"
                        type="submit"
                        :disabled="isLoading"
                >
                    <span>Sign Up</span>
                </BaseButton>
                <BaseButton
                        variant="primary-outline"
                        @click="router.push('/login')"
                >
                    <span>Login</span>
                </BaseButton>
            </div>
        </form>
    </Auth>

</template>

<script setup>
    import { ref, reactive } from 'vue';
    import { useRouter } from 'vue-router'
    import { useAuth } from '#/composables/useAuth'
    import { useSupabaseError  } from '#/composables/useSupabaseError'

    import Auth from '#/components/layout/Auth.vue'
    import BaseInput from '#/components/ui/BaseInput.vue'
    import BaseButton from '#/components/ui/BaseButton.vue'
    import BaseCheckbox from '#/components/ui/BaseCheckbox.vue'

    // marsel1498@gmail.com
    // mydream

    const { isLoading, register } = useAuth()
    const { getErrorMessage } = useSupabaseError()

    const form = reactive({
        email: '',
        password: '',
        password2: '',
    })
    const router = useRouter()

    const emailErrorMessage = ref('');
    const passwordErrorMessage = ref('');
    const passwordErrorMessage2 = ref('');
    const passwordVisible = ref(false);
    const passwordVisible2 = ref(false);
    const error = ref(null)

    function togglePasswordVisible() {
        passwordVisible.value = !passwordVisible.value
    }

    function togglePasswordVisible2() {
        passwordVisible2.value = !passwordVisible2.value
    }

    async function handleRegister() {
        error.value = null

        if (!form.email || !form.password || !form.password2) {
            error.value = 'Fill all fields'
            return
        }

        if (form.password !== form.password2) {
            error.value = "Passwords aren't same"
            return
        }

        try {
            await register(form.email, form.password)
            router.push('/') // или куда тебе нужно
        } catch (err) {
            error.value = err
        }
    }

</script>

<style lang="scss" scoped>
    .auth{

    }
</style>
