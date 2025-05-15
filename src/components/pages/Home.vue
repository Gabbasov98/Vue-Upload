<template>
  <div class="home">
    <div class="home-top">
      <div class="h1">My projects</div>
      <button @click="handleLogout" class="home-top__btn violet-btn">
        <span>Logout</span>
      </button>
    </div>
    <div class="home-upload">
      <div v-if="!isLoading" class="file-input">
        <input
          @dragenter="dragOverInputFiled"
          @dragover="dragOverInputFiled"
          @dragleave="dragLeaveInputFiled"
          @drop="dragDrop"
          @change="handleFileChange"
          :class="isDrag ? '_dragged' : ''"
          type="file"
        />
        <img src="../../assets/img/upload.svg" alt="" class="file-input__img" />
        <div class="file-input__text">
          <div class="file-input__title">Start by uploading a file</div>
          <div class="file-input__desc">
            Any assets used in projects will live here. <br />
            Start creating by uploading your files.
          </div>
        </div>
        <button class="file-input__btn violet-btn">
          <img src="../../assets/img/upload-cloud.svg" alt="" />
          <span>Upload</span>
        </button>
      </div>
      <Loader v-if="isLoading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFileStore } from "#/stores/useFileStore";
import { useAuth } from "#/composables/useAuth";
import { useRouter } from "vue-router";

import Loader from "#/components/ui/Loader.vue";

const router = useRouter();
const { logout } = useAuth();

const filesStore = useFileStore();

const file = ref();
const isDrag = ref(false);
const isLoading = ref(false);

function dragOverInputFiled(event) {
  event.preventDefault();
  isDrag.value = true;
}

function dragLeaveInputFiled(event) {
  event.preventDefault();
}

function dragDrop(event) {
  event.preventDefault();
  isDrag.value = false;
  file.value = event.dataTransfer.files[0];
  handleUpload();
}

function handleFileChange(event) {
  event.preventDefault();
  file.value = event.target.files[0];
  handleUpload();
}

async function handleUpload() {
  isLoading.value = true;
  await filesStore.addFile(file.value);
  if (!filesStore.error) {
    isLoading.value = false;
    router.push("/files");
  }
}

function handleLogout() {
  logout();
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.home {
}

.home-top {
  padding: 1.25em 1.5em;
  border-bottom: 1px solid #eaecf0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-upload {
  padding: 2.5em 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.file-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    height: 300%;
    width: 400%;
    z-index: 2;
    &._dragged {
      & ~ * {
        opacity: 0.6;
      }
    }
  }
  &__img {
    width: 9.5em;
  }
  &__text {
    @include grid100gap(0.25em);
    margin-top: 0.5em;
    text-align: center;
  }
  &__title {
    font-size: 1em;
    line-height: 150%;
    font-weight: 500;
  }
  &__desc {
    color: #667085;
    font-size: 0.875em;
    line-height: 143%;
  }
  &__btn {
    width: 22em;
    max-width: 100%;

    margin-top: 1.5em;
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
