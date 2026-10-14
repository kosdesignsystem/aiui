import { useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { Icon } from '../../ui/Icon';
import { homePages, type LaunchableApp } from './model';

export function LauncherStatus({ dark = false }: { dark?: boolean }) {
	return (
		<div className={`launcher-status${dark ? ' is-dark' : ''}`} aria-hidden="true">
			<span>13:52</span>
			<span className="launcher-status__icons">
				<Icon name="signal-cellular-100" width={14} height={14} />
				<Icon name="wifi" width={14} height={14} />
				<Icon name="battery-charge-medium" width={14} height={14} />
				<span>98%</span>
			</span>
		</div>
	);
}

export function ClockBlock({ compact = false }: { compact?: boolean }) {
	return (
		<div className={`launcher-clock${compact ? ' launcher-clock--compact' : ''}`}>
			<time>13:52</time>
			<span>Понедельник, 24 июня</span>
		</div>
	);
}

type HomeGridProps = {
	activePage: number;
	dragOffset: number;
	viewportWidth: number;
	isDragging: boolean;
	isSettling: boolean;
	onLaunch: (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => void;
	onPageChange: (page: number) => void;
	onViewportResize: (width: number) => void;
};

export function HomeGrid({
	activePage,
	dragOffset,
	viewportWidth,
	isDragging,
	isSettling,
	onLaunch,
	onPageChange,
	onViewportResize,
}: HomeGridProps) {
	const viewportRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;
		const reportWidth = () => {
			if (viewport.clientWidth > 0) onViewportResize(viewport.clientWidth);
		};
		reportWidth();
		const observer = new ResizeObserver(reportWidth);
		observer.observe(viewport);
		return () => observer.disconnect();
	}, [onViewportResize]);

	const safeWidth = Math.max(1, viewportWidth);
	const normalizedOffset = dragOffset / safeWidth;
	const visualPage = activePage - normalizedOffset;
	const lastPage = homePages.length - 1;
	const indicatorPosition = Math.min(lastPage, Math.max(0, visualPage));
	const indicatorPhase = Math.abs(indicatorPosition - Math.round(indicatorPosition));
	const edgeOverflow = visualPage < 0 ? -visualPage : Math.max(0, visualPage - lastPage);
	const indicatorStretch = Math.sin(indicatorPhase * Math.PI) * 7
		+ Math.min(1, edgeOverflow / .18) * 3.5;
	const indicatorStyle = {
		'--launcher-indicator-x': `${indicatorPosition * 19 - indicatorStretch / 2}px`,
		'--launcher-indicator-width': `${6 + indicatorStretch}px`,
	} as CSSProperties;
	const edge = visualPage < 0 ? 'start' : visualPage > lastPage ? 'end' : undefined;
	const style = {
		'--launcher-home-page': activePage,
		'--launcher-home-page-drag': `${dragOffset}px`,
		'--launcher-edge-pull': Math.min(1, edgeOverflow / .22),
	} as CSSProperties;

	return (
		<div
			className={`launcher-home-pages${isDragging ? ' is-dragging' : ''}${isSettling ? ' is-settling' : ''}`}
			data-edge={edge}
			aria-label="Страницы приложений"
		>
			<div className="launcher-home-pages__viewport" ref={viewportRef}>
				<div className="launcher-home-pages__track" style={style}>
					{homePages.map((pageApps, pageIndex) => {
						const pageDistance = pageIndex - activePage + normalizedOffset;
						const distanceFromCenter = Math.min(1, Math.abs(pageDistance));
						const pageStyle = {
							'--launcher-page-distance': pageDistance,
							'--launcher-page-scale': 1 - distanceFromCenter * .038,
							'--launcher-page-opacity': 1 - distanceFromCenter * .12,
						} as CSSProperties;

						return (
							<div
								className="launcher-home-page"
								key={pageIndex}
								style={pageStyle}
								aria-hidden={pageIndex !== activePage}
							>
							<div className="launcher-app-grid" aria-label={`Приложения, страница ${pageIndex + 1}`}>
								{pageApps.map((app, appIndex) => {
									const launchableApp = app.preview ? app as LaunchableApp : null;
									const column = appIndex % 4;
									const appStyle = {
										'--launcher-app-index': appIndex,
										'--launcher-app-drift': `${pageDistance * (column - 1.5) * .9}px`,
									} as CSSProperties;

									return (
										<button
											className="launcher-app"
											key={app.id}
											style={appStyle}
											type="button"
											tabIndex={pageIndex === activePage ? 0 : -1}
											data-launcher-app-id={app.id}
											aria-disabled={!launchableApp}
											onPointerUp={launchableApp ? (event) => onLaunch(event, launchableApp) : undefined}
										>
											<span className="launcher-app__icon-wrap">
												<img className="launcher-app__icon" src={app.icon} alt="" draggable="false" />
											</span>
											<span className="launcher-app__label">{app.label}</span>
										</button>
									);
								})}
							</div>
							</div>
						);
					})}
				</div>
			</div>
			<div
				className="launcher-home-pages__indicator"
				style={indicatorStyle}
				aria-label={`Страница ${activePage + 1} из ${homePages.length}`}
			>
				<span className="launcher-home-pages__indicator-active" aria-hidden="true" />
				{homePages.map((_, pageIndex) => (
					<button
						key={pageIndex}
						type="button"
						aria-label={`Перейти на страницу ${pageIndex + 1}`}
						aria-current={pageIndex === activePage ? 'page' : undefined}
						onClick={() => onPageChange(pageIndex)}
					/>
				))}
			</div>
		</div>
	);
}

type PinPadProps = {
	entered: number;
	onDigit: (digit: number) => void;
	onCancel: () => void;
	className?: string;
	style?: CSSProperties;
	interactive?: boolean;
};

export function PinPad({
	entered,
	onDigit,
	onCancel,
	className = '',
	style,
	interactive = true,
}: PinPadProps) {
	return (
		<div
			className={`launcher-pin${className ? ` ${className}` : ''}`}
			style={style}
			aria-hidden={!interactive || undefined}
		>
			<Icon name="lock" width={22} height={22} aria-hidden="true" />
			<h1>Введите код-пароль</h1>
			<div className="launcher-pin__dots" aria-label={`Введено цифр: ${entered}`}>
				{[0, 1, 2, 3].map((index) => (
					<span key={index} className={index < entered ? 'is-filled' : ''} />
				))}
			</div>
			<button className="launcher-pin__forgot" type="button" disabled={!interactive}>Не помню</button>
			<div className="launcher-pin__keys">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
					<button
						key={digit}
						className={digit === 0 ? 'is-zero' : ''}
						type="button"
						disabled={!interactive}
						onClick={() => onDigit(digit)}
					>
						{digit}
					</button>
				))}
			</div>
			<div className="launcher-pin__actions">
				<button type="button" disabled={!interactive}>SOS</button>
				<button type="button" disabled={!interactive} onClick={onCancel}>Отменить</button>
			</div>
		</div>
	);
}
