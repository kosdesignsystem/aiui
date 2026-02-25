import { Icon, IconName } from "../ui/Icon";
import "./statusbar.scss";

type StatusIcon = {
	name: IconName;
	dimmed?: boolean;
};

type StaticStatusState = {
	extras: StatusIcon[];
	cellular: StatusIcon;
	wifi: StatusIcon;
	battery: StatusIcon;
	batteryPercent: number;
	batteryTone?: "default" | "warning" | "critical";
};

const STATIC_STATUS: StaticStatusState = {
	extras: [],
	cellular: { name: "signal-cellular-100" },
	wifi: { name: "wifi" },
	battery: { name: "battery-charge-medium" },
	batteryPercent: 96,
};

function iconClassName(icon: StatusIcon) {
	return icon.dimmed
		? "device-statusbar__icon device-statusbar__icon--dimmed"
		: "device-statusbar__icon";
}

export function StatusBar() {
	const state = STATIC_STATUS;
	const clock = "09:41";
	return (
		<div className="device-statusbar device-statusbar--default" aria-hidden="true">
			<span className="device-statusbar__time">{clock}</span>
			<div className="device-statusbar__indicators">
				{state.extras.map((icon) => (
					<Icon
						key={icon.name}
						name={icon.name}
						alt=""
						width={14}
						height={14}
						className={iconClassName(icon)}
					/>
				))}
				<Icon
					name={state.cellular.name}
					alt=""
					width={14}
					height={14}
					className={iconClassName(state.cellular)}
				/>
				<Icon
					name={state.wifi.name}
					alt=""
					width={14}
					height={14}
					className={iconClassName(state.wifi)}
				/>
				<Icon
					name={state.battery.name}
					alt=""
					width={14}
					height={14}
					className={iconClassName(state.battery)}
				/>
				<span
					className={`device-statusbar__battery-value${
						state.batteryTone ? ` is-${state.batteryTone}` : ""
					}`}
				>
					{state.batteryPercent}%
				</span>
			</div>
		</div>
	);
}
