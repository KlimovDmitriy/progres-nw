import { ref } from 'vue'

export function useNotification() {
    const isVisible = ref(false)

    function show(duration = 2000) {
        isVisible.value = true
        setTimeout(() => (isVisible.value = false), duration)
    }

    return {
        isVisible,
        show
    }
}