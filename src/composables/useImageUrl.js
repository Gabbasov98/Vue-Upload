export function useImageUrl() {
    function getImageUrl(fileName) {
        return new URL(`../assets/img/${fileName}`, import.meta.url).href
    }

    return {
        getImageUrl
    }
}
