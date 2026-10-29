import { useEffect, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Keyboard, type VoiceInputState } from '../../ui/Keyboard';
import { GigaamRecording, canRunBrowserGigaam } from './gigaam';
import { cancelBrowserGigaam } from './gigaam-web-engine';
import './main.scss';

const storageKey = 'aiui-notes-draft-v1';
function loadDraft() { try { return localStorage.getItem(storageKey) ?? ''; } catch { return ''; } }
const join = (left: string, right: string) => left + (left && right && !/\s$/.test(left) && !/^[\s.,!?;:]/.test(right) ? ' ' : '') + right;

export default function NotesMainPage() {
  const [text, setText] = useState(loadDraft);
  const [voiceState, setVoiceState] = useState<VoiceInputState>(() => canRunBrowserGigaam() ? 'idle' : 'unavailable');
  const [message, setMessage] = useState(canRunBrowserGigaam() ? 'GigaAM · распознавание в браузере' : 'В этом браузере недоступен запуск GigaAM');
  const engine = useRef<GigaamRecording | null>(null);
  const body = useRef<HTMLTextAreaElement>(null);
  const visibleText = text;
  const latestText = useRef(visibleText);
  latestText.current = visibleText;

  useEffect(() => { try { localStorage.setItem(storageKey, text); } catch { /* In-memory draft still works. */ } }, [text]);
  const detach = () => {
    const current = engine.current; engine.current = null;
    current?.cancel();
  };
  useEffect(() => () => { detach(); cancelBrowserGigaam(); }, []);
  useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [visibleText]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden && engine.current) {
        detach(); setVoiceState('idle'); setMessage('Диктовка остановлена');
      }
    };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, []);

  const toggleMicrophone = () => {
    if (engine.current) { void engine.current.stop(); return; }
    const baseText = latestText.current;
    const current = new GigaamRecording({
      onPhase: (phase, status) => { setVoiceState(phase); setMessage(status); },
      onPartial: result => {
        if (engine.current !== current) return;
        setText(join(baseText, result));
      },
      onText: result => {
        if (engine.current !== current) return;
        engine.current = null; setVoiceState('idle');
        setText(join(baseText, result));
        setMessage(result ? 'GigaAM · текст добавлен' : 'Речь не распознана. Попробуйте ещё раз');
      },
      onError: error => {
        if (engine.current !== current) return;
        engine.current = null; setVoiceState('error'); setMessage(error);
      },
    });
    engine.current = current; void current.start();
  };
  const deleteCharacter = () => {
    // Cancel pending browser inference so its late response cannot restore deleted text.
    detach(); setVoiceState(canRunBrowserGigaam() ? 'idle' : 'unavailable'); setMessage('');
    const characters = Array.from(latestText.current); characters.pop();
    latestText.current = characters.join(''); setText(latestText.current);
  };
  const status = voiceState === 'unavailable' ? 'В этом браузере недоступен запуск GigaAM' : message;
  return <App className="notes-app" aria-label="Заметки">
    <header className="notes-toolbar">
      <IconButton variant="secondary" disabled aria-label="Назад"><Icon name="arrow-left" width={24} height={24} aria-hidden /></IconButton>
      <span className="notes-toolbar__title">Title</span>
      <IconButton variant="secondary" disabled aria-label="Отменить"><Icon name="undo" width={24} height={24} aria-hidden /></IconButton>
      <IconButton variant="secondary" disabled aria-label="Повторить"><Icon name="redo" width={24} height={24} aria-hidden /></IconButton>
      <IconButton variant="secondary" disabled aria-label="Ещё"><Icon name="more-vertical" width={24} height={24} aria-hidden /></IconButton>
    </header>
    <main className="notes-content">
      <div className="notes-editor">
        {!visibleText && <span className="notes-editor__placeholder" aria-hidden><span className="notes-editor__caret" /></span>}
        <textarea ref={body} aria-label="Текст заметки" value={visibleText} readOnly inputMode="none" onKeyDown={event => {
          if (event.key === 'Backspace' || event.key === 'Delete') { event.preventDefault(); deleteCharacter(); }
        }} />
      </div>
    </main>
    <Keyboard voiceState={voiceState} status={status} onMicrophone={toggleMicrophone} onDelete={deleteCharacter} />
  </App>;
}
