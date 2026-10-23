import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { View } from '../../ui/View';

export default function TestMainPage() {
	return (
		<App aria-label="Test">
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Text variant="regular-24" color="primary">Привет!</Text>
			</View>
		</App>
	);
}
