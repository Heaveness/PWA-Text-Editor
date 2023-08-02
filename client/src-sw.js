// Import required modules from 'workbox' library.
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route the files specified in the '__WB_MANIFEST' variable.
precacheAndRoute(self.__WB_MANIFEST);

// Create a 'CacheFirst' caching strategy with specific plugins for caching responses and setting expiration.
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache responses with status codes 0 and 200.
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Set the maximum age of cached responses to 30 days.
    }),
  ],
});

// Warm the cache with specific URLs, using the 'pageCache' strategy.
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to be pre-cached in the 'pageCache'.
  strategy: pageCache,
});

// Register a route for handling navigation requests, using the 'pageCache' strategy.
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Register a route for caching images using the 'CacheFirst' strategy.
registerRoute(
  ({ request }) => request.destination === 'image', // Match only requests for images.
  new CacheFirst({
    cacheName: 'image-cache', // Set cache name for images.
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status codes 0 and 200.
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // Set the maximum age of cached images to 30 days.
      }),
    ],
  })
);
