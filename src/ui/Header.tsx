import { ReactNode } from 'react';
import './Header.scss';

export type HeaderProps = {
	title: ReactNode;
	button?: ReactNode;
};

export function Header({ title, button }: HeaderProps) {
	return (
		<header className="ui-header">
			<div className="ui-header__main">
				<h1 className="ui-header__title">{title}</h1>
				{button ? button : null}
			</div>
		</header>
	);
}
