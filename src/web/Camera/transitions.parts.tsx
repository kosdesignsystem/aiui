import { useEffect, useRef, useState, type ReactNode } from 'react';

type Panel = 'shooting' | 'settings' | 'warmth' | 'exposure';

// Keep the outgoing panel mounted for its exit animation, then mount the new
// controls so their autofocus runs only when they become available.
export function CameraPanelTransition({ view, children }: { view: Panel; children: (view: Panel) => ReactNode }) {
	const [displayed, setDisplayed] = useState(view);
	const exiting = displayed !== view;
	useEffect(() => {
		if (displayed === view) return;
		const timer = window.setTimeout(() => setDisplayed(view), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150);
		return () => window.clearTimeout(timer);
	}, [view, displayed]);
	return <div key={displayed} className={`camera-panel${exiting ? ' is-exiting' : ''}`} aria-hidden={exiting || undefined} ref={(node) => { node?.toggleAttribute('inert', exiting); }}>
		{children(displayed)}
	</div>;
}

// The input responds immediately; only the preview's color follows softly.
export function useCameraAnimatedNumber(value: number) {
	const [animated, setAnimated] = useState(value);
	const current = useRef(value);
	useEffect(() => {
		if (current.current === value) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			current.current = value; setAnimated(value); return;
		}
		const from = current.current;
		const start = performance.now();
		let frame: number;
		const update = (now: number) => {
			const progress = Math.min(1, (now - start) / 120);
			current.current = from + (value - from) * (1 - (1 - progress) ** 3);
			setAnimated(current.current);
			if (progress < 1) frame = requestAnimationFrame(update);
		};
		frame = requestAnimationFrame(update);
		return () => cancelAnimationFrame(frame);
	}, [value]);
	return animated;
}
