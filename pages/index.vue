<template>
  <div class="container mx-auto px-4 py-8">
    <CategorySelector :selected="selectedCategory" />

    <ProductList
        :products="products"
        :loading="pending"
        :current-category-name="currentCategoryName"
        @add-to-cart="handleAddToCart"
    />

    <NotificationToast
        :show="notification.isVisible.value"
        message="Товар добавлен в корзину!"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCart } from '~/composables/useCart'
import { useNotification } from '~/composables/useNotification'

const route = useRoute()
const selectedCategory = ref(route.query.category || "cat1")

watch(() => route.query.category, (val) => {
  selectedCategory.value = val || "cat1"
  fetchProducts()
})

const products = ref<any[]>([])
const pending = ref(false)
const currentCategoryName = ref<string>('')

function generateId(product: any) {
  return product.id || `${product.name}_${product.price}`
}

async function fetchProducts() {
  pending.value = true
  products.value = []
  try {
    const response = await $fetch(`/api/sobes/category/${selectedCategory.value}`)
    const data = response?.data
    const arr = data?.products || []
    currentCategoryName.value = data?.info?.name || ''
    products.value = arr.map((p: any) => ({ ...p, id: generateId(p) }))
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error)
  } finally {
    pending.value = false
  }
}

const { data: initialData } = await useFetch(`/api/sobes/category/${selectedCategory.value}`, {
  key: selectedCategory.value
})

if (initialData.value) {
  const data = initialData.value?.data
  const arr = data?.products || []
  currentCategoryName.value = data?.info?.name || ''
  products.value = arr.map((p: any) => ({ ...p, id: generateId(p) }))
}

const { add } = useCart()
const notification = useNotification()

function handleAddToCart(product: any, quantity: number) {
  add(product, quantity)
  notification.show()
}
</script>