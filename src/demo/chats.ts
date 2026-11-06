import type { Chat } from '../types.js';

export function createDemoChats(): Chat[] {
  return [
    'Configurazione PC e scheda video',
    'Organizzare un viaggio a Roma',
    'Traduzione italiano e cinese',
    'Idee per ChatManagement',
    'Confronto monitor per PC',
    'Ricette per il fine settimana',
  ].map((title, index) => ({ title, url: `https://example.invalid/demo/${index}` }));
}
