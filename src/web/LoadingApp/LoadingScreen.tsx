import { App } from '../../ui/App';
import clockIcon from '../../assets/icons/loading-clock.svg';
import './LoadingScreen.scss';

export function LoadingAppScreen() {
	return (
		<App className="loading-screen" aria-label="Loading App">
			<div className="loading-screen__stage">
				<div className="loading-screen__clock-wrap" aria-hidden="true">
					<img className="loading-screen__clock" src={clockIcon} alt="" />
				</div>
			</div>
		</App>
	);
}
