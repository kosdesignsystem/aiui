import { KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';
import './Button.scss';

export type ButtonVariant =
	| 'accent'
	| 'danger'
	| 'success'
	| 'primary'
	| 'secondary'
	| 'link'
	| 'ghost';

export type ButtonSize = 60 | 52 | 44 | 32;

export type ButtonProps = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
	'aria-label'?: string;
};

export function Button({
	variant = 'accent',
	size = 44,
	type = 'button',
	disabled = false,
	leftIcon,
	rightIcon,
	children,
	onClick,
	onKeyDown,
	'aria-label': ariaLabel,
}: ButtonProps) {
	const resolvedVariant = variant === 'ghost' ? 'link' : variant;
	const classes = [
		'ui-button',
		`ui-button--${resolvedVariant}`,
		`ui-button--h${size}`,
		leftIcon ? 'ui-button--with-left-icon' : '',
		rightIcon ? 'ui-button--with-right-icon' : '',
		children ? '' : 'ui-button--icon-only',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			onKeyDown={onKeyDown}
			aria-label={ariaLabel}
			className={classes}
		>
			{leftIcon ? (
				<span className="ui-button__icon" aria-hidden="true">
					{leftIcon}
				</span>
			) : null}
			{children ? <span className="ui-button__label">{children}</span> : null}
			{rightIcon ? (
				<span className="ui-button__icon" aria-hidden="true">
					{rightIcon}
				</span>
			) : null}
		</button>
	);
}
