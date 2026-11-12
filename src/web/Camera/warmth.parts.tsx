import { useEffect, useRef } from 'react';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';

const clamp = (value: number) => Math.max(-100, Math.min(100, Math.round(value)));
const warmthLabel = (value: number) => value === 0 ? 'Нейтральная' : `${value > 0 ? 'Теплее' : 'Холоднее'}: ${Math.abs(value)}%`;

export function WarmthControl({ value, onChange, onClose, onReset }: {
	value: number;
	onChange: (value: number) => void;
	onClose: () => void;
	onReset: () => void;
}) {
	const input = useRef<HTMLInputElement>(null);
	const current = useRef(value);
	const change = useRef(onChange);
	const remainder = useRef(0);
	current.current = value; change.current = onChange;
	useEffect(() => { if (value === 0) remainder.current = 0; }, [value]);
	useEffect(() => {
		const slider = input.current;
		slider?.focus();
		const wheel = (event: WheelEvent) => {
			event.preventDefault();
			const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 160 : 1;
			remainder.current += (Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : -event.deltaY) * scale;
			const steps = Math.trunc(remainder.current / 4);
			if (!steps) return;
			remainder.current -= steps * 4;
			change.current(clamp(current.current + steps));
		};
		slider?.addEventListener('wheel', wheel, { passive: false });
		return () => slider?.removeEventListener('wheel', wheel);
	}, []);

	return (
		<div className="camera-warmth" id="camera-warmth" role="group" aria-label="Регулировка теплоты">
			<IconButton size={44} variant="secondary" className="camera-warmth__end" aria-label="Закрыть регулировку теплоты" onClick={onClose}><Icon name="close" width={24} height={24} aria-hidden="true" /></IconButton>
			<div className="camera-warmth__track">
				<input ref={input} className="camera-warmth__input" type="range" min={-100} max={100} step={1} value={value} aria-label="Теплота" aria-valuetext={warmthLabel(value)} onChange={(event) => onChange(clamp(Number(event.target.value)))} />
			</div>
			<IconButton size={44} variant="secondary" className="camera-warmth__end" aria-label="Сбросить теплоту" onClick={() => { remainder.current = 0; onReset(); }}><Icon name="arrow-repeat" width={24} height={24} aria-hidden="true" /></IconButton>
		</div>
	);
}
