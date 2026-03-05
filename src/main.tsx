import './main.css'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'

// happens too late, sounds already loaded in the imports above
// (window as any).applicationBaseUrl = "";

createRoot(document.getElementById('root')!).render(<App />);
