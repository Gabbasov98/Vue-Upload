<template>
    <Auth>
        <form @submit.prevent="handleLogin" class="auth-form">
            <div class="auth-form__text">
                <div class="text24 text20-tablet semi-bold-text">
                    Artificial Intelligence giving you travel recommendations
                </div>
                <div class="text16">
                    Welcome Back, Please login to your account
                </div>
            </div>

            <div class="auth-form__fields">
                <BaseInput
                        v-model="form.email"
                        label="Email "
                        placeholder="Email address"
                        type="email"
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
            </div>

            <div class="auth-form__wrap">
                <BaseCheckbox
                        v-model="form.isRemember"
                        :label="'Remember me'"
                />
                <a href="" class="auth-form__link underline-text">
                    Forgot password?
                </a>
            </div>

            <div v-if="error" class="auth-form__error">{{ error }}</div>

            <div class="auth-form__nav">
                <BaseButton
                        variant="primary"
                        type="submit"
                        :disabled="isLoading"
                >
                    <span>Login</span>
                </BaseButton>
                <BaseButton
                        variant="primary-outline"
                        @click="router.push('/registration')"
                >
                    <span>Sign Up</span>
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

    const { login, isLoading } = useAuth()
    const { getErrorMessage } = useSupabaseError ()

    console.log(isLoading.value)

    const form = reactive({
        email: '',
        password: '',
        isRemember: false,
    })
    const error = ref(null)
    const router = useRouter()

    const emailErrorMessage = ref('');
    const passwordErrorMessage = ref('');
    const passwordVisible = ref(false);

    function togglePasswordVisible() {
        passwordVisible.value = !passwordVisible.value
    }

    async function handleLogin() {
        error.value = null

        if (!form.email || !form.password) {
            error.value = 'Fill all fields'
            return
        }

        try {
            await login(form.email, form.password, form.isRemember)
            console.log("success")
            router.push('/')
        } catch (err) {
            // error.value = err.message
            error.value = err
        }
    }
</script>

<style lang="scss" scoped>
    .auth{

    }
</style>
