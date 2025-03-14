import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

let workerStartPromise: Promise<void> | null = null;

if (import.meta.env.MODE === 'development') {
  workerStartPromise = import('./mocks/browser.ts')
    .then(({ worker }) => {
      return worker.start();
    })
    .then(() => console.log('MSW Worker Started'))
    .catch((error) => console.error('MSW Worker Failed to Start:', error));
}

export { workerStartPromise };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
