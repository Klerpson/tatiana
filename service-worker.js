// service-worker.js
const CACHE_NAME = 'dra-tatiana-leal-v1';
const URLS_TO_CACHE = [
  '/',
  '/es/',
  '/en/',
  '/css/style.css',
  '/js/main.js',
  '/img/logo-tatiana-leal.webp',
  // Agrega aquí más recursos estáticos importantes
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de cache: Network First, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, la guardamos en caché
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos recuperar de caché
        return caches.match(event.request);
      })
  );
});

// Manejo de notificaciones push
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/img/favicon/icon-180x180.png',
    badge: '/img/favicon/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/img/icons/checkmark.svg'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/img/icons/xmark.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Dra. Tatiana Leal', options)
  );
});