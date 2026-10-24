const CACHE = 'omok-v1', FILES = ['./', './index.html', './manifest.webmanifest', './icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => hit);
    return hit || net;
  }));
});
