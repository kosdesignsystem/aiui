import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { getActionClassName, type ActionSize, type ActionVariant } from './lib/action';
import './Button.scss';

export type ButtonVariant = ActionVariant;
export type ButtonSize = ActionSize;

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	children?: ReactNode;
};

export function Button({
	variant = 'accent',
	size = 44,
	type = 'button',
	leftIcon,
	rightIcon,
	children,
	className,
	...buttonProps
}: ButtonProps) {
	const hasLabel = children !== null && children !== undefined;
	const classes = getActionClassName({
		baseClassName: 'ui-button',
		size,
		variant,
		className,
		iconOnly: !hasLabel,
		modifiers: [
			leftIcon ? 'ui-button--with-left-icon' : '',
			rightIcon ? 'ui-button--with-right-icon' : '',
		],
	});

	return (
		<button
			{...buttonProps}
			type={type}
			className={classes}
		>
			{leftIcon ? (
				<span className="ui-button__icon" aria-hidden="true">
					{leftIcon}
				</span>
			) : null}
			{hasLabel ? <span className="ui-button__label">{children}</span> : null}
			{rightIcon ? (
				<span className="ui-button__icon" aria-hidden="true">
					{rightIcon}
				</span>
			) : null}
		</button>
	);
}
