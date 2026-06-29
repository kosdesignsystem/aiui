import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';
import './View.scss';

export type ViewProps = HTMLAttributes<HTMLElement> & {
	children: ReactNode;
};

export function View({ children, className, ...props }: ViewProps) {
	return (
		<main {...props} className={cn('ui-view', className)}>
			{children}
		</main>
	);
}
