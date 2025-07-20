<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <div class="text-center sm:text-left">
        <div class="text-lg text-gray-600 mb-1">Общая стоимость:</div>
        <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {{ formatPrice(total) }} ₽
        </div>
        <div class="text-sm text-gray-500 mt-1">
          Товаров: {{ itemsCount }}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <BaseButton variant="secondary" icon="🗑️" @click="$emit('clear')">
          Очистить корзину
        </BaseButton>

        <BaseButton variant="success" size="lg" icon="💳" @click="$emit('checkout')">
          Оформить заказ
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatting } from '~/composables/useFormatting'
import BaseButton from "~/components/ui/BaseButton.vue";

defineProps<{
  total: number
  itemsCount: number
}>()

defineEmits<{
  clear: []
  checkout: []
}>()

const { formatPrice } = useFormatting()
</script>