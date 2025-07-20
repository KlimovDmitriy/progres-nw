import { ref } from 'vue'

export function useProducts() {
    const products = ref<any[]>([])
    const pending = ref(false)
    const error = ref<string | null>(null)

    function generateId(product: any): string {
        return product.id || `${product.name}_${product.price}`
    }

    async function fetchProducts(category: string) {
        if (!category) return

        pending.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/sobes/category/${category}`)
            const data = response?.data
            const arr = data?.products || []

            products.value = arr.map((p: any) => ({
                ...p,
                id: generateId(p)
            }))

            return {
                products: products.value,
                categoryName: data?.info?.name || ''
            }
        } catch (err) {
            error.value = 'Ошибка загрузки товаров'
            console.error('Ошибка загрузки товаров:', err)
            throw err
        } finally {
            pending.value = false
        }
    }

    return {
        products,
        pending,
        error,
        fetchProducts
    }
}