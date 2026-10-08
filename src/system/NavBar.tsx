import { useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import './navbar.scss';

type NavBarProps = {
	isMobileViewport?: boolean;
	onHomeLongPress?: () => void;
};

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

export function NavBar({ isMobileViewport = false, onHomeLongPress }: NavBarProps) {
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
				<Icon
					colorToken="content-secondary"
					width={24}
					height={24}
					name={'mobile-back-outline'}
				/>
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
				<Icon colorToken="content-secondary" width={24} height={24} name={'mobile-home'} />
			</button>
		</div>
	);
}
