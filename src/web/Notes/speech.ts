// Minimal browser API types (the Web Speech API is not in TypeScript's DOM lib).
export type SpeechResult = { isFinal: boolean; 0: { transcript: string } };
export type SpeechEvent = { resultIndex: number; results: ArrayLike<SpeechResult> };
export interface SpeechEngine {
  lang: string; continuous: boolean; interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechEvent) => void) | null;
  start(): void; stop(): void; abort(): void;
}
export function getSpeechEngine(): (new () => SpeechEngine) | undefined {
  const browser = window as unknown as { SpeechRecognition?: new () => SpeechEngine; webkitSpeechRecognition?: new () => SpeechEngine };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}
export const speechErrors: Record<string, string> = {
  'not-allowed': 'Разрешите доступ к микрофону в настройках сайта',
  'service-not-allowed': 'Браузер не разрешает распознавание речи',
  'audio-capture': 'Микрофон не найден или занят',
  'network': 'Сервис диктовки недоступен. Попробуйте Google Chrome',
  'no-speech': 'Речь не услышана. Нажмите микрофон ещё раз',
  'language-not-supported': 'Русский язык недоступен в этом браузере',
};
