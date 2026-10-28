# Simple Shop - Frontend 🚀

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Interfaz de usuario responsiva y dinámica desarrollada para el e-commerce **Simple Shop**. Construida con React y Bootstrap, ofrece una experiencia de compra completa y un panel de administración avanzado.

---

## 📸 Vista Previa

[Ver Demo en línea](https://simpleshop-mock.netlify.app/)

---

## 🛠️ Tecnologías Principales

- **Framework:** React
- **Enrutamiento:** React Router
- **Estilos y UI:** Bootstrap, CSS Modules
- **Estado Global:** Context API

---

## ✨ Funcionalidades Principales

- **Sistema de Autenticación:** Vistas de Login y Registro seguras.
- **Catálogo y Búsqueda:** Búsqueda avanzada con filtros múltiples de productos.
- **Experiencia de Compra:** Carrito de compras, proceso de Checkout e Historial de pedidos.
- **Perfil de Usuario:** Gestión de cuenta y lista de deseos (Wishlist).
- **Panel Administrativo:** 
  - Dashboard con métricas.
  - Formularios CRUD dinámicos para la gestión de productos.
  - Panel de control de usuarios (bloqueo/baneo y gestión de permisos).
- **Diseño Responsivo:** Interfaz 100% adaptada para dispositivos móviles y de escritorio.

---

## 📁 Estructura del Proyecto

```text
frontend/
├── public/               # Archivos estáticos e imágenes públicas
├── src/
│   ├── components/       # Componentes reutilizables (Botones, Tarjetas, Modales)
│   ├── context/          # Manejo de estados globales (Auth, Carrito)
│   ├── pages/            # Vistas principales (Home, Admin, Checkout, Perfil)
│   ├── services/         # Configuración de peticiones a la API (Axios/Fetch)
│   ├── App.js            # Componente raíz y rutas
│   └── index.js          # Punto de entrada de la aplicación
├── Dockerfile            # Configuración de Docker para el frontend
└── package.json          # Dependencias y scripts de Node.js