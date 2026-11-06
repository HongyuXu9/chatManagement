import type { Chat } from '../types.js';

export function isExtension(): boolean {
  return typeof chrome !== 'undefined'
    && typeof chrome.tabs?.query === 'function'
    && typeof chrome.scripting?.executeScript === 'function';
}

// Chrome serializes this function and runs it in the page, without module scope.
function collectPageChats(): Chat[] {
  const found = new Map<string, Chat>();
  for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    const link = new URL(anchor.href, location.href);
    let matches = false;
    switch (location.hostname) {
      case 'chatgpt.com':
        matches = /^\/(?:g\/[^/]+\/)?c\/[^/]+/.test(link.pathname);
        break;
      case 'gemini.google.com':
        matches = /^\/app\/[^/]+/.test(link.pathname);
        break;
      case 'www.google.com':
        matches = link.pathname === '/search' && link.searchParams.has('mtid');
        break;
    }
    const title = anchor.textContent?.trim();
    if (matches && link.origin === location.origin && title) {
      link.hash = '';
      found.set(link.href, { title, url: link.href });
    }
  }
  return [...found.values()];
}

export async function readActivePageChats(): Promise<Chat[]> {
  if (!isExtension()) {
    throw new Error('La lettura reale richiede l’estensione installata. In anteprima usa Carica esempi.');
  }
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) throw new Error('Apri una pagina supportata.');
  const url = new URL(tab.url);
  if (!['chatgpt.com', 'gemini.google.com', 'www.google.com'].includes(url.hostname)) {
    throw new Error('Apri ChatGPT, Gemini o Google AI Mode.');
  }
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: collectPageChats,
  });
  return results[0]?.result ?? [];
}

export async function openChat(chat: Chat): Promise<void> {
  await chrome.tabs.create({ url: chat.url });
}
