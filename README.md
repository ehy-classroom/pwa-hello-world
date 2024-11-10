Hier ist eine Anleitung für eine einfache PWA, die nach einem Klick auf einen Button „Hello World!“ anzeigt. Diese Übung ist ideal, um Einsteigern den Unterschied zwischen einer herkömmlichen Website und einer PWA auf mobilen Geräten näherzubringen.

Schritt 1: Projektstruktur erstellen
Erstelle die folgende Projektstruktur:

lua
Code kopieren
/simple-pwa
|-- index.html
|-- style.css
|-- app.js
|-- manifest.json
|-- sw.js
Schritt 2: HTML-Datei erstellen (index.html)
In dieser HTML-Datei erstellen wir eine einfache Benutzeroberfläche mit einem Button.

html
Code kopieren
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple PWA</title>
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
    <script defer src="app.js"></script>
</head>
<body>
    <h1>Willkommen zur einfachen PWA</h1>
    <button id="helloButton">Klicke hier!</button>
    <p id="message"></p>
</body>
</html>
Schritt 3: CSS-Datei erstellen (style.css)
Gestalte die Seite mit ein wenig CSS:

css
Code kopieren
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
Schritt 4: JavaScript-Datei erstellen (app.js)
Hier fügen wir eine einfache Klickfunktion hinzu, die „Hello World!“ anzeigt.

javascript
Code kopieren
document.getElementById('helloButton').addEventListener('click', () => {
    document.getElementById('message').innerText = 'Hello World!';
});

// Service Worker registrieren
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registriert');
    }).catch(error => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
    });
}
Schritt 5: Manifestdatei erstellen (manifest.json)
Die manifest.json sorgt dafür, dass die App als PWA erkannt wird. Dies ermöglicht es, die App auf den Home-Bildschirm zu installieren und im Vollbildmodus zu öffnen.

json
Code kopieren
{
    "name": "Simple PWA",
    "short_name": "PWA",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "description": "Eine einfache PWA, um Hello World! anzuzeigen",
    "icons": [
        {
            "src": "icon.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
Hinweis: Erstelle eine icon.png-Datei (192x192 px), die als App-Symbol angezeigt wird.

Schritt 6: Service Worker erstellen (sw.js)
Der Service Worker macht die App offlinefähig und ermöglicht das Caching. Dieser einfache Service Worker wird die Dateien cachen und später aus dem Cache laden.

javascript
Code kopieren
const cacheName = 'pwa-cache-v1';
const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Dateien werden zwischengespeichert');
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});
Schritt 7: Unterschied zwischen PWA und mobiler Website verdeutlichen
Mobil als Website öffnen: Zeige, dass die Seite im Browser wie jede Website geladen wird, aber keine Offline-Funktionalität oder Vollbildansicht hat.

PWA installieren:

Öffne die Seite auf einem Mobilgerät (Android oder iOS).
Ein „Installieren“-Button oder eine Option zum Hinzufügen auf den Home-Bildschirm erscheint (je nach Browser).
Installiere die App. Die PWA sollte jetzt im Vollbildmodus und ohne Adressleiste starten und offline funktionieren (aufgrund des Service Workers).
Dieser Unterschied veranschaulicht den Vorteil von PWAs: Sie können wie native Apps verwendet werden, während sie nur mit Webtechnologien wie HTML, CSS und JS entwickelt wurden.