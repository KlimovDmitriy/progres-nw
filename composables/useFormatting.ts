export function useFormatting() {
    function formatPrice(price: number): string {
        return new Intl.NumberFormat('ru-RU').format(price)
    }

    return {
        formatPrice
    }
}