import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';

const minExposure = -3;
const maxExposure = 3;
const pixelsPerStep = 8;
const step = 0.1;
const clamp = (value: number) => Math.max(minExposure, Math.min(maxExposure, Math.round(value * 10) / 10));

export const exposureLabel = (value: number | null) => value === null ? 'Авто' : `${value > 0 ? '+' : ''}${value.toFixed(1)}`;

type ExposureControlProps = {
	value: number | null;
	onChange: (value: number) => void;
	onClose: () => void;
	onReset: () => void;
};

export function ExposureControl({ value, onChange, onClose, onReset }: ExposureControlProps) {
	const wheelRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const drag = useRef<{ id: number; x: number; value: number; moved: boolean } | null>(null);
	const current = useRef(value);
	const change = useRef(onChange);
	const wheelRemainder = useRef(0);
	current.current = value;
	change.current = onChange;
	useEffect(() => { if (value === null) wheelRemainder.current = 0; }, [value]);

	useEffect(() => {
		inputRef.current?.focus();
		const wheel = wheelRef.current;
		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 160 : 1;
			wheelRemainder.current += (Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : -event.deltaY) * scale;
			const steps = Math.trunc(wheelRemainder.current / pixelsPerStep);
			if (!steps) return;
			wheelRemainder.current -= steps * pixelsPerStep;
			change.current(clamp((current.current ?? 0) + steps * step));
		};
		wheel?.addEventListener('wheel', handleWheel, { passive: false });
		return () => wheel?.removeEventListener('wheel', handleWheel);
	}, []);

	const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!event.isPrimary || event.button !== 0) return;
		event.preventDefault();
		inputRef.current?.focus();
		drag.current = { id: event.pointerId, x: event.clientX, value: value ?? 0, moved: false };
		wheelRemainder.current = 0;
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const pointerEnd = (event: PointerEvent<HTMLDivElement>) => {
		if (drag.current?.id !== event.pointerId) return;
		drag.current = null;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
	};

	return (
		<div className="camera-exposure" id="camera-exposure" role="group" aria-label="Регулировка выдержки">
			<IconButton size={44} variant="secondary" className="camera-exposure__end" aria-label="Закрыть регулировку выдержки" onClick={onClose}><Icon name="close" width={24} height={24} aria-hidden="true" /></IconButton>
			<div className="camera-exposure__wheel" ref={wheelRef} onPointerDown={pointerDown} onPointerMove={(event) => {
				const start = drag.current;
				if (!start || start.id !== event.pointerId) return;
				const delta = event.clientX - start.x;
				if (Math.abs(delta) >= pixelsPerStep / 2) start.moved = true;
				if (start.moved) onChange(clamp(start.value + delta / pixelsPerStep * step));
			}} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={() => { drag.current = null; }}>
				<div className="camera-exposure__ticks" aria-hidden="true" style={{ '--exposure-offset': `${(value ?? 0) / step * pixelsPerStep}px` } as CSSProperties}>{Array.from({ length: 101 }, (_, index) => <i key={index} className={index % 5 === 0 ? 'is-major' : undefined} />)}</div>
				<span className="camera-exposure__marker" aria-hidden="true" />
				<input ref={inputRef} type="range" className="camera-exposure__input" aria-label="Выдержка" aria-valuetext={value === null ? 'Авто' : `${exposureLabel(value)} EV`} min={minExposure} max={maxExposure} step={step} value={value ?? 0} onChange={(event) => onChange(clamp(Number(event.target.value)))} />
			</div>
			<IconButton size={44} variant="secondary" className="camera-exposure__end" aria-label="Сбросить выдержку" onClick={() => { wheelRemainder.current = 0; onReset(); }}><Icon name="arrow-repeat" width={24} height={24} aria-hidden="true" /></IconButton>
		</div>
	);
}
