<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        <span class="text-xl">←</span>
        Продолжить покупки
      </NuxtLink>
    </div>

    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
        🛒 Корзина
      </h1>
      <p class="text-gray-600">Ваши выбранные товары</p>
    </div>

    <div v-if="cart.length === 0" class="text-center py-16">
      <div class="text-8xl mb-6">🛒</div>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">Корзина пуста</h2>
      <p class="text-gray-500 mb-8">Добавьте товары, чтобы они появились здесь</p>

      <NuxtLink
          to="/"
          class="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
      >
        <span>🛍️</span>
        Начать покупки
      </NuxtLink>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="space-y-4 mb-8">
        <div
            v-for="item in cart"
            :key="item.id"
            class="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div class="w-full lg:w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-4xl text-gray-300">📦</div>
              </div>
            </div>
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
              <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                    @click="decreaseQuantity(item.id)"
                    class="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold"
                    :disabled="item.quantity <= 1"
                >
                  −
                </button>
                <input
                    type="number"
                    :value="item.quantity"
                    @input="updateQuantity(item.id, parseInt($event.target.value) || 1)"
                    min="1"
                    max="99"
                    class="w-16 text-center border-none focus:outline-none py-2 font-semibold"
                />
                <button
                    @click="increaseQuantity(item.id)"
                    class="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold"
                >
                  +
                </button>
              </div>
            </div>
            <div class="flex flex-col items-end gap-3">
              <div class="text-right">
                <div class="text-sm text-gray-500">Сумма:</div>
                <div class="text-2xl font-bold text-blue-600">
                  {{ formatPrice(item.price * item.quantity) }} ₽
                </div>
              </div>
              <button
                  @click="removeItem(item.id)"
                  class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <span>🗑️</span>
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="text-center sm:text-left">
            <div class="text-lg text-gray-600 mb-1">Общая стоимость:</div>
            <div class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {{ formatPrice(total) }} ₽
            </div>
            <div class="text-sm text-gray-500 mt-1">
              Товаров: {{ cartItemsCount }}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button
                @click="clearCart"
                class="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
            >
              <span>🗑️</span>
              Очистить корзину
            </button>

            <button
                @click="handleCheckout"
                class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span>💳</span>
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>

    <NotificationToast
        :show="notification.isVisible.value"
        message="Товар удален из корзины"
        type="warning"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'
import { useNotification } from '~/composables/useNotification'
import { useFormatting } from '~/composables/useFormatting'

const { cart, remove, updateQuantity, clear, total } = useCart()
const notification = useNotification()
const { formatPrice } = useFormatting()

const cartItemsCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

function increaseQuantity(itemId: string) {
  const item = cart.value.find(i => i.id === itemId)
  if (item && item.quantity < 99) {
    updateQuantity(itemId, item.quantity + 1)
  }
}

function decreaseQuantity(itemId: string) {
  const item = cart.value.find(i => i.id === itemId)
  if (item && item.quantity > 1) {
    updateQuantity(itemId, item.quantity - 1)
  }
}

function removeItem(itemId: string) {
  remove(itemId)
  notification.show()
}

function clearCart() {
  if (confirm('Вы уверены, что хотите очистить корзину?')) {
    clear()
    notification.show()
  }
}

function handleCheckout() {
  alert('Функция оформления заказа пока не реализована')
}
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>