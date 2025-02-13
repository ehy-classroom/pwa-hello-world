# Progressive Web App (PWA) „Hello World!“

Diese einfache Progressive Web App (PWA) demonstriert das Anzeigen von „Hello World!” in verschiedenen Sprachen, die Offline-Verfügbarkeit durch einen Service Worker und das Installieren im Browser.

---

## Was ist eine PWA?

Eine **Progressive Web App** verbindet Eigenschaften moderner Websites (z.B. Responsiveness) mit Funktionen nativ installierbarer Apps (Offline-Fähigkeit, Home-Bildschirm-Icon). Sie ist über eine URL erreichbar, lässt sich aber dank Manifest und Service Worker auch am Desktop oder Mobilgerät wie eine App installieren.

---

## Struktur der App

```plaintext
pwa-hello-world/
├── index.html
├── assets/
│   └── js/
│       ├── service-worker-registration.js
│       └── translation.js
├── service-worker.js
├── manifest.json
└── languages.json
```

---

## Aufbau und Funktionalität

Die App besteht aus folgenden Dateien:

1. **`index.html`**  
   Enthält die Grundstruktur mit Buttons zur Übersetzung und einem Skriptverweis auf die Service-Worker-Registrierung.  
   ```html
   <!-- Auszug aus index.html -->
   <h1 id="title">Hello World!</h1>
   <button onclick="translateText('fr', this)">French</button>
   <button onclick="translateText('de', this)">German</button>
   <button onclick="translateText('it', this)">Italian</button>
   <button onclick="translateText('zh-CN', this)">Chinese</button>
   <button onclick="translateRandom(this)">Random</button>
   <button onclick="resetText(this)" class="active">English</button>
   <script src="assets/js/translation.js"></script>
   ```

2. **`assets/js/service-worker-registration.js`**  
   Enthält die Registrierung des Service Workers.  
   ```javascript
   // Auszug aus service-worker-registration.js
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/service-worker.js').then(
         () => console.log('Service Worker registered.'),
         err => console.log('Service Worker registration failed:', err)
       );
     });
   }
   ```

3. **`assets/js/translation.js`**  
   Enthält die Logik zur Übersetzung des Textes „Hello World!” in verschiedene Sprachen.  
   ```javascript
   // Auszug aus translation.js
   async function translateText(langCode, button) {
     highlightButton(button);
     try {
       const response = await fetch('languages.json');
       const data = await response.json();
       const translation = data.languages.find(lang => lang.code === langCode)?.translation;
       if (translation) {
         document.getElementById("title").innerText = translation;
       } else {
         console.error("Translation not found for language code:", langCode);
       }
     } catch (error) {
       console.error("Translation error:", error);
     }
   }
   ```

4. **`service-worker.js`**  
   Enthält den Service Worker, der die App offline verfügbar macht.  
   ```javascript
   // Auszug aus service-worker.js
   const CACHE_NAME = 'pwa-sample-cache-v1';
   const urlsToCache = [
     '/',
     '/index.html',
     '/manifest.json'
   ];
   
   self.addEventListener('install', event => {
     event.waitUntil(
       caches.open(CACHE_NAME)
         .then(cache => cache.addAll(urlsToCache))
         .catch(err => console.error('Cache add failed:', err))
     );
   });
   
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request)
         .then(response => response || fetch(event.request))
     );
   });
   ```

5. **`manifest.json`**  
   Enthält die Metadaten der PWA.  
   ```json
   {
     "name": "Sample PWA",
     "short_name": "SamplePWA",
     "start_url": ".",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#000000",
     "icons": [
       {
         "src": "icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

6. **`languages.json`**  
   Enthält die Übersetzungen für „Hello World!” in verschiedenen Sprachen. Beispiel:
   ```json
   {
     "code": "en",
     "englishName": "English",
     "germanName": "Englisch",
     "nativeName": "English",
     "translation": "Hello World!"
   }
   ```

---

## Wichtige Konzepte einer PWA

### `manifest.json`

Die `manifest.json` Datei enthält Metadaten, die dem Browser helfen, die PWA zu erkennen und zu installieren. Sie definiert unter anderem den Namen der App, das Start-URL, das Erscheinungsbild (z.B. Hintergrund- und Themenfarbe) und die Icons. Hier ein Beispiel:

```json
{
  "name": "Sample PWA",
  "short_name": "SamplePWA",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### `service-worker.js`

Der Service Worker ist ein Skript, das im Hintergrund läuft und Netzwerk-Anfragen abfängt, um die App offline verfügbar zu machen. Er kann Ressourcen cachen und bei Bedarf aus dem Cache liefern. Hier ein Beispiel:

```javascript
const CACHE_NAME = 'pwa-sample-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.error('Cache add failed:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

---

## Installation der Web App

### Chrome

1. Öffnen Sie die Web App in Google Chrome.
2. Klicken Sie auf das Menü-Symbol (drei Punkte) in der oberen rechten Ecke des Browsers.
3. Wählen Sie „Installieren” oder „Zum Startbildschirm hinzufügen”.
4. Folgen Sie den Anweisungen, um die App zu installieren.

### Opera

1. Öffnen Sie die Web App in Opera.
2. Klicken Sie auf das Menü-Symbol (drei Punkte) in der oberen rechten Ecke des Browsers.
3. Wählen Sie „Installieren” oder „Zum Startbildschirm hinzufügen”.
4. Folgen Sie den Anweisungen, um die App zu installieren.

### Edge

1. Öffnen Sie die Web App in Microsoft Edge.
2. Klicken Sie auf das Menü-Symbol (drei Punkte) in der oberen rechten Ecke des Browsers.
3. Wählen Sie „Apps” und dann „Diese Seite als App installieren”.
4. Folgen Sie den Anweisungen, um die App zu installieren.

### Safari

1. Öffnen Sie die Web App in Safari auf Ihrem iPhone oder iPad.
2. Tippen Sie auf das Teilen-Symbol (Quadrat mit Pfeil nach oben) am unteren Bildschirmrand.
3. Wählen Sie „Zum Home-Bildschirm”.
4. Folgen Sie den Anweisungen, um die App zu installieren.

