<template>
  <component
      :is="tag"
      :to="to"
      :class="buttonClasses"
      :disabled="disabled"
      @click="handleClick"
  >
    <span v-if="icon" :class="iconClasses">{{ icon }}</span>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: string
  to?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const tag = computed(() => props.to ? 'NuxtLink' : 'button')

const buttonClasses = computed(() => {
  const base = 'font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white',
    secondary: 'bg-white border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl'
  }

  return [base, variants[props.variant], sizes[props.size]]
})

const iconClasses = computed(() => {
  return props.size === 'sm' ? 'text-base' : 'text-xl'
})

function handleClick(event: Event) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>