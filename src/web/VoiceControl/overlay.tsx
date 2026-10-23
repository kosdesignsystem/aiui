import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Field } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { demoCommands, resolveCommand, type CommandResult } from './model';
import './overlay.scss';

type Phase = 'closed' | 'idle' | 'listening' | 'transcript' | 'processing' | 'result' | 'error';
const VoiceContext = createContext({ open: () => {} });
export const useVoiceControl = () => useContext(VoiceContext);

export function VoiceControlHost({ children }: { children: ReactNode }) {
	const { pathname } = useLocation();
	const [phase, setPhase] = useState<Phase>('closed');
	const [closing, setClosing] = useState(false);
	const [textMode, setTextMode] = useState(false);
	const [text, setText] = useState('');
	const [command, setCommand] = useState('');
	const [result, setResult] = useState<CommandResult | null>(null);
	const [sent, setSent] = useState(false);
	const [keyboardInset, setKeyboardInset] = useState(0);
	const [panelHeight, setPanelHeight] = useState<number | undefined>();
	const surfaceRef = useRef<HTMLDivElement>(null);
	const hostRef = useRef<HTMLDivElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const restoreFocusRef = useRef<HTMLElement | null>(null);
	const timersRef = useRef<number[]>([]);
	const active = phase !== 'closed';
	const clearTimers = useCallback(() => {
		timersRef.current.forEach(window.clearTimeout);
		timersRef.current = [];
	}, []);
	const schedule = (callback: () => void, delay: number) => {
		timersRef.current.push(window.setTimeout(callback, delay));
	};
	const open = () => {
		clearTimers();
		restoreFocusRef.current = document.activeElement as HTMLElement | null;
		setClosing(false); setText(''); setTextMode(false); setResult(null); setSent(false); setPhase('idle');
	};
	const close = () => {
		clearTimers(); setClosing(true);
		schedule(() => { setPhase('closed'); setClosing(false); }, 200);
	};
	const restart = () => {
		clearTimers(); setSent(false); setText(''); setTextMode(false); setPhase('idle');
	};
	const submit = (value: string, voice = false) => {
		if (!value.trim()) return;
		clearTimers();
		setSent(false); setCommand(value.trim()); setText(''); setTextMode(false);
		// Blur only the input in this panel; no microphone or external service is used.
		panelRef.current?.querySelector('input')?.blur();
		setPhase(voice ? 'transcript' : 'processing');
		const process = () => {
			setPhase('processing');
			schedule(() => {
				const resolved = resolveCommand(value);
				setResult(resolved); setPhase(resolved ? 'result' : 'error');
			}, 1000);
		};
		if (voice) schedule(process, 1100); else process();
	};

	useEffect(() => {
		clearTimers(); setPhase('closed'); setClosing(false);
	}, [pathname, clearTimers]);
	useEffect(() => () => clearTimers(), [clearTimers]);
	useEffect(() => {
		const surface = surfaceRef.current;
		if (active) {
			surface?.setAttribute('inert', '');
			panelRef.current?.focus();
		} else {
			surface?.removeAttribute('inert');
			if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus();
			else if (restoreFocusRef.current) hostRef.current?.querySelector<HTMLElement>('.vc-launch')?.focus();
		}
		return () => surface?.removeAttribute('inert');
	}, [active]);
	useEffect(() => {
		if (!active) return;
		// Focus a control whenever the previous state removes the focused element.
		if (!panelRef.current?.contains(document.activeElement)) panelRef.current?.focus();
	}, [phase, textMode, active]);
	useEffect(() => {
		if (!active || !bodyRef.current) { setPanelHeight(undefined); return; }
		const measure = () => {
			const body = bodyRef.current;
			if (body) setPanelHeight(body.offsetTop + body.offsetHeight + 12);
		};
		const observer = new ResizeObserver(measure);
		observer.observe(bodyRef.current); measure();
		return () => observer.disconnect();
	}, [active, phase]);
	useEffect(() => {
		const viewport = window.visualViewport;
		const update = () => {
			const bottom = hostRef.current?.getBoundingClientRect().bottom ?? 0;
			setKeyboardInset(viewport ? Math.max(0, bottom - viewport.height - viewport.offsetTop) : 0);
		};
		update();
		viewport?.addEventListener('resize', update); viewport?.addEventListener('scroll', update);
		return () => { viewport?.removeEventListener('resize', update); viewport?.removeEventListener('scroll', update); };
	}, []);
	const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') { event.preventDefault(); close(); }
		if (event.key !== 'Tab') return;
		const controls = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), summary') ?? []).filter((element) =>
			element.getClientRects().length > 0 &&
			(element.tagName === 'SUMMARY' || !element.closest('details:not([open])')),
		);
		const first = controls[0]; const last = controls[controls.length - 1];
		if (!first || !last) return;
		if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { event.preventDefault(); last.focus(); }
		else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panelRef.current)) { event.preventDefault(); first.focus(); }
	};
	const statusText = phase === 'listening' ? 'Слушаю вас' : phase === 'processing' ? 'Обрабатываю запрос' : phase === 'transcript' ? 'Команда распознана' : phase === 'error' ? 'Команда не поддерживается' : phase === 'result' ? (sent ? 'Сообщение отправлено' : result?.title) : 'Говорите…';

	return (
		<VoiceContext.Provider value={{ open }}>
			<div className="vc-host" ref={hostRef} style={{ '--vc-keyboard-inset': `${keyboardInset}px` } as CSSProperties}>
				<div className="vc-surface" ref={surfaceRef}>{children}</div>
				{!active && <Button className="vc-launch" size={44} leftIcon={<Icon name="microphone-outline" width={20} height={20} />} onClick={open} aria-label="Открыть голосового помощника">Помощник</Button>}
				{active && <div className={`vc-layer${closing ? ' is-closing' : ''}`} onKeyDown={handleKeys}>
					<button className="vc-backdrop" aria-label="Закрыть помощника нажатием вне панели" tabIndex={-1} onClick={close} />
					<div className={`vc-panel vc-panel--${phase}`} style={{ height: panelHeight }} role="dialog" aria-modal="true" aria-label="Голосовой помощник" tabIndex={-1} ref={panelRef}>
						<div className="vc-panel__top">
							<span className="vc-panel__label">{phase === 'idle' ? 'Чем помочь?' : 'VoiceControl'}</span>
							<span className="vc-panel__demo">Демо</span>
							<IconButton size={32} variant="secondary" aria-label="Закрыть помощника" onClick={close}><Icon name="close" width={18} height={18} /></IconButton>
						</div>
						<div className="vc-panel__body" key={phase} ref={bodyRef}>
							{(phase === 'idle' || phase === 'listening') && <>
								<div className="vc-listening">
									<div className={`vc-wave${phase === 'listening' ? ' is-listening' : ''}`} aria-hidden="true">{[12, 20, 14, 30, 38, 24, 14, 20, 12, 26, 16, 34, 22, 12].map((height, index) => <i key={index} style={{ height, '--vc-i': index } as CSSProperties} />)}</div>
									<span>{phase === 'listening' ? 'Слушаю…' : 'Говорите…'}</span>
									<IconButton aria-label={phase === 'listening' ? 'Отменить прослушивание' : 'Начать прослушивание'} variant={phase === 'listening' ? 'secondary' : 'accent'} onClick={() => { setTextMode(false); setPhase(phase === 'listening' ? 'idle' : 'listening'); }}><Icon name={phase === 'listening' ? 'microphone-off-outline' : 'microphone-outline'} width={22} height={22} /></IconButton>
								</div>
								{textMode ? <form className="vc-input" onSubmit={(event) => { event.preventDefault(); submit(text); }}>
									<Field autoFocus aria-label="Введите команду" placeholder="Напишите, чем помочь" value={text} onChange={(event) => setText(event.target.value)} maxLength={500} />
									<IconButton type="submit" aria-label="Отправить команду" disabled={!text.trim()}><Icon name="arrow-up" width={20} height={20} /></IconButton>
								</form> : <Button variant="secondary" size={32} className="vc-text-toggle" leftIcon={<Icon name="keyboard-outline" width={18} height={18} />} onClick={() => { setTextMode(true); setPhase('idle'); }}>Написать команду</Button>}
								<details className="vc-examples" open={phase === 'listening'}>
									<summary>{phase === 'listening' ? 'Выберите фразу для имитации голоса' : 'Что можно попросить?'}</summary>
									<div className="vc-examples__list">{demoCommands.map((value) => <button type="button" key={value} onClick={() => submit(value, phase === 'listening')}>{value}</button>)}</div>
								</details>
							</>}
							{phase === 'transcript' && <p className="vc-transcript">{command}</p>}
							{phase === 'processing' && <div className="vc-processing" aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} style={{ '--vc-i': i } as CSSProperties} />)}</div>}
							{phase === 'result' && result && <>
								<div className={`vc-result vc-result--${result.kind}`}>
									<div className="vc-result__heading"><Icon name={sent ? 'message-done-outline' : result.icon} width={20} height={20} /><span>{sent ? 'Сообщение отправлено' : result.title}</span>{result.kind !== 'message' && <Icon name="done" width={18} height={18} />}</div>
									<div className="vc-result__value">{result.value}</div>
									<p>{result.detail}</p>
								</div>
								{result.kind === 'message' && !sent ? <div className="vc-actions"><Button variant="secondary" onClick={restart}>Отмена</Button><Button onClick={() => setSent(true)}>Отправить</Button></div> : <Button className="vc-more" onClick={restart}>Что-нибудь ещё?</Button>}
							</>}
							{phase === 'error' && <div className="vc-error"><Icon name="message-info-outline" width={28} height={28} /><h2>Пока не умею это делать</h2><p>Попробуйте будильник, напоминание, сообщение или другую команду из примеров.</p><div className="vc-actions"><Button variant="secondary" onClick={restart}>Другой запрос</Button><Button onClick={() => submit(command)}>Повторить</Button></div></div>}
						</div>
						<div className="vc-sr-only" role="status" aria-live="polite">{statusText}</div>
					</div>
				</div>}
			</div>
		</VoiceContext.Provider>
	);
}
