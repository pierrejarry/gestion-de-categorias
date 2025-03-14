import { http, HttpResponse } from 'msw';
import data from './data.json'

export const handlers = [
    http.get('/categories', () => {      
        console.log("Intercepted request to /categories"); 
        return HttpResponse.json(data);
    })
];