import { useEffect, useRef, useState, type DependencyList, type RefObject } from 'react';
import systemBarTokens from '../../../docs/system-bars/system-bars.tokens.json';

/**
 * Цвет значков системных баров по правилам docs/system-bars/README.md:
 * бары прозрачные, приложение красит то, что под ними, и сообщает ОС,
 * светлые или тёмные значки нужны (контракт statusBar.icons / navBar.icons).
 */
export type BarIcons = 'light' | 'dark';

type Rgba = { r: number; g: number; b: number; a: number };

const { icons } = systemBarTokens;
const onLight = parseColor(icons.onLight);
const onDark = parseColor(icons.onDark);

/** Разбирает rgb()/rgba(), color(srgb …) и #hex — форматы getComputedStyle и токенов. */
export function parseColor(value: string): Rgba {
	const hex = value.match(/^#([0-9a-f]{6})$/i);
	if (hex) {
		const n = parseInt(hex[1], 16);
		return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
	}

	const srgb = value.match(/^color\(srgb\s+([\d.e-]+)\s+([\d.e-]+)\s+([\d.e-]+)(?:\s*\/\s*([\d.e-]+%?))?\)$/);
	if (srgb) {
		return {
			r: Number(srgb[1]) * 255,
			g: Number(srgb[2]) * 255,
			b: Number(srgb[3]) * 255,
			a: parseAlpha(srgb[4]),
		};
	}

	const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
	if (rgb) {
		return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]), a: parseAlpha(rgb[4]) };
	}

	return { r: 0, g: 0, b: 0, a: 0 };
}

function parseAlpha(value: string | undefined) {
	if (value === undefined) {
		return 1;
	}

	return value.endsWith('%') ? Number(value.slice(0, -1)) / 100 : Number(value);
}

/** Относительная яркость WCAG 2.1. */
export function relativeLuminance({ r, g, b }: Rgba) {
	const channel = (value: number) => {
		const c = value / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};

	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: Rgba, b: Rgba) {
	const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
	return (light + 0.05) / (dark + 0.05);
}

/** Берёт цвет значков с большим контрастом к фону. */
export function pickBarIcons(background: Rgba): BarIcons {
	return contrastRatio(background, onLight) >= contrastRatio(background, onDark) ? 'dark' : 'light';
}

function blend(top: Rgba, bottom: Rgba): Rgba {
	const a = top.a + bottom.a * (1 - top.a);
	if (a === 0) {
		return { r: 0, g: 0, b: 0, a: 0 };
	}

	const mix = (t: number, u: number) => (t * top.a + u * bottom.a * (1 - top.a)) / a;
	return { r: mix(top.r, bottom.r), g: mix(top.g, bottom.g), b: mix(top.b, bottom.b), a };
}

function effectiveOpacity(element: Element) {
	let opacity = 1;
	for (let node: Element | null = element; node; node = node.parentElement) {
		opacity *= Number(getComputedStyle(node).opacity);
	}

	return opacity;
}

/** Итоговый цвет в точке: сплошные заливки всех слоёв под ней, сверху вниз до первого непрозрачного. */
function colorAtPoint(x: number, y: number, ignore: Element[]) {
	const layers: Rgba[] = [];

	for (const element of document.elementsFromPoint(x, y)) {
		if (ignore.some((bar) => bar.contains(element))) {
			continue;
		}

		const color = parseColor(getComputedStyle(element).backgroundColor);
		if (color.a === 0) {
			continue;
		}

		const layer = { ...color, a: color.a * effectiveOpacity(element) };
		layers.push(layer);
		if (layer.a >= 1) {
			break;
		}
	}

	return layers.reduceRight<Rgba>((under, layer) => blend(layer, under), { r: 255, g: 255, b: 255, a: 1 });
}

/** Самое светлое место под баром: по нему выбирается цвет значков. */
function lightestUnder(bar: Element, ignore: Element[]) {
	const rect = bar.getBoundingClientRect();
	const y = rect.top + rect.height / 2;
	const samples = [0.1, 0.3, 0.5, 0.7, 0.9].map((t) => colorAtPoint(rect.left + rect.width * t, y, ignore));
	return samples.reduce((lightest, color) =>
		relativeLuminance(color) > relativeLuminance(lightest) ? color : lightest,
	);
}

const settleMs = 400;

/**
 * Замеряет фон под статус-баром и навбаром и возвращает нужный цвет значков.
 * Пересчитывает покадрово, пока идут анимации после изменения deps
 * (появление и закрытие затемнения), и при смене темы.
 */
export function useSystemBarIcons(rootRef: RefObject<HTMLElement>, deps: DependencyList) {
	const [state, setState] = useState<{ statusBar?: BarIcons; navBar?: BarIcons }>({});
	const frameRef = useRef(0);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) {
			return;
		}

		const scope = root.closest('.device-mockup') ?? document;
		const statusBar = scope.querySelector('.device-statusbar');
		const navBar = scope.querySelector('.device-navbar');
		const bars = [statusBar, navBar].filter((bar): bar is Element => bar !== null);

		const measure = () => {
			const next = {
				statusBar: statusBar ? pickBarIcons(lightestUnder(statusBar, bars)) : undefined,
				navBar: navBar ? pickBarIcons(lightestUnder(navBar, bars)) : undefined,
			};
			setState((current) =>
				current.statusBar === next.statusBar && current.navBar === next.navBar ? current : next,
			);
		};

		let until = performance.now() + settleMs;
		const tick = () => {
			measure();
			if (performance.now() < until) {
				frameRef.current = requestAnimationFrame(tick);
			}
		};
		tick();

		const themeObserver = new MutationObserver(() => {
			until = performance.now() + settleMs;
			cancelAnimationFrame(frameRef.current);
			tick();
		});
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

		return () => {
			cancelAnimationFrame(frameRef.current);
			themeObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return state;
}
