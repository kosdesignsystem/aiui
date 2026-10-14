import { App } from '../../ui/App';
import type { ButtonVariant } from '../../ui/Button';
import { Header } from '../../ui/Header';
import { IconButton } from '../../ui/IconButton';
import { ScreenScaffold } from '../../ui/ScreenScaffold';
import { View } from '../../ui/View';
import { HexagonLoader, type HexagonLoaderProps } from './HexagonLoader';
import './ButtonLoaderScreen.scss';

type LoaderButton = {
	id: string;
	ariaLabel: string;
	variant: ButtonVariant;
	loader: HexagonLoaderProps;
};

type LoaderShapes = NonNullable<HexagonLoaderProps['shapes']>;

function createLoaderButton(
	id: string,
	ariaLabel: string,
	variant: ButtonVariant,
	shapes: LoaderShapes,
): LoaderButton {
	return {
		id,
		ariaLabel,
		variant,
		loader: {
			shapes,
		},
	};
}

const loaderButtons: readonly LoaderButton[] = [
	createLoaderButton('classic-spinner', 'Загрузка: классический спиннер', 'primary', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 76%)',
			size: 24,
			strokeWidth: 2.6,
			cornerRadius: 1.5,
			pulse: 0,
			direction: 'clockwise',
			speed: 1,
			opacity: 0.96,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 64%, transparent 100%)',
			size: 18,
			strokeWidth: 1.8,
			cornerRadius: 1,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.72,
			opacity: 0.52,
		},
	]),
	createLoaderButton('classic-spinner', 'Загрузка: классический спиннер', 'primary', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 76%)',
			size: 24,
			strokeWidth: 4,
			cornerRadius: 1.5,
			pulse: 0,
			direction: 'clockwise',
			speed: 1,
			opacity: 0.96,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 64%, transparent 100%)',
			size: 14,
			strokeWidth: 4,
			cornerRadius: 0,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.72,
			opacity: 0.52,
		},
	]),
	createLoaderButton('dual-ring', 'Загрузка: двойное кольцо', 'secondary', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 82%)',
			size: 26,
			strokeWidth: 2.1,
			cornerRadius: 4,
			pulse: 0,
			direction: 'clockwise',
			speed: 0.82,
			opacity: 0.88,
		},
		{
			color: 'linear-gradient(0deg, var(--ui-control-color) 0%, transparent 82%)',
			size: 19,
			strokeWidth: 2.1,
			cornerRadius: 4,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 1.08,
			opacity: 0.68,
		},
	]),
	createLoaderButton('hex-pulse', 'Загрузка: пульс хексагона', 'accent', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 90%)',
			size: 24,
			strokeWidth: 2,
			cornerRadius: 0,
			pulse: 0.2,
			direction: 'clockwise',
			speed: 0.9,
			opacity: 0.9,
		},
		{
			color: 'linear-gradient(0deg, var(--ui-control-color) 0%, transparent 78%)',
			size: 16,
			strokeWidth: 2,
			cornerRadius: 0,
			pulse: 0.34,
			direction: 'counterclockwise',
			speed: 0.9,
			delay: -0.45,
			opacity: 0.62,
		},
	]),
	createLoaderButton('chasing-tail', 'Загрузка: бегущий хвост', 'success', [
		{
			color: 'linear-gradient(110deg, transparent 0%, var(--ui-control-color) 48%, transparent 76%)',
			size: 27,
			strokeWidth: 2.8,
			cornerRadius: 2,
			pulse: 0.03,
			direction: 'clockwise',
			speed: 1.34,
			opacity: 0.94,
		},
		{
			color: 'linear-gradient(250deg, transparent 0%, var(--ui-control-color) 44%, transparent 100%)',
			size: 20,
			strokeWidth: 1.4,
			cornerRadius: 2,
			pulse: 0.06,
			direction: 'clockwise',
			speed: 1.34,
			delay: -0.33,
			opacity: 0.56,
		},
	]),
	createLoaderButton('alert-ring', 'Загрузка: тревожное кольцо', 'danger', [
		{
			color: 'radial-gradient(circle at 50% 0%, var(--ui-control-color) 0%, transparent 70%)',
			size: 24,
			strokeWidth: 3.2,
			cornerRadius: 0.5,
			pulse: 0.09,
			direction: 'counterclockwise',
			speed: 1.18,
			opacity: 0.92,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 15,
			strokeWidth: 2.5,
			cornerRadius: 0.5,
			pulse: 0.16,
			direction: 'clockwise',
			speed: 0.74,
			delay: -0.22,
			opacity: 0.72,
		},
	]),
	createLoaderButton('minimal-ring', 'Загрузка: минимальное кольцо', 'link', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 70%)',
			size: 24,
			strokeWidth: 1.3,
			cornerRadius: 5,
			pulse: 0,
			direction: 'clockwise',
			speed: 0.62,
			opacity: 0.74,
		},
		{
			color: 'linear-gradient(0deg, transparent 0%, var(--ui-control-color) 58%, transparent 100%)',
			size: 17,
			strokeWidth: 1,
			cornerRadius: 5,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.92,
			opacity: 0.52,
		},
	]),
	createLoaderButton('segmented-spinner', 'Загрузка: сегментный спиннер', 'primary', [
		{
			color: 'linear-gradient(0deg, var(--ui-control-color) 0%, transparent 24%, var(--ui-control-color) 50%, transparent 74%, var(--ui-control-color) 100%)',
			size: 25,
			strokeWidth: 2.4,
			cornerRadius: 0,
			pulse: 0,
			direction: 'clockwise',
			speed: 1.12,
			opacity: 0.86,
		},
		{
			color: 'linear-gradient(90deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 17,
			strokeWidth: 1.5,
			cornerRadius: 0,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.72,
			opacity: 0.5,
		},
	]),
	createLoaderButton('radar-sweep', 'Загрузка: радар', 'secondary', [
		{
			color: 'radial-gradient(circle at 50% 0%, var(--ui-control-color) 0%, transparent 74%)',
			size: 27,
			strokeWidth: 1.7,
			cornerRadius: 5,
			pulse: 0.1,
			direction: 'clockwise',
			speed: 0.7,
			opacity: 0.82,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 18,
			strokeWidth: 1.7,
			cornerRadius: 5,
			pulse: 0.2,
			direction: 'counterclockwise',
			speed: 1.4,
			delay: -0.2,
			opacity: 0.6,
		},
	]),
	createLoaderButton('nested-hex', 'Загрузка: вложенные хексагоны', 'accent', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 100%)',
			size: 26,
			strokeWidth: 2.7,
			cornerRadius: 0,
			pulse: 0.05,
			direction: 'clockwise',
			speed: 0.86,
			opacity: 0.92,
		},
		{
			color: 'linear-gradient(0deg, var(--ui-control-color) 0%, transparent 84%)',
			size: 16,
			strokeWidth: 2.7,
			cornerRadius: 0,
			pulse: 0.12,
			direction: 'counterclockwise',
			speed: 1.22,
			delay: -0.16,
			opacity: 0.78,
		},
	]),
	createLoaderButton('breathing-ring', 'Загрузка: дыхание', 'success', [
		{
			color: 'radial-gradient(circle, var(--ui-control-color) 0%, transparent 76%)',
			size: 24,
			strokeWidth: 2,
			cornerRadius: 5,
			pulse: 0.26,
			direction: 'clockwise',
			speed: 0.58,
			opacity: 0.78,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 54%, transparent 100%)',
			size: 16,
			strokeWidth: 1.8,
			cornerRadius: 5,
			pulse: 0.18,
			direction: 'counterclockwise',
			speed: 1.16,
			delay: -0.29,
			opacity: 0.66,
		},
	]),
	createLoaderButton('sharp-hex', 'Загрузка: острый хексагон', 'danger', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 86%)',
			size: 25,
			strokeWidth: 3.4,
			cornerRadius: 0,
			pulse: 0,
			direction: 'clockwise',
			speed: 1.36,
			opacity: 0.9,
		},
		{
			color: 'linear-gradient(90deg, transparent 0%, var(--ui-control-color) 54%, transparent 100%)',
			size: 20,
			strokeWidth: 1.2,
			cornerRadius: 0,
			pulse: 0.06,
			direction: 'clockwise',
			speed: 0.68,
			delay: -0.34,
			opacity: 0.54,
		},
	]),
	createLoaderButton('soft-hex', 'Загрузка: мягкий хексагон', 'link', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 84%)',
			size: 26,
			strokeWidth: 1.15,
			cornerRadius: 5,
			pulse: 0.16,
			direction: 'clockwise',
			speed: 0.48,
			opacity: 0.74,
		},
		{
			color: 'linear-gradient(0deg, transparent 0%, var(--ui-control-color) 58%, transparent 100%)',
			size: 18,
			strokeWidth: 1,
			cornerRadius: 5,
			pulse: 0.1,
			direction: 'counterclockwise',
			speed: 0.84,
			delay: -0.36,
			opacity: 0.8,
		},
	]),
	createLoaderButton('orbit-dot', 'Загрузка: орбита', 'primary', [
		{
			color: 'radial-gradient(circle at 50% 0%, var(--ui-control-color) 0%, transparent 34%)',
			size: 26,
			strokeWidth: 3.1,
			cornerRadius: 5,
			pulse: 0,
			direction: 'clockwise',
			speed: 1.24,
			opacity: 0.86,
		},
		{
			color: 'radial-gradient(circle at 50% 100%, var(--ui-control-color) 0%, transparent 42%)',
			size: 15,
			strokeWidth: 2.4,
			cornerRadius: 5,
			pulse: 0.14,
			direction: 'counterclockwise',
			speed: 1.24,
			delay: -0.5,
			opacity: 0.6,
		},
	]),
	createLoaderButton('sync-rings', 'Загрузка: синхронизация', 'secondary', [
		{
			color: 'linear-gradient(140deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 25,
			strokeWidth: 2,
			cornerRadius: 2.5,
			pulse: 0.08,
			direction: 'clockwise',
			speed: 1.04,
			opacity: 0.82,
		},
		{
			color: 'linear-gradient(320deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 21,
			strokeWidth: 2,
			cornerRadius: 2.5,
			pulse: 0.08,
			direction: 'clockwise',
			speed: 1.04,
			delay: -0.5,
			opacity: 0.62,
		},
	]),
	createLoaderButton('progress-loop', 'Загрузка: прогресс', 'accent', [
		{
			color: 'linear-gradient(90deg, transparent 0%, var(--ui-control-color) 40%, var(--ui-control-color) 62%, transparent 100%)',
			size: 27,
			strokeWidth: 2.5,
			cornerRadius: 3,
			pulse: 0.03,
			direction: 'clockwise',
			speed: 0.76,
			opacity: 0.88,
		},
		{
			color: 'linear-gradient(270deg, transparent 0%, var(--ui-control-color) 44%, transparent 100%)',
			size: 18,
			strokeWidth: 2.5,
			cornerRadius: 3,
			pulse: 0.07,
			direction: 'clockwise',
			speed: 0.76,
			delay: -0.38,
			opacity: 0.5,
		},
	]),
	createLoaderButton('inner-spinner', 'Загрузка: внутренний спиннер', 'success', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 88%)',
			size: 23,
			strokeWidth: 1.5,
			cornerRadius: 4,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.6,
			opacity: 0.54,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 48%, transparent 100%)',
			size: 14,
			strokeWidth: 3.2,
			cornerRadius: 1,
			pulse: 0.08,
			direction: 'clockwise',
			speed: 1.5,
			delay: -0.12,
			opacity: 0.9,
		},
	]),
	createLoaderButton('thick-ring', 'Загрузка: толстое кольцо', 'danger', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 74%)',
			size: 24,
			strokeWidth: 4,
			cornerRadius: 2.2,
			pulse: 0.05,
			direction: 'clockwise',
			speed: 0.92,
			opacity: 0.86,
		},
		{
			color: 'linear-gradient(0deg, transparent 0%, var(--ui-control-color) 58%, transparent 100%)',
			size: 13,
			strokeWidth: 2.1,
			cornerRadius: 2,
			pulse: 0.18,
			direction: 'counterclockwise',
			speed: 1.24,
			delay: -0.25,
			opacity: 0.58,
		},
	]),
	createLoaderButton('thin-technical', 'Загрузка: тонкий технический', 'link', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 58%)',
			size: 27,
			strokeWidth: 0.9,
			cornerRadius: 0,
			pulse: 0,
			direction: 'clockwise',
			speed: 1.06,
			opacity: 0.82,
		},
		{
			color: 'linear-gradient(120deg, transparent 0%, var(--ui-control-color) 48%, transparent 100%)',
			size: 19,
			strokeWidth: 0.9,
			cornerRadius: 0,
			pulse: 0,
			direction: 'counterclockwise',
			speed: 0.64,
			opacity: 0.54,
		},
	]),
	createLoaderButton('three-beat', 'Загрузка: три такта', 'primary', [
		{
			color: 'linear-gradient(0deg, var(--ui-control-color) 0%, transparent 18%, transparent 40%, var(--ui-control-color) 58%, transparent 78%, var(--ui-control-color) 100%)',
			size: 25,
			strokeWidth: 2.2,
			cornerRadius: 1,
			pulse: 0.08,
			direction: 'clockwise',
			speed: 1.28,
			opacity: 0.84,
		},
		{
			color: 'radial-gradient(circle at 50% 0%, var(--ui-control-color) 0%, transparent 54%)',
			size: 16,
			strokeWidth: 2.2,
			cornerRadius: 1,
			pulse: 0.2,
			direction: 'clockwise',
			speed: 1.28,
			delay: -0.18,
			opacity: 0.58,
		},
	]),
	createLoaderButton('counter-flow', 'Загрузка: встречные потоки', 'secondary', [
		{
			color: 'linear-gradient(45deg, transparent 0%, var(--ui-control-color) 48%, transparent 100%)',
			size: 26,
			strokeWidth: 2.3,
			cornerRadius: 3,
			pulse: 0.04,
			direction: 'clockwise',
			speed: 1.16,
			opacity: 0.82,
		},
		{
			color: 'linear-gradient(225deg, transparent 0%, var(--ui-control-color) 48%, transparent 100%)',
			size: 21,
			strokeWidth: 2.3,
			cornerRadius: 3,
			pulse: 0.04,
			direction: 'counterclockwise',
			speed: 1.16,
			delay: -0.5,
			opacity: 0.6,
		},
	]),
	createLoaderButton('focus-lock', 'Загрузка: фокус', 'accent', [
		{
			color: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--ui-control-color) 56%, transparent 100%)',
			size: 27,
			strokeWidth: 1.6,
			cornerRadius: 5,
			pulse: 0.18,
			direction: 'clockwise',
			speed: 0.8,
			opacity: 0.74,
		},
		{
			color: 'radial-gradient(circle at 50% 50%, var(--ui-control-color) 0%, transparent 66%)',
			size: 15,
			strokeWidth: 2.8,
			cornerRadius: 5,
			pulse: 0.1,
			direction: 'counterclockwise',
			speed: 1.6,
			delay: -0.2,
			opacity: 0.68,
		},
	]),
	createLoaderButton('calm-orbit', 'Загрузка: спокойная орбита', 'success', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 92%)',
			size: 26,
			strokeWidth: 1.8,
			cornerRadius: 5,
			pulse: 0.02,
			direction: 'clockwise',
			speed: 0.42,
			opacity: 0.76,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 58%, transparent 100%)',
			size: 20,
			strokeWidth: 1.2,
			cornerRadius: 5,
			pulse: 0.08,
			direction: 'counterclockwise',
			speed: 0.72,
			delay: -0.3,
			opacity: 0.62,
		},
	]),
	createLoaderButton('scan-cycle', 'Загрузка: цикл сканирования', 'danger', [
		{
			color: 'linear-gradient(90deg, transparent 0%, var(--ui-control-color) 46%, transparent 54%, var(--ui-control-color) 100%)',
			size: 25,
			strokeWidth: 2.8,
			cornerRadius: 1,
			pulse: 0.04,
			direction: 'clockwise',
			speed: 1.54,
			opacity: 0.84,
		},
		{
			color: 'linear-gradient(180deg, transparent 0%, var(--ui-control-color) 50%, transparent 100%)',
			size: 18,
			strokeWidth: 1.4,
			cornerRadius: 1,
			pulse: 0.1,
			direction: 'clockwise',
			speed: 0.77,
			delay: -0.18,
			opacity: 0.58,
		},
	]),
	createLoaderButton('quiet-loop', 'Загрузка: тихий цикл', 'link', [
		{
			color: 'linear-gradient(180deg, var(--ui-control-color) 0%, transparent 72%)',
			size: 23,
			strokeWidth: 1.2,
			cornerRadius: 4,
			pulse: 0.04,
			direction: 'clockwise',
			speed: 0.36,
			opacity: 0.68,
		},
		{
			color: 'linear-gradient(0deg, transparent 0%, var(--ui-control-color) 52%, transparent 100%)',
			size: 15,
			strokeWidth: 1,
			cornerRadius: 4,
			pulse: 0.04,
			direction: 'counterclockwise',
			speed: 0.56,
			delay: -0.22,
			opacity: 0.54,
		},
	]),
];

const loaderButtonGroups = [
	{
		id: 'primary',
		title: 'Primary',
		variant: 'primary',
	},
	{
		id: 'accent',
		title: 'Accent',
		variant: 'accent',
	},
] as const satisfies readonly {
	id: string;
	title: string;
	variant: ButtonVariant;
}[];

export function LoadingButtonScreen() {
	return (
		<App className="button-loader-app" aria-label="Button Loader">
			<ScreenScaffold header={<Header title="Button loader" />}>
				<View className="button-loader-view">
					<div className="button-loader-view__groups">
						{loaderButtonGroups.map((group) => (
							<section
								key={group.id}
								className="button-loader-view__group"
								aria-labelledby={`button-loader-view-${group.id}`}
							>
								<h2
									id={`button-loader-view-${group.id}`}
									className="button-loader-view__group-title"
								>
									{group.title}
								</h2>
								<div className="button-loader-view__grid">
									{loaderButtons.map(({ id, ariaLabel, loader }) => (
										<IconButton
											key={`${group.id}-${id}`}
											className="button-loader-view__button"
											size={60}
											variant={group.variant}
											aria-label={`${ariaLabel}, ${group.title}`}
											disabled
										>
											<HexagonLoader {...loader} ariaLabel={ariaLabel} />
										</IconButton>
									))}
								</div>
							</section>
						))}
					</div>
				</View>
			</ScreenScaffold>
		</App>
	);
}
