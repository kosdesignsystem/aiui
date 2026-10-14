import type { ReactNode } from 'react';
import { App } from '../ui/App';
import { Header } from '../ui/Header';
import { ListContainer } from '../ui/List';
import { ScreenScaffold } from '../ui/ScreenScaffold';
import { View } from '../ui/View';
import { cn } from '../ui/lib/cn';
import './FlowPage.scss';

export type FlowPageProps = {
	title?: ReactNode;
	header?: ReactNode;
	topActions?: ReactNode;
	bottomActions?: ReactNode;
	overlayClassName?: string;
	overlay?: ReactNode;
	children: ReactNode;
};

export function FlowPage({
	title,
	header,
	topActions,
	bottomActions,
	overlayClassName,
	overlay,
	children,
}: FlowPageProps) {
	const resolvedHeader = header ?? (title ? <Header title={title} /> : undefined);

	return (
		<App>
			<ScreenScaffold
				header={resolvedHeader}
				topActions={topActions}
				bottomActions={bottomActions}
			>
				<View>{children}</View>
			</ScreenScaffold>
			{overlay ? (
				<div className={cn('flow-page__overlay', overlayClassName)} role="presentation">
					{overlay}
				</div>
			) : null}
		</App>
	);
}

export type FlowPageListProps = {
	children: ReactNode;
};

export function FlowPageList({ children }: FlowPageListProps) {
	return <ListContainer>{children}</ListContainer>;
}
