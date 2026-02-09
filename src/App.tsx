import { Link, Route, Routes, useParams } from "react-router-dom";
import { DeviceFrame } from "./system/DeviceFrame";
import { appRegistry, flattenScreens } from "./web/registry";
import "./app.scss";

const screenList = flattenScreens();

function Home() {
	return (
		<div className="home">
			<h1>AIUI Prototype Lab</h1>
			<p>
				Выберите приложение и версию, чтобы открыть конкретный экран для
				прототипирования.
			</p>
			<ul className="screen-grid">
				{screenList.map((item) => (
					<li key={item.path}>
						<Link to={item.path}>
							<strong>{item.app.title}</strong>
							<span>
								{item.version.id} · {item.screen.title}
							</span>
							<small>{item.path}</small>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function AppScreen() {
	const { type, appId, versionId, screenId } = useParams();
	const match = screenList.find(
		(item) =>
			item.app.type === type &&
			item.app.id === appId &&
			item.version.id === versionId &&
			item.screen.id === screenId,
	);

	if (!match) {
		return (
			<div className="screen">
				<h2>Экран не найден</h2>
				<p>Проверьте маршрут или выберите экран из списка.</p>
				<Link to="/">Вернуться на главную</Link>
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

function Navigation() {
	const copyToClipboard = async (text: string) => {
		if (navigator.clipboard?.writeText) {
			try {
				await navigator.clipboard.writeText(text);
				return;
			} catch {
				// fallback below
			}
		}

		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	};

	return (
		<nav className="sidebar">
			<h2>Apps</h2>
			{appRegistry.map((app) => (
				<section key={app.id}>
					<h3>{app.title}</h3>
					{app.versions.map((version) => (
						<ul key={version.id}>
							{version.screens.map((screen) => {
								const routePath = `/apps/${app.type}/${app.id}/${version.id}/${screen.id}`;

								return (
									<li key={screen.id} className="sidebar-item">
										<Link to={routePath}>
											{version.id} · {screen.title}
										</Link>
										<button
											type="button"
											className="copy-button"
											aria-label="Копировать путь"
											title="Копировать путь"
											onClick={() => copyToClipboard(routePath)}
										>
										<svg
											viewBox="0 0 24 24"
											aria-hidden="true"
											focusable="false"
										>
											<path
												d="M16 3H8a2 2 0 0 0-2 2v10h2V5h8V3zm2 4H12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm0 14h-6V9h6v12z"
												fill="currentColor"
											/>
										</svg>
										</button>
									</li>
								);
							})}
						</ul>
					))}
				</section>
			))}
		</nav>
	);
}

export default function App() {
	return (
		<div className="layout">
			<Navigation />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/apps/:type/:appId/:versionId/:screenId"
					element={<AppScreen />}
				/>
				<Route
					path="*"
					element={
						<div className="screen">
							<h2>Маршрут не найден</h2>
							<Link to="/">Вернуться на главную</Link>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}
