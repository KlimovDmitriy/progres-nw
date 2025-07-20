
<template>
  <div>
    <div v-if="currentCategoryName" class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ currentCategoryName }}</h2>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p class="text-gray-600 text-lg">Загружаем товары...</p>
    </div>

    <div v-else-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :quantity="quantities[product.id] || 1"
          @increase="handleIncrease"
          @decrease="handleDecrease"
          @update-quantity="handleUpdateQuantity"
          @add-to-cart="handleAddToCart"
      />
    </div>

    <div v-else class="text-center py-16">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Товары не найдены</h3>
      <p class="text-gray-500">В этой категории пока нет товаров</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuantityControl } from '~/composables/useQuantityControl'

interface Product {
  id: string
  name: string
  price: number
  image?: string
}

const props = defineProps<{
  products: Product[]
  loading: boolean
  currentCategoryName?: string
}>()

const emit = defineEmits<{
  addToCart: [product: Product, quantity: number]
}>()

const quantities = ref<Record<string, number>>({})
const { increase, decrease, update } = useQuantityControl()

watch(() => props.products, (newProducts) => {
  newProducts.forEach(product => {
    if (!quantities.value[product.id]) {
      quantities.value[product.id] = 1
    }
  })
}, { immediate: true })

function handleIncrease(productId: string) {
  increase(quantities.value, productId)
}

function handleDecrease(productId: string) {
  decrease(quantities.value, productId)
}

function handleUpdateQuantity(productId: string, value: number) {
  update(quantities.value, productId, value)
}

function handleAddToCart(product: Product, quantity: number) {
  emit('addToCart', product, quantity)
}
</script>