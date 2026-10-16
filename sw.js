const CACHE = 'life-rpg-shell-v40dev';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('life-rpg-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => { const req = event.request; if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return; event.respondWith(fetch(req).then(response => { if (response.ok && ASSETS.some(asset => new URL(asset, self.registration.scope).href === req.url)) { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(req,copy)); } return response; }).catch(() => caches.match(req))); });
