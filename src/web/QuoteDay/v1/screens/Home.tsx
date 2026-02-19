import { useMemo, useState } from "react";
import { App } from "../../../../ui/App";
import { Avatar } from "../../../../ui/Avatar";
import { Button } from "../../../../ui/Button";
import { Cell } from "../../../../ui/Cell";
import { Header } from "../../../../ui/Header";
import { Icon } from "../../../../ui/Icon";
import { IconButton } from "../../../../ui/IconButton";
import { List, ListContainer } from "../../../../ui/List";
import { Nav } from "../../../../ui/Nav";
import { ThemeName, ThemeProvider } from "../../../../ui/Tokens";
import { View } from "../../../../ui/View";
import "./Home.scss";

export default function QuoteDayHome() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [navMode, setNavMode] = useState<"text" | "icon" | "icon-label">("icon-label");

  const navItems = useMemo(() => {
    if (navMode === "text") {
      return [
        { id: "feed", label: "Лента", active: true },
        { id: "profile", label: "Профиль" },
      ];
    }

    if (navMode === "icon") {
      return [
        { id: "a", icon: <Icon name="placeholder" width={20} height={20} alt="" />, active: true },
        { id: "b", icon: <Icon name="placeholder" width={20} height={20} alt="" /> },
        { id: "c", icon: <Icon name="placeholder" width={20} height={20} alt="" /> },
        { id: "d", icon: <Icon name="placeholder" width={20} height={20} alt="" /> },
        { id: "e", icon: <Icon name="placeholder" width={20} height={20} alt="" /> },
      ];
    }

    return [
      {
        id: "home",
        label: "Домой",
        icon: <Icon name="placeholder" width={18} height={18} alt="" />,
        active: true,
      },
      { id: "search", label: "Поиск", icon: <Icon name="placeholder" width={18} height={18} alt="" /> },
      { id: "add", label: "Новый", icon: <Icon name="placeholder" width={18} height={18} alt="" /> },
      { id: "chat", label: "Чаты", icon: <Icon name="placeholder" width={18} height={18} alt="" /> },
      { id: "profile", label: "Профиль", icon: <Icon name="placeholder" width={18} height={18} alt="" /> },
    ];
  }, [navMode]);

  return (
    <ThemeProvider theme={theme}>
      <App>
        <Header
          title="Компоненты"
          meta={
            <div className="ui-showcase-row">
              <Button
                variant="secondary"
                size={44}
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              >
                Тема: {theme}
              </Button>
            </div>
          }
        />

        <View>
          <ListContainer>
            <List title="Цвета">
              <Cell
                title="Primary"
                subtitle="Основной цвет интерфейса"
                trailing={<span className="ui-color-swatch" style={{ background: "var(--color-primary)" }} />}
              />
              <Cell
                title="Secondary"
                subtitle="Фон app и вспомогательных блоков"
                trailing={
                  <span className="ui-color-swatch" style={{ background: "var(--color-secondary)" }} />
                }
              />
              <Cell
                title="Disabled / Border / Background"
                subtitle="Состояние disabled, границы и базовый фон"
                trailing={
                  <div className="ui-showcase-row">
                    <span className="ui-color-swatch" style={{ background: "var(--color-disabled)" }} />
                    <span className="ui-color-swatch" style={{ background: "var(--color-border)" }} />
                    <span className="ui-color-swatch" style={{ background: "var(--color-background)" }} />
                  </div>
                }
              />
            </List>

            <List title="Кнопки 44 / 60">
              <Cell
                title="Текстовые кнопки"
                subtitle="Primary и Secondary"
                trailing={
                  <div className="ui-showcase-row">
                    <Button size={44}>44</Button>
                    <Button size={60} variant="secondary">
                      60
                    </Button>
                  </div>
                }
              />
              <Cell
                title="Иконочные кнопки"
                subtitle="Размеры 44 и 60"
                trailing={
                  <div className="ui-showcase-row">
                    <IconButton size={44} aria-label="icon 44">
                      <Icon name="placeholder" width={20} height={20} alt="" />
                    </IconButton>
                    <IconButton size={60} aria-label="icon 60">
                      <Icon name="placeholder" width={24} height={24} alt="" />
                    </IconButton>
                  </div>
                }
              />
            </List>

            <List title="Аватары и Cell">
              <Cell
                title="Изображение + кнопка справа"
                subtitle="Cell с отдельным действием справа"
                leading={
                  <Avatar
                    size={44}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
                    alt="User"
                  />
                }
                trailing={
                  <IconButton
                    size={44}
                    aria-label="more"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <Icon name="placeholder" width={20} height={20} alt="" />
                  </IconButton>
                }
              />
              <Cell
                title="Fallback-иконка"
                subtitle="Avatar без изображения"
                leading={<Avatar size={44} iconName="placeholder" />}
                trailing={<Button size={44} variant="ghost">Открыть</Button>}
              />
            </List>

            <List title="Nav">
              <Cell
                title="Режим навигации"
                subtitle="1-2 текстовые, 3-5 иконочных, 3-5 иконка+текст 12px"
                trailing={
                  <div className="ui-showcase-row">
                    <Button size={44} variant={navMode === "text" ? "primary" : "secondary"} onClick={() => setNavMode("text")}>
                      Text
                    </Button>
                    <Button size={44} variant={navMode === "icon" ? "primary" : "secondary"} onClick={() => setNavMode("icon")}>
                      Icon
                    </Button>
                    <Button
                      size={44}
                      variant={navMode === "icon-label" ? "primary" : "secondary"}
                      onClick={() => setNavMode("icon-label")}
                    >
                      Tab
                    </Button>
                  </div>
                }
              />
            </List>
          </ListContainer>
        </View>

        <Nav items={navItems} variant={navMode} />
      </App>
    </ThemeProvider>
  );
}
