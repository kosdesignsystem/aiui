import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../ui/Icon';
import './main.scss';

type Phase = 'idle' | 'permission' | 'recording' | 'transcribing';
const MAX_SECONDS = 24;
const buildApi = (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_GIGAAM_API_URL || '';
function savedApi() { try { return localStorage.getItem('voice-kos-api') || buildApi; } catch { return buildApi; } }
function validateApi(value: string) {
  const url = new URL(value);
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) {
    throw new Error('Укажите HTTPS-адрес сервера (для localhost доступен HTTP).');
  }
  if (url.username || url.password || url.search || url.hash) throw new Error('Укажите адрес без пароля, параметров и #.');
  return value.replace(/\/+$/, '');
}

export function VoiceKosScreen() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(31).fill(4));
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [api, setApi] = useState(savedApi);
  const [draftApi, setDraftApi] = useState(api);
  const [token, setToken] = useState('');
  const [settings, setSettings] = useState(false);
  const held = useRef(false);
  const busy = useRef(false);
  const alive = useRef(true);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const context = useRef<AudioContext | null>(null);
  const meter = useRef<number>();
  const limit = useRef<number>();
  const request = useRef<AbortController | null>(null);

  function cleanCapture() {
    window.clearInterval(meter.current); window.clearTimeout(limit.current);
    stream.current?.getTracks().forEach(track => track.stop()); stream.current = null;
    void context.current?.close().catch(() => {}); context.current = null;
  }
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false; held.current = false;
      if (recorder.current?.state === 'recording') recorder.current.stop();
      cleanCapture(); request.current?.abort();
    };
  }, []);
  useEffect(() => {
    if (!audio) { setAudioUrl(''); return; }
    const url = URL.createObjectURL(audio); setAudioUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [audio]);

  async function transcribe(blob: Blob) {
    if (!api) { setNotice('Запись готова. Подключите сервер GigaAM, чтобы получить текст.'); return; }
    setError(''); setNotice(''); setPhase('transcribing');
    const controller = new AbortController(); request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 120000);
    try {
      const form = new FormData(); form.append('audio', blob, 'recording.webm');
      const response = await fetch(`${validateApi(api)}/transcribe`, {
        method: 'POST', body: form, signal: controller.signal,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof data.detail === 'string' ? data.detail : `Сервер вернул ошибку ${response.status}.`);
      if (typeof data.text !== 'string') throw new Error('Сервер не вернул текст GigaAM.');
      if (alive.current) { setText(data.text); setNotice(data.text.trim() ? 'Расшифровка готова' : 'Речь не обнаружена. Попробуйте говорить ближе к микрофону.'); }
    } catch (e) {
      if (alive.current) setError(e instanceof Error && e.name === 'AbortError'
        ? 'Время ожидания истекло. Запись сохранена — можно повторить.'
        : e instanceof TypeError ? 'Нет связи с GigaAM. Проверьте адрес, HTTPS и доступ к серверу.' : e instanceof Error ? e.message : 'Не удалось распознать запись.');
    } finally {
      window.clearTimeout(timeout); request.current = null;
      if (alive.current) setPhase('idle');
    }
  }
  function stop() {
    held.current = false;
    if (recorder.current?.state === 'recording') recorder.current.stop();
  }
  async function start() {
    if (busy.current || phase !== 'idle') return;
    held.current = true; busy.current = true; setPhase('permission'); setError(''); setNotice('');
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('Для записи откройте приложение в браузере с поддержкой микрофона по HTTPS.');
      const input = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      if (!held.current || !alive.current) { input.getTracks().forEach(t => t.stop()); if (alive.current) setPhase('idle'); busy.current = false; return; }
      stream.current = input;
      const mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'].find(t => MediaRecorder.isTypeSupported(t));
      const rec = new MediaRecorder(input, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = []; recorder.current = rec;
      rec.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      rec.onstop = () => {
        cleanCapture(); recorder.current = null; busy.current = false;
        if (!alive.current) return;
        setBars(Array(31).fill(4)); setPhase('idle');
        const blob = new Blob(chunks, { type: rec.mimeType });
        if (!blob.size) { setError('Запись пустая. Удерживайте кнопку, пока говорите.'); return; }
        setAudio(blob); setText(''); void transcribe(blob);
      };
      rec.onerror = () => { stop(); setError('Микрофон отключился. Попробуйте записать ещё раз.'); };
      rec.start(); setAudio(null); setText(''); setSeconds(0); setPhase('recording');
      const started = performance.now();
      let analyser: AnalyserNode | undefined;
      try {
        const ctx = new AudioContext(); context.current = ctx;
        analyser = ctx.createAnalyser(); analyser.fftSize = 128;
        ctx.createMediaStreamSource(input).connect(analyser); void ctx.resume();
      } catch { /* Recording remains available without a visual meter. */ }
      meter.current = window.setInterval(() => {
        setSeconds(Math.min(MAX_SECONDS, Math.floor((performance.now() - started) / 1000)));
        if (analyser) {
          const values = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(values);
          setBars(Array.from({ length: 31 }, (_, i) => 4 + values[i + 2] / 255 * 70));
        }
      }, 90);
      limit.current = window.setTimeout(stop, MAX_SECONDS * 1000);
      input.getAudioTracks()[0]?.addEventListener('ended', stop, { once: true });
    } catch (e) {
      cleanCapture(); busy.current = false; held.current = false;
      if (alive.current) { setPhase('idle'); setError(e instanceof DOMException && e.name === 'NotAllowedError' ? 'Разрешите доступ к микрофону в настройках браузера.' : e instanceof Error ? e.message : 'Микрофон недоступен.'); }
    }
  }
  const recording = phase === 'recording';
  const disabled = phase === 'transcribing';
  const status = recording ? 'Говорите, я записываю' : phase === 'permission' ? 'Разрешите доступ к микрофону' : disabled ? 'Перевожу речь в текст…' : 'Ваш голос. Уже текст.';
  return <section className="voice-kos">
    <header className="voice-header"><div className="voice-brand"><span className="voice-logo"><Icon name="microphone" /></span><div><b>Голос КОС</b><small>Личный диктофон</small></div></div><button className="voice-settings" aria-label="Подключение GigaAM" disabled={phase !== 'idle'} onClick={() => { setDraftApi(api); setSettings(true); }}><Icon name="settings" /></button></header>
    <div className="voice-hero"><span className={`voice-badge ${api ? 'is-connected' : ''}`}>{api ? 'GIGAAM · СЕРВЕР НАСТРОЕН' : 'GIGAAM · НУЖНО ПОДКЛЮЧЕНИЕ'}</span><h1>{status}</h1><p>Удерживайте кнопку, пока говорите.<br />Отпустите — получите расшифровку.</p></div>
    <div className={`voice-recorder ${recording ? 'is-recording' : ''}`}>
      <div className="voice-wave" aria-hidden="true">{bars.map((height, i) => <i key={i} style={{ height }} />)}</div>
      <div className="voice-time" aria-label={`Записано ${seconds} секунд`}>00:{String(seconds).padStart(2, '0')}<span> / 00:24</span></div>
      <button className="voice-talk" disabled={disabled} aria-label="Удерживать для записи голоса" aria-pressed={recording}
        onPointerDown={e => { if (e.button !== 0) return; e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); void start(); }}
        onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}
        onKeyDown={e => { if ([' ', 'Enter'].includes(e.key)) { e.preventDefault(); if (!e.repeat) void start(); } }}
        onKeyUp={e => { if ([' ', 'Enter'].includes(e.key)) { e.preventDefault(); stop(); } }} onBlur={stop}>
        {disabled ? <span className="voice-spinner" /> : recording ? <span className="voice-stop" /> : <Icon name="microphone" width={36} height={36} />}
      </button><strong>{disabled ? 'Распознавание' : recording ? 'Отпустите для отправки' : 'Удерживайте для записи'}</strong><small>Русская речь · до 24 секунд</small>
    </div>
    <div className="voice-feedback" aria-live="polite">{error && <p role="alert" className="voice-error">{error}</p>}{notice && <p>{notice}</p>}{!api && !audio && <p>Запись доступна. Для расшифровки <button onClick={() => setSettings(true)}>подключите GigaAM</button>.</p>}</div>
    {audioUrl && <div className="voice-audio"><audio controls src={audioUrl} /><a href={audioUrl} download={`voice-kos.${audio?.type.includes('mp4') ? 'm4a' : audio?.type.includes('ogg') ? 'ogg' : 'webm'}`}>Скачать запись</a></div>}
    <section className="voice-result"><div className="voice-result-head"><h2>Расшифровка</h2><span>GigaAM v3</span></div><textarea aria-label="Текст расшифровки" placeholder="Здесь появятся ваши слова. Текст можно отредактировать и скопировать." value={text} onChange={e => setText(e.target.value)} />
      <div className="voice-result-actions"><button disabled={!text} onClick={() => { void navigator.clipboard.writeText(text).then(() => setNotice('Текст скопирован')).catch(() => setError('Не удалось скопировать. Выделите текст вручную.')); }}>Копировать текст</button><button disabled={!audio || phase !== 'idle' || !api} onClick={() => audio && void transcribe(audio)}>Распознать снова</button></div>
    </section><footer className="voice-footer">Запись отправляется только на подключённый вами сервер.</footer>
    {settings && <div className="voice-overlay"><section role="dialog" aria-modal="true" aria-labelledby="voice-settings-title" className="voice-panel"><h2 id="voice-settings-title">Подключить GigaAM</h2><p>Укажите адрес сервиса распознавания из этого проекта. Запись будет отправляться на этот сервер после отпускания кнопки.</p><label>Адрес сервера<input type="url" placeholder="https://voice.example.ru" value={draftApi} onChange={e => setDraftApi(e.target.value)} /></label><label>Ключ доступа, если задан<input type="password" autoComplete="off" value={token} onChange={e => setToken(e.target.value)} /></label><small>Ключ действует только до закрытия страницы.</small><div className="voice-result-actions"><button onClick={() => { try { const value = draftApi.trim() ? validateApi(draftApi.trim()) : ''; setApi(value); try { localStorage.setItem('voice-kos-api', value); } catch { /* Session-only configuration. */ } setError(''); setSettings(false); setNotice(value ? 'Адрес сохранён. Запишите сообщение или распознайте готовую запись.' : 'Сервер отключён.'); } catch (e) { setError((e as Error).message); } }}>Сохранить</button><button onClick={() => setSettings(false)}>Закрыть</button></div>{error && <p role="alert" className="voice-error">{error}</p>}</section></div>}
  </section>;
}
