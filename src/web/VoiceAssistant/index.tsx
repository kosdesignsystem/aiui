import { useEffect, useRef, useState } from 'react';
import './style.css';

type Stage = 'idle' | 'listening' | 'thinking' | 'answer';
const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const samples = [
  'Всё в порядке. Я на связи и готов помочь с вашей задачей.',
  'Понял вас. Сначала проверьте основные показатели, затем зафиксируйте результат.',
  'Хороший вопрос. Я бы начал с самого простого решения и проверил результат.',
  'Принято. Можно продолжать работу, но важно соблюдать меры безопасности.',
  'Да, конечно. Расскажите чуть подробнее, и мы найдём подходящее решение.',
  'Рекомендую записать наблюдения и передать информацию ответственному специалисту.'
];
function pickReply(question: string) {
  const q = question.toLowerCase();
  if (/привет|как дела|здравствуй/.test(q)) return 'Привет! Всё отлично. Я рядом и готов помочь.';
  if (/температур|котел|котёл|градус/.test(q)) return 'Температура котла 72 градуса. Рекомендую сверить показания с допустимым рабочим диапазоном.';
  if (/дефект|поломк|неисправн/.test(q)) return 'Зафиксируйте дефект на фото и сообщите инженеру. Перед осмотром убедитесь, что оборудование безопасно.';
  if (/время|час/.test(q)) return 'Сейчас ' + new Date().toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}) + '.';
  return samples[Math.floor(Math.random() * samples.length)];
}
export default function VoiceAssistant() {
  const [stage, setStage] = useState<Stage>('idle');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [visible, setVisible] = useState('');
  const recognizer = useRef<any>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequence = useRef(0);
  const stageRef = useRef<Stage>('idle');
  const setMode = (s: Stage) => { stageRef.current = s; setStage(s); };
  const cancel = () => {
    sequence.current++;
    recognizer.current?.abort();
    window.speechSynthesis?.cancel();
    if (timer.current) clearTimeout(timer.current);
  };
  const showAnswer = (text: string) => {
    cancel();
    const id = sequence.current;
    setAnswer(text);
    setVisible('');
    setMode('answer');
    let i = 0;
    const tick = () => {
      if (id !== sequence.current) return;
      i = Math.min(text.length, i + 2);
      setVisible(text.slice(0, i));
      if (i < text.length) timer.current = setTimeout(tick, 30);
    };
    tick();
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'ru-RU';
      speech.rate = 0.94;
      window.speechSynthesis.speak(speech);
    }
  };
  const submit = (text: string) => {
    setQuestion(text);
    setMode('thinking');
    timer.current = setTimeout(() => showAnswer(pickReply(text)), 750);
  };
  const start = () => {
    cancel();
    setQuestion('');
    setAnswer('');
    setVisible('');
    setMode('listening');
    if (!Recognition) {
      timer.current = setTimeout(() => submit('Расскажи, как идут дела'), 1800);
      return;
    }
    const rec = new Recognition();
    recognizer.current = rec;
    rec.lang = 'ru-RU';
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let text = '';
      for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
      setQuestion(text);
      if (e.results[e.results.length - 1].isFinal) {
        rec.onend = null;
        rec.stop();
        submit(text);
      }
    };
    rec.onerror = () => { if (stageRef.current === 'listening') submit('Расскажи, как идут дела'); };
    rec.onend = () => { if (stageRef.current === 'listening') submit('Расскажи, как идут дела'); };
    try { rec.start(); } catch { timer.current = setTimeout(() => submit('Расскажи, как идут дела'), 1200); }
  };
  const stop = () => { cancel(); setMode('idle'); setAnswer(''); setVisible(''); };
  useEffect(() => () => cancel(), []);
  return <div className={'va va--' + stage}>
    <header className="va-header"><span className="va-led" /><span>АССИСТЕНТ</span><span className="va-status">{stage === 'listening' ? 'СЛУШАЮ' : stage === 'thinking' ? 'ДУМАЮ' : stage === 'answer' ? 'ОТВЕЧАЮ' : 'НА СВЯЗИ'}</span></header>
    <div className="va-center" aria-live="polite">
      {stage === 'answer' ? <><div className="va-caption">ОТВЕТ</div><div className="va-response">{visible}<span className="va-caret" /></div></> :
       stage === 'listening' ? <><div className="va-caption">ГОВОРИТЕ</div><div className="va-title">{question || 'Я слушаю…'}</div></> :
       stage === 'thinking' ? <><div className="va-caption">СЕКУНДУ</div><div className="va-title">Думаю<span className="va-dots">…</span></div></> :
       <><div className="va-caption">ГОЛОСОВОЕ УПРАВЛЕНИЕ</div><div className="va-title">О чём поговорим?</div></>}
    </div>
    <div className="va-bottom">
      <div className="va-orbit">
        <div className="va-halo" /><div className="va-wave va-wave-1"/><div className="va-wave va-wave-2"/><div className="va-wave va-wave-3"/>
        <button type="button" className="va-button" onClick={stage === 'idle' || stage === 'answer' ? start : stop} aria-label={stage === 'idle' || stage === 'answer' ? 'Задать вопрос' : 'Остановить'}>
          {stage === 'listening' || stage === 'thinking' ? <span className="va-stop"/> : <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"><rect x="23" y="8" width="18" height="34" rx="9"/><path d="M15 32a17 17 0 0 0 34 0M32 49v8M23 57h18"/></svg>}
        </button>
      </div>
      <div className="va-tip">{stage === 'idle' ? 'НАЖМИТЕ И ГОВОРИТЕ' : stage === 'answer' ? 'НОВЫЙ ВОПРОС' : 'НАЖМИТЕ ДЛЯ ОСТАНОВКИ'}</div>
    </div>
  </div>;
}
