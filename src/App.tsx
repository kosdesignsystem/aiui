import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DeviceFrame } from './system/DeviceFrame';
import { ThemeName, ThemeProvider } from './ui/Tokens';
import { IconButton } from './ui/IconButton';
import { Icon } from './ui/Icon';
import { List, ListContainer } from './ui/List';
import { Cell } from './ui/Cell';
import { Header } from './ui/Header';
import { appRegistry, flattenScreens } from './web/registry';
import { Text } from './ui/Fonts';
import './app.scss';
import { Button } from './ui/Button';

const screenList = flattenScreens();
const defaultScreenPath = screenList[0]?.path;

function AppScreen() {
	const { appId, screenId } = useParams();
	const match = screenList.find((item) => item.app.id === appId && item.screen.id === screenId);

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
	onToggleTheme: () => void;
};

function Navigation({ theme, onToggleTheme }: NavigationProps) {
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
					<Button variant={'primary'} size={44} type={'button'} onClick={onToggleTheme}>
						{`Тема: ${theme}`}
					</Button>
				}
			/>

			<ListContainer>
				{appRegistry.map((app) => (
					<List key={app.id} title={app.title} collapsible>
						{app.screens.map((screen) => {
							const routePath = `/app/${app.id}/${screen.id}`;
							const isActive = location.pathname === routePath;

							return (
								<Cell
									key={`${app.id}-${screen.id}`}
									variant={isActive ? 'primary' : 'default'}
									onClick={() => navigate(routePath)}
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
						})}
					</List>
				))}
			</ListContainer>
		</nav>
	);
}

export default function App() {
	const [theme, setTheme] = useState<ThemeName>('dark');

	return (
		<ThemeProvider theme={theme}>
			<div className="layout">
				<Navigation
					theme={theme}
					onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
				/>

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
					<Route path="/app/:appId/:screenId" element={<AppScreen />} />
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
			</div>
		</ThemeProvider>
	);
}
