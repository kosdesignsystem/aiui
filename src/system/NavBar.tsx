import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import './navbar.scss';

type NavBarProps = {
	isMobileViewport?: boolean;
	onHomeLongPress?: () => void;
};

const homeLongPressDurationMs = 650;

export function NavBar({ isMobileViewport = false, onHomeLongPress }: NavBarProps) {
	const navigate = useNavigate();
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
