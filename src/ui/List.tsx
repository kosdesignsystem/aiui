import { ReactNode, useState } from 'react';
import { Text } from './Fonts';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import './List.scss';

export type ListProps = {
	title?: ReactNode;
	children: ReactNode;
	collapsible?: boolean;
	defaultCollapsed?: boolean;
};

export function List({
	title,
	children,
	collapsible = false,
	defaultCollapsed = false,
}: ListProps) {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);
	const isCollapsed = collapsible ? collapsed : false;
	const toggleLabel = isCollapsed ? 'Развернуть список' : 'Свернуть список';

	return (
		<section className="ui-list">
			{title || collapsible ? (
				<header className="ui-list__header">
					{title ? <Text variant="medium-18">{title}</Text> : null}
					{collapsible ? (
						<IconButton
							size={32}
							variant="secondary"
							title={toggleLabel}
							aria-label={toggleLabel}
							onClick={() => setCollapsed((value) => !value)}
						>
							<Icon
								name={isCollapsed ? 'chevron-down' : 'chevron-up'}
								width={20}
								height={20}
								aria-hidden
							/>
						</IconButton>
					) : null}
				</header>
			) : null}
			{isCollapsed ? null : <div className="ui-list__content">{children}</div>}
		</section>
	);
}

export type ListContainerProps = {
	children: ReactNode;
};

export function ListContainer({ children }: ListContainerProps) {
	return <div className="ui-list-container">{children}</div>;
}
