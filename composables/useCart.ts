import { ref, watch, computed } from 'vue'

const CART_KEY = 'nuxt3-shop-cart-v1'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  [key: string]: any
}

const cart = ref<CartItem[]>([])

function isClient() {
  return typeof window !== 'undefined'
}

function loadCart() {
  if (isClient()) {
    const raw = localStorage.getItem(CART_KEY)
    cart.value = raw ? JSON.parse(raw) : []
  }
}

function saveCart() {
  if (isClient()) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) {
      loadCart()
    }
  })
}

watch(cart, saveCart, { deep: true })

export function useCart() {
  if (isClient() && cart.value.length === 0) loadCart()

  function add(item: any, quantity: number) {
    const idx = cart.value.findIndex((i) => i.id === item.id)
    if (idx !== -1) {
      cart.value[idx].quantity += quantity
    } else {
      cart.value.push({ ...item, quantity })
    }
  }

  function remove(id: string) {
    cart.value = cart.value.filter((i) => i.id !== id)
  }

  function updateQuantity(id: string, quantity: number) {
    const idx = cart.value.findIndex((i) => i.id === id)
    if (idx !== -1) {
      cart.value[idx].quantity = quantity
    }
  }

  function clear() {
    cart.value = []
  }

  const total = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  return {
    cart,
    add,
    remove,
    updateQuantity,
    clear,
    total
  }
} 