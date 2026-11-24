import { App } from '../../ui/App';
import '../../animate/hand-wave.scss';
import './main.scss';

export function HelloDROScreen() {
	return (
		<App className="hello-dro" aria-label="Привет, DRO">
			<div className="hello-dro__stage">
				<span className="hello-dro__hand animation-hand-wave" aria-hidden="true">👋</span>
				<h1 className="hello-dro__title">Привет, DRO</h1>
			</div>
		</App>
	);
}
