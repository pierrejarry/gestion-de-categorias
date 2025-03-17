import { http, HttpResponse } from 'msw';
import data from './data.json'

export const handlers = [
    http.get('/categories', () => {      
        return HttpResponse.json(data);
    }),

    http.get('*', ({ request }) => {
        if (request.url.includes('pexels') || request.url.includes('fonts')) {
            return; 
        }
    
        console.warn('Unhandled request:', request.url);
        return new HttpResponse(null, { status: 404 });
    })
];