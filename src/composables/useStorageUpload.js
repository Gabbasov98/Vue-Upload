import { supabase } from '#/supabase'
import { useUserStore } from '#/stores/useUserStore'
import { useTranslitera } from '#/composables/useTranslitera'

export function useStorageUpload() {
    async function uploadUserFile(file) {
        const translitera = useTranslitera()

        if (!file || !(file instanceof File)) {
            throw new Error('No file selected or invalid file')
        }

        const userStore = useUserStore();
        const user = await userStore.fetchUser()

        if (!user) throw new Error('Not logged in')

        const renamedFile = new File([file], translitera.getTranlitedWord(file.name).replace(/\s/g, ""));
        const filePath = `${user.id}/${Date.now()}_${renamedFile.name}`


        const { error } = await supabase.storage
            .from('user-files')
            .upload(filePath, renamedFile)

        if (error) throw error

        const { data } = supabase.storage.from('user-files').getPublicUrl(filePath)
        return data.publicUrl
    }

    return { uploadUserFile }
}
