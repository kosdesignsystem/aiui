import { App } from "../../../../ui/App";
import { Header } from "../../../../ui/Header";
import { Icon, iconNames } from "../../../../ui/Icon";
import { View } from "../../../../ui/View";
import { IconGrid } from "../widgets/IconGrid";
import "../theme/tokens.scss";

export default function IconsScreen() {
  return (
    <App>
      <Header title="icons" />

      <View>
        <IconGrid
          variant="icon"
          pathLabel="Icons / v1 / icons"
          names={iconNames}
          renderIcon={(name) => <Icon name={name} alt="" width={24} height={24} />}
        />
      </View>
    </App>
  );
}
