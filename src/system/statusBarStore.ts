import { useSyncExternalStore } from 'react';

/**
 * Состояние системного статус-бара. В настоящей ОС его выставляет система
 * (звонок, таймер, режим «без звука» и так далее), здесь им управляют
 * приложения-демонстрации: StatusBar → «Живой бар».
 */
export type StatusBarState = {
	call: boolean;
	timer: boolean;
	mute: boolean;
	alarm: boolean;
	airplane: boolean;
	gprs: boolean;
	/** Полный экран: бар скрыт, остаётся камера. */
	hidden: boolean;
};

export const defaultStatusBarState: StatusBarState = {
	call: false,
	timer: false,
	mute: false,
	alarm: false,
	airplane: false,
	gprs: false,
	hidden: false,
};

let state: StatusBarState = defaultStatusBarState;
const listeners = new Set<() => void>();

export function setStatusBarState(patch: Partial<StatusBarState>) {
	state = { ...state, ...patch };
	listeners.forEach((listener) => listener());
}

export function resetStatusBarState() {
	state = defaultStatusBarState;
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function useStatusBarState() {
	return useSyncExternalStore(subscribe, () => state);
}
