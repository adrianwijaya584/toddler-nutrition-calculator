if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>n(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(c.map((e=>d[e]||t(e)))).then((e=>(a(...e),r)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts("fallback-J2RiDWdwnEmvHt7H1ktZP.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/J2RiDWdwnEmvHt7H1ktZP/_buildManifest.js",revision:"3de21d62603a7b6c4797a299b7d836e2"},{url:"/_next/static/J2RiDWdwnEmvHt7H1ktZP/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/144-346c17d9958dabcb.js",revision:"346c17d9958dabcb"},{url:"/_next/static/chunks/227.00239826bccb893e.js",revision:"00239826bccb893e"},{url:"/_next/static/chunks/2f34ac31-5db49858fa73aedf.js",revision:"5db49858fa73aedf"},{url:"/_next/static/chunks/3890df9f-ecccf50d98c8458d.js",revision:"ecccf50d98c8458d"},{url:"/_next/static/chunks/490.c00de210711973c7.js",revision:"c00de210711973c7"},{url:"/_next/static/chunks/557.1e74bc1597844ec0.js",revision:"1e74bc1597844ec0"},{url:"/_next/static/chunks/891.0fb96367a06f3891.js",revision:"0fb96367a06f3891"},{url:"/_next/static/chunks/910-64e549a78c9a8005.js",revision:"64e549a78c9a8005"},{url:"/_next/static/chunks/ad5b4471.0f425a8ab4abf156.js",revision:"0f425a8ab4abf156"},{url:"/_next/static/chunks/d3a2d874-87d8b0d9c3bc0487.js",revision:"87d8b0d9c3bc0487"},{url:"/_next/static/chunks/e3e17ba0-0e17212bf8e6fb7d.js",revision:"0e17212bf8e6fb7d"},{url:"/_next/static/chunks/f2c4e163-564ca215b5815fa3.js",revision:"564ca215b5815fa3"},{url:"/_next/static/chunks/framework-ac88a2a245aea9ab.js",revision:"ac88a2a245aea9ab"},{url:"/_next/static/chunks/main-9c634e70dfaf8df5.js",revision:"9c634e70dfaf8df5"},{url:"/_next/static/chunks/pages/404-75a0cf4e639364b0.js",revision:"75a0cf4e639364b0"},{url:"/_next/static/chunks/pages/_app-4c32961dbeef984f.js",revision:"4c32961dbeef984f"},{url:"/_next/static/chunks/pages/_error-42eec985c2ae412a.js",revision:"42eec985c2ae412a"},{url:"/_next/static/chunks/pages/_offline-a0cd1b6c7db8c7d4.js",revision:"a0cd1b6c7db8c7d4"},{url:"/_next/static/chunks/pages/index-b861b7a8b00385c6.js",revision:"b861b7a8b00385c6"},{url:"/_next/static/chunks/pages/pdf-5c5f4264cff62d66.js",revision:"5c5f4264cff62d66"},{url:"/_next/static/chunks/pages/psg-c5d181ba907f9e2e.js",revision:"c5d181ba907f9e2e"},{url:"/_next/static/chunks/pages/resep-7956b276816c9074.js",revision:"7956b276816c9074"},{url:"/_next/static/chunks/pages/resep/%5Bname%5D-f4ef567369e13062.js",revision:"f4ef567369e13062"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-e5b57051188f1fba.js",revision:"e5b57051188f1fba"},{url:"/_next/static/css/3c7d3cb08e634817.css",revision:"3c7d3cb08e634817"},{url:"/_offline",revision:"J2RiDWdwnEmvHt7H1ktZP"},{url:"/app.webmanifest",revision:"1b2096d741e1cffb572a4142ef98fca6"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/icon-128x128.png",revision:"34d9d8d646af9f294d968811da10e546"},{url:"/icons/icon-144x144.png",revision:"2dd174daa627ee198c37c9dfe8cdc34d"},{url:"/icons/icon-152x152.png",revision:"42ee3d984a8d535d697ccbb4428e8647"},{url:"/icons/icon-192x192.png",revision:"923e1610b9d68d2445eb28d6e0f54aaa"},{url:"/icons/icon-384x384.png",revision:"7f775b04df567c8d90c9bad2c89e2d81"},{url:"/icons/icon-512x512.png",revision:"f6705cd9d5d52d8483a2bf9b47cb5f60"},{url:"/icons/icon-72x72.png",revision:"1d463ddf39f394788393e31e1f0e9dbc"},{url:"/icons/icon-96x96.png",revision:"7619371082a792ebb06768c13bf094bf"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
