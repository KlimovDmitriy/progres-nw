<template>
  <div class="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
    <ProductImage :src="product.image" :alt="product.name" />

    <div class="space-y-3">
      <h3 class="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {{ product.name }}
      </h3>

      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-blue-600">{{ formatPrice(product.price) }}</span>
        <span class="text-sm text-gray-500">₽</span>
      </div>

      <div class="flex items-center gap-3 pt-2">
        <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
              @click="handleDecrease"
              class="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              :disabled="quantity <= 1"
          >
            −
          </button>
          <input
              type="number"
              :value="quantity"
              @input="handleInput"
              min="1"
              max="99"
              class="w-12 text-center border-none focus:outline-none py-2"
          />
          <button
              @click="handleIncrease"
              class="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        <button
            @click="handleAddToCart"
            class="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
        >
          🛒 В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormatting } from '~/composables/useFormatting'

interface Product {
  id: string
  name: string
  price: number
  image?: string
  [key: string]: any
}

interface Props {
  product: Product
  quantity: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  increase: [productId: string]
  decrease: [productId: string]
  updateQuantity: [productId: string, value: number]
  addToCart: [product: Product, quantity: number]
}>()

const { formatPrice } = useFormatting()

function handleIncrease() {
  emit('increase', props.product.id)
}

function handleDecrease() {
  emit('decrease', props.product.id)
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('updateQuantity', props.product.id, parseInt(target.value) || 1)
}

function handleAddToCart() {
  emit('addToCart', props.product, props.quantity)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>