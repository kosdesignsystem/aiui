import { ReactNode, useState } from 'react';
import { Text } from './Fonts';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { cn } from './lib/cn';
import './List.scss';

export type ListProps = {
	title?: ReactNode;
	children: ReactNode;
	collapsible?: boolean;
	collapsed?: boolean;
	defaultCollapsed?: boolean;
	onCollapsedChange?: (collapsed: boolean) => void;
	action?: ReactNode;
	className?: string;
	contentClassName?: string;
};

export function List({
	title,
	children,
	collapsible = false,
	collapsed,
	defaultCollapsed = false,
	onCollapsedChange,
	action,
	className,
	contentClassName,
}: ListProps) {
	const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed);
	const isControlled = collapsed !== undefined;
	const isCollapsed = collapsible ? (isControlled ? collapsed : uncontrolledCollapsed) : false;
	const toggleLabel = isCollapsed ? 'Развернуть список' : 'Свернуть список';
	const toggleCollapsed = () => {
		const nextValue = !isCollapsed;

		if (!isControlled) {
			setUncontrolledCollapsed(nextValue);
		}

		onCollapsedChange?.(nextValue);
	};

	return (
		<section className={cn('ui-list', className)}>
			{title || action || collapsible ? (
				<header className="ui-list__header">
					{title ? <Text variant="medium-18">{title}</Text> : null}
					{action || collapsible ? (
						<div className="ui-list__header-actions">
							{action}
							{collapsible ? (
								<IconButton
									size={32}
									variant="secondary"
									title={toggleLabel}
									aria-label={toggleLabel}
									onClick={toggleCollapsed}
								>
									<Icon
										name={isCollapsed ? 'chevron-down' : 'chevron-up'}
										width={20}
										height={20}
										aria-hidden
									/>
								</IconButton>
							) : null}
						</div>
					) : null}
				</header>
			) : null}
			{isCollapsed ? null : <div className={cn('ui-list__content', contentClassName)}>{children}</div>}
		</section>
	);
}

export type ListContainerProps = {
	children: ReactNode;
	className?: string;
};

export function ListContainer({ children, className }: ListContainerProps) {
	return <div className={cn('ui-list-container', className)}>{children}</div>;
}
