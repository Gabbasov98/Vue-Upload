import { ref, readonly, onMounted } from 'vue'
import { supabase } from '#/supabase'

const currentUser = ref(null)
const isLoading = ref(false)

onMounted(async() => {
    const { data: { user } } = await supabase.auth.getUser()
    currentUser.value = user
    isLoading.value = false

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        currentUser.value = session?.user || null
    })

    onUnmounted(() => {
        listener.subscription.unsubscribe()
    })
})

export function useAuth() {
    async function login(email, password, rememberMe = false) {
        isLoading.value = true
        const storage = rememberMe ? 'localStorage' : 'sessionStorage'

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
                options: { storage }
            })
            if (error) throw error
            const { data: { user } } = await supabase.auth.getUser()
            currentUser.value = user
        } finally {
            isLoading.value = false
        }
    }

    async function register(email, password) {
        isLoading.value = true
        try {
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) throw error
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        try {
            await supabase.auth.signOut()
            currentUser.value = null
        } finally {
            isLoading.value = false
        }
    }

    return {
        user: readonly(currentUser),
        isLoading: readonly(isLoading),
        login,
        register,
        logout
    }
}
