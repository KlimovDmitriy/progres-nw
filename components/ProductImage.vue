<template>
  <div class="relative mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
    <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-300"
    />
    <div v-else class="w-full h-48 flex items-center justify-center">
      <div class="text-6xl text-gray-300">📦</div>
    </div>
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt: string
}

defineProps<Props>()
</script>