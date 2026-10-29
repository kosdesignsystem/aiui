import { useEffect, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Keyboard, type VoiceInputState } from '../../ui/Keyboard';
import { getSpeechEngine, speechErrors, type SpeechEngine } from './speech';
import './main.scss';

const storageKey = 'aiui-notes-draft-v1';
function loadDraft() { try { return localStorage.getItem(storageKey) ?? ''; } catch { return ''; } }
const join = (left: string, right: string) => left + (left && right && !/\s$/.test(left) && !/^[\s.,!?;:]/.test(right) ? ' ' : '') + right;

export default function NotesMainPage() {
  const [text, setText] = useState(loadDraft);
  const [interim, setInterim] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceInputState>(() => getSpeechEngine() ? 'idle' : 'unavailable');
  const [message, setMessage] = useState('');
  const engine = useRef<SpeechEngine | null>(null);
  const body = useRef<HTMLTextAreaElement>(null);
  const visibleText = join(text, interim);
  const latestText = useRef(visibleText);
  latestText.current = visibleText;

  useEffect(() => { try { localStorage.setItem(storageKey, text); } catch { /* In-memory draft still works. */ } }, [text]);
  const detach = () => {
    const current = engine.current; engine.current = null;
    if (current) { current.onstart = null; current.onend = null; current.onerror = null; current.onresult = null; current.abort(); }
  };
  useEffect(() => () => detach(), []);
  useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [visibleText]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden && engine.current) {
        setText(latestText.current); setInterim(''); detach(); setVoiceState('idle'); setMessage('Диктовка остановлена');
      }
    };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, []);

  const toggleMicrophone = () => {
    if (engine.current) { setMessage('Завершаем диктовку…'); engine.current.stop(); return; }
    const Constructor = getSpeechEngine();
    if (!Constructor) { setVoiceState('unavailable'); return; }
    const current = new Constructor();
    engine.current = current;
    current.lang = 'ru-RU'; current.continuous = true; current.interimResults = true;
    setVoiceState('starting'); setMessage('Разрешите доступ к микрофону');
    current.onstart = () => { setVoiceState('listening'); setMessage('Говорите… Нажмите микрофон, чтобы закончить'); };
    current.onresult = event => {
      let pending = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) setText(previous => join(previous, result[0].transcript));
        else pending = join(pending, result[0].transcript);
      }
      setInterim(pending);
    };
    let failed = false;
    current.onerror = event => {
      failed = true; setVoiceState('error'); setMessage(speechErrors[event.error] ?? 'Не удалось распознать речь. Повторите попытку');
      // Preserve the last visible words even if the service disconnects.
      setText(latestText.current); setInterim('');
      detach();
    };
    current.onend = () => {
      if (engine.current !== current) return;
      engine.current = null;
      setText(latestText.current); setInterim('');
      if (!failed) { setVoiceState('idle'); setMessage('Диктовка завершена'); }
    };
    try { current.start(); } catch { detach(); setVoiceState('error'); setMessage('Не удалось включить микрофон. Повторите попытку'); }
  };
  const deleteCharacter = () => {
    // Commit visible provisional text before aborting: late speech events cannot restore deleted text.
    detach(); setVoiceState(getSpeechEngine() ? 'idle' : 'unavailable'); setMessage(''); setInterim('');
    const characters = Array.from(latestText.current); characters.pop();
    latestText.current = characters.join(''); setText(latestText.current);
  };
  const status = voiceState === 'unavailable' ? 'Диктовка недоступна. Попробуйте Chrome' : message;
  return <App className="notes-app" aria-label="Заметки">
    <header className="notes-toolbar">
      <IconButton variant="secondary" disabled aria-label="Назад"><Icon name="arrow-left" width={24} height={24} aria-hidden /></IconButton>
      <span className="notes-toolbar__title">Title</span>
      <IconButton variant="secondary" disabled aria-label="Отменить"><Icon name="undo" width={24} height={24} aria-hidden /></IconButton>
      <IconButton variant="secondary" disabled aria-label="Повторить"><Icon name="redo" width={24} height={24} aria-hidden /></IconButton>
      <IconButton variant="secondary" disabled aria-label="Ещё"><Icon name="more-vertical" width={24} height={24} aria-hidden /></IconButton>
    </header>
    <main className="notes-content">
      <h1>Название</h1>
      <div className="notes-editor">
        {!visibleText && <span className="notes-editor__placeholder" aria-hidden>Описание<span className="notes-editor__caret" /></span>}
        <textarea ref={body} aria-label="Текст заметки" value={visibleText} readOnly inputMode="none" onKeyDown={event => {
          if (event.key === 'Backspace' || event.key === 'Delete') { event.preventDefault(); deleteCharacter(); }
        }} />
      </div>
    </main>
    <Keyboard voiceState={voiceState} status={status} onMicrophone={toggleMicrophone} onDelete={deleteCharacter} />
  </App>;
}
