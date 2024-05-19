// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // Add your translations here
        welcome: 'Welcome to Solar Co.',
        home: 'Home',
        about: 'About',
        products: 'Products',
        services: 'Services',
        contact: 'Contact',
        getQuote: 'Get Quote',
        admin: 'Admin',
        login: 'Login',
        signup: 'Signup',
      },
    },
    es: {
      translation: {
        // Add your translations here
        welcome: 'Bienvenido a Solar Co.',
        home: 'Inicio',
        about: 'Acerca de',
        products: 'Productos',
        services: 'Servicios',
        contact: 'Contacto',
        getQuote: 'Obtener Cotización',
        admin: 'Administrar',
        login: 'Iniciar sesión',
        signup: 'Registrarse',
      },
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
