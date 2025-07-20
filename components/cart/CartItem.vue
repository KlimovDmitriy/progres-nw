<template>
  <div class="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
      <ProductImage :src="item.image" :alt="item.name" size="small" />

      <div class="flex-1 min-w-0">
        <h3 class="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {{ item.name }}
        </h3>
        <div class="flex items-center gap-4 text-lg">
          <span class="text-gray-600">Цена:</span>
          <span class="font-bold text-blue-600">{{ formatPrice(item.price) }} ₽</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-gray-600 font-medium">Количество:</span>
        <QuantityControl :quantity="item.quantity" :item-id="item.id" large />
      </div>

      <div class="flex flex-col items-end gap-3">
        <div class="text-right">
          <div class="text-sm text-gray-500">Сумма:</div>
          <div class="text-2xl font-bold text-blue-600">
            {{ formatPrice(item.price * item.quantity) }} ₽
          </div>
        </div>

        <BaseButton variant="danger" size="sm" icon="🗑️" @click="$emit('remove', item.id)">
          Удалить
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatting } from '~/composables/useFormatting'
import BaseButton from "~/components/ui/BaseButton.vue";

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

defineProps<{
  item: CartItem
}>()

defineEmits<{
  remove: [id: string]
}>()

const { formatPrice } = useFormatting()
</script>