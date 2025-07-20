<template>
  <div class="mb-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">Выберите категорию</h3>
    <div class="flex flex-wrap gap-3 justify-center">
      <NuxtLink
          v-for="cat in categories"
          :key="cat"
          :to="`/?category=${cat}`"
          class="group relative px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          :class="cat === selected
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'"
      >
        <span class="relative z-10">{{ getCategoryName(cat) }}</span>
        <div v-if="cat === selected" class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30"></div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'

defineProps<{
  selected: string
}>()

const { categories, getCategoryName } = useCategories()
</script>