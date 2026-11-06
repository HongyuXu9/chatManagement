# ChatManagement

## Anteprima e debug

Eseguire `npm run build`, poi `npm run preview` e aprire http://127.0.0.1:4173. Premere **Carica esempi** per provare ricerca e selezione senza accedere agli account. La console integrata mostra gli ultimi 100 eventi e gli errori; **Svuota console** li cancella. In demo l'apertura delle chat è disabilitata. La lettura reale richiede l'estensione installata. I log restano in memoria e si azzerano chiudendo la pagina o il popup.

Base di un'estensione Chrome/Edge in TypeScript, senza framework. Il compilatore produce il JavaScript eseguito dal browser.

## Sviluppo

### Struttura

- `src/popup.ts`: stato della schermata, eventi e rendering.
- `src/services/browser.ts`: lettura della pagina e apertura delle chat.
- `src/debug/console.ts`: registro locale degli eventi.
- `src/demo/chats.ts`: dati di esempio.
- `src/types.ts`: tipi condivisi.
- `public/`: interfaccia, stile e manifest dell'estensione.
- `scripts/`: build e server di anteprima.

Le convenzioni per i prossimi interventi sono in `AGENTS.md`. I moduli usano import `.js` per funzionare nel browser senza bundler.

`npm install`, poi `npm run build`. Per il solo controllo dei tipi: `npm run typecheck`.

## Installazione locale

Aprire `chrome://extensions` o `edge://extensions`, attivare la modalità sviluppatore e scegliere **Carica estensione non pacchettizzata**, selezionando la cartella `dist` di questo progetto.

Aprire un servizio supportato, espandere la cronologia e premere l'icona dell'estensione. Sono disponibili lettura dei link caricati, ricerca, selezione multipla e apertura di una singola chat selezionata. La selezione si azzera chiudendo il popup.

Questa è una base da verificare sulle pagine reali: i rilevatori di ChatGPT, Gemini e Google AI Mode sono euristiche e non garantiscono l'inventario completo. Non vengono chiamate API private. Nessun contenuto è inviato a servizi esterni e non ci sono operazioni di eliminazione, rinomina, archiviazione o spostamento implementate.

Prossimi passi: verificare gli adattatori sui servizi reali; aggiungere anteprima e risultati delle operazioni in blocco, con conferma esplicita delle eliminazioni; integrare regole e motori AI opzionali.
