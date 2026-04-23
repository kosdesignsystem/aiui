import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';
import { createCssVarStyle, type CssToken } from './lib/styles';
import './Avatar.scss';

export type AvatarBackground = CssToken;

export type AvatarProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
	size?: number;
	background?: AvatarBackground;
	children?: ReactNode;
};

export function Avatar({
	size = 44,
	background = 'content-background',
	children,
	className,
	style,
	...props
}: AvatarProps) {
	const isPrimitiveContent = typeof children === 'string' || typeof children === 'number';
	const backgroundStyle = createCssVarStyle('--ui-avatar-background', background);
	const resolvedStyle: CSSProperties = {
		...backgroundStyle,
		width: size,
		height: size,
		...style,
	};

	return (
		<span
			{...props}
			className={cn('ui-avatar', className)}
			style={resolvedStyle}
		>
			<span className="ui-avatar__content">
				{isPrimitiveContent ? (
					<span className="ui-avatar__text">{String(children)}</span>
				) : (
					children
				)}
			</span>
		</span>
	);
}
