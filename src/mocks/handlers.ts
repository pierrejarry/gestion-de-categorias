import { http, HttpResponse } from 'msw';
import data from './data.json'

interface Product {
    image: string;
    title: string;
    price: number;
}

interface Category {
    name: string;
    products: Product[];
}

let categories: Category[] = data.categories;

export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json(data);
    }),

    http.delete('/categories/:categoryName/products/:productTitle', ({ params }) => {
        const { categoryName, productTitle } = params as { categoryName: string; productTitle: string };

        categories = categories.map((category) =>
            category.name === categoryName
                ? { ...category, products: category.products.filter((p) => p.title !== productTitle) }
                : category
        );

        return HttpResponse.json({ message: 'Product deleted successfully', categories });
    }),

    http.post('/categories/:categoryName/products', async ({ params, request }) => {
        const { categoryName } = params as { categoryName: string };
        const newProduct = await request.json();

        categories = categories.map((category) =>
            category.name === categoryName
                ? { ...category, products: [...category.products, newProduct] as Product[] }
                : category
        );

        return HttpResponse.json({ message: 'Product added successfully', categories });
    }),

    http.post('/categories', async ({ request }) => {
        try {
            const newCategory = await request.json() as Category;

            if (!newCategory.name) {
                return HttpResponse.json({ message: 'Category name is required' }, { status: 400 });
            }

            if (categories.some(category => category.name === newCategory.name)) {
                return HttpResponse.json({ message: 'Category already exists' }, { status: 400 });
            }

            const newCategoryObject: Category = {
                name: newCategory.name.trim(),
                products: []
            };

            categories = [...categories, newCategoryObject];

            return HttpResponse.json({ message: 'Category added successfully', categories });
        } catch (error) {
            return HttpResponse.json({ message: 'Invalid request body' }, { status: 400 });
        }
    }),

    http.get('*', ({ request }) => {
        if (request.url.includes('pexels') || request.url.includes('fonts')) {
            return;
        }

        console.warn('Unhandled request:', request.url);
        return new HttpResponse(null, { status: 404 });
    })
];