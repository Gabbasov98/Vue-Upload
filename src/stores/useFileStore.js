import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserFiles } from '#/composables/useUserFiles'
import { useStorageUpload } from '#/composables/useStorageUpload'
import { useStorageDelete } from '#/composables/useStorageDelete'

export const useFileStore = defineStore("fileStore", () => {
    const files = ref([]);
    const loading = ref(false)
    const error = ref(null)

    const { listFiles } = useUserFiles()
    const { uploadUserFile } = useStorageUpload()
    const { deleteFileFromStorage } = useStorageDelete()

    async function loadFiles() {
        loading.value = true
        error.value = null

        try {
            files.value = await listFiles()
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    async function addFile(file) {
        try {
            error.value = null
            await uploadUserFile(file)
            await loadFiles()
        } catch (e) {
            error.value = e.message
        }
    }

    async function deleteFile(name) {
        try {
            error.value = null
            loading.value = true

            await deleteFileFromStorage(name)

            files.value = files.value.filter(file => file.name !== name)
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    return {
        files,
        error,
        loading,
        loadFiles,
        addFile,
        deleteFile
    }
});


async function getFiles() {
    let files = []
    let error = ''

    try {
        files = await listFiles()
    } catch (e) {
        error = e.message
    }

    return {
        files,
        error
    }
}
