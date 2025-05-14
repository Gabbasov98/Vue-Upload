// stores/useUserStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '#/supabase';

export const useUserStore = defineStore('userStore', () => {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const hasFetched = ref(false);

    async function fetchUser(force = false) {
        if (hasFetched.value && !force) return user.value;

        loading.value = true;
        error.value = null;

        try {
            const { data, error: fetchError } = await supabase.auth.getUser();
            if (fetchError) throw fetchError;

            user.value = data.user;
            hasFetched.value = true;
        } catch (err) {
            error.value = err.message;
            user.value = null;
        } finally {
            loading.value = false;
        }

        return user.value;
    }

    return {
        user,
        loading,
        error,
        hasFetched,
        fetchUser
    };
});
