<script setup>
import { ref, onMounted, defineOptions } from "vue";
import { useImageUrl } from "#/composables/useImageUrl";
import { useFileStore } from "#/stores/useFileStore";

const { getImageUrl } = useImageUrl();
const filesStore = useFileStore();

defineOptions({
  name: "FileItem",
});

const props = defineProps({
  file: {
    type: [Object],
    default: {},
    required: true,
  },
});

onMounted(async () => {});

function handleDelete() {
  console.log(props.file.name);

  filesStore.deleteFile(props.file.name);
}

function getIconName() {
  let format = props.file.name.split(".").pop();

  if (format === "jpg" || format === "png" || format === "svg") {
    return "jpg";
  }
  if (format === "mp4") {
    return "mp4";
  }
  if (format === "fig") {
    return "fig";
  }
  if (format === "framerx") {
    return "framerx";
  }

  return "pdf";
}

function getName() {
  let array = props.file.name.split("_");
  array.shift();
  return array.toString("");
}

function dateName() {
  return props.file?.dateUploaded?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getSize() {
  let size = props.file.size;
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)}KB`;
  }
  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(0)}MB`;
  }

  return size;
}
</script>

<template>
  <div class="file-item">
    <div class="file-item__col">
      <div class="file-item__icon">
        <img :src="getImageUrl(`${getIconName()}.svg`)" alt="" />
      </div>
      <div class="file-item__text">
        <div class="file-item__title">
          {{ getName() }}
        </div>
        <div class="file-item__size">
          {{ getSize() }}
        </div>
        {{ filesStore.error }}
      </div>
    </div>
    <div class="file-item__col">
      <div class="file-item__size">
        {{ getSize() }}
      </div>
    </div>
    <div class="file-item__col">
      <div class="file-item__date">
        {{ dateName() }}
      </div>
    </div>
    <div class="file-item__col">
      <button @click="handleDelete" class="file-item__btn">
        <img src="../assets/img/delete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-item {
  border-top: 1px solid #eaecf0;
  display: grid;
  grid-template-columns: calc(100% - 26.25em) 11em 11em 4.25em;
  color: #667085;
  &:last-child {
    border-bottom: 1px solid #eaecf0;
  }
  &__col {
    padding: 1em 1.5em;
    min-height: 4.5em;
    display: flex;
    align-items: center;
    &:nth-child(4) {
      justify-content: center;
    }
  }
  &__icon {
    width: 2.5em;
    height: 2.5em;
    @include center;
    border-radius: 50%;
    background-color: #f4ebff;
    margin-right: 0.75em;
    flex-shrink: 0;
    img {
      width: 1.25em;
    }
  }
  &__size,
  &__date,
  &__title {
    font-size: 0.875em;
    line-height: 143%;
  }
  &__title {
    font-weight: 500;
    color: #101828;
  }
  &__btn {
    @include center;
    width: 1.25em;
    img {
      width: 100%;
    }
  }
}

@media screen and (max-width: 576px) {
  .file-item {
    grid-template-columns: 40% 40% 20%;
    gap: 1em 0;
    padding: 1em 1.5em;
    &__col {
      padding: 0;
      min-height: unset;
      &:nth-child(1) {
        grid-column: 1/-1;
      }
      &:nth-child(4) {
        justify-content: flex-end;
      }
    }
  }
}
</style>
