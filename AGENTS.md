# Convenzioni di ChatManagement

- Lavorare in modo mirato: leggere solo i file pertinenti e applicare modifiche minime.
- Conservare TypeScript e le dipendenze esistenti; aggiungere strumenti solo per necessità concrete.
- Separare responsabilità: `src/popup.ts` coordina l'interfaccia; `src/services/` contiene l'accesso al browser e ai servizi; `src/debug/` gestisce la console; `src/demo/` contiene gli esempi; `src/types.ts` contiene i tipi condivisi.
- Tenere HTML e CSS leggibili in `public/`; evitare file compressi manualmente. `dist/` è generato e non va modificato a mano.
- Usare import relativi con estensione `.js`, compatibili con i moduli del browser senza bundler.
- Le funzioni passate a `chrome.scripting.executeScript` devono essere autonome: non possono usare import o variabili del modulo esterno.
- Ogni nuovo modulo servito nell'anteprima va aggiunto alla lista esplicita in `scripts/preview.mjs`.
- Mantenere la demo separata dai dati reali e impedire operazioni reali sui dati di esempio.
- Non registrare contenuti, titoli o credenziali nella console per impostazione predefinita.
- Verificare solo il comportamento coinvolto. Eseguire la build quando cambiano import o risorse distribuite; evitare test estranei al task.
- Aggiornare la documentazione quando cambiano struttura o comandi.
- Al termine di ogni intervento, dopo le verifiche pertinenti, creare il commit e fare push sul branch corrente senza chiedere ulteriore conferma, come autorizzato dall'utente. Includere solo le modifiche pertinenti; non sovrascrivere la cronologia remota con force push.
- Alla fine riportare soltanto file modificati, riepilogo e verifiche effettuate.
