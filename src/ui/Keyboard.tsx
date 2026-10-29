import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from './lib/cn';
import './Keyboard.scss';

export type VoiceInputState = 'idle' | 'starting' | 'listening' | 'error' | 'unavailable';
export type KeyboardProps = {
  voiceState?: VoiceInputState;
  status?: string;
  onMicrophone?: () => void;
  onDelete?: () => void;
  onKey?: (key: string) => void;
  className?: string;
};

/** Presentational keyboard: recording and text editing belong to the host app. */
export function Keyboard({ voiceState = 'idle', status, onMicrophone, onDelete, onKey, className }: KeyboardProps) {
  const delay = useRef<ReturnType<typeof setTimeout>>();
  const repeat = useRef<ReturnType<typeof setInterval>>();
  const clearRepeat = () => { clearTimeout(delay.current); clearInterval(repeat.current); };
  useEffect(() => clearRepeat, []);
  const active = voiceState === 'starting' || voiceState === 'listening';
  const key = (label: string, content: ReactNode = label, extra = '') => (
    <button key={label} type="button" className={cn('ui-keyboard__key', extra)}
      aria-label={label} disabled={!onKey} onClick={() => onKey?.(label)}>{content}</button>
  );
  return <section className={cn('ui-keyboard', className)} aria-label="Экранная клавиатура">
    <div className="ui-keyboard__suggestions" role="status" aria-live="polite">
      {status ? <span className="ui-keyboard__status">{status}</span> : <>{['Дело', '..ительница', 'Делят'].map(word => <span key={word}>{word}</span>)}</>}
    </div>
    <div className="ui-keyboard__rows">
      {['ЙЦУКЁНГШЩЗХ', 'ФЫВАПРОЛДЖЭ'].map(row => <div className="ui-keyboard__row" key={row}>{Array.from(row).map(letter => key(letter))}</div>)}
      <div className="ui-keyboard__row ui-keyboard__row--third">
        {key('Shift', <Icon name="arrow-up" width={24} height={24} aria-hidden />)}
        {Array.from('ЯЧСМИТЬБЮ').map(letter => key(letter))}
        <button type="button" className="ui-keyboard__key" aria-label="Удалить символ" disabled={!onDelete}
          onPointerDown={event => {
            if (event.button !== 0) return;
            event.preventDefault(); clearRepeat(); event.currentTarget.setPointerCapture(event.pointerId);
            onDelete?.(); delay.current = setTimeout(() => { repeat.current = setInterval(() => onDelete?.(), 65); }, 400);
          }}
          onPointerUp={clearRepeat} onPointerCancel={clearRepeat} onLostPointerCapture={clearRepeat}
          onClick={event => { if (event.detail === 0) onDelete?.(); }}>
          <Icon name="keyboard-delite" width={24} height={24} aria-hidden />
        </button>
      </div>
      <div className="ui-keyboard__row ui-keyboard__row--bottom">
        {key('123!', '123!')}{key('Сменить язык', <Icon name="language" width={24} height={24} aria-hidden />)}
        {key('.', '.')}{key(' ', 'Space', 'ui-keyboard__space')}{key(',', ',')}
        {key('Enter', <Icon name="enter" width={24} height={24} aria-hidden />, 'ui-keyboard__enter')}
      </div>
    </div>
    <div className="ui-keyboard__voice">
      <button type="button" className={cn('ui-keyboard__microphone', active && 'is-active')}
        aria-label={active ? 'Остановить диктовку' : 'Начать диктовку'} aria-pressed={active}
        disabled={voiceState === 'unavailable' || !onMicrophone} onClick={onMicrophone}>
        <Icon name="microphone" width={28} height={28} aria-hidden />
      </button>
    </div>
  </section>;
}
