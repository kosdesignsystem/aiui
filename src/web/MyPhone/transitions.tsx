import type { CSSProperties } from 'react';
import { cn } from '../../ui/lib/cn';
import { LoadingAppScreen } from '../LoadingApp/LoadingScreen';
import type { LaunchState, RecentTransitionState } from './model';

export function AppLaunchTransition({ launch }: { launch: LaunchState }) {
	const style = launch.kind === 'home'
		? {
			'--launch-x': `${launch.x}px`,
			'--launch-y': `${launch.y}px`,
		} as CSSProperties
		: {
			'--launch-left': `${launch.left}px`,
			'--launch-top': `${launch.top}px`,
			'--launch-width': `${launch.width}px`,
			'--launch-height': `${launch.height}px`,
		} as CSSProperties;

	return (
		<div
			className={cn(
				'launcher-launch',
				`launcher-launch--${launch.kind}`,
				launch.active && 'is-active',
				launch.kind === 'home' && launch.loading && 'is-loading',
			)}
			style={style}
		>
			{launch.kind === 'home' ? (
				<>
					<div className="launcher-launch__wash" />
					<img className="launcher-launch__icon" src={launch.app.icon} alt="" />
					<div className="launcher-launch__loader">
						<LoadingAppScreen icon={launch.app.icon} appName={launch.app.label} />
					</div>
				</>
			) : (
				<div className="launcher-launch__preview">
					<img src={launch.app.preview} alt="" draggable="false" />
				</div>
			)}
		</div>
	);
}

export function RecentAppTransition({ transition }: { transition: RecentTransitionState }) {
	const style = transition.target ? {
		'--recent-transition-left': `${transition.target.left}px`,
		'--recent-transition-top': `${transition.target.top}px`,
		'--recent-transition-width': `${transition.target.width}px`,
		'--recent-transition-height': `${transition.target.height}px`,
	} as CSSProperties : undefined;

	return (
		<div
			className={cn('launcher-recent-transition', transition.target && 'is-active')}
			style={style}
			aria-hidden="true"
		>
			<img src={transition.app.preview} alt="" draggable="false" />
		</div>
	);
}
