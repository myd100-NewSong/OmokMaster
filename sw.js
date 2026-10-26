// 이전 아이폰용 앱이 남긴 캐시/서비스워커를 정리하고 스스로 해제하는 파일 (덮어쓰기 용도)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll()) c.navigate(c.url);
})()));
