import { http, HttpResponse } from 'msw';
import data from './data.json'

export const handlers = [
    http.get('/categories', () => {      
        console.log("Intercepted request to /categories"); 
        return HttpResponse.json(data);
    }),

    http.get('*', ({ request }) => {
        if (request.url.includes('pexels')) {
            return; 
        }
    
        console.warn('Unhandled request:', request.url);
        return new HttpResponse(null, { status: 404 });
    })
];