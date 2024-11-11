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
