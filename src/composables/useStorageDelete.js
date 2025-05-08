import { supabase } from '#/supabase'

export function useStorageDelete() {
    async function deleteFileFromStorage(fileName) {
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (!user) throw new Error('User not authenticated')

        const filePath = `${user.id}/${fileName}`

        const { error } = await supabase
            .storage
            .from('user-files')
            .remove([filePath])

        if (error) throw error
    }

    return { deleteFileFromStorage }
}
