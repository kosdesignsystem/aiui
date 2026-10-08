import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
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
	isDragging: boolean;
	onLaunch: (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => void;
	onPageChange: (page: number) => void;
};

export function HomeGrid({ activePage, dragOffset, isDragging, onLaunch, onPageChange }: HomeGridProps) {
	const style = {
		'--launcher-home-page': activePage,
		'--launcher-home-page-drag': `${dragOffset}px`,
	} as CSSProperties;

	return (
		<div className={`launcher-home-pages${isDragging ? ' is-dragging' : ''}`} aria-label="Страницы приложений">
			<div className="launcher-home-pages__viewport">
				<div className="launcher-home-pages__track" style={style}>
					{homePages.map((pageApps, pageIndex) => (
						<div
							className="launcher-home-page"
							key={pageIndex}
							aria-hidden={pageIndex !== activePage}
						>
							<div className="launcher-app-grid" aria-label={`Приложения, страница ${pageIndex + 1}`}>
								{pageApps.map((app) => {
									const launchableApp = app.preview ? app as LaunchableApp : null;

									return (
										<button
											className="launcher-app"
											key={app.id}
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
					))}
				</div>
			</div>
			<div className="launcher-home-pages__indicator" aria-label={`Страница ${activePage + 1} из ${homePages.length}`}>
				{homePages.map((_, pageIndex) => (
					<button
						className={pageIndex === activePage ? 'is-active' : ''}
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
};

export function PinPad({ entered, onDigit, onCancel }: PinPadProps) {
	return (
		<div className="launcher-pin">
			<Icon name="lock" width={22} height={22} aria-hidden="true" />
			<h1>Введите код-пароль</h1>
			<div className="launcher-pin__dots" aria-label={`Введено цифр: ${entered}`}>
				{[0, 1, 2, 3].map((index) => (
					<span key={index} className={index < entered ? 'is-filled' : ''} />
				))}
			</div>
			<button className="launcher-pin__forgot" type="button">Не помню</button>
			<div className="launcher-pin__keys">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
					<button
						key={digit}
						className={digit === 0 ? 'is-zero' : ''}
						type="button"
						onClick={() => onDigit(digit)}
					>
						{digit}
					</button>
				))}
			</div>
			<div className="launcher-pin__actions">
				<button type="button">SOS</button>
				<button type="button" onClick={onCancel}>Отменить</button>
			</div>
		</div>
	);
}
