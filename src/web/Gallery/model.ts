import { createAppScreenPath } from '../definition';
import photo00 from '../../assets/gallery/photo.png';
import photo01 from '../../assets/gallery/photo-1.png';
import photo02 from '../../assets/gallery/photo-2.png';
import photo03 from '../../assets/gallery/photo-3.png';
import photo04 from '../../assets/gallery/photo-4.png';
import photo05 from '../../assets/gallery/photo-5.png';
import photo06 from '../../assets/gallery/photo-6.png';
import photo07 from '../../assets/gallery/photo-7.png';
import photo08 from '../../assets/gallery/photo-8.png';
import photo09 from '../../assets/gallery/photo-9.png';
import photo10 from '../../assets/gallery/photo-10.png';
import photo11 from '../../assets/gallery/photo-11.png';
import photo12 from '../../assets/gallery/photo-12.png';
import photo13 from '../../assets/gallery/photo-13.png';
import photo14 from '../../assets/gallery/photo-14.png';
import photo15 from '../../assets/gallery/photo-15.png';
import photo16 from '../../assets/gallery/photo-16.png';
import photo17 from '../../assets/gallery/photo-17.png';
import photo18 from '../../assets/gallery/photo-18.png';
import photo19 from '../../assets/gallery/photo-19.png';
import photo20 from '../../assets/gallery/photo-20.png';
import photo21 from '../../assets/gallery/photo-21.png';
import photo22 from '../../assets/gallery/photo-22.png';

export const GALLERY_APP_ID = 'Gallery';

export type GalleryPhoto = {
	id: string;
	title: string;
	takenAtLabel: string;
	albumIds: string[];
	favorite?: boolean;
	width: number;
	height: number;
	imageSrc: string;
};

export type GalleryAlbum = {
	id: string;
	title: string;
	photos: GalleryPhoto[];
};

export type GalleryCategoryId =
	| 'photos'
	| 'videos'
	| 'screenshots'
	| 'records'
	| 'downloads';

export type GalleryCategory = {
	id: GalleryCategoryId;
	title: string;
	count: number;
};

type PhotoSeed = Omit<GalleryPhoto, 'width' | 'height' | 'imageSrc'>;

const PHOTO_WIDTH = 800;
const PHOTO_HEIGHT = 800;

const photoAssets = [
	photo00,
	photo01,
	photo02,
	photo03,
	photo04,
	photo05,
	photo06,
	photo07,
	photo08,
	photo09,
	photo10,
	photo11,
	photo12,
	photo13,
	photo14,
	photo15,
	photo16,
	photo17,
	photo18,
	photo19,
	photo20,
	photo21,
	photo22,
];

const photoSeeds: PhotoSeed[] = [
	{
		id: 'p01',
		title: 'Станок №4',
		takenAtLabel: '29 июля 2023 19:20',
		albumIds: ['favorites', 'production'],
		favorite: true,
	},
	{
		id: 'p02',
		title: 'Ночной рейс',
		takenAtLabel: '29 июля 2023 18:05',
		albumIds: ['travel'],
	},
	{
		id: 'p03',
		title: 'Пропуск',
		takenAtLabel: '28 июля 2023 17:46',
		albumIds: ['documents'],
	},
	{
		id: 'p04',
		title: 'Подписанные документы',
		takenAtLabel: '28 июля 2023 15:14',
		albumIds: ['favorites', 'documents'],
		favorite: true,
	},
	{
		id: 'p05',
		title: 'Турбина',
		takenAtLabel: '27 июля 2023 16:42',
		albumIds: ['production'],
	},
	{
		id: 'p06',
		title: 'Скалистый хребет',
		takenAtLabel: '26 июля 2023 12:08',
		albumIds: ['travel'],
	},
	{
		id: 'p07',
		title: 'Сменный отчёт',
		takenAtLabel: '24 июля 2023 11:10',
		albumIds: ['documents'],
	},
	{
		id: 'p08',
		title: 'Оранжевая смена',
		takenAtLabel: '24 июля 2023 09:52',
		albumIds: ['production'],
	},
	{
		id: 'p09',
		title: 'Высота',
		takenAtLabel: '22 июля 2023 08:40',
		albumIds: ['favorites', 'travel'],
		favorite: true,
	},
	{
		id: 'p10',
		title: 'Песчаный ветер',
		takenAtLabel: '20 июля 2023 14:12',
		albumIds: ['travel'],
	},
	{
		id: 'p11',
		title: 'Остров',
		takenAtLabel: '18 июля 2023 16:48',
		albumIds: ['travel'],
	},
	{
		id: 'p12',
		title: 'Коридор цеха',
		takenAtLabel: '18 июля 2023 09:01',
		albumIds: ['production'],
	},
	{
		id: 'p13',
		title: 'Стрела крана',
		takenAtLabel: '16 июля 2023 17:35',
		albumIds: ['production'],
	},
	{
		id: 'p14',
		title: 'Линия рельс',
		takenAtLabel: '14 июля 2023 18:12',
		albumIds: ['travel'],
	},
	{
		id: 'p15',
		title: 'Ночное небо',
		takenAtLabel: '12 июля 2023 22:11',
		albumIds: ['favorites', 'travel'],
		favorite: true,
	},
	{
		id: 'p16',
		title: 'Красный закат',
		takenAtLabel: '11 июля 2023 20:42',
		albumIds: ['travel'],
	},
	{
		id: 'p17',
		title: 'Архив',
		takenAtLabel: '10 июля 2023 13:21',
		albumIds: ['documents'],
	},
	{
		id: 'p18',
		title: 'Острая вершина',
		takenAtLabel: '09 июля 2023 07:06',
		albumIds: ['travel'],
	},
	{
		id: 'p19',
		title: 'Сервисный проход',
		takenAtLabel: '08 июля 2023 18:44',
		albumIds: ['production'],
	},
	{
		id: 'p20',
		title: 'Горизонт',
		takenAtLabel: '07 июля 2023 06:58',
		albumIds: ['travel'],
	},
	{
		id: 'p21',
		title: 'Техническая заметка',
		takenAtLabel: '06 июля 2023 12:17',
		albumIds: ['documents'],
	},
	{
		id: 'p22',
		title: 'После смены',
		takenAtLabel: '05 июля 2023 20:26',
		albumIds: ['favorites', 'production'],
		favorite: true,
	},
	{
		id: 'p23',
		title: 'Маршрут',
		takenAtLabel: '04 июля 2023 15:03',
		albumIds: ['travel'],
	},
];

export function getPhotoCountLabel(count: number) {
	return `${count} фото`;
}

function createPhoto(seed: PhotoSeed, imageSrc: string): GalleryPhoto {
	return {
		...seed,
		width: PHOTO_WIDTH,
		height: PHOTO_HEIGHT,
		imageSrc,
	};
}

export const galleryPhotos = photoSeeds.map((seed, index) => createPhoto(seed, photoAssets[index]));

export const favoritePhotos = galleryPhotos.filter((photo) => photo.favorite);

export const galleryAlbums: GalleryAlbum[] = [
	{ id: 'production', title: 'Делишки' },
	{ id: 'documents', title: 'Коллеги' },
	{ id: 'travel', title: 'Путешествия' },
].map((album) => ({
	...album,
	photos: galleryPhotos.filter((photo) => photo.albumIds.includes(album.id)),
}));

export const galleryCategories: GalleryCategory[] = [
	{ id: 'photos', title: 'Фото', count: 1124 },
	{ id: 'videos', title: 'Видео', count: 421 },
	{ id: 'screenshots', title: 'Скриншоты', count: 25 },
	{ id: 'records', title: 'Записи экрана', count: 5 },
	{ id: 'downloads', title: 'Загрузки', count: 159 },
];

export const galleryRoutes = {
	all: createAppScreenPath(GALLERY_APP_ID, 'all'),
	albums: createAppScreenPath(GALLERY_APP_ID, 'albums'),
} as const;
