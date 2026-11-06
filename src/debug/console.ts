export function createDebugConsole(output: HTMLElement) {
  const events: string[] = [];

  return {
    log(message: string): void {
      events.push(`${new Date().toLocaleTimeString('it-IT')} ${message}`);
      if (events.length > 100) events.shift();
      output.textContent = events.join('\n');
      output.scrollTop = output.scrollHeight;
    },
    clear(): void {
      events.length = 0;
      output.textContent = '';
    },
  };
}
