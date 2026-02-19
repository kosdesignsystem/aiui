import { useEffect, useState } from "react";
import { Icon, IconName } from "../ui/Icon";
import "./statusbar.scss";

type StatusBarScenario = "default" | "commute" | "power-save" | "charging";
type BatteryTone = "default" | "warning" | "critical";

type StatusIcon = {
	name: IconName;
	dimmed?: boolean;
};

type ScenarioState = {
	extras: StatusIcon[];
	cellular: StatusIcon;
	wifi: StatusIcon;
	battery: StatusIcon;
	batteryPercent: number;
	batteryTone?: BatteryTone;
};

const SCENARIOS: Record<StatusBarScenario, ScenarioState> = {
	default: {
		extras: [],
		cellular: { name: "signal-cellular-100" },
		wifi: { name: "wifi" },
		battery: { name: "battery-100" },
		batteryPercent: 96,
	},
	commute: {
		extras: [{ name: "bluetooth-connected", dimmed: true }],
		cellular: { name: "signal-50" },
		wifi: { name: "wifil-25", dimmed: true },
		battery: { name: "battery-60" },
		batteryPercent: 61,
	},
	"power-save": {
		extras: [{ name: "vibration", dimmed: true }],
		cellular: { name: "signal-25", dimmed: true },
		wifi: { name: "wifi-off", dimmed: true },
		battery: { name: "battery-10" },
		batteryPercent: 12,
		batteryTone: "critical",
	},
	charging: {
		extras: [{ name: "nfc", dimmed: true }],
		cellular: { name: "signal-75" },
		wifi: { name: "wifi" },
		battery: { name: "battery-charging" },
		batteryPercent: 58,
		batteryTone: "warning",
	},
};

export type StatusBarProps = {
	scenario?: StatusBarScenario;
	time?: string;
};

function formatClock(date: Date) {
	return new Intl.DateTimeFormat("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(date);
}

function iconClassName(icon: StatusIcon) {
	return icon.dimmed
		? "device-statusbar__icon device-statusbar__icon--dimmed"
		: "device-statusbar__icon";
}

export function StatusBar({ scenario = "default", time }: StatusBarProps) {
	const [clock, setClock] = useState(() => time ?? formatClock(new Date()));
	const state = SCENARIOS[scenario];

	useEffect(() => {
		if (time) {
			setClock(time);
			return;
		}

		const updateClock = () => setClock(formatClock(new Date()));
		updateClock();

		const intervalId = window.setInterval(updateClock, 30_000);
		return () => window.clearInterval(intervalId);
	}, [time]);

	return (
		<div className={`device-statusbar device-statusbar--${scenario}`} aria-hidden="true">
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
