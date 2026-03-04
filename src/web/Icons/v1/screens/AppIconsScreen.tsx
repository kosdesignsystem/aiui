import { App } from "../../../../ui/App";
import { AppIcon, appIconNames } from "../../../../ui/AppIcon";
import { Header } from "../../../../ui/Header";
import { View } from "../../../../ui/View";
import { IconGrid } from "../widgets/IconGrid";
import "../theme/tokens.scss";

export default function AppIconsScreen() {
  return (
    <App>
      <Header title="app_icons" />

      <View>
        <IconGrid
          variant="app-icon"
          pathLabel="Icons / v1 / app_icons"
          names={appIconNames}
          renderIcon={(name) => <AppIcon name={name} alt="" width={48} height={48} />}
        />
      </View>
    </App>
  );
}
