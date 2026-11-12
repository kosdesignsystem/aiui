import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { SegmentedTabs } from '../../ui/SegmentedTabs';

const modes = [{ id: 'photo', label: 'Фото' }, { id: 'portrait', label: 'Портрет' }] as const;

export function CameraModeDrum({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	const root = useRef<HTMLDivElement>(null);
	const gesture = useRef<{ id: number; x: number; y: number; horizontal: boolean } | null>(null);
	const suppressClick = useRef(false);
	const current = useRef(value);
	const change = useRef(onChange);
	const wheelDistance = useRef(0);
	const [offset, setOffset] = useState(0);
	const [dragOffset, setDragOffset] = useState(0);
	const [dragging, setDragging] = useState(false);
	current.current = value;
	change.current = onChange;

	useLayoutEffect(() => {
		const viewport = root.current;
		wheelDistance.current = 0;
		const measure = () => {
			const selected = viewport?.querySelector<HTMLElement>('[aria-selected="true"]');
			if (viewport && selected) setOffset(viewport.clientWidth / 2 - selected.offsetLeft - selected.offsetWidth / 2);
		};
		measure();
		const observer = new ResizeObserver(measure);
		if (viewport) observer.observe(viewport);
		viewport?.querySelectorAll<HTMLElement>('[role="tab"]').forEach((tab) => observer.observe(tab));
		return () => observer.disconnect();
	}, [value]);

	useEffect(() => {
		const viewport = root.current;
		const wheel = (event: WheelEvent) => {
			event.preventDefault();
			const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 160 : 1;
			wheelDistance.current += (Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * scale;
			if (Math.abs(wheelDistance.current) < 36) return;
			const direction = Math.sign(wheelDistance.current);
			wheelDistance.current = 0;
			const index = modes.findIndex((mode) => mode.id === current.current);
			change.current(modes[Math.max(0, Math.min(modes.length - 1, index + direction))].id);
		};
		viewport?.addEventListener('wheel', wheel, { passive: false });
		return () => viewport?.removeEventListener('wheel', wheel);
	}, []);

	const endGesture = (event: PointerEvent<HTMLDivElement>, cancelled = false) => {
		const start = gesture.current;
		if (!start || start.id !== event.pointerId) return;
		if (start.horizontal && !cancelled) {
			const distance = event.clientX - start.x;
			if (Math.abs(distance) >= 28) {
				const index = modes.findIndex((mode) => mode.id === value);
				onChange(modes[Math.max(0, Math.min(modes.length - 1, index + (distance < 0 ? 1 : -1)))].id);
			}
		}
		suppressClick.current = start.horizontal && !cancelled;
		gesture.current = null;
		setDragging(false); setDragOffset(0);
		if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
	};

	return (
		<div ref={root} className={`camera-mode-drum${dragging ? ' is-dragging' : ''}`} style={{ '--camera-mode-offset': `${offset + dragOffset}px` } as CSSProperties}
			onPointerDown={(event) => {
				if (!event.isPrimary || event.button !== 0) return;
				suppressClick.current = false;
				gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
			}}
			onPointerMove={(event) => {
				const start = gesture.current;
				if (!start || start.id !== event.pointerId) return;
				const x = event.clientX - start.x; const y = event.clientY - start.y;
				if (!start.horizontal) {
					if (Math.max(Math.abs(x), Math.abs(y)) < 7) return;
					if (Math.abs(y) > Math.abs(x)) { gesture.current = null; return; }
					start.horizontal = true; setDragging(true);
					event.currentTarget.setPointerCapture(event.pointerId);
				}
				event.preventDefault();
				const index = modes.findIndex((mode) => mode.id === value);
				const beyondEnd = (index === 0 && x > 0) || (index === modes.length - 1 && x < 0);
				setDragOffset(x * (beyondEnd ? 0.25 : 1));
			}}
			onPointerUp={(event) => endGesture(event)} onPointerCancel={(event) => endGesture(event, true)}
			onLostPointerCapture={(event) => {
				// A touch starts with implicit capture on the tab. Ignore its bubbled
				// capture-loss event when the drum takes ownership of the drag.
				if (event.target !== event.currentTarget) return;
				gesture.current = null; setDragging(false); setDragOffset(0);
			}}
			onClickCapture={(event) => { if (suppressClick.current) { suppressClick.current = false; event.preventDefault(); event.stopPropagation(); } }}
			onKeyDown={(event) => {
				if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
				event.preventDefault();
				const index = modes.findIndex((mode) => mode.id === value);
				const next = event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : Math.max(0, Math.min(modes.length - 1, index + (event.key === 'ArrowRight' ? 1 : -1)));
				onChange(modes[next].id);
				root.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
			}}>
			<SegmentedTabs className="camera-modes" ariaLabel="Режим съёмки" tabs={modes} value={value} onChange={onChange} />
		</div>
	);
}
