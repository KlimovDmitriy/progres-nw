export function useCategories() {
    const categories = ["cat1", "cat2", "cat3"]

    function getCategoryName(cat: string): string {
        const names: Record<string, string> = {
            cat1: 'Категория 1',
            cat2: 'Категория 2',
            cat3: 'Категория 3'
        }
        return names[cat] || cat
    }

    function isValidCategory(cat: string): boolean {
        return categories.includes(cat)
    }

    return {
        categories,
        getCategoryName,
        isValidCategory
    }
}