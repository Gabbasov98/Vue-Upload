import { supabase } from '#/supabase'
import { useUserStore } from '#/stores/useUserStore'

export function useStorageUpload() {
    async function uploadUserFile(file) {
        if (!file || !(file instanceof File)) {
            throw new Error('No file selected or invalid file')
        }

        const userStore = useUserStore();
        const user = await userStore.fetchUser()

        if (!user) throw new Error('Not logged in')

        const filePath = `${user.id}/${Date.now()}_${file.name}`

        const { error } = await supabase.storage
            .from('user-files')
            .upload(filePath, file)

        if (error) throw error

        const { data } = supabase.storage.from('user-files').getPublicUrl(filePath)
        return data.publicUrl
    }

    return { uploadUserFile }
}
