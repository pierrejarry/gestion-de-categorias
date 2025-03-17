import { http, HttpResponse } from 'msw';
import data from './data.json'

let categories = data.categories;

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

    http.get('*', ({ request }) => {
        if (request.url.includes('pexels') || request.url.includes('fonts')) {
            return; 
        }
    
        console.warn('Unhandled request:', request.url);
        return new HttpResponse(null, { status: 404 });
    })
];