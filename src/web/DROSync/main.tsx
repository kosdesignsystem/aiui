import { View } from '../../ui/View';
import '../../animate/wave-hand.scss';
import './main.scss';

export function DROSyncScreen() {
	return (
		<View className="dro-sync">
			<span className="dro-sync__hand wave-hand" role="img" aria-label="Машущая рука">👋</span>
			<h1 className="dro-sync__title">Привет DRO Sync</h1>
		</View>
	);
}
