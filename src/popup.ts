export {};
interface Chat { title: string; url: string }
const element = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const search = element<HTMLInputElement>('search');
const all = element<HTMLInputElement>('all');
const open = element<HTMLButtonElement>('open');
const status = element<HTMLParagraphElement>('status');
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
    checkbox.addEventListener('change', () => { checkbox.checked ? selected.add(chat.url) : selected.delete(chat.url); render(); });
    label.append(checkbox, document.createTextNode(chat.title));
    item.append(label);
    return item;
  }));
  const checked = visible.filter(chat => selected.has(chat.url)).length;
  all.checked = visible.length > 0 && checked === visible.length;
  all.indeterminate = checked > 0 && checked < visible.length;
  all.disabled = visible.length === 0;
  open.disabled = selected.size !== 1;
  element('count').textContent = `${visible.length} risultati · ${selected.size} selezionate`;
}
element('scan').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (!tab?.id || !tab.url) throw new Error('Apri una pagina supportata.');
    const url = new URL(tab.url);
    if (!['chatgpt.com','gemini.google.com','www.google.com'].includes(url.hostname)) throw new Error('Apri ChatGPT, Gemini o Google AI Mode.');
    const results = await chrome.scripting.executeScript({target: {tabId: tab.id}, func: () => {
      const found = new Map<string, {title: string; url: string}>();
      for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
        const link = new URL(anchor.href, location.href);
        const matches = location.hostname === 'chatgpt.com' ? /^\/(?:g\/[^/]+\/)?c\/[^/]+/.test(link.pathname) : location.hostname === 'gemini.google.com' ? /^\/app\/[^/]+/.test(link.pathname) : link.pathname === '/search' && link.searchParams.has('mtid');
        const title = anchor.textContent?.trim();
        if (matches && link.origin === location.origin && title) { link.hash = ''; found.set(link.href, {title, url: link.href}); }
      }
      return [...found.values()];
    }});
    chats = results[0]?.result ?? [];
    selected.clear();
    status.textContent = chats.length ? `Lette ${chats.length} chat caricate nella pagina.` : 'Nessun collegamento a chat trovato. Espandi la cronologia e riprova. Il servizio potrebbe richiedere un adattatore dedicato.';
    render();
  } catch (error) { status.textContent = error instanceof Error ? error.message : 'Lettura non riuscita.'; }
});
search.addEventListener('input', render);
all.addEventListener('change', () => { for (const chat of filtered()) all.checked ? selected.add(chat.url) : selected.delete(chat.url); render(); });
open.addEventListener('click', async () => { const chat = chats.find(chat => selected.has(chat.url)); if (chat && selected.size === 1) await chrome.tabs.create({url: chat.url}); });
render();
