import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create an MSW worker instance with handlers
export const worker = setupWorker(...handlers);