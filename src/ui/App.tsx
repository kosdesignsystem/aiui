import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';
import './App.scss';

export type AppProps = HTMLAttributes<HTMLElement> & {
	children: ReactNode;
};

export function App({ children, className, ...props }: AppProps) {
	return (
		<section {...props} className={cn('ui-app', className)}>
			{children}
		</section>
	);
}
