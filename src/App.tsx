import { Link, Route, Routes, useParams } from "react-router-dom";
import { appRegistry, flattenScreens } from "./apps/registry";
import "./styles/app.scss";

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
    <div className="screen-wrapper">
      <header className="screen-meta">
        <div>
          <h1>{match.app.title}</h1>
          <p>
            Тип: {match.app.type} · Версия: {match.version.id} · Экран: {match.screen.title}
          </p>
        </div>
        <Link to="/" className="back-link">
          ← Все экраны
        </Link>
      </header>
      <ScreenComponent />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="sidebar">
      <h2>Apps</h2>
      {appRegistry.map((app) => (
        <section key={app.id}>
          <h3>{app.title}</h3>
          {app.versions.map((version) => (
            <ul key={version.id}>
              {version.screens.map((screen) => (
                <li key={screen.id}>
                  <Link to={`/apps/${app.type}/${app.id}/${version.id}/${screen.id}`}>
                    {version.id} · {screen.title}
                  </Link>
                </li>
              ))}
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
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps/:type/:appId/:versionId/:screenId" element={<AppScreen />} />
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
      </main>
    </div>
  );
}
