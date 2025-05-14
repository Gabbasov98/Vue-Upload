import { supabase } from '#/supabase'
import { useUserStore } from '#/stores/useUserStore'

export function useStorageDelete() {
    async function deleteFileFromStorage(fileName) {
        const userStore = useUserStore();
        const user = await userStore.fetchUser()

        if (!user) throw new Error('Not logged in')

        const filePath = `${user.id}/${fileName}`

        const { error } = await supabase
            .storage
            .from('user-files')
            .remove([filePath])

        if (error) throw error
    }

    return { deleteFileFromStorage }
}
