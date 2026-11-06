# Specifica del progetto

## Stato attuale

La base offre un popup dell'estensione e un'anteprima locale, ricerca nei titoli, selezione multipla, apertura di una chat reale selezionata e console degli eventi. La demo usa sei conversazioni inventate e impedisce l'apertura dei loro collegamenti.

La lettura cerca collegamenti già presenti nella pagina: non garantisce un inventario completo. Spostamento, archiviazione, rinomina, eliminazione e classificazione automatica non sono implementati. Il comportamento nelle interfacce reali dei servizi resta da verificare.

## Esperienza prevista

1. **Collegamento:** riconoscere il servizio della scheda attiva oppure spiegare perché non è supportato.
2. **Lettura:** mostrare numero di conversazioni trovate e limiti della scansione.
3. **Ricerca e selezione:** filtrare i titoli e selezionare una o più chat. “Seleziona i risultati” riguarda il filtro corrente; il conteggio deve rendere visibili anche le selezioni fuori dal filtro.
4. **Preparazione:** scegliere un'operazione disponibile per quel servizio e controllare le chat coinvolte e l'eventuale destinazione.
5. **Esecuzione:** mostrare avanzamento e consentire l'interruzione delle operazioni ancora da iniziare.
6. **Risultato:** distinguere successi, errori e chat saltate; evitare di ripetere automaticamente azioni già completate.

Archiviazione, spostamento, rinomina ed eliminazione vanno abilitate singolarmente solo quando l'adattatore del servizio le supporta. L'annullamento va offerto soltanto per operazioni effettivamente reversibili.

## Interfaccia

- Distinguere sempre anteprima con esempi e dati reali.
- Mostrare messaggi chiari per elenco vuoto, filtro senza risultati, lettura in corso ed errori.
- Usare etichette accessibili, navigazione da tastiera e layout adatto sia al popup sia alla pagina di anteprima.
- Tenere la console separata dalle azioni sulle chat. Registrare eventi ed errori senza titoli, contenuti o credenziali per impostazione predefinita.
- La console attuale conserva al massimo 100 eventi in memoria; la chiusura della pagina o del popup li elimina.

## Struttura tecnica

| Percorso | Responsabilità |
| --- | --- |
| `src/popup.ts` | Coordina stato, eventi e rendering della schermata. |
| `src/types.ts` | Tipi condivisi. |
| `src/services/browser.ts` | Accesso alla scheda, lettura dei collegamenti e apertura delle chat. |
| `src/demo/` | Dati di esempio indipendenti dagli account. |
| `src/debug/` | Console locale degli eventi. |
| `public/` | HTML, CSS e manifest dell'estensione. |
| `scripts/` | Preparazione dei file distribuiti e server di anteprima. |
| `docs/` | Obiettivi, specifica e attività. |
| `dist/` | Risultato generato, escluso da Git. |

Gli import usano estensione `.js` e funzionano come moduli nativi del browser. Non è previsto un framework nella base attuale. Le funzioni iniettate con `chrome.scripting.executeScript` devono essere autonome, senza dipendenze dal contesto del modulo.

Quando crescono le integrazioni, separare gli adattatori dei singoli servizi all'interno di `src/services/`. Ogni adattatore deve dichiarare cosa sa leggere e quali operazioni supporta. Separare la logica delle operazioni dal rendering quando viene introdotta, senza creare in anticipo livelli inutilizzati.

## Dati e integrazioni future

La base attuale mantiene elenco e selezioni in memoria. La persistenza delle preferenze sarà introdotta solo insieme alle relative funzioni. Non salvare contenuti delle chat per impostazione predefinita.

Regole locali e AI devono proporre classificazioni senza comandare direttamente operazioni distruttive. I motori locali o cloud saranno moduli opzionali; accessi, costi e disponibilità vanno verificati prima di implementarli. Gli strumenti disponibili dentro Codex non sono automaticamente disponibili all'estensione.

## Verifica delle modifiche

Eseguire controlli mirati alla funzione modificata. Verificare i tipi per le modifiche TypeScript; compilare quando cambiano moduli o risorse distribuite. Per gli adattatori servono verifiche sulle pagine reali, oltre ai controlli sul codice. Le operazioni in blocco richiedono prove di successo parziale, interruzione ed errore prima di essere considerate pronte.
