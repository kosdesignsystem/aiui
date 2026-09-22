import { CSSProperties, useMemo, useState } from 'react';
import cityPhoto from './assets/city.svg';
import './screen.scss';

type Ratio = 'Оригинал' | '1:1' | '4:3' | '16:9';
type Tool = 'crop' | 'adjust' | 'filters';

const photos = Array.from({ length: 12 }, (_, index) => ({
	id: index,
	filter: index % 5 === 0 ? 'grayscale(.9)' : index % 4 === 0 ? 'sepia(.35) saturate(1.25)' : 'none',
	position: `${38 + (index % 3) * 13}% ${34 + (index % 4) * 10}%`,
}));

function Glyph({ children }: { children: React.ReactNode }) {
	return <span className="nc-glyph" aria-hidden="true">{children}</span>;
}

export default function NCGalleryPage() {
	const [editing, setEditing] = useState(false);
	const [menuFor, setMenuFor] = useState<number | null>(null);
	const [selected, setSelected] = useState(0);
	const [ratio, setRatio] = useState<Ratio>('Оригинал');
	const [tool, setTool] = useState<Tool>('crop');
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(100);
	const [warmth, setWarmth] = useState(0);
	const [grid, setGrid] = useState(true);
	const [saved, setSaved] = useState(false);

	const frameClass = useMemo(() => `nc-editor__frame nc-editor__frame--${ratio.replace(':', '-')}`, [ratio]);
	const photoStyle = {
		transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
		filter: `sepia(${Math.max(warmth, 0) / 150}) saturate(${1 + Math.abs(warmth) / 120}) hue-rotate(${warmth < 0 ? -10 : 0}deg)`,
	} as CSSProperties;

	const openEditor = (id: number) => {
		setSelected(id);
		setMenuFor(null);
		setEditing(true);
		setSaved(false);
	};

	const savePhoto = () => {
		const image = new Image();
		image.onload = () => {
			const dimensions: Record<Ratio, [number, number]> = {
				'Оригинал': [900, 1200], '1:1': [1080, 1080], '4:3': [1200, 900], '16:9': [1280, 720],
			};
			const [width, height] = dimensions[ratio];
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext('2d');
			if (!context) return;
			const scale = Math.max(width / image.width, height / image.height) * zoom / 100;
			context.filter = `sepia(${Math.max(warmth, 0) / 150}) saturate(${1 + Math.abs(warmth) / 120})`;
			context.translate(width / 2, height / 2);
			context.rotate(rotation * Math.PI / 180);
			context.drawImage(image, -image.width * scale / 2, -image.height * scale / 2, image.width * scale, image.height * scale);
			const link = document.createElement('a');
			link.download = `NC-photo-${selected + 1}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		};
		image.src = cityPhoto;
		setSaved(true);
		setTimeout(() => setSaved(false), 2200);
	};

	if (editing) {
		return (
			<div className="nc-app nc-editor">
				<header className="nc-editor__header">
					<button className="nc-pill" type="button" onClick={() => setEditing(false)}>Отмена</button>
					<div className="nc-editor__title">Фото {selected + 1}</div>
					<button className="nc-pill nc-pill--accent" type="button" onClick={savePhoto}>Готово</button>
				</header>

				<div className="nc-editor__quick-actions">
					<button type="button" aria-label="Отразить фотографию"><Glyph>↔</Glyph></button>
					<button type="button" onClick={() => setRotation((value) => value - 90)} aria-label="Повернуть фотографию"><Glyph>↻</Glyph></button>
					<button type="button" className={grid ? 'is-active' : ''} onClick={() => setGrid(!grid)} aria-label="Показать сетку"><Glyph>▦</Glyph></button>
				</div>

				<div className={frameClass}>
					<img src={cityPhoto} alt="Городская улица" style={photoStyle} draggable={false} />
					{grid && <div className="nc-editor__grid" aria-hidden="true" />}
					<i className="nc-editor__corner nc-editor__corner--tl" /><i className="nc-editor__corner nc-editor__corner--tr" />
					<i className="nc-editor__corner nc-editor__corner--bl" /><i className="nc-editor__corner nc-editor__corner--br" />
				</div>

				<div className="nc-editor__panel">
					{tool === 'crop' && <>
						<div className="nc-ratios" role="list" aria-label="Формат кадра">
							{(['Оригинал', '1:1', '4:3', '16:9'] as Ratio[]).map((item) => <button type="button" key={item} className={ratio === item ? 'is-active' : ''} onClick={() => setRatio(item)}><span>{item === 'Оригинал' ? '⌑' : item}</span>{item}</button>)}
						</div>
						<label className="nc-range"><span>Масштаб</span><input type="range" min="100" max="160" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><output>{zoom}%</output></label>
					</>}
					{tool === 'adjust' && <label className="nc-range"><span>Теплота</span><input type="range" min="-50" max="50" value={warmth} onChange={(event) => setWarmth(Number(event.target.value))} /><output>{warmth > 0 ? '+' : ''}{warmth}</output></label>}
					{tool === 'filters' && <div className="nc-filters">{['Оригинал', 'Яркий', 'Тёплый', 'Моно'].map((name, index) => <button type="button" key={name}><img src={cityPhoto} alt="" style={{ filter: ['none', 'saturate(1.5)', 'sepia(.35)', 'grayscale(1)'][index] }} /><span>{name}</span></button>)}</div>}
				</div>

				<nav className="nc-editor__tools" aria-label="Инструменты редактирования">
					<button type="button" className={tool === 'adjust' ? 'is-active' : ''} onClick={() => setTool('adjust')}><Glyph>☼</Glyph><span>Изменить</span></button>
					<button type="button" className={tool === 'filters' ? 'is-active' : ''} onClick={() => setTool('filters')}><Glyph>◉</Glyph><span>Фильтры</span></button>
					<button type="button" className={tool === 'crop' ? 'is-active' : ''} onClick={() => setTool('crop')}><Glyph>⌗</Glyph><span>Обрезать</span></button>
				</nav>
				{saved && <div className="nc-toast" role="status">Изменения сохранены</div>}
			</div>
		);
	}

	return (
		<div className="nc-app nc-gallery" onClick={() => menuFor !== null && setMenuFor(null)}>
			<header className="nc-gallery__header"><div><span>Медиатека</span><h1>Все фото</h1></div><button className="nc-header-action" type="button">Выбрать</button></header>
			<div className="nc-gallery__date"><strong>Сегодня</strong><span>Москва</span></div>
			<div className="nc-gallery__grid">
				{photos.map((photo) => <article className="nc-photo" key={photo.id}>
					<img src={cityPhoto} alt={`Фото ${photo.id + 1}`} style={{ filter: photo.filter, objectPosition: photo.position }} />
					<button type="button" className="nc-photo__more" aria-label={`Действия с фото ${photo.id + 1}`} aria-expanded={menuFor === photo.id} onClick={(event) => { event.stopPropagation(); setMenuFor(menuFor === photo.id ? null : photo.id); }}>•••</button>
					{menuFor === photo.id && <div className="nc-menu" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => openEditor(photo.id)}><Glyph>✎</Glyph>Редактировать</button><button type="button"><Glyph>↗</Glyph>Поделиться</button><button type="button" className="nc-menu__danger"><Glyph>⌫</Glyph>Удалить</button></div>}
				</article>)}
			</div>
			<nav className="nc-tabbar"><button type="button" className="is-active"><Glyph>▦</Glyph><span>Медиатека</span></button><button type="button"><Glyph>♡</Glyph><span>Альбомы</span></button><button type="button"><Glyph>⌕</Glyph><span>Поиск</span></button></nav>
		</div>
	);
}
