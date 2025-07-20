<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex-1">
            <h1 class="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
              Тестовое задание
            </h1>
            <p class="text-center text-gray-600 mt-2">Климов Д.Г.</p>
          </NuxtLink>
          <ClientOnly>
            <NuxtLink
                to="/cart"
                class="relative bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span class="text-xl">🛒</span>
              <span class="hidden sm:inline">Корзина</span>
              <div
                  v-if="cartItemsCount > 0"
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse"
              >
                {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
              </div>
            </NuxtLink>

            <template #fallback>
              <NuxtLink
                  to="/cart"
                  class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2"
              >
                <span class="text-xl">🛒</span>
                <span class="hidden sm:inline">Корзина</span>
              </NuxtLink>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'

const { cart } = useCart()

const cartItemsCount = computed(() => {
  if (!cart?.value) return 0
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})
</script>