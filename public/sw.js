// Import Ultraviolet service worker
importScripts("/uv/uv.sw.js")

// Initialize Ultraviolet service worker
const sw = new UVServiceWorker()

// Handle fetch events
self.addEventListener("fetch", (event) => {
  event.respondWith(sw.fetch(event))
})
