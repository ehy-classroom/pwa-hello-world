
# Einfache Progressive Web App (PWA) Übung

Enno Hyttrek, November 2024

---

### Einführung in Progressive Web Apps (PWA)

Eine **Progressive Web App (PWA)** ist eine Webanwendung, die wie eine native App funktioniert und auf Mobilgeräten installiert werden kann. Im Gegensatz zu herkömmlichen Websites bietet eine PWA zusätzliche Funktionen wie Offline-Betrieb, Schnellzugriff vom Startbildschirm und Vollbildanzeige.

In dieser Übung erstellen wir eine einfache PWA, die durch einen Klick auf einen Button die Nachricht „Hello World!“ anzeigt. Sie wurde speziell für Einsteiger konzipiert, um den Unterschied zwischen einer PWA und einer herkömmlichen Website deutlich zu machen.

### Ziel der Übung

Ziel dieser Übung ist es, die grundlegenden Schritte zum Erstellen einer PWA zu verstehen und den Unterschied zwischen einer mobil optimierten Website und einer installierbaren Web-App aufzuzeigen. Die wichtigsten Bestandteile einer PWA werden dabei in einfacher Form erklärt und umgesetzt.

---

### Struktur und Dateien

Für diese Übung wird folgende Struktur verwendet:

```
/hello-world-app
|-- index.html
|-- style.css
|-- app.js
|-- manifest.json
|-- sw.js
```

#### Dateien im Überblick

1. **index.html**: Die HTML-Struktur der Anwendung mit einem Button, der „Hello World!“ anzeigt.
2. **style.css**: Das CSS-Design für eine einfache, benutzerfreundliche Oberfläche.
3. **app.js**: JavaScript für den Button-Klick und die Registrierung des Service Workers.
4. **manifest.json**: Definiert die PWA-Eigenschaften wie Name, Start-URL und Icons.
5. **sw.js**: Ein Service Worker, der Offline-Funktionalität ermöglicht.

---

### Schritte zur Umsetzung

#### 1. HTML-Struktur erstellen

Erstelle eine Datei namens `index.html`, die den Grundaufbau der PWA enthält. Füge einen Button hinzu, der später eine Nachricht anzeigt:

```html
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
```

#### 2. Stil hinzufügen

Füge in `style.css` ein einfaches Styling hinzu, um die Seite ansprechend zu gestalten:

```css
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
```

#### 3. JavaScript-Funktionalität

Im `app.js` wird eine Funktion hinzugefügt, die auf den Button-Klick reagiert und „Hello World!“ anzeigt. Außerdem wird der Service Worker registriert:

```javascript
document.getElementById('helloButton').addEventListener('click', () => {
    document.getElementById('message').innerText = 'Hello World!';
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service Worker registriert');
    }).catch(error => {
        console.log('Service Worker Registrierung fehlgeschlagen:', error);
    });
}
```

#### 4. Manifest-Datei

Die `manifest.json` sorgt dafür, dass die App als PWA erkannt wird. 

```json
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

#### 5. Service Worker hinzufügen

Der `sw.js` dient zum Caching und ermöglicht Offline-Betrieb:

```javascript
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
```

---

### Unterschiede zwischen PWA und herkömmlicher Website

Ein Hauptmerkmal einer PWA ist die Möglichkeit, die Anwendung auf dem Startbildschirm zu installieren. Dadurch wird sie wie eine native App genutzt, kann offline laufen und im Vollbildmodus angezeigt werden. Eine einfache Website hingegen benötigt eine Internetverbindung und wird im Browser mit Adressleiste angezeigt.

---

### Zusammenfassung

In dieser Übung haben wir eine einfache PWA erstellt, die zeigt, wie sich eine PWA von einer typischen Website unterscheidet und welche Vorteile sie auf Mobilgeräten bietet. 

