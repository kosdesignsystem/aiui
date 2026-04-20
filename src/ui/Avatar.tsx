import type { ReactNode } from 'react';
import './Avatar.scss';

export type AvatarBackground = string;

export type AvatarProps = {
	size?: number;
	background?: AvatarBackground;
	children?: ReactNode;
	'aria-label'?: string;
};

export function Avatar({
	size = 44,
	background = 'content-background',
	children,
	'aria-label': ariaLabel,
}: AvatarProps) {
	const isPrimitiveContent = typeof children === 'string' || typeof children === 'number';

	return (
		<span
			className="ui-avatar"
			style={{ width: size, height: size, background: `var(--${background})` }}
			aria-label={ariaLabel}
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
