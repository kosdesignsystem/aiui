import type { GalleryPhoto } from '../Gallery/model';

const allSize = 80;
const favoriteSize = 40;

const assets = Object.entries(
	import.meta.glob('../../assets/gallery/photo-*.jpg', {
		eager: true,
		import: 'default',
	}) as Record<string, string>,
)
	.sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
	.map(([, src]) => src)
	.slice(0, allSize);

export const allPhotos: GalleryPhoto[] = assets.map((imageSrc, index) => {
	const number = index + 1;
	const favorite = index < favoriteSize;

	return {
		id: `p${String(number).padStart(2, '0')}`,
		title: `Снимок ${number}`,
		takenAtLabel: `${30 - (index % 30)} июня 2023 ${20 - (index % 12)}:${String(
			(index * 7) % 60,
		).padStart(2, '0')}`,
		albumIds: favorite ? ['favorites'] : [],
		favorite,
		width: 800,
		height: 800,
		imageSrc,
	};
});

export const favoritePhotos = allPhotos.filter((photo) => photo.favorite);
