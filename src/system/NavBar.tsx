import { useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.scss';

type NavBarProps = {
	isMobileViewport?: boolean;
	onHomeLongPress?: () => void;
	onOverview?: () => void;
};

/*
 * Значки из дизайна Navbar.svg (docs/system-bars/assets/Navbar.svg): 24×24,
 * цвет — как у статус-бара (--system-bar-icon, по умолчанию --content-primary).
 */
export function BackGlyph() {
	return (
		<svg width="24" height="24" viewBox="68 28 24 24" fill="currentColor" aria-hidden="true">
			<path fillRule="evenodd" d="M83 35.3333L74.25 39.9999L83 44.6667L83 35.3333ZM73.3088 38.2352C71.8971 38.9882 71.897 41.0117 73.3088 41.7646L82.0588 46.4314C83.391 47.1419 85 46.1765 85 44.6667L85 35.3333C85 33.8235 83.391 32.8581 82.0588 33.5686L73.3088 38.2352Z" />
		</svg>
	);
}

export function HomeGlyph() {
	return (
		<svg width="24" height="24" viewBox="168 28 24 24" fill="currentColor" aria-hidden="true">
			<path fillRule="evenodd" d="M182.479 35.7045L179.999 34.2988L177.519 35.7045L175.062 37.1494L175.039 39.9999L175.062 42.8504L177.519 44.2953L179.999 45.701L182.479 44.2954L184.936 42.8504L184.959 39.9999L184.936 37.1494L182.479 35.7045ZM183.479 33.9724L180.985 32.5589C180.374 32.2121 179.625 32.2121 179.013 32.5589L176.519 33.9724L174.048 35.4253C173.442 35.7817 173.067 36.4303 173.062 37.1335L173.039 39.9999L173.062 42.8663C173.067 43.5695 173.442 44.2181 174.048 44.5745L176.519 46.0274L179.013 47.4409C179.625 47.7877 180.374 47.7877 180.985 47.4409L183.479 46.0274L185.95 44.5745C186.556 44.2181 186.931 43.5695 186.936 42.8663L186.959 39.9999L186.936 37.1335C186.931 36.4303 186.556 35.7817 185.95 35.4253L183.479 33.9724Z" />
		</svg>
	);
}

export function OverviewGlyph() {
	return (
		<svg width="24" height="24" viewBox="268 28 24 24" fill="currentColor" aria-hidden="true">
			<path d="M281 34L281 46C281 46.6667 280.667 47 280 47C279.333 47 279 46.6667 279 46L279 34C279 33.3333 279.333 33 280 33C280.667 33 281 33.3333 281 34Z" />
		</svg>
	);
}

const homeLongPressDurationMs = 650;
const launcherPath = '/app/Launcher/main';
const launcherAppIds: Record<string, string> = {
	Calls: 'calls',
	Contacts: 'contacts',
	Gallery: 'gallery',
	Reminders: 'reminders',
};

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => {
		finished: Promise<void>;
	};
};

export type NavBarViewProps = {
	icons?: 'light' | 'dark';
	className?: string;
};

/** Навбар без навигации, для образцов состояний в приложении «Статус-бар». */
export function NavBarView({ icons = 'dark', className }: NavBarViewProps) {
	return (
		<div className={`device-navbar device-navbar--specimen device-navbar--icons-${icons}${className ? ` ${className}` : ''}`}>
			<span className="nav-button"><BackGlyph /></span>
			<span className="nav-button"><HomeGlyph /></span>
			<span className="nav-button"><OverviewGlyph /></span>
		</div>
	);
}

export function NavBar({ isMobileViewport = false, onHomeLongPress, onOverview }: NavBarProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const longPressTimerRef = useRef<number | null>(null);

	const clearLongPressTimer = () => {
		if (longPressTimerRef.current !== null) {
			window.clearTimeout(longPressTimerRef.current);
			longPressTimerRef.current = null;
		}
	};

	const handleHomePressStart = () => {
		if (!onHomeLongPress) {
			return;
		}

		clearLongPressTimer();
		longPressTimerRef.current = window.setTimeout(() => {
			onHomeLongPress();
			longPressTimerRef.current = null;
		}, homeLongPressDurationMs);
	};

	useEffect(() => clearLongPressTimer, []);

	const handleHomeClick = () => {
		if (location.pathname === launcherPath) {
			window.dispatchEvent(new Event('launcher:home'));
			return;
		}

		const appId = location.pathname.match(/^\/app\/([^/]+)\//)?.[1];
		const launcherAppId = appId ? launcherAppIds[appId] : undefined;
		const transitionDocument = document as ViewTransitionDocument;
		const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
		const navigateHome = () => navigate(launcherPath, {
			state: launcherAppId ? { skipHomeEntrance: true } : undefined,
		});

		if (!launcherAppId || !transitionDocument.startViewTransition || reduceMotion) {
			navigateHome();
			return;
		}

		document.documentElement.dataset.launcherMinimize = launcherAppId;
		const clearTransitionState = () => {
			delete document.documentElement.dataset.launcherMinimize;
		};

		try {
			const transition = transitionDocument.startViewTransition(() => {
				flushSync(navigateHome);
			});

			void transition.finished.then(clearTransitionState, clearTransitionState);
		} catch {
			clearTransitionState();
			navigateHome();
		}
	};

	return (
		<div className={`device-navbar${isMobileViewport ? ' device-navbar--mobile' : ''}`}>
			<button
				className="nav-button"
				type="button"
				aria-label="Назад"
				onClick={() => navigate(-1)}
			>
				<BackGlyph />
			</button>
			<button
				className="nav-button"
				type="button"
				aria-label={onHomeLongPress ? 'Открыть навигацию долгим нажатием' : 'Домой'}
				onClick={handleHomeClick}
				onPointerDown={handleHomePressStart}
				onPointerUp={clearLongPressTimer}
				onPointerCancel={clearLongPressTimer}
				onPointerLeave={clearLongPressTimer}
			>
				<HomeGlyph />
			</button>
			<button
				className="nav-button"
				type="button"
				aria-label="Обзор"
				onClick={onOverview}
			>
				<OverviewGlyph />
			</button>
		</div>
	);
}
