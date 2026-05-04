import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';
import './Header.scss';

export type HeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
	title: ReactNode;
	action?: ReactNode;
	button?: ReactNode;
	meta?: ReactNode;
};

export function Header({ title, action, button, meta, className, ...props }: HeaderProps) {
	const resolvedAction = action ?? button;

	return (
		<header {...props} className={cn('ui-header', className)}>
			<div className="ui-header__main">
				<h1 className="ui-header__title">{title}</h1>
				{resolvedAction ? <div className="ui-header__button">{resolvedAction}</div> : null}
			</div>
			{meta ? <div className="ui-header__meta">{meta}</div> : null}
		</header>
	);
}
