import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import './Switch.scss';

export type SwitchProps = {
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	id?: string;
	name?: string;
	value?: string;
	title?: string;
	autoFocus?: boolean;
	required?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	'aria-label'?: string;
	'aria-labelledby'?: string;
};

export function Switch({
	checked,
	defaultChecked = false,
	disabled = false,
	id,
	name,
	value,
	title,
	autoFocus = false,
	required = false,
	onChange,
	'aria-label': ariaLabelProp,
	'aria-labelledby': ariaLabelledBy,
}: SwitchProps) {
	const [animationDirection, setAnimationDirection] = useState<'idle' | 'on' | 'off'>('idle');
	const [isPressed, setIsPressed] = useState(false);
	const animationTimerRef = useRef<number | null>(null);
	const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? undefined : 'Переключатель');

	useEffect(() => {
		return () => {
			if (animationTimerRef.current !== null) {
				window.clearTimeout(animationTimerRef.current);
			}
		};
	}, []);

	const classes = [
		'ui-switch',
		isPressed ? 'is-pressed' : '',
		animationDirection === 'on' ? 'is-animating-on' : '',
		animationDirection === 'off' ? 'is-animating-off' : '',
	]
		.filter(Boolean)
		.join(' ');

	const resetPressedState = () => {
		setIsPressed(false);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setAnimationDirection(event.target.checked ? 'on' : 'off');

		if (animationTimerRef.current !== null) {
			window.clearTimeout(animationTimerRef.current);
		}

		animationTimerRef.current = window.setTimeout(() => {
			setAnimationDirection('idle');
			animationTimerRef.current = null;
		}, 360);

		onChange?.(event);
	};

	return (
		<label className={classes} title={title}>
			<input
				className="ui-switch__input"
				type="checkbox"
				role="switch"
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				id={id}
				name={name}
				value={value}
				autoFocus={autoFocus}
				required={required}
				readOnly={checked !== undefined && !onChange}
				onChange={handleChange}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
			/>
			<span className="ui-switch__control" aria-hidden="true">
				<span
					className="ui-switch__thumb"
					onPointerDown={() => setIsPressed(true)}
					onPointerUp={resetPressedState}
					onPointerCancel={resetPressedState}
					onPointerLeave={resetPressedState}
				/>
			</span>
		</label>
	);
}
