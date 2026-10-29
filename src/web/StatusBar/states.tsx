import type { CSSProperties, ReactNode } from 'react';
import { StatusBarView, type StatusBarViewProps } from '../../system/StatusBar';
import { Text } from '../../ui/Fonts';
import { FlowPage } from '../FlowPage';
import './states.scss';

type Specimen = {
	id: string;
	title: string;
	note: string;
	background: string;
	/** Параметры бара: режим, цвет значков, индикаторы. */
	bar?: StatusBarViewProps;
	/** Затемнение шита поверх фона и бара. */
	scrim?: string;
	/** Бар скрыт, остаётся камера. */
	hidden?: boolean;
};

const LIGHT = '#f1f2f7';
const DARK = '#1b1c20';
const BRAND = '#2f6bdb';
const YELLOW = '#ffd84d';
const NIGHT = 'linear-gradient(180deg, #0b1d3a 0%, #1d4e6b 55%, #0e2a2f 100%)';
const DAY = 'linear-gradient(180deg, #bfe3ff 0%, #fdf0d5 60%, #f7d9a8 100%)';
const VIDEO = '#1b3a4b';

type Group = { id: string; title: string; description: string; items: Specimen[] };

const groups: Group[] = [
	{
		id: 'surface',
		title: 'Заливка',
		description:
			'Шапка приложения закрашивает зону бара. Градиента нет. Цвет значков выбирает приложение: #212529 или #FFFFFF.',
		items: [
			{ id: 's-light', title: 'Светлая шапка', note: 'Значки #212529', background: LIGHT, bar: { icons: 'dark' } },
			{ id: 's-dark', title: 'Тёмная шапка', note: 'Значки #FFFFFF', background: DARK, bar: { icons: 'light' } },
			{ id: 's-brand', title: 'Цвет приложения', note: 'Значки #FFFFFF', background: BRAND, bar: { icons: 'light' } },
			{ id: 's-yellow', title: 'Яркая шапка', note: 'Значки #212529', background: YELLOW, bar: { icons: 'dark' } },
		],
	},
	{
		id: 'overlay',
		title: 'Наложение',
		description:
			'Контент идёт под бар. ОС рисует градиент 0.4 → 0 на 40 dp цветом, обратным значкам: к белым значкам чёрный, к чёрным белый.',
		items: [
			{ id: 'o-night', title: 'Тёмное изображение', note: 'Белые значки, чёрный градиент', background: NIGHT, bar: { mode: 'overlay', icons: 'light' } },
			{ id: 'o-day', title: 'Светлое изображение', note: 'Чёрные значки, белый градиент', background: DAY, bar: { mode: 'overlay', icons: 'dark' } },
			{ id: 'o-video', title: 'Видео', note: 'Белые значки', background: VIDEO, bar: { mode: 'overlay', icons: 'light' } },
		],
	},
	{
		id: 'left',
		title: 'Индикаторы слева',
		description: 'Рядом со временем: звонок (#24CE9F) и таймер (#8C8CFF).',
		items: [
			{ id: 'call', title: 'Идёт звонок', note: 'Круг 24×24, шаг 6 от времени', background: LIGHT, bar: { icons: 'dark', call: true } },
			{ id: 'timer', title: 'Идёт таймер', note: 'Круг 24×24', background: LIGHT, bar: { icons: 'dark', timer: true } },
			{ id: 'call-timer', title: 'Звонок и таймер', note: 'Звонок первым, таймер правее', background: LIGHT, bar: { icons: 'dark', call: true, timer: true } },
			{ id: 'call-dark', title: 'Звонок на тёмном', note: 'Цвета кругов не меняются', background: DARK, bar: { icons: 'light', call: true, timer: true } },
		],
	},
	{
		id: 'right',
		title: 'Индикаторы справа',
		description: 'Ряд прижат к правому краю: сеть, Wi-Fi, батарея. Дополнительные значки встают слева от сети.',
		items: [
			{ id: 'mute', title: 'Без звука', note: '16×16', background: LIGHT, bar: { icons: 'dark', mute: true } },
			{ id: 'alarm', title: 'Будильник', note: '16×16', background: LIGHT, bar: { icons: 'dark', alarm: true } },
			{ id: 'mute-alarm', title: 'Без звука и будильник', note: 'Оба слева от сети', background: LIGHT, bar: { icons: 'dark', mute: true, alarm: true } },
			{ id: 'gprs', title: 'Сеть GPRS', note: 'Подпись 32×16 вместо Wi-Fi', background: LIGHT, bar: { icons: 'dark', gprs: true } },
			{ id: 'airplane', title: 'Авиарежим', note: 'Самолёт вместо сети и Wi-Fi', background: LIGHT, bar: { icons: 'dark', airplane: true } },
			{ id: 'all-dark', title: 'Все значки на тёмном', note: 'Звонок, таймер, без звука, будильник', background: DARK, bar: { icons: 'light', call: true, timer: true, mute: true, alarm: true } },
		],
	},
	{
		id: 'visibility',
		title: 'Видимость и оверлеи',
		description: 'Скрытие в полном экране, временный показ свайпом и шит с затемнением.',
		items: [
			{ id: 'hidden', title: 'Скрыт (полный экран)', note: 'Остаётся камера, это физический вырез', background: '#0d1b2a', hidden: true },
			{
				id: 'reveal',
				title: 'Показан свайпом',
				note: 'Тот же градиент 0.4, значки #FFFFFF',
				background: VIDEO,
				bar: { mode: 'overlay', icons: 'light' },
			},
			{
				id: 'sheet',
				title: 'Под шитом',
				note: 'Затемнение 0.5, градиента нет, значки #FFFFFF',
				background: LIGHT,
				scrim: 'rgb(0 0 0 / 0.5)',
				bar: { icons: 'light', scrimmed: true },
			},
		],
	},
];

function cameraBackground(item: Specimen) {
	return item.bar?.icons === 'dark' ? 'rgb(33 37 41 / 0.12)' : 'rgb(255 255 255 / 0.16)';
}

function SpecimenCard({ item }: { item: Specimen }) {
	const stageStyle: CSSProperties = { background: item.background };
	let scrimLayer: ReactNode = null;
	if (item.scrim) {
		scrimLayer = <div className="sb-specimen__scrim" style={{ background: item.scrim }} />;
	}
	return (
		<figure className="sb-specimen">
			<div className="sb-specimen__stage" style={stageStyle}>
				{scrimLayer}
				<div className="sb-specimen__camera" style={{ background: cameraBackground(item) }} />
				{item.hidden ? null : <StatusBarView {...item.bar} className="device-statusbar--specimen" />}
			</div>
			<figcaption className="sb-specimen__caption">
				<Text variant="medium-14">{item.title}</Text>
				<Text variant="regular-12" color="secondary">
					{item.note}
				</Text>
			</figcaption>
		</figure>
	);
}

export default function StatusBarStatesPage() {
	return (
		<FlowPage title="Статус-бар">
			<div className="sb-app" data-status-bar-icons="dark" data-nav-bar-icons="dark">
				{groups.map((group) => (
					<section className="sb-group" key={group.id}>
						<Text as="p" variant="semiBold-20">
							{group.title}
						</Text>
						<Text as="p" variant="regular-14" color="secondary">
							{group.description}
						</Text>
						<div className="sb-group__list">
							{group.items.map((item) => (
								<SpecimenCard item={item} key={item.id} />
							))}
						</div>
					</section>
				))}
			</div>
		</FlowPage>
	);
}
