# Attività

Le caselle completate indicano lavoro presente nel codice, non una verifica completa dei servizi esterni. Procedere nell'ordine delle priorità, aggiornando questo documento dopo ogni intervento pertinente.

## Base completata

- [x] Progetto TypeScript e build dell'estensione.
- [x] Interfaccia con ricerca e selezione multipla.
- [x] Anteprima locale con dati di esempio.
- [x] Console locale con limite di 100 eventi e pulizia manuale.
- [x] Separazione tra interfaccia, browser, demo e debug.
- [x] Istruzioni di manutenzione e documentazione dedicata.

## 1. Verificare lettura e interfaccia

- [ ] Provare anteprima ed estensione nel browser: demo, ricerca, selezione, apertura singola e console.
  Completato quando i percorsi principali funzionano anche da tastiera e non ci sono errori JavaScript.
- [ ] Verificare il rilevatore ChatGPT sulle pagine reali.
  Completato quando le chat trovate corrispondono ai collegamenti caricati, senza duplicati o collegamenti estranei.
- [ ] Verificare Google AI Mode con lo stesso criterio, documentando eventuali limiti o necessità di un adattatore diverso.
- [ ] Verificare Gemini dopo i primi due servizi.
- [ ] Gestire lettura in corso, nessun risultato ed errori, impedendo scansioni sovrapposte.
- [ ] Chiarire nell'interfaccia il limite delle chat caricate e la presenza di selezioni nascoste dal filtro.

## 2. Introdurre le operazioni in blocco

- [ ] Individuare per ciascun servizio le operazioni realmente disponibili e separare gli adattatori quando necessario.
- [ ] Scegliere e implementare la prima operazione verificabile, con anteprima delle chat coinvolte.
- [ ] Aggiungere una coda con avanzamento, esito per chat e interruzione delle azioni non ancora avviate.
- [ ] Gestire successi parziali ed errori senza ripetere azioni già completate.
- [ ] Aggiungere eliminazione multipla con elenco, conteggio e conferma esplicita.
- [ ] Aggiungere le altre operazioni supportate: spostamento, archiviazione e rinomina.

Una singola operazione è completata solo dopo aver verificato esecuzione, errore e interruzione sul servizio interessato. Non abilitare pulsanti per funzioni ancora mancanti.

## 3. Suggerimenti e preferenze

- [ ] Introdurre regole modificabili per classificare i titoli e un'anteprima delle proposte.
- [ ] Salvare le preferenze necessarie senza conservare i contenuti delle chat per impostazione predefinita.
- [ ] Progettare la scelta del motore: regole, AI locale oppure cloud abilitato dall'utente.
- [ ] Verificare accessi e condizioni dei provider prima di integrare API cloud.

## Procedura per ogni intervento

1. Leggere le convenzioni in `../AGENTS.md` e identificare l'attività specifica.
2. Analizzare solo i file necessari e modificare il minimo utile.
3. Eseguire verifiche pertinenti e indicare eventuali limiti non verificati.
4. Aggiornare lo stato qui e la specifica se cambia il comportamento previsto.
5. Creare il commit e fare push del lavoro pertinente sul branch corrente, come autorizzato dall'utente.
