import {
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type SyntheticEvent,
} from 'react';
import { Icon, type IconName } from '../../ui/Icon';
import { ClockBlock } from './chrome';
import {
	quickControls,
	type QuickControlId,
	type ShadeToggleMotion,
} from './model';

type ShadeSliderProps = {
	value: number;
	onChange: (value: number) => void;
	label: string;
	startIcon: IconName;
	endIcon: IconName;
	className?: string;
};

type SliderIconMotion = 'entering-fill' | 'leaving-fill' | null;

function ShadeSlider({
	value,
	onChange,
	label,
	startIcon,
	endIcon,
	className = '',
}: ShadeSliderProps) {
	// The icon centers are positioned at roughly 9% and 91% of the control.
	const startIconIsOnFill = value >= 9;
	const endIconIsOnFill = value >= 91;
	const previousIconStates = useRef({ start: startIconIsOnFill, end: endIconIsOnFill });
	const [startIconMotion, setStartIconMotion] = useState<SliderIconMotion>(null);
	const [endIconMotion, setEndIconMotion] = useState<SliderIconMotion>(null);
	const style = { '--launcher-slider-value': `${value}%` } as CSSProperties;

	useLayoutEffect(() => {
		const previous = previousIconStates.current;
		if (previous.start !== startIconIsOnFill) {
			setStartIconMotion(startIconIsOnFill ? 'entering-fill' : 'leaving-fill');
		}
		if (previous.end !== endIconIsOnFill) {
			setEndIconMotion(endIconIsOnFill ? 'entering-fill' : 'leaving-fill');
		}
		previousIconStates.current = { start: startIconIsOnFill, end: endIconIsOnFill };
	}, [startIconIsOnFill, endIconIsOnFill]);

	const stopPointerPropagation = (event: SyntheticEvent) => event.stopPropagation();

	return (
		<label className={`launcher-slider${className ? ` ${className}` : ''}`} style={style}>
			<span className="launcher-slider__fill" aria-hidden="true">
				<span className="launcher-slider__indicator" />
			</span>
			<span className={`launcher-slider__icon-shell launcher-slider__icon-shell--start${startIconIsOnFill ? ' is-on-fill' : ''}${startIconMotion ? ` is-${startIconMotion}` : ''}`} aria-hidden="true">
				<Icon className="launcher-slider__icon" name={startIcon} width={20} height={20} />
			</span>
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				onPointerDown={stopPointerPropagation}
				onPointerMove={stopPointerPropagation}
				onPointerUp={stopPointerPropagation}
				onPointerCancel={stopPointerPropagation}
				onClick={stopPointerPropagation}
				aria-label={label}
			/>
			<span className={`launcher-slider__icon-shell launcher-slider__icon-shell--end${endIconIsOnFill ? ' is-on-fill' : ''}${endIconMotion ? ` is-${endIconMotion}` : ''}`} aria-hidden="true">
				<Icon className="launcher-slider__icon" name={endIcon} width={20} height={20} />
			</span>
		</label>
	);
}

type ShadeToggleButtonProps = {
	active: boolean;
	onToggle: () => void;
	label: string;
	onIcon: IconName;
	offIcon?: IconName;
	motion: ShadeToggleMotion;
	variant: 'network' | 'quick';
	detail?: string;
	accent?: string;
};

function ShadeToggleGlyph({ motion, icon, active }: { motion: ShadeToggleMotion; icon: IconName; active: boolean }) {
	if (motion === 'cellular') {
		return (
			<svg className="launcher-toggle-glyph launcher-toggle-glyph--cellular" viewBox="0 0 24 24" aria-hidden="true">
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--1" x="3" y="16" width="3" height="4" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--2" x="8" y="12" width="3" height="8" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--3" x="13" y="8" width="3" height="12" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--4" x="18" y="4" width="3" height="16" rx="1.5" />
			</svg>
		);
	}

	if (motion === 'wifi') {
		return (
			<svg className="launcher-toggle-glyph launcher-toggle-glyph--wifi" viewBox="0 0 24 24" aria-hidden="true">
				<circle className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--1" cx="12" cy="18" r="2" />
				<path className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--2" d="M7.2 14.2C9.9 11.8 14.1 11.8 16.8 14.2" />
				<path className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--3" d="M3.6 10.2C8.3 6 15.7 6 20.4 10.2" />
				{active ? null : <path className="launcher-toggle-glyph__slash" d="M4 4L20 20" />}
			</svg>
		);
	}

	return <Icon name={icon} width={22} height={22} />;
}

function ShadeToggleButton({
	active,
	onToggle,
	label,
	onIcon,
	offIcon = onIcon,
	motion,
	variant,
	detail,
	accent,
}: ShadeToggleButtonProps) {
	const [motionId, setMotionId] = useState(0);
	const style = accent ? ({ '--launcher-toggle-accent': accent } as CSSProperties) : undefined;

	const handleClick = () => {
		setMotionId((value) => value + 1);
		onToggle();
	};

	return (
		<button
			className={`launcher-shade-toggle launcher-shade-toggle--${variant} launcher-shade-toggle--${motion} ${active ? 'is-active' : 'is-inactive'}`}
			type="button"
			aria-pressed={active}
			onClick={handleClick}
			style={style}
		>
			<span className="launcher-shade-toggle__icon" aria-hidden="true">
				<span key={motionId} className={`launcher-shade-toggle__motion${motionId > 0 ? ' is-animating' : ''}`}>
					<ShadeToggleGlyph motion={motion} icon={active ? onIcon : offIcon} active={active} />
					<span className="launcher-shade-toggle__pulse" />
					<span className="launcher-shade-toggle__pulse" />
				</span>
			</span>
			{variant === 'network' ? <strong>{label}</strong> : <small>{label}</small>}
			{variant === 'network' && detail ? <small>{detail}</small> : null}
		</button>
	);
}

type ControlShadeProps = {
	onClose: () => void;
	onSettings: () => void;
	className?: string;
	style?: CSSProperties;
	preview?: boolean;
};

export function ControlShade({ onClose, onSettings, className = '', style, preview = false }: ControlShadeProps) {
	const [mobileEnabled, setMobileEnabled] = useState(true);
	const [wifiEnabled, setWifiEnabled] = useState(false);
	const [quickStates, setQuickStates] = useState<Record<QuickControlId, boolean>>({
		airplane: false,
		location: true,
		silent: true,
		flashlight: false,
	});
	const [volume, setVolume] = useState(100);
	const [brightness, setBrightness] = useState(46);

	const toggleQuickControl = (id: QuickControlId) => {
		setQuickStates((states) => ({ ...states, [id]: !states[id] }));
	};

	return (
		<div
			className={`launcher-shade${className ? ` ${className}` : ''}`}
			role={preview ? undefined : 'dialog'}
			aria-label={preview ? undefined : 'Панель быстрых настроек'}
			aria-hidden={preview || undefined}
			style={style}
		>
			<div className="launcher-shade__content">
				<ClockBlock />
				<div className="launcher-shade__networks">
					<ShadeToggleButton
						active={mobileEnabled}
						onToggle={() => setMobileEnabled((value) => !value)}
						label="Моб. интернет"
						detail={mobileEnabled ? 'Megafon LTE' : 'Выключено'}
						onIcon="signal-cellular-100"
						motion="cellular"
						variant="network"
					/>
					<ShadeToggleButton
						active={wifiEnabled}
						onToggle={() => setWifiEnabled((value) => !value)}
						label="Wi-Fi"
						detail={wifiEnabled ? 'KLCorp' : 'Выключено'}
						onIcon="wifi"
						offIcon="wifi-off"
						motion="wifi"
						variant="network"
					/>
				</div>
				<div className="launcher-shade__quick">
					{quickControls.map((control) => (
						<ShadeToggleButton
							key={control.id}
							active={quickStates[control.id]}
							onToggle={() => toggleQuickControl(control.id)}
							label={control.label}
							onIcon={control.onIcon}
							offIcon={control.offIcon}
							accent={control.accent}
							motion={control.motion}
							variant="quick"
						/>
					))}
				</div>
				<ShadeSlider value={volume} onChange={setVolume} label="Громкость" startIcon="volume-0" endIcon="volume-100" />
				<ShadeSlider
					className="launcher-slider--brightness"
					value={brightness}
					onChange={setBrightness}
					label="Яркость"
					startIcon="brightness-low-outline"
					endIcon="brightness"
				/>
				<button className="launcher-shade__settings" type="button" onClick={onSettings}>Перейти в настройки</button>
			</div>
			<button className="launcher-shade__close" type="button" aria-label="Закрыть панель" onClick={onClose} />
		</div>
	);
}
