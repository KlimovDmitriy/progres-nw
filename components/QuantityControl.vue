<template>
  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
    <button
        @click="handleDecrease"
        class="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold disabled:opacity-50"
        :class="{ 'px-4': large }"
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
        class="text-center border-none focus:outline-none py-2 font-semibold"
        :class="large ? 'w-16' : 'w-12'"
    />
    <button
        @click="handleIncrease"
        class="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-semibold"
        :class="{ 'px-4': large }"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

interface Props {
  quantity: number
  itemId: string
  large?: boolean
}

const props = defineProps<Props>()
const { updateQuantity } = useCart()

function handleIncrease() {
  if (props.quantity < 99) {
    updateQuantity(props.itemId, props.quantity + 1)
  }
}

function handleDecrease() {
  if (props.quantity > 1) {
    updateQuantity(props.itemId, props.quantity - 1)
  }
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = Math.max(1, Math.min(99, parseInt(target.value) || 1))
  updateQuantity(props.itemId, value)
}
</script>