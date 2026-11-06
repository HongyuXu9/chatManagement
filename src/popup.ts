import type { Chat } from './types.js';
import { isExtension, readActivePageChats, openChat } from './services/browser.js';
import { createDemoChats } from './demo/chats.js';
import { createDebugConsole } from './debug/console.js';
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const search = element<HTMLInputElement>('search');
const all = element<HTMLInputElement>('all');
const open = element<HTMLButtonElement>('open');
const status = element<HTMLParagraphElement>('status');
const extension = isExtension();
const debug = createDebugConsole(element('logs'));
const log = debug.log;
let demoMode = false;
let chats: Chat[] = [];
const selected = new Set<string>();
const filtered = () => chats.filter(chat => chat.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()));
function render(): void {
  const visible = filtered();
  element('chats').replaceChildren(...visible.map(chat => {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = selected.has(chat.url);
    checkbox.addEventListener('change', () => { checkbox.checked ? selected.add(chat.url) : selected.delete(chat.url); log(`Selezione: ${selected.size} chat.`); render(); });
    label.append(checkbox, document.createTextNode(chat.title));
    item.append(label);
    return item;
  }));
  const checked = visible.filter(chat => selected.has(chat.url)).length;
  all.checked = visible.length > 0 && checked === visible.length;
  all.indeterminate = checked > 0 && checked < visible.length;
  all.disabled = visible.length === 0;
  open.disabled = selected.size !== 1 || demoMode;
  element('count').textContent = `${visible.length} risultati · ${selected.size} selezionate`;
}
element('scan').addEventListener('click', async () => {
  try {
    log('Lettura avviata.');
    chats = await readActivePageChats();
    demoMode = false;
    log(`Lettura completata: ${chats.length} chat.`);
    selected.clear();
    status.textContent = chats.length ? `Lette ${chats.length} chat caricate nella pagina.` : 'Nessun collegamento a chat trovato. Espandi la cronologia e riprova. Il servizio potrebbe richiedere un adattatore dedicato.';
    render();
  } catch (error) { status.textContent = error instanceof Error ? error.message : 'Lettura non riuscita.'; log(`ERRORE: ${status.textContent}`); }
});
element('demo').addEventListener('click', () => {
  chats = createDemoChats();
  demoMode = true;
  selected.clear();
  search.value = '';
  status.textContent = 'DEMO · 6 conversazioni di esempio. Nessun accesso al tuo account.';
  log('Caricati 6 esempi. Apertura disabilitata in demo.');
  render();
});
element('clear').addEventListener('click', debug.clear);
search.addEventListener('input', () => { render(); log(`Filtro: ${filtered().length} risultati.`); });
all.addEventListener('change', () => { for (const chat of filtered()) all.checked ? selected.add(chat.url) : selected.delete(chat.url); log(`Selezione: ${selected.size} chat.`); render(); });
open.addEventListener('click', async () => {
  const chat = chats.find(chat => selected.has(chat.url));
  if (!chat || selected.size !== 1 || demoMode) return;
  try { await openChat(chat); log('Chat aperta in una nuova scheda.'); }
  catch { log('ERRORE: impossibile aprire la chat.'); }
});
if (!extension) {
  document.body.classList.add('preview');
  status.textContent = 'Anteprima nel browser · Carica gli esempi per provare ricerca e selezione.';
}
log(extension ? 'Estensione avviata.' : 'Anteprima avviata.');
render();
