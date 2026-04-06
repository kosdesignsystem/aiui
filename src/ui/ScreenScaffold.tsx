import { ReactNode, useEffect, useRef, useState } from 'react';
import './ScreenScaffold.scss';

export type ScreenScaffoldProps = {
	header?: ReactNode;
	topActions?: ReactNode;
	bottomActions?: ReactNode;
	children: ReactNode;
};

// Default screen composition for apps. ScreenScaffold owns the scroll/sticky
// behavior, while the caller passes View explicitly as the main screen surface.
export function ScreenScaffold({
	header,
	topActions,
	bottomActions,
	children,
}: ScreenScaffoldProps) {
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const topActionsRef = useRef<HTMLDivElement | null>(null);
	const [isTopActionsStuck, setIsTopActionsStuck] = useState(false);

	useEffect(() => {
		const viewportElement = viewportRef.current;
		const topActionsElement = topActionsRef.current;

		if (!viewportElement || !topActionsElement) {
			setIsTopActionsStuck(false);
			return;
		}

		const updateTopActionsState = () => {
			const viewportTop = viewportElement.getBoundingClientRect().top;
			const topActionsTop = topActionsElement.getBoundingClientRect().top;
			const nextIsTopActionsStuck =
				viewportElement.scrollTop > 0 && topActionsTop <= viewportTop + 1;

			setIsTopActionsStuck((current) =>
				current === nextIsTopActionsStuck ? current : nextIsTopActionsStuck,
			);
		};

		updateTopActionsState();
		viewportElement.addEventListener('scroll', updateTopActionsState, { passive: true });
		window.addEventListener('resize', updateTopActionsState);

		return () => {
			viewportElement.removeEventListener('scroll', updateTopActionsState);
			window.removeEventListener('resize', updateTopActionsState);
		};
	}, [topActions, header]);

	return (
		<div className="ui-screen-scaffold">
			<div className="ui-screen-scaffold__viewport" ref={viewportRef}>
				{header ? <div className="ui-screen-scaffold__header">{header}</div> : null}
				{topActions ? (
					<div
						ref={topActionsRef}
						className={`ui-screen-scaffold__top-actions${isTopActionsStuck ? ' is-stuck' : ''}`}
					>
						{topActions}
					</div>
				) : null}
				<div className="ui-screen-scaffold__content">{children}</div>
			</div>

			{bottomActions ? (
				<div className="ui-screen-scaffold__bottom-actions">{bottomActions}</div>
			) : null}
		</div>
	);
}
