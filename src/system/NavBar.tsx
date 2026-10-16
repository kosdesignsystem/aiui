import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { runLauncherMinimizeTransition } from '../web/Launcher/viewTransition';
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
		const navigateHome = () => navigate(launcherPath, {
			state: launcherAppId ? { skipHomeEntrance: true, focusAppId: launcherAppId } : undefined,
		});

		if (!launcherAppId) {
			navigateHome();
			return;
		}

		runLauncherMinimizeTransition(launcherAppId, navigateHome);
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
