export function useQuantityControl() {
    function increase(quantities: Record<string, number>, productId: string, max = 99) {
        if (quantities[productId] < max) {
            quantities[productId]++
        }
    }

    function decrease(quantities: Record<string, number>, productId: string, min = 1) {
        if (quantities[productId] > min) {
            quantities[productId]--
        }
    }

    function update(quantities: Record<string, number>, productId: string, value: number) {
        const validValue = Math.max(1, Math.min(99, value || 1))
        quantities[productId] = validValue
    }

    return {
        increase,
        decrease,
        update
    }
}