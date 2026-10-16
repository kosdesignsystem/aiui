import { useCallback, useEffect, useRef } from 'react';

export function useManagedTimeouts() {
	const timersRef = useRef(new Set<number>());

	const clearAll = useCallback(() => {
		timersRef.current.forEach(window.clearTimeout);
		timersRef.current.clear();
	}, []);

	useEffect(() => clearAll, [clearAll]);

	const schedule = useCallback((callback: () => void, delay: number) => {
		const timer = window.setTimeout(() => {
			timersRef.current.delete(timer);
			callback();
		}, delay);
		timersRef.current.add(timer);
		return timer;
	}, []);

	return { schedule, clearAll };
}
