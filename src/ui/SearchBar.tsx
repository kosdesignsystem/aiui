import type { MouseEventHandler, ReactNode } from 'react';
import { Search, type SearchProps } from './Search';
import './SearchBar.scss';

export type SearchBarProps = SearchProps;

export function SearchBar(props: SearchBarProps) {
	return <Search {...props} />;
}

export type SearchBarButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	title?: string;
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	'aria-label'?: string;
};

export function SearchBarButton({
	type = 'button',
	disabled = false,
	title,
	children,
	onClick,
	'aria-label': ariaLabel,
}: SearchBarButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			title={title}
			onClick={onClick}
			aria-label={ariaLabel}
			className="ui-search-bar-button"
		>
			{children}
		</button>
	);
}
