import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DeviceFrame } from './system/DeviceFrame';
import { NavBar } from './system/NavBar';
import { ThemeName, ThemeProvider } from './ui/Tokens';
import { IconButton } from './ui/IconButton';
import { Icon } from './ui/Icon';
import { List, ListContainer } from './ui/List';
import { Cell } from './ui/Cell';
import { Header } from './ui/Header';
import {
	appRegistry,
	findAppScreen,
	getDefaultAppScreenPath,
} from './web/registry';
import { Text } from './ui/Fonts';
import './app.scss';

const defaultScreenPath = getDefaultAppScreenPath(appRegistry);
const mobileMediaQuery = '(max-width: 768px), (hover: none) and (pointer: coarse)';
const themeOptions: Array<{ value: ThemeName; label: string }> = [
	{ value: 'light', label: 'Light' },
	{ value: 'dark', label: 'Dark' },
	{ value: 'hexa-light', label: 'Hexa Light' },
	{ value: 'hexa-dark', label: 'Hexa Dark' },
];

function getIsMobileViewport() {
	if (typeof window === 'undefined' || !window.matchMedia) {
		return false;
	}

	return window.matchMedia(mobileMediaQuery).matches;
}

type AppScreenProps = {
	isMobile?: boolean;
};

function AppScreen({ isMobile = false }: AppScreenProps) {
	const { appId, screenId } = useParams();
	const match = findAppScreen(appRegistry, appId, screenId);

	if (!match) {
		if (defaultScreenPath) {
			return <Navigate to={defaultScreenPath} replace />;
		}

		return (
			<div className="screen">
				<h2>Экран не найден</h2>
				<p>Проверьте маршрут или добавьте экран в реестр.</p>
			</div>
		);
	}

	const ScreenComponent = match.screen.Component;

	if (isMobile) {
		return <ScreenComponent />;
	}

	return (
		<div className="wrapper">
			<DeviceFrame>
				<ScreenComponent />
			</DeviceFrame>
		</div>
	);
}

type NavigationProps = {
	theme: ThemeName;
	onThemeChange: (theme: ThemeName) => void;
	onNavigate?: () => void;
};

function Navigation({ theme, onThemeChange, onNavigate }: NavigationProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const copyToClipboard = async (text: string) => {
		if (navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(text);
				return;
			} catch {
				// fallback below
			}
		}

		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'fixed';
		textarea.style.opacity = '0';
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
	};

	return (
		<nav className="sidebar">
			<Header
				title="AI UI"
				button={
					<label className="theme-select">
						<select
							className="theme-select__field"
							value={theme}
							onChange={(event) => onThemeChange(event.target.value as ThemeName)}
						>
							{themeOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</label>
				}
			/>

			<ListContainer>
				{appRegistry.map((app) => (
					<List key={app.id} title={app.title} collapsible>
						{app.flows.flatMap((flow) =>
							flow.screens.map((screen) => {
								const routePath = `/app/${app.id}/${screen.id}`;
								const isActive = location.pathname === routePath;

								return (
									<Cell
										key={`${app.id}-${flow.id}-${screen.id}`}
										variant={isActive ? 'primary' : 'default'}
										onClick={() => {
											navigate(routePath);
											onNavigate?.();
										}}
										title={<Text variant="regular-18">{screen.title}</Text>}
										trailing={
											<IconButton
												type="button"
												variant="secondary"
												aria-label="Копировать путь"
												title="Копировать путь"
												onClick={(event) => {
													event.stopPropagation();
													void copyToClipboard(routePath);
												}}
												onKeyDown={(event) => event.stopPropagation()}
											>
												<Icon name="copy-outline" alt="" aria-hidden="true" />
											</IconButton>
										}
									/>
								);
							}),
						)}
					</List>
				))}
			</ListContainer>
		</nav>
	);
}

export default function App() {
	const [theme, setTheme] = useState<ThemeName>('light');
	const [isMobile, setIsMobile] = useState(getIsMobileViewport);
	const [isNavigationVisible, setIsNavigationVisible] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.matchMedia) {
			return undefined;
		}

		const mediaQuery = window.matchMedia(mobileMediaQuery);
		const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
			setIsMobile(event.matches);

			if (event.matches) {
				setIsNavigationVisible(false);
			}
		};

		handleChange(mediaQuery);

		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleChange);

			return () => mediaQuery.removeEventListener('change', handleChange);
		}

		mediaQuery.addListener(handleChange);

		return () => mediaQuery.removeListener(handleChange);
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<div className={`layout${isMobile ? ' layout--mobile' : ''}`}>
				{isMobile && isNavigationVisible ? (
					<button
						className="layout__backdrop"
						type="button"
						aria-label="Скрыть навигацию"
						onClick={() => setIsNavigationVisible(false)}
					/>
				) : null}

				{(!isMobile || isNavigationVisible) && (
					<Navigation
						theme={theme}
						onThemeChange={setTheme}
						onNavigate={() => {
							if (isMobile) {
								setIsNavigationVisible(false);
							}
						}}
					/>
				)}

				<main className="layout__content">
					<Routes>
						<Route
							path="/"
							element={
								defaultScreenPath ? (
									<Navigate to={defaultScreenPath} replace />
								) : (
									<div className="screen">
										<h2>Нет доступных экранов</h2>
										<p>Добавьте экран в `appRegistry`.</p>
									</div>
								)
							}
						/>
						<Route
							path="/app/:appId/:screenId"
							element={<AppScreen isMobile={isMobile} />}
						/>
						<Route
							path="*"
							element={
								defaultScreenPath ? (
									<Navigate to={defaultScreenPath} replace />
								) : (
									<div className="screen">
										<h2>Маршрут не найден</h2>
									</div>
								)
							}
						/>
					</Routes>
				</main>

				{isMobile ? (
					<NavBar
						isMobileViewport
						onHomeLongPress={() => {
							if (!isNavigationVisible) {
								setIsNavigationVisible(true);
							}
						}}
					/>
				) : null}
			</div>
		</ThemeProvider>
	);
}
