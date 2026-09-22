import { CSSProperties, useMemo, useState } from 'react';
import { Button } from '../../ui/Button';
import { Header } from '../../ui/Header';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Nav } from '../../ui/Nav';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { Text } from '../../ui/Fonts';
import cityPhoto from './assets/city.svg';
import './screen.scss';

type Ratio = 'original' | 'square' | '4-3' | '16-9';
type Tool = 'adjust' | 'filters' | 'crop';
type Filter = 'original' | 'vivid' | 'warm' | 'mono';

const ratioDimensions: Record<Ratio, [number, number]> = {
	original: [900, 1200], square: [1080, 1080], '4-3': [1200, 900], '16-9': [1280, 720],
};
const filterStyles: Record<Filter, string> = {
	original: '', vivid: 'saturate(1.5) contrast(1.08)', warm: 'sepia(.25) saturate(1.25)', mono: 'grayscale(1)',
};
const galleryPhotos = Array.from({ length: 12 }, (_, index) => ({
	id: index,
	filter: index % 5 === 0 ? 'grayscale(.85)' : index % 4 === 0 ? 'sepia(.25) saturate(1.2)' : 'none',
	position: `${36 + (index % 3) * 14}% ${32 + (index % 4) * 11}%`,
}));

function AppIcon({ name, size = 24 }: { name: IconName; size?: number }) {
	return <Icon name={name} width={size} height={size} alt="" aria-hidden="true" />;
}

export default function NCGalleryPage() {
	const [editing, setEditing] = useState(false);
	const [menuFor, setMenuFor] = useState<number | null>(null);
	const [selected, setSelected] = useState(0);
	const [ratio, setRatio] = useState<Ratio>('original');
	const [tool, setTool] = useState<Tool>('crop');
	const [filter, setFilter] = useState<Filter>('original');
	const [rotation, setRotation] = useState(0);
	const [zoom, setZoom] = useState(100);
	const [warmth, setWarmth] = useState(0);
	const [grid, setGrid] = useState(true);
	const [saved, setSaved] = useState(false);

	const imageFilter = `${filterStyles[filter]} sepia(${Math.max(warmth, 0) / 150}) saturate(${1 + Math.abs(warmth) / 120})`;
	const photoStyle = { transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, filter: imageFilter } as CSSProperties;
	const frameClass = useMemo(() => `nc-editor__frame nc-editor__frame--${ratio}`, [ratio]);

	const openEditor = (id: number) => {
		setSelected(id); setMenuFor(null); setEditing(true); setSaved(false);
	};

	const savePhoto = () => {
		const image = new Image();
		image.onload = () => {
			const [width, height] = ratioDimensions[ratio];
			const canvas = document.createElement('canvas');
			canvas.width = width; canvas.height = height;
			const context = canvas.getContext('2d');
			if (!context) return;
			const scale = Math.max(width / image.width, height / image.height) * zoom / 100;
			context.filter = imageFilter;
			context.translate(width / 2, height / 2);
			context.rotate(rotation * Math.PI / 180);
			context.drawImage(image, -image.width * scale / 2, -image.height * scale / 2, image.width * scale, image.height * scale);
			const link = document.createElement('a');
			link.download = `NC-photo-${selected + 1}.png`;
			link.href = canvas.toDataURL('image/png'); link.click();
		};
		image.src = cityPhoto;
		setSaved(true); window.setTimeout(() => setSaved(false), 2200);
	};

	if (!editing) {
		return (
			<div className="nc-app nc-gallery" onClick={() => menuFor !== null && setMenuFor(null)}>
				<Header title="Все фото" meta={<Text variant="regular-14" color="secondary">Сегодня · Москва</Text>} action={<Button size={44} variant="primary">Выбрать</Button>} />
				<main className="nc-gallery__grid">
					{galleryPhotos.map((photo) => <article className="nc-photo" key={photo.id}>
						<img src={cityPhoto} alt={`Фото ${photo.id + 1}`} style={{ filter: photo.filter, objectPosition: photo.position }} />
						<IconButton size={32} variant="primary" className="nc-photo__more" aria-label={`Действия с фото ${photo.id + 1}`} aria-expanded={menuFor === photo.id} onClick={(event) => { event.stopPropagation(); setMenuFor(menuFor === photo.id ? null : photo.id); }}><AppIcon name="more-horizontal" size={18} /></IconButton>
						{menuFor === photo.id && <div className="nc-menu" onClick={(event) => event.stopPropagation()}>
							<Button variant="secondary" leftIcon={<AppIcon name="pencil-outline" size={20} />} onClick={() => openEditor(photo.id)}>Редактировать</Button>
							<Button variant="secondary" leftIcon={<AppIcon name="share-outline" size={20} />}>Поделиться</Button>
							<Button variant="link" className="nc-menu__danger" leftIcon={<AppIcon name="delete-outline" size={20} />}>Удалить</Button>
						</div>}
					</article>)}
				</main>
				<Nav className="nc-gallery__nav" ariaLabel="Разделы галереи" items={[
					{ id: 'library', label: 'Медиатека', active: true, icon: <AppIcon name="apps" /> },
					{ id: 'albums', label: 'Альбомы', icon: <AppIcon name="image-outline" /> },
					{ id: 'search', label: 'Поиск', icon: <AppIcon name="search" /> },
				]} />
			</div>
		);
	}

	return (
		<div className="nc-app nc-editor">
			<header className="nc-editor__header">
				<Button size={44} variant="primary" onClick={() => setEditing(false)}>Отмена</Button>
				<Text variant="medium-14" color="secondary">Фото {selected + 1}</Text>
				<Button size={44} variant="accent" onClick={savePhoto}>Готово</Button>
			</header>
			<div className="nc-editor__quick-actions">
				<div><IconButton variant="primary" aria-label="Отразить"><AppIcon name="switches-outline" /></IconButton><IconButton variant="primary" aria-label="Повернуть" onClick={() => setRotation((value) => value - 90)}><AppIcon name="arrow-repeat" /></IconButton></div>
				<IconButton variant={grid ? 'accent' : 'primary'} aria-label="Сетка" onClick={() => setGrid(!grid)}><AppIcon name="table" /></IconButton>
			</div>
			<div className="nc-editor__canvas"><div className={frameClass}>
				<img src={cityPhoto} alt="Городская улица" style={photoStyle} draggable={false} />
				{grid && <div className="nc-editor__grid" aria-hidden="true" />}
				<i className="nc-editor__corner nc-editor__corner--tl" /><i className="nc-editor__corner nc-editor__corner--tr" /><i className="nc-editor__corner nc-editor__corner--bl" /><i className="nc-editor__corner nc-editor__corner--br" />
			</div></div>
			<section className="nc-editor__controls">
				{tool === 'crop' && <><SegmentedTabs className="nc-ratios" ariaLabel="Формат кадра" tabs={[{ id:'original',label:'Оригинал' },{ id:'square',label:'1:1' },{ id:'4-3',label:'4:3' },{ id:'16-9',label:'16:9' }]} value={ratio} onChange={(value) => setRatio(value as Ratio)} /><label className="nc-range"><Text variant="regular-14">Масштаб</Text><input aria-label="Масштаб" type="range" min="100" max="160" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><Text variant="regular-14" color="secondary">{zoom}%</Text></label></>}
				{tool === 'adjust' && <label className="nc-range nc-range--single"><Text variant="regular-14">Теплота</Text><input aria-label="Теплота" type="range" min="-50" max="50" value={warmth} onChange={(event) => setWarmth(Number(event.target.value))} /><Text variant="regular-14" color="secondary">{warmth > 0 ? '+' : ''}{warmth}</Text></label>}
				{tool === 'filters' && <div className="nc-filters">{([['original','Оригинал'],['vivid','Яркий'],['warm','Тёплый'],['mono','Моно']] as [Filter,string][]).map(([id,label]) => <button type="button" className={filter === id ? 'is-active' : ''} key={id} onClick={() => setFilter(id)}><img src={cityPhoto} alt="" style={{ filter: filterStyles[id] }} /><Text variant="regular-12">{label}</Text></button>)}</div>}
			</section>
			<Nav className="nc-editor__nav" ariaLabel="Инструменты редактирования" items={[
				{ id:'adjust', label:'Изменить', active:tool === 'adjust', onClick:() => setTool('adjust'), icon:<AppIcon name="change" /> },
				{ id:'filters', label:'Фильтры', active:tool === 'filters', onClick:() => setTool('filters'), icon:<AppIcon name="filter" /> },
				{ id:'crop', label:'Обрезать', active:tool === 'crop', onClick:() => setTool('crop'), icon:<AppIcon name="photo-size-outline" /> },
			]} />
			{saved && <div className="nc-toast" role="status"><AppIcon name="done" size={18} />Изменения сохранены</div>}
		</div>
	);
}
