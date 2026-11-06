# ChatManagement

Base di un'estensione Chrome/Edge in TypeScript, senza framework. Il compilatore produce il JavaScript eseguito dal browser.

## Sviluppo

`npm install`, poi `npm run build`. Per il solo controllo dei tipi: `npm run typecheck`.

## Installazione locale

Aprire `chrome://extensions` o `edge://extensions`, attivare la modalità sviluppatore e scegliere **Carica estensione non pacchettizzata**, selezionando la cartella `dist` di questo progetto.

Aprire un servizio supportato, espandere la cronologia e premere l'icona dell'estensione. Sono disponibili lettura dei link caricati, ricerca, selezione multipla e apertura di una singola chat selezionata. La selezione si azzera chiudendo il popup.

Questa è una base da verificare sulle pagine reali: i rilevatori di ChatGPT, Gemini e Google AI Mode sono euristiche e non garantiscono l'inventario completo. Non vengono chiamate API private. Nessun contenuto è inviato a servizi esterni e non ci sono operazioni di eliminazione, rinomina, archiviazione o spostamento implementate.

Prossimi passi: verificare gli adattatori sui servizi reali; aggiungere anteprima e risultati delle operazioni in blocco, con conferma esplicita delle eliminazioni; integrare regole e motori AI opzionali.
