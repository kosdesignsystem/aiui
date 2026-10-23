import React, { useEffect, useRef, useState } from 'react';
import './style.css';

type Mode = 'idle' | 'listening' | 'thinking' | 'speaking';
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function VoiceAssistant() {
  const [mode, setMode] = useState<Mode>('idle');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const recognition = useRef<any>(null);
  const audio = useRef<SpeechSynthesisUtterance | null>(null);
  const modeRef = useRef<Mode>('idle');
  const setStatus = (value: Mode) => { modeRef.current = value; setMode(value); };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) { setStatus('idle'); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 0.95;
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    audio.current = utterance;
    setStatus('speaking');
    window.speechSynthesis.speak(utterance);
  };

  const respond = async (text: string) => {
    setStatus('thinking');
    // Connect a secure server endpoint for AI answers; never expose API keys in the browser.
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (!response.ok) throw new Error('API unavailable');
      const data = await response.json();
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('Empty answer');
      setAnswer(data.answer);
      speak(data.answer);
    } catch {
      const fallback = 'Я услышал ваш вопрос. Для интеллектуальных ответов необходимо подключить сервер ассистента.';
      setAnswer(fallback);
      speak(fallback);
    }
  };

  const start = () => {
    setError('');
    window.speechSynthesis?.cancel();
    recognition.current?.abort();
    if (!SpeechRecognition) {
      setError('Голосовой ввод недоступен в этом браузере. Попробуйте Chrome.');
      return;
    }
    const instance = new SpeechRecognition();
    recognition.current = instance;
    instance.lang = 'ru-RU';
    instance.interimResults = true;
    instance.continuous = false;
    instance.onresult = (event: any) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      setQuestion(transcript);
      if (event.results[event.results.length - 1].isFinal) {
        instance.onend = null;
        instance.stop();
        void respond(transcript.trim());
      }
    };
    instance.onerror = (event: any) => {
      if (event.error !== 'aborted') setError(event.error === 'not-allowed' ? 'Разрешите доступ к микрофону.' : 'Не удалось распознать речь. Попробуйте ещё раз.');
      setStatus('idle');
    };
    instance.onend = () => { if (modeRef.current === 'listening') setStatus('idle'); };
    setQuestion('');
    setAnswer('');
    setStatus('listening');
    try { instance.start(); } catch { setError('Не удалось включить микрофон.'); setStatus('idle'); }
  };

  const stop = () => {
    recognition.current?.abort();
    window.speechSynthesis?.cancel();
    setStatus('idle');
  };

  useEffect(() => () => {
    recognition.current?.abort();
    window.speechSynthesis?.cancel();
  }, []);

  const labels: Record<Mode, string> = {
    idle: 'Нажмите и задайте вопрос',
    listening: 'Слушаю вас…',
    thinking: 'Думаю над ответом…',
    speaking: 'Отвечаю вам…'
  };

  return <main className={'voice-app mode-' + mode}>
    <div className="voice-top"><span className="voice-brand"><span className="voice-brand-dot" /> ГОЛОСОВОЙ АССИСТЕНТ</span><span className="voice-online"><span /> ГОТОВ К РАБОТЕ</span></div>
    <section className="voice-content" aria-live="polite">
      <div className="voice-eyebrow">{mode === 'listening' ? 'ИДЁТ ЗАПИСЬ' : mode === 'thinking' ? 'ОБРАБОТКА' : mode === 'speaking' ? 'ГОЛОСОВОЙ ОТВЕТ' : 'ВАШ ПОМОЩНИК'}</div>
      <h1>{labels[mode]}</h1>
      <p className="voice-hint">{mode === 'idle' ? 'Спросите о чём угодно. Я услышу вас и отвечу вслух.' : mode === 'listening' ? 'Говорите естественно, не торопитесь.' : mode === 'thinking' ? 'Готовлю ответ на ваш вопрос.' : 'Вы можете остановить воспроизведение.'}</p>
      {question && <div className="voice-message"><span>ВАШ ВОПРОС</span><p>{question}</p></div>}
      {answer && <div className="voice-message voice-answer"><span>ОТВЕТ АССИСТЕНТА</span><p>{answer}</p></div>}
      {error && <p className="voice-error" role="alert">{error}</p>}
    </section>
    <section className="voice-controls">
      <div className="voice-orbit">
        <div className="voice-glow" />
        <div className="voice-ring ring-one" /><div className="voice-ring ring-two" /><div className="voice-ring ring-three" />
        <button className="voice-mic" aria-label={mode === 'idle' ? 'Начать говорить' : 'Остановить'} onClick={mode === 'idle' ? start : stop}>
          {mode === 'thinking' ? <span className="voice-loader" /> : mode === 'speaking' ? <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M15 13v22M24 8v32M33 16v16"/></svg> : mode === 'listening' ? <svg viewBox="0 0 48 48" fill="currentColor"><rect x="13" y="13" width="22" height="22" rx="4"/></svg> : <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><rect x="17" y="5" width="14" height="26" rx="7"/><path d="M10 23a14 14 0 0 0 28 0M24 37v7M16 44h16"/></svg>}
        </button>
      </div>
      <div className="voice-action-label">{mode === 'idle' ? 'НАЖМИТЕ, ЧТОБЫ ГОВОРИТЬ' : 'НАЖМИТЕ, ЧТОБЫ ОСТАНОВИТЬ'}</div>
      {answer && mode === 'idle' && <button className="voice-repeat" onClick={() => speak(answer)}>↻ &nbsp; Повторить ответ</button>}
    </section>
    <footer className="voice-footer"><span>VOICE INTERFACE</span><span>01 / 01</span></footer>
  </main>;
}
