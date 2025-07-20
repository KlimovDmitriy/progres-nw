export default defineEventHandler(async (event) => {
    const category = getRouterParam(event, 'category');

    try {
        const data = await $fetch(`https://api.progress-nw.ru/api/sobes/category/${category}`);
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch products'
        });
    }
});