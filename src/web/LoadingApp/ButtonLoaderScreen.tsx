import { App } from '../../ui/App';
import { Button, type ButtonVariant } from '../../ui/Button';
import { Header } from '../../ui/Header';
import { ScreenScaffold } from '../../ui/ScreenScaffold';
import { View } from '../../ui/View';
import { HexagonLoader, type HexagonLoaderProps } from './HexagonLoader';
import './ButtonLoaderScreen.scss';

type LoaderButton = {
	id: string;
	label: string;
	variant: ButtonVariant;
	iconPosition?: 'left' | 'right';
	loader: HexagonLoaderProps;
};

const loaderButtons: readonly LoaderButton[] = [
	{
		id: 'opposite-gradient',
		label: 'Загрузка',
		variant: 'primary',
		loader: {
			shapes: [
				{
					color: '#2a83f2',
					size: 24,
					strokeWidth: 2.4,
					direction: 'clockwise',
					speed: 1,
					opacity: 0.96,
				},
				{
					color: '#7fc1ff',
					size: 18,
					strokeWidth: 2,
					direction: 'counterclockwise',
					speed: 0.7,
					opacity: 0.78,
				},
			],
		},
	},
	{
		id: 'same-speed-shift',
		label: 'Синхронизация',
		variant: 'secondary',
		iconPosition: 'right',
		loader: {
			shapes: [
				{
					color: '#2a83f2',
					size: 24,
					strokeWidth: 2,
					direction: 'clockwise',
					speed: 1.05,
				},
				{
					color: '#a8d1ff',
					size: 21,
					strokeWidth: 1.6,
					direction: 'clockwise',
					speed: 0.58,
					delay: -0.35,
					opacity: 0.7,
				},
			],
		},
	},
	{
		id: 'nested-solid',
		label: 'Проверка',
		variant: 'accent',
		loader: {
			shapes: [
				{
					color: '#2a83f2',
					size: 24,
					strokeWidth: 3,
					direction: 'clockwise',
					speed: 0.83,
				},
				{
					color: '#d8ecff',
					size: 16,
					strokeWidth: 2.6,
					direction: 'counterclockwise',
					speed: 1.1,
					opacity: 0.86,
				},
			],
		},
	},
	{
		id: 'slow-orbit',
		label: 'Ожидание',
		variant: 'success',
		iconPosition: 'right',
		loader: {
			shapes: [
				{
					color: '#1fbf75',
					size: 24,
					strokeWidth: 2.2,
					direction: 'clockwise',
					speed: 0.56,
				},
				{
					color: '#9ef2c7',
					size: 21,
					strokeWidth: 1.8,
					direction: 'counterclockwise',
					speed: 1.22,
					opacity: 0.8,
				},
			],
		},
	},
	{
		id: 'alert-solid',
		label: 'Подключение',
		variant: 'danger',
		loader: {
			shapes: [
				{
					color: '#ff5c7a',
					size: 23,
					strokeWidth: 3.2,
					direction: 'clockwise',
					speed: 1.25,
				},
				{
					color: '#ffbfd0',
					size: 14,
					strokeWidth: 2.4,
					direction: 'clockwise',
					speed: 0.72,
					delay: -0.2,
					opacity: 0.78,
				},
			],
		},
	},
	{
		id: 'quiet-large',
		label: 'Обработка',
		variant: 'link',
		iconPosition: 'right',
		loader: {
			shapes: [
				{
					color: '#5b8cff',
					size: 22,
					strokeWidth: 1.8,
					direction: 'clockwise',
					speed: 0.45,
				},
				{
					color: '#ffffff',
					size: 16,
					strokeWidth: 1.4,
					direction: 'counterclockwise',
					speed: 0.9,
					opacity: 0.64,
				},
			],
		},
	},
];

export function LoadingButtonScreen() {
	return (
		<App className="button-loader-app" aria-label="Button Loader">
			<ScreenScaffold header={<Header title="Button loader" />}>
				<View className="button-loader-view">
					<div className="button-loader-view__grid">
						{loaderButtons.map(({ id, label, variant, iconPosition = 'left', loader }) => {
							const icon = <HexagonLoader {...loader} />;

							return (
								<Button
									key={id}
									className="button-loader-view__button"
									size={60}
									variant={variant}
									leftIcon={iconPosition === 'left' ? icon : undefined}
									rightIcon={iconPosition === 'right' ? icon : undefined}
									disabled
								>
									{label}
								</Button>
							);
						})}
					</div>
				</View>
			</ScreenScaffold>
		</App>
	);
}
