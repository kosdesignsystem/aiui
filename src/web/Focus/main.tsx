import { PointerEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Switch } from '../../ui/Switch';
import './main.scss';

type Mode = 'focus' | 'short' | 'long';
type Quality = 'Эко' | 'Баланс' | 'Макс';
type Status = 'idle' | 'running' | 'paused' | 'done';
type HistoryItem = { mode: Mode; duration: number; completedAt: number; task: string };
type StoredState = {
	mode: Mode; status: Status; remaining: number; endAt?: number; focusCount: number;
	task: string; history: HistoryItem[]; scene: number; durations: Record<Mode, number>;
	quality: Quality; reducedMotion: boolean; intensity: number; speed: number;
};

const scenes = [
	{ name: 'Стекло', caption: 'Мягкая прозрачность', kind: 'glass' },
	{ name: 'Глубина', caption: 'Спокойный параллакс', kind: 'depth' },
	{ name: 'Поток', caption: 'Частицы замедляются', kind: 'particles' },
	{ name: 'Погружение', caption: 'Всё лишнее исчезает', kind: 'fluid' },
	{ name: 'Живая поверхность', caption: 'Дышащий градиент', kind: 'wallpaper' },
	{ name: 'Ритм', caption: 'Карточки этапов', kind: 'cards' },
	{ name: 'Свет', caption: 'Следует за касанием', kind: 'lighting' },
	{ name: 'Материя', caption: 'Тактильные материалы', kind: 'material' },
	{ name: 'Созвездие', caption: 'Спокойная орбита', kind: 'stress' },
] as const;
const labels: Record<Mode, string> = { focus: 'Фокус', short: 'Короткий перерыв', long: 'Длинный перерыв' };
const defaultDurations = { focus: 25, short: 5, long: 15 };
const storageKey = 'aiui-focus-v1';

function loadState(): StoredState {
	const fallback: StoredState = { mode: 'focus', status: 'idle', remaining: 1500, focusCount: 0, task: '', history: [], scene: 0, durations: defaultDurations, quality: 'Баланс', reducedMotion: false, intensity: 64, speed: 45 };
	try {
		const value = JSON.parse(localStorage.getItem(storageKey) || '') as Partial<StoredState>;
		const merged = { ...fallback, ...value, durations: { ...defaultDurations, ...value.durations } };
		if (merged.status === 'running' && merged.endAt) merged.remaining = Math.max(0, Math.ceil((merged.endAt - Date.now()) / 1000));
		return merged;
	} catch { return fallback; }
}

function formatTime(seconds: number) {
	const safe = Math.max(0, seconds);
	return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

function todayKey(time: number) { return new Date(time).toDateString(); }

function Ambient({ kind, quality, reducedMotion, intensity, speed, progress, pointer }: { kind: typeof scenes[number]['kind']; quality: Quality; reducedMotion: boolean; intensity: number; speed: number; progress: number; pointer: { x: number; y: number } }) {
	const count = quality === 'Эко' ? 14 : quality === 'Баланс' ? 28 : 48;
	const dots = useMemo(() => Array.from({ length: count }, (_, i) => ({
		x: (i * 37) % 100, y: (i * 61) % 100, size: 2 + (i * 7) % 7, delay: -(i % 12),
	})), [count]);
	return <div className={`focus-ambient focus-ambient--${kind}${reducedMotion ? ' is-reduced' : ''}`} style={{ '--px': `${pointer.x}%`, '--py': `${pointer.y}%`, '--intensity': intensity / 100, '--speed': `${Math.max(8, 70 - speed)}s`, '--calm': 1 - progress } as React.CSSProperties} aria-hidden="true">
		<div className="focus-ambient__orb focus-ambient__orb--one" />
		<div className="focus-ambient__orb focus-ambient__orb--two" />
		{(kind === 'particles' || kind === 'stress') && <div className="focus-ambient__particles">{dots.map((dot, index) => <i key={index} style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size, animationDelay: `${dot.delay}s` }} />)}</div>}
		{kind === 'depth' && <><div className="focus-ambient__planet focus-ambient__planet--back" /><div className="focus-ambient__planet focus-ambient__planet--front" /></>}
		{kind === 'cards' && <div className="focus-ambient__rhythm">{[1,2,3,4].map(n => <i key={n} />)}</div>}
		{kind === 'material' && <div className="focus-ambient__material" />}
	</div>;
}

export function FocusScreen() {
	const [state, setState] = useState(loadState);
	const [panel, setPanel] = useState<'none' | 'gallery' | 'settings' | 'history'>('none');
	const [immersive, setImmersive] = useState(false);
	const [pointer, setPointer] = useState({ x: 50, y: 42 });
	const dragStart = useRef<number | null>(null);
	const stateRef = useRef(state); stateRef.current = state;
	const total = state.durations[state.mode] * 60;
	const progress = Math.min(1, Math.max(0, 1 - state.remaining / total));

	const complete = () => setState(current => {
		if (current.status === 'done') return current;
		const focusCount = current.mode === 'focus' ? current.focusCount + 1 : current.focusCount;
		return { ...current, status: 'done', remaining: 0, endAt: undefined, focusCount, history: [{ mode: current.mode, duration: current.durations[current.mode], completedAt: Date.now(), task: current.task }, ...current.history].slice(0, 50) };
	});

	useEffect(() => {
		if (state.status !== 'running') return;
		const update = () => {
			const endAt = stateRef.current.endAt;
			if (!endAt) return;
			const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
			if (remaining === 0) complete(); else setState(current => ({ ...current, remaining }));
		};
		update(); const timer = window.setInterval(update, 500);
		const visible = () => { if (!document.hidden) update(); };
		document.addEventListener('visibilitychange', visible);
		return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', visible); };
	}, [state.status]);

	useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(state)); }, [state]);

	const startPause = () => setState(current => current.status === 'running'
		? { ...current, status: 'paused', remaining: Math.max(0, Math.ceil(((current.endAt || Date.now()) - Date.now()) / 1000)), endAt: undefined }
		: { ...current, status: 'running', endAt: Date.now() + current.remaining * 1000 });
	const reset = () => setState(current => ({ ...current, status: 'idle', remaining: current.durations[current.mode] * 60, endAt: undefined }));
	const chooseMode = (mode: Mode) => setState(current => ({ ...current, mode, status: 'idle', remaining: current.durations[mode] * 60, endAt: undefined }));
	const next = () => {
		const mode: Mode = state.mode === 'focus' ? ((state.focusCount % 4 === 0) ? 'long' : 'short') : 'focus';
		chooseMode(mode);
	};
	const setScene = (scene: number) => { setState(current => ({ ...current, scene: (scene + scenes.length) % scenes.length })); setPanel('none'); };
	const onPointerDown = (event: PointerEvent) => { dragStart.current = event.clientX; setPointer({ x: event.nativeEvent.offsetX / Math.max(1, event.currentTarget.clientWidth) * 100, y: event.nativeEvent.offsetY / Math.max(1, event.currentTarget.clientHeight) * 100 }); };
	const onPointerUp = (event: PointerEvent) => { if (dragStart.current !== null) { const delta = event.clientX - dragStart.current; if (Math.abs(delta) > 55) setScene(state.scene + (delta < 0 ? 1 : -1)); } dragStart.current = null; };
	const todayMinutes = state.history.filter(item => item.mode === 'focus' && todayKey(item.completedAt) === todayKey(Date.now())).reduce((sum, item) => sum + item.duration, 0);
	const scene = scenes[state.scene];

	return <section className={`focus-app focus-app--${scene.kind}${immersive ? ' is-immersive' : ''}`} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={event => { if (dragStart.current !== null) setPointer({ x: event.nativeEvent.offsetX / Math.max(1, event.currentTarget.clientWidth) * 100, y: event.nativeEvent.offsetY / Math.max(1, event.currentTarget.clientHeight) * 100 }); }} onClick={() => immersive && setImmersive(false)}>
		<Ambient kind={scene.kind} quality={state.quality} reducedMotion={state.reducedMotion} intensity={state.intensity} speed={state.speed} progress={progress} pointer={pointer} />
		<header className="focus-top focus-secondary">
			<div><span className="focus-eyebrow">СЦЕНА {state.scene + 1} ИЗ 9</span><h1>{scene.name}</h1><p>{scene.caption}</p></div>
			<div className="focus-top__actions">
				<IconButton variant="secondary" size={40} aria-label="История" onClick={event => { event.stopPropagation(); setPanel('history'); }}><Icon name="clock" /></IconButton>
				<IconButton variant="secondary" size={40} aria-label="Настройки" onClick={event => { event.stopPropagation(); setPanel('settings'); }}><Icon name="settings" /></IconButton>
			</div>
		</header>

		<main className="focus-center">
			<div className="focus-mode focus-secondary">{(['focus','short','long'] as Mode[]).map(mode => <button type="button" className={state.mode === mode ? 'is-active' : ''} onClick={event => { event.stopPropagation(); chooseMode(mode); }} key={mode}>{mode === 'focus' ? 'Фокус' : mode === 'short' ? 'Короткий' : 'Длинный'}</button>)}</div>
			<div className="focus-timer" style={{ '--progress': `${progress * 360}deg` } as React.CSSProperties}>
				<div className="focus-timer__inner"><span>{state.status === 'done' ? 'ГОТОВО' : labels[state.mode].toUpperCase()}</span><strong>{formatTime(state.remaining)}</strong><em>{state.status === 'running' ? 'Сосредоточьтесь на задаче' : state.status === 'paused' ? 'Пауза' : state.status === 'done' ? 'Этап завершён' : 'Готовы начать?'}</em></div>
			</div>
			<input className="focus-task focus-secondary" value={state.task} onClick={event => event.stopPropagation()} onChange={event => setState(current => ({ ...current, task: event.target.value }))} placeholder="Над чем работаем?" aria-label="Название текущей задачи" />
			<div className="focus-controls focus-secondary" onClick={event => event.stopPropagation()}>
				{state.status === 'done' ? <Button size={52} onClick={next}>Следующий этап</Button> : <><IconButton variant="secondary" size={52} aria-label="Сбросить" onClick={reset}><Icon name="arrow-history" /></IconButton><Button size={52} onClick={startPause} leftIcon={<Icon name={state.status === 'running' ? 'alarm-clock-pause' : 'play'} />}>{state.status === 'running' ? 'Пауза' : state.status === 'paused' ? 'Продолжить' : 'Начать'}</Button><IconButton variant="secondary" size={52} aria-label="Режим погружения" onClick={() => setImmersive(true)}><Icon name="fullscreen" /></IconButton></>}
			</div>
		</main>

		<footer className="focus-bottom focus-secondary">
			<button className="focus-gallery-open" onClick={event => { event.stopPropagation(); setPanel('gallery'); }}><span className={`focus-mini focus-mini--${scene.kind}`} /><span><b>Выбрать атмосферу</b><small>Свайпните влево или вправо</small></span><Icon name="chevron-up" /></button>
			<div className="focus-dots">{scenes.map((item, index) => <button key={item.name} aria-label={item.name} className={index === state.scene ? 'is-active' : ''} onClick={event => { event.stopPropagation(); setScene(index); }} />)}</div>
		</footer>

		{panel !== 'none' && <div className="focus-sheet-backdrop" onClick={event => { event.stopPropagation(); setPanel('none'); }}><section className="focus-sheet" onClick={event => event.stopPropagation()}>
			<div className="focus-sheet__handle" /><div className="focus-sheet__title"><h2>{panel === 'gallery' ? 'Выберите атмосферу' : panel === 'settings' ? 'Настройки фокуса' : 'Сегодня'}</h2><IconButton variant="secondary" size={36} aria-label="Закрыть" onClick={() => setPanel('none')}><Icon name="close" /></IconButton></div>
			{panel === 'gallery' && <div className="focus-grid">{scenes.map((item, index) => <button key={item.name} className={index === state.scene ? 'is-active' : ''} onClick={() => setScene(index)}><span className={`focus-preview focus-preview--${item.kind}`}><i /></span><b>{item.name}</b><small>{item.caption}</small></button>)}</div>}
			{panel === 'settings' && <div className="focus-settings">
				<h3>Длительность этапов</h3>{(['focus','short','long'] as Mode[]).map(mode => <label key={mode}><span>{labels[mode]} <b>{state.durations[mode]} мин</b></span><input type="range" min={mode === 'focus' ? 10 : 3} max={mode === 'focus' ? 60 : 30} step="1" value={state.durations[mode]} onChange={event => { const value = Number(event.target.value); setState(current => ({ ...current, durations: { ...current.durations, [mode]: value }, ...(current.mode === mode && current.status === 'idle' ? { remaining: value * 60 } : {}) })); }} /></label>)}
				<h3>Эффект «{scene.name}»</h3><label><span>Интенсивность <b>{state.intensity}%</b></span><input type="range" min="0" max="100" value={state.intensity} onChange={event => setState(current => ({ ...current, intensity: Number(event.target.value) }))} /></label><label><span>Скорость <b>{state.speed}%</b></span><input type="range" min="0" max="100" value={state.speed} onChange={event => setState(current => ({ ...current, speed: Number(event.target.value) }))} /></label>
				<div className="focus-setting-row"><span>Качество</span><div className="focus-quality">{(['Эко','Баланс','Макс'] as Quality[]).map(value => <button className={state.quality === value ? 'is-active' : ''} key={value} onClick={() => setState(current => ({ ...current, quality: value }))}>{value}</button>)}</div></div><div className="focus-setting-row"><span><b>Уменьшить движение</b><small>Без пульсации и перемещений</small></span><Switch checked={state.reducedMotion} onChange={event => setState(current => ({ ...current, reducedMotion: event.target.checked }))} /></div>
			</div>}
			{panel === 'history' && <div className="focus-history"><div className="focus-stat"><strong>{todayMinutes}</strong><span>минут фокуса сегодня</span></div><div className="focus-streak">{[0,1,2,3].map(index => <i className={index < state.focusCount % 4 ? 'is-done' : ''} key={index}>{index < state.focusCount % 4 ? '✓' : index + 1}</i>)}<span>до длинного перерыва</span></div>{state.history.length ? state.history.slice(0,8).map(item => <div className="focus-history-row" key={item.completedAt}><i className={item.mode} /><span><b>{labels[item.mode]}</b><small>{item.task || 'Без названия'}</small></span><em>{item.duration} мин</em></div>) : <p className="focus-empty">Завершённые сессии появятся здесь.</p>}</div>}
		</section></div>}
	</section>;
}
