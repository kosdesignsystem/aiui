export const launcherMotion = {
	modeFade: 170,
	homeLaunchReveal: 260,
	homeLaunchComplete: 720,
	recentLaunch: 360,
	recentTransition: 380,
	recentSnap: 320,
	shadeClose: 240,
	recentDismiss: 240,
	recentCollapseDelay: 170,
	recentCollapseComplete: 460,
	recentCloseAllStagger: 28,
} as const;

export const launcherGesture = {
	axisLockDistance: 7,
	tapSlop: 6,
	pageDistanceRatio: .18,
	pageVelocity: .38,
	pageVelocityDistance: 24,
	shadeOpenDistance: 72,
	shadeCloseDistance: 64,
	recentsOpenDistance: 72,
	recentDismissDistance: 88,
	recentDismissVelocity: .42,
	recentFlingVelocity: .38,
} as const;

export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

export function progress(value: number, distance: number) {
	return clamp(value / distance, 0, 1);
}

export function resist(value: number, factor = .24) {
	return Math.sign(value) * Math.pow(Math.abs(value), .86) * factor * 2.05;
}

export function prefersReducedMotion() {
	return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
