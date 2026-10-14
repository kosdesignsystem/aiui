import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { ButtonSize, ButtonVariant } from './Button';
import { getActionClassName } from './lib/action';
import { createCssVarStyle, type CssToken } from './lib/styles';
import './IconButton.scss';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	size?: ButtonSize;
	variant?: ButtonVariant;
	background?: CssToken;
	children?: ReactNode;
};

export function IconButton({
	size = 44,
	variant = 'accent',
	background,
	type = 'button',
	children,
	className,
	style,
	...buttonProps
}: IconButtonProps) {
	const classes = getActionClassName({
		baseClassName: 'ui-icon-button',
		size,
		variant,
		className,
	});
	const backgroundStyle = createCssVarStyle('--ui-control-background', background);
	const resolvedStyle = backgroundStyle
		? ({ ...backgroundStyle, ...style } as CSSProperties)
		: style;

	return (
		<button
			{...buttonProps}
			type={type}
			className={classes}
			style={resolvedStyle}
		>
			{children}
		</button>
	);
}
