import { supabase } from '#/supabase'

export function useStorageUpload() {
    async function uploadUserFile(file) {
        if (!file || !(file instanceof File)) {
            throw new Error('No file selected or invalid file')
        }

        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('Not logged in')

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
