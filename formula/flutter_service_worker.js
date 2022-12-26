'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "333be9cd89eeac0e2daf5de3f211d709",
"index.html": "c5c01818684ad2b2b3ae2cdf2f3d37ea",
"/": "c5c01818684ad2b2b3ae2cdf2f3d37ea",
"main.dart.js": "fe97c509e2d2cee7dc38e96cbd2a965a",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "add621b173eda3ad4b7d8e8c4ec3edce",
"assets/AssetManifest.json": "6d69a479331977d4abe1d197ba4c14a8",
"assets/NOTICES": "d5b518456effc0e6e153862ae296fb53",
"assets/FontManifest.json": "4fed4cc5aaaf83da8a0b4aa8d0d92210",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "23e885dda391e6ebe8baf3381acd9e62",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/image/8.png": "ed2279ab4800d211c7fdd791d1662382",
"assets/assets/image/9.png": "e6ea262ce453ecc51ed590c56f2a9c62",
"assets/assets/image/14.png": "e185f6db080b92c4aef98ffd19e84039",
"assets/assets/image/28.png": "eb59b12b3ed6efb4724a70020528b5ec",
"assets/assets/image/29.png": "28ff2c96731cfed2376463a24b2b83b0",
"assets/assets/image/15.png": "04935b38f8f27b1998fd5d99092b743f",
"assets/assets/image/17.png": "f3d752bc67f4d940bede7a700e557e46",
"assets/assets/image/16.png": "3c0371dfc8fbf9a2f1812d359dcce034",
"assets/assets/image/12.png": "51809f36d5a21fe8da219d983ef99b5d",
"assets/assets/image/13.png": "d5ffab68f90d3e40e066c9082624de40",
"assets/assets/image/11.png": "426ec07038c13c84a1725d56d64b4122",
"assets/assets/image/10.png": "0d88c08ee56fa06c7c9331005781ac27",
"assets/assets/image/21.png": "64236814ce8e456dbfde71f42762977a",
"assets/assets/image/20.png": "57b1e8d1f3df417b7480a37273a6892d",
"assets/assets/image/22.png": "8f8f8076141ff970f6e11ca1b7bb3ce2",
"assets/assets/image/23.png": "3dfeaee0657aa0de3299e6a031623892",
"assets/assets/image/27.png": "46eff46483f5d981fe1aa66424f26019",
"assets/assets/image/32.png": "7f4ded3acb87c3f6532f32bfafb000fe",
"assets/assets/image/26.png": "d9480b76bc1e8aa84f3f31771c11c9e6",
"assets/assets/image/18.png": "37bbed58bd726442cad1138886d36f24",
"assets/assets/image/30.png": "f8857ff0d7aedcb56c0631ac049831c9",
"assets/assets/image/24.png": "0844dd9a066f82fffedf09d1280d87b6",
"assets/assets/image/25.png": "89303974a4b0e7bcaba18afec9b3e559",
"assets/assets/image/31.png": "64ad27e9dbd09281e771041731e0ecb0",
"assets/assets/image/19.png": "b196c155ae3067aa8e27e529a6611ecd",
"assets/assets/image/4.png": "c3a7964296822380abbbc750420224a2",
"assets/assets/image/5.png": "4691493496e6c6f21ff35691d7b991d2",
"assets/assets/image/7.png": "a6c2765233cca714a605ccb4f650a2eb",
"assets/assets/image/6.png": "295210bdd20139fa6d96bd6a11f1aa05",
"assets/assets/image/2.png": "93b5279d26167067b58ab91a2e04aae9",
"assets/assets/image/3.png": "c07a8b6cc72ba1f625e94caec1f685e4",
"assets/assets/image/1.png": "43cd2aec5238c13b52b672c8e6982281",
"assets/assets/image/0.png": "4954c569b0d37387cf2d91d6bc892c37",
"assets/assets/font/NotoSansKR-Regular.otf": "210989664066c01d8ffdbdf56bb773cd",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
