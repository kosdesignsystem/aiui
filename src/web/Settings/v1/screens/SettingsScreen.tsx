import { useState } from "react";
import { App } from "../../../../ui/App";
import { Header } from "../../../../ui/Header";
import { Icon } from "../../../../ui/Icon";
import { View } from "../../../../ui/View";
import "./SettingsScreen.scss";

type SettingsItem = {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
};

const connectivityItems: SettingsItem[] = [
  {
    id: "cellular",
    icon: "signal-cellular-100",
    title: "Сотовая связь",
    subtitle: "MTS",
  },
  {
    id: "wifi",
    icon: "wifi",
    title: "Wi-Fi",
    subtitle: "KLCorp",
  },
];

const preferencesItems: SettingsItem[] = [
  {
    id: "passcode",
    icon: "pincode",
    title: "Код-пароль",
  },
  {
    id: "notifications",
    icon: "notification-outline",
    title: "Уведомления",
  },
  {
    id: "display",
    icon: "settings-outline",
    title: "Экран",
  },
  {
    id: "sound",
    icon: "speaker",
    title: "Звук и вибрация",
  },
  {
    id: "battery",
    icon: "battery-100",
    title: "Батарея",
  },
  {
    id: "storage",
    icon: "folder-outline",
    title: "Память",
  },
];

export default function SettingsScreen() {
  const [currentPage, setCurrentPage] = useState<"main" | "battery">("main");
  const [airplaneModeEnabled, setAirplaneModeEnabled] = useState(false);
  const [powerSavingEnabled, setPowerSavingEnabled] = useState(false);
  const [adaptiveBatteryEnabled, setAdaptiveBatteryEnabled] = useState(true);
  const [backgroundLimitEnabled, setBackgroundLimitEnabled] = useState(false);

  if (currentPage === "battery") {
    return (
      <App>
        <Header title="Батарея" />
        <View>
          <section className="battery-screen">
            <button
              type="button"
              className="battery-back-button"
              onClick={() => setCurrentPage("main")}
            >
              <Icon name="chevron-left" alt="" width={20} height={20} />
              <span>Назад в настройки</span>
            </button>

            <article className="battery-summary">
              <div className="battery-summary__top">
                <Icon name="battery-100" alt="" width={38} height={38} />
                <span className="battery-summary__percent">82%</span>
              </div>
              <p className="battery-summary__status">Заряжается • до 100% за 42 мин</p>
            </article>

            <section className="battery-card" aria-label="Информация о батарее">
              <div className="battery-row">
                <span>Состояние</span>
                <strong>Отличное</strong>
              </div>
              <div className="battery-row">
                <span>Осталось работы</span>
                <strong>9 ч 40 мин</strong>
              </div>
              <div className="battery-row">
                <span>Последняя полная зарядка</span>
                <strong>Сегодня, 08:15</strong>
              </div>
            </section>

            <section className="battery-card" aria-label="Действия батареи">
              <div className="battery-action">
                <div className="battery-action__text">
                  <span className="battery-action__title">Режим энергосбережения</span>
                  <span className="battery-action__subtitle">
                    Снижает яркость и фоновую активность
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={powerSavingEnabled}
                  aria-label="Режим энергосбережения"
                  className={`settings-switch${powerSavingEnabled ? " is-on" : ""}`}
                  onClick={() => setPowerSavingEnabled((prev) => !prev)}
                >
                  <span className="settings-switch__thumb" />
                </button>
              </div>

              <div className="battery-action">
                <div className="battery-action__text">
                  <span className="battery-action__title">Адаптивная батарея</span>
                  <span className="battery-action__subtitle">
                    Оптимизирует расход энергии в фоне
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={adaptiveBatteryEnabled}
                  aria-label="Адаптивная батарея"
                  className={`settings-switch${adaptiveBatteryEnabled ? " is-on" : ""}`}
                  onClick={() => setAdaptiveBatteryEnabled((prev) => !prev)}
                >
                  <span className="settings-switch__thumb" />
                </button>
              </div>

              <div className="battery-action">
                <div className="battery-action__text">
                  <span className="battery-action__title">Ограничить фоновую активность</span>
                  <span className="battery-action__subtitle">Для приложений с высоким расходом</span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={backgroundLimitEnabled}
                  aria-label="Ограничить фоновую активность"
                  className={`settings-switch${backgroundLimitEnabled ? " is-on" : ""}`}
                  onClick={() => setBackgroundLimitEnabled((prev) => !prev)}
                >
                  <span className="settings-switch__thumb" />
                </button>
              </div>
            </section>
          </section>
        </View>
      </App>
    );
  }

  return (
    <App>
      <Header title="Настройки" />
      <View>
        <main className="settings-screen">
          <button type="button" className="settings-search" aria-label="Поиск настроек">
            <Icon name="search" alt="" width={24} height={24} />
            <span>Поиск настроек</span>
          </button>

          <section className="settings-card" aria-label="Сети и подключения">
            <div className="settings-row settings-row--with-toggle">
              <div className="settings-row__lead">
                <Icon name="avia" alt="" width={28} height={28} />
                <span className="settings-row__title">Авиарежим</span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={airplaneModeEnabled}
                aria-label="Авиарежим"
                className={`settings-switch${airplaneModeEnabled ? " is-on" : ""}`}
                onClick={() => setAirplaneModeEnabled((prev) => !prev)}
              >
                <span className="settings-switch__thumb" />
              </button>
            </div>

            {connectivityItems.map((item) => (
              <button key={item.id} type="button" className="settings-row settings-row--button">
                <div className="settings-row__lead">
                  <Icon name={item.icon} alt="" width={28} height={28} />

                  <span className="settings-row__text">
                    <span className="settings-row__title">{item.title}</span>
                    {item.subtitle ? (
                      <span className="settings-row__subtitle">{item.subtitle}</span>
                    ) : null}
                  </span>
                </div>

                <span className="settings-row__chevron">
                  <Icon
                    name="chevron-right"
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            ))}
          </section>

          <section className="settings-list" aria-label="Основные настройки">
            {preferencesItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="settings-row settings-row--button"
                onClick={item.id === "battery" ? () => setCurrentPage("battery") : undefined}
              >
                <div className="settings-row__lead">
                  <Icon name={item.icon} alt="" width={28} height={28} />
                  <span className="settings-row__title">{item.title}</span>
                </div>

                <span className="settings-row__chevron">
                  <Icon
                    name="chevron-right"
                    alt=""
                    width={24}
                    height={24}
                  />
                </span>
              </button>
            ))}
          </section>
        </main>
      </View>
    </App>
  );
}
