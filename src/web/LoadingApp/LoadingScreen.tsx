import { App } from '../../ui/App';
import clockIcon from '../../assets/icons/loading-clock.svg';
import './LoadingScreen.scss';

type LoadingAppScreenProps = {
	icon?: string;
	appName?: string;
};

export function LoadingAppScreen({
	icon = clockIcon,
	appName = 'приложения',
}: LoadingAppScreenProps = {}) {
	return (
		<App className="loading-screen" aria-label={`Загрузка ${appName}`}>
			<div className="loading-screen__stage">
				<div className="loading-screen__clock-wrap" aria-hidden="true">
					<img className="loading-screen__clock" src={icon} alt="" />
				</div>
			</div>
		</App>
	);
}
