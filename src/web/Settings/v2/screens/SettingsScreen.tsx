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
    icon: "sound",
    title: "Звук и вибрация",
  },
  {
    id: "battery",
    icon: "mobile-outline",
    title: "Батарея",
  },
  {
    id: "storage",
    icon: "folder-outline",
    title: "Память",
  },
];

export default function SettingsScreen() {
  const [airplaneModeEnabled, setAirplaneModeEnabled] = useState(false);

  return (
    <App>
      <Header title="Настройки" />
      <View>
        <section className="settings-screen">
          <button type="button" className="settings-search" aria-label="Поиск настроек">
            <Icon name="search" alt="" width={24} height={24} />
            <span>Поиск настроек</span>
          </button>

          <section className="settings-group settings-group--rounded" aria-label="Сети и подключения">
            <div className="settings-row settings-row--with-toggle">
              <div className="settings-row__lead">
                <Icon name="avia" alt="" width={24} height={24} />
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
                  <Icon name={item.icon} alt="" width={24} height={24} />

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
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            ))}
          </section>

          <section className="settings-group settings-group--plain" aria-label="Основные настройки">
            {preferencesItems.map((item) => (
              <button key={item.id} type="button" className="settings-row settings-row--button">
                <div className="settings-row__lead">
                  <Icon name={item.icon} alt="" width={24} height={24} />
                  <span className="settings-row__title">{item.title}</span>
                </div>

                <span className="settings-row__chevron">
                  <Icon
                    name="chevron-right"
                    alt=""
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            ))}
          </section>
        </section>
      </View>
    </App>
  );
}
