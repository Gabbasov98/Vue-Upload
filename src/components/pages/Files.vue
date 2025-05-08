<template>
    <div class="home">
        <div class="home-top">
            <div class="h1">
                Files uploaded
            </div>
            <router-link to="/" class="file-input__btn violet-btn">
                <img src="../../assets/img/upload-cloud.svg" alt="">
                <span>Upload</span>
            </router-link>
        </div>

        <Loader v-if="filesStore.loading"/>

        <div v-if="!filesStore.loading" class="files-table">
            <div class="files-table__head">
                <div class="files-table__head-col">
                    <div class="files-table__head-title">File name</div>
                </div>
                <div class="files-table__head-col">
                    <div class="files-table__head-title">File size</div>
                </div>
                <div class="files-table__head-col">
                    <div class="files-table__head-title">Date uploaded</div>
                </div>
            </div>
            <div class="files-table__rows">
                <FileItem v-for="file in filesStore.files" :key="file.name" :file="file"></FileItem>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useFileStore } from '#/stores/useFileStore'
    import {useRouter} from "vue-router";

    import FileItem from '#/components/FileItem.vue'
    import Loader from '#/components/ui/Loader.vue'

    const router = useRouter()

    const filesStore = useFileStore()


    onMounted(() => {
        filesStore.loadFiles()
    })

</script>

<style lang="scss" scoped>
    .home {

    }

    .home-top{
        padding: 1.25em 1.5em;
        border-bottom: 1px solid #EAECF0;
        background-color: $white;
        z-index: 5;
        position: sticky;
        top: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .files-table{
        &__head{
            color: #667085;
            font-weight: 500;
            display: grid;
            grid-template-columns: calc(100% - 26.25em) 11em 11em 4.25em;
            &-col{
                padding: .75em 1.5em;
                min-height: 2.75em;
                display: flex;
                align-items: center;
            }
            &-title{
                font-size: .75em;
                line-height: 150%;
            }
        }
    }

    @media screen and (max-width: 992px) {
        .home {

        }
    }

    @media screen and (max-width: 576px) {
        .home {

        }
    }
</style>
