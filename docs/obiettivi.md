# Obiettivi

## Scopo

ChatManagement deve rendere semplice trovare, selezionare e organizzare le conversazioni su più servizi, riducendo le operazioni ripetitive nelle rispettive interfacce web.

Il prodotto parte come estensione Chrome/Edge in TypeScript, con anteprima locale per sviluppare e provare l'interfaccia senza collegare account.

## Priorità

1. Leggere le conversazioni in modo affidabile e dichiarare se l'elenco è parziale.
2. Offrire ricerca e selezione multipla comprensibili, anche con molte chat.
3. Eseguire operazioni in blocco dove il servizio le consente, mostrando anteprima, avanzamento ed esito per ogni chat.
4. Aiutare a classificare le conversazioni con regole personalizzate.
5. Aggiungere, in seguito, motori AI locali o cloud selezionabili dall'utente.

## Servizi previsti

- Prima fase: ChatGPT e Google AI Mode.
- Fase successiva: Gemini.

Esistono già rilevatori preliminari per i tre servizi; la loro presenza non implica che siano stati verificati sulle pagine reali. Ogni servizio può offrire operazioni differenti.

## Risultato atteso della prima versione utilizzabile

L'utente apre un servizio, legge le chat disponibili, filtra i titoli, seleziona un gruppo e applica un'operazione supportata dopo averne controllato l'anteprima. Al termine vede quali chat sono state elaborate e quali richiedono attenzione.

L'eliminazione richiede una conferma esplicita con elenco e numero delle conversazioni. Un suggerimento automatico non deve avviare un'eliminazione.

## Principi

- Codice leggibile, responsabilità separate e dipendenze limitate a necessità concrete.
- Funzioni utili anche senza servizi AI a pagamento.
- Elaborazione locale come base; invio al cloud soltanto dopo l'abilitazione dell'utente.
- Analisi dei titoli come impostazione iniziale; lettura dei contenuti da progettare come opzione separata.
- Funzioni disponibili e limiti visibili, senza promettere accesso completo o annullamento quando il servizio non lo permette.

## Fuori dall'ambito iniziale

Applicazione desktop autonoma, sincronizzazione tramite un nostro backend, classificazione AI e supporto a tutti i servizi fin dal primo rilascio.
