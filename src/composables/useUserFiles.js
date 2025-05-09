import { supabase } from '@/supabase'

export function useUserFiles() {

    async function listFiles() {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError || !user) throw new Error('Not logged in')

        const folderPath = `${user.id}/`

        const { data, error } = await supabase
            .storage
            .from('user-files')
            .list(folderPath, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            })

        if (error) throw error

        // получить ссылки
        const files = await Promise.all(
            data.map(async (item) => {
                const path = folderPath + item.name
                const { data: { publicUrl } } = supabase.storage.from('user-files').getPublicUrl(path)
                return {
                    name: item.name,
                    size: item.metadata.size,
                    url: publicUrl,
                    dateUploaded: new Date(),
                }
            })
        )

        return files
    }

    return { listFiles }
}
