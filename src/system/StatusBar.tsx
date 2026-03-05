import { Icon, IconName } from '../ui/Icon';
import './statusbar.scss';

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
	batteryTone?: 'default' | 'warning' | 'critical';
};

const STATIC_STATUS: StaticStatusState = {
	extras: [],
	cellular: { name: 'signal-cellular-100' },
	wifi: { name: 'wifi' },
	battery: { name: 'battery-charge-medium' },
	batteryPercent: 96,
};

export function StatusBar() {
	const state = STATIC_STATUS;
	const clock = '09:41';
	return (
		<div className="device-statusbar device-statusbar--default" aria-hidden="true">
			<span className="device-statusbar__time">{clock}</span>
			<div className="device-statusbar__indicators">
				{state.extras.map((icon) => (
					<Icon name={icon.name} alt="" width={16} height={16} />
				))}

				<Icon name={state.cellular.name} alt="" width={16} height={16} />
				<Icon name={state.wifi.name} alt="" width={16} height={16} />
				<Icon name={state.battery.name} alt="" width={16} height={16} />

				<span
					className={`device-statusbar__battery-value${
						state.batteryTone ? ` is-${state.batteryTone}` : ''
					}`}
				>
					{state.batteryPercent}%
				</span>
			</div>
		</div>
	);
}
