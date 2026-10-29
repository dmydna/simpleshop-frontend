import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter as Router } from 'react-router-dom';
import "@/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

async function enableMocking() {
  // ✅ Opción 1 (Recomendada en Vite): Usar la propiedad booleana DEV
/*  if (!import.meta.env.DEV) {
    return;
  }*/

  // ✅ Opción 2: Si prefieres comparar strings, se usa .MODE
  // if (import.meta.env.MODE !== 'development') { return; }

  const { worker } = await import('@/mocks/browser');

// Registrar el listener para reactivar MSW tras inactividad
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      worker.start({
        onUnhandledRequest: 'bypass',
        quiet: true, // Evita spam de logs en la consola al reanudarse
      });
    }
  });

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
});
