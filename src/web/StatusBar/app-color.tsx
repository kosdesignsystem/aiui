import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { parseColor, pickBarIcons } from '../Security/systemBars';
import './app-color.scss';

type Palette = { id: string; label: string; color: string; ink: string };

const palettes: ReadonlyArray<Palette> = [
	{ id: 'blue', label: 'Синий', color: '#2f6bdb', ink: '#ffffff' },
	{ id: 'dark', label: 'Тёмный', color: '#1b1c20', ink: '#ffffff' },
	{ id: 'yellow', label: 'Жёлтый', color: '#ffd84d', ink: '#212529' },
];

const rows = Array.from({ length: 16 }, (_, index) => ({
	id: index,
	title: `Операция ${index + 1}`,
	note: index % 3 === 0 ? 'Сегодня' : index % 3 === 1 ? 'Вчера' : 'На этой неделе',
}));

/**
 * P1: приложение закрашивает зону статус-бара и зону навбара своим цветом.
 * Контент прокручивается между этими зонами и под бары не заходит, поэтому
 * цвет значков выбирается один раз по цвету приложения и при прокрутке не меняется.
 */
export default function StatusBarAppColorPage() {
	const [paletteId, setPaletteId] = useState('blue');
	const palette = palettes.find((item) => item.id === paletteId) ?? palettes[0];
	const icons = pickBarIcons(parseColor(palette.color));

	return (
		<div
			className="sb-appcolor"
			data-nav-bar-icons={icons}
			style={{ background: palette.color, color: palette.ink }}
		>
			<header className="sb-appcolor__header">
				<Text as="p" variant="semiBold-24">
					Мой банк
				</Text>
				<Text as="p" variant="regular-14">
					Зона бара закрашена цветом приложения
				</Text>
			</header>
			<main className="sb-appcolor__scroll">
				<div className="sb-appcolor__tabs">
					<SegmentedTabs
						tabs={[
							{ id: palettes[0].id, label: palettes[0].label },
							{ id: palettes[1].id, label: palettes[1].label },
							{ id: palettes[2].id, label: palettes[2].label },
						]}
						value={paletteId}
						onChange={setPaletteId}
						ariaLabel="Цвет приложения"
					/>
				</div>
				{rows.map((row) => (
					<div className="sb-appcolor__row" key={row.id}>
						<Text as="p" variant="medium-16">
							{row.title}
						</Text>
						<Text as="p" variant="regular-14" color="secondary">
							{row.note}
						</Text>
					</div>
				))}
			</main>
		</div>
	);
}
