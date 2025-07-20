<template>
  <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 transform translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-full"
  >
    <div
        v-if="show"
        class="fixed bottom-6 right-6 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50"
        :class="typeClasses"
    >
      <span class="text-xl">{{ icon }}</span>
      <span class="font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  show: boolean
  message: string
  type?: 'success' | 'warning'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success'
})

const typeClasses = computed(() => {
  return props.type === 'success'
      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
      : 'bg-gradient-to-r from-orange-500 to-red-500'
})

const icon = computed(() => {
  return props.type === 'success' ? '✅' : '🗑️'
})
</script>