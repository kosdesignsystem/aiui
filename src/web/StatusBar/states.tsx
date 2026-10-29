import type { CSSProperties, ReactNode } from 'react';
import { StatusBarView, type StatusBarViewProps } from '../../system/StatusBar';
import { Text } from '../../ui/Fonts';
import { FlowPage } from '../FlowPage';
import './states.scss';

type Tone = 'light' | 'dark';

type Specimen = {
	id: string;
	title: string;
	note: string;
	tone: Tone;
	background: string;
	bar?: StatusBarViewProps;
	/** Затемнение поверх фона под значками. */
	scrim?: string;
	/** Бар скрыт, остаётся только камера. */
	hidden?: boolean;
};

const LIGHT_BG = '#f1f2f7';
const DARK_BG = '#1b1c20';
const IMAGE_BG = 'linear-gradient(135deg, #0b3c49 0%, #2a9d8f 100%)';

type Group = { id: string; title: string; description: string; items: Specimen[] };

const groups: Group[] = [
	{
		id: 'color',
		title: 'Цвет значков',
		description: 'Два цвета: #212529 на светлом фоне и #FFFFFF на тёмном. Выбирает приложение.',
		items: [
			{ id: 'light', title: 'Светлый фон', note: 'Значки #212529', tone: 'light', background: LIGHT_BG },
			{ id: 'dark', title: 'Тёмный фон', note: 'Значки #FFFFFF', tone: 'dark', background: DARK_BG },
			{
				id: 'image',
				title: 'Картинка под баром',
				note: 'Фон тёмный, значки #FFFFFF',
				tone: 'dark',
				background: IMAGE_BG,
			},
		],
	},
	{
		id: 'left',
		title: 'Индикаторы слева',
		description: 'Рядом со временем: звонок (#24CE9F) и таймер (#8C8CFF).',
		items: [
			{ id: 'call', title: 'Идёт звонок', note: 'Круг 24×24, шаг 6 от времени', tone: 'light', background: LIGHT_BG, bar: { call: true } },
			{ id: 'timer', title: 'Идёт таймер', note: 'Круг 24×24', tone: 'light', background: LIGHT_BG, bar: { timer: true } },
			{ id: 'call-timer', title: 'Звонок и таймер', note: 'Звонок первым, таймер правее', tone: 'light', background: LIGHT_BG, bar: { call: true, timer: true } },
			{ id: 'call-dark', title: 'Звонок на тёмном', note: 'Цвета кругов не меняются', tone: 'dark', background: DARK_BG, bar: { call: true, timer: true } },
		],
	},
	{
		id: 'right',
		title: 'Индикаторы справа',
		description: 'Ряд прижат к правому краю: сеть, Wi-Fi, батарея. Дополнительные значки встают слева от сети.',
		items: [
			{ id: 'mute', title: 'Без звука', note: '16×16', tone: 'light', background: LIGHT_BG, bar: { mute: true } },
			{ id: 'alarm', title: 'Будильник', note: '16×16', tone: 'light', background: LIGHT_BG, bar: { alarm: true } },
			{ id: 'mute-alarm', title: 'Без звука и будильник', note: 'Оба слева от сети', tone: 'light', background: LIGHT_BG, bar: { mute: true, alarm: true } },
			{ id: 'gprs', title: 'Сеть GPRS', note: 'Подпись 32×16 вместо Wi-Fi', tone: 'light', background: LIGHT_BG, bar: { gprs: true } },
			{ id: 'airplane', title: 'Авиарежим', note: 'Самолёт вместо сети и Wi-Fi', tone: 'light', background: LIGHT_BG, bar: { airplane: true } },
			{ id: 'all-dark', title: 'Все значки на тёмном', note: 'Звонок, таймер, без звука, будильник', tone: 'dark', background: DARK_BG, bar: { call: true, timer: true, mute: true, alarm: true } },
		],
	},
	{
		id: 'visibility',
		title: 'Видимость и оверлеи',
		description: 'Скрытие в полном экране, временный показ свайпом и шит с затемнением.',
		items: [
			{ id: 'hidden', title: 'Скрыт (полный экран)', note: 'Остаётся камера, это физический вырез', tone: 'dark', background: '#0d1b2a', hidden: true },
			{
				id: 'reveal',
				title: 'Показан свайпом',
				note: 'Затемнение 0.6 у края, значки #FFFFFF',
				tone: 'dark',
				background: '#1b3a4b',
				scrim: 'linear-gradient(to bottom, rgb(0 0 0 / 0.6), rgb(0 0 0 / 0))',
			},
			{
				id: 'sheet',
				title: 'Под шитом',
				note: 'Затемнение 0.5 под баром, значки #FFFFFF',
				tone: 'dark',
				background: LIGHT_BG,
				scrim: 'rgb(0 0 0 / 0.5)',
			},
		],
	},
];

function SpecimenCard({ item }: { item: Specimen }) {
	const stageStyle: CSSProperties = {
		background: item.background,
		color: item.tone === 'dark' ? '#ffffff' : '#212529',
	};
	let scrimLayer: ReactNode = null;
	if (item.scrim) {
		scrimLayer = <div className="sb-specimen__scrim" style={{ background: item.scrim }} />;
	}
	return (
		<figure className="sb-specimen">
			<div className="sb-specimen__stage" style={stageStyle}>
				{scrimLayer}
				<div className="sb-specimen__camera" />
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
