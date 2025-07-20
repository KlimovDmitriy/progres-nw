<template>
  <span v-if="count > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border border-white animate-bounce">
    {{ count }}
  </span>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'
const { cart } = useCart()
const count = computed(() => cart.value.reduce((sum, i) => sum + i.quantity, 0))
</script> 