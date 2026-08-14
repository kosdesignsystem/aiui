export type GalleryPhoto = {
	id: string;
	albumIds: string[];
	favorite?: boolean;
	width: number;
	height: number;
	imageSrc: string;
};

export type GalleryAlbum = {
	id: 'all' | 'favorites' | 'production' | 'documents' | 'travel';
	title: string;
	photos: GalleryPhoto[];
	tone: string;
};

type PhotoSeed = Omit<GalleryPhoto, 'width' | 'height' | 'imageSrc'> & {
	imageId: string;
};

const PHOTO_SIZE = 1200;

function photoUrl(id: string) {
	return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${PHOTO_SIZE}&h=${PHOTO_SIZE}&q=86`;
}

const photoSeeds: PhotoSeed[] = [
	{
		id: 'p01',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1501785888041-af3ef285b470',
	},
	{
		id: 'p02',
		albumIds: ['travel'],
		imageId: 'photo-1469474968028-56623f02e42e',
	},
	{
		id: 'p03',
		albumIds: ['documents'],
		imageId: 'photo-1455390582262-044cdead277a',
	},
	{
		id: 'p04',
		albumIds: ['favorites', 'production'],
		favorite: true,
		imageId: 'photo-1521737711867-e3b97375f902',
	},
	{
		id: 'p05',
		albumIds: ['production'],
		imageId: 'photo-1562003094-37c71004fa9b',
	},
	{
		id: 'p06',
		albumIds: ['travel'],
		imageId: 'photo-1441974231531-c6227db76b6e',
	},
	{
		id: 'p07',
		albumIds: ['documents'],
		imageId: 'photo-1497215728101-856f4ea42174',
	},
	{
		id: 'p08',
		albumIds: ['production'],
		imageId: 'photo-1581091226825-a6a2a5aee158',
	},
	{
		id: 'p09',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1470770841072-f978cf4d019e',
	},
	{
		id: 'p10',
		albumIds: ['travel'],
		imageId: 'photo-1507525428034-b723cf961d3e',
	},
	{
		id: 'p11',
		albumIds: ['travel'],
		imageId: 'photo-1510414842594-a61c69b5ae57',
	},
	{
		id: 'p12',
		albumIds: ['production'],
		imageId: 'photo-1660446695706-ba4478934091',
	},
	{
		id: 'p13',
		albumIds: ['production'],
		imageId: 'photo-1486406146926-c627a92ad1ab',
	},
	{
		id: 'p14',
		albumIds: ['travel'],
		imageId: 'photo-1477959858617-67f85cf4f1df',
	},
	{
		id: 'p15',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1519681393784-d120267933ba',
	},
	{
		id: 'p16',
		albumIds: ['travel'],
		imageId: 'photo-1470252649378-9c29740c9fa8',
	},
	{
		id: 'p17',
		albumIds: ['documents'],
		imageId: 'photo-1504384308090-c894fdcc538d',
	},
	{
		id: 'p18',
		albumIds: ['travel'],
		imageId: 'photo-1500530855697-b586d89ba3ee',
	},
	{
		id: 'p19',
		albumIds: ['production'],
		imageId: 'photo-1730584476085-8f86687380aa',
	},
	{
		id: 'p20',
		albumIds: ['travel'],
		imageId: 'photo-1500534314209-a25ddb2bd429',
	},
	{
		id: 'p21',
		albumIds: ['documents'],
		imageId: 'photo-1516321318423-f06f85e504b3',
	},
	{
		id: 'p22',
		albumIds: ['favorites', 'production'],
		favorite: true,
		imageId: 'photo-1573164713988-8665fc963095',
	},
	{
		id: 'p23',
		albumIds: ['travel'],
		imageId: 'photo-1473448912268-2022ce9509d8',
	},
	{
		id: 'p24',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1500534623283-312aade485b7',
	},
	{
		id: 'p25',
		albumIds: ['production'],
		imageId: 'photo-1556761175-b413da4baf72',
	},
	{
		id: 'p26',
		albumIds: ['documents'],
		imageId: 'photo-1456324504439-367cee3b3c32',
	},
	{
		id: 'p27',
		albumIds: ['travel'],
		imageId: 'photo-1470770903676-69b98201ea1c',
	},
	{
		id: 'p28',
		albumIds: ['production'],
		imageId: 'photo-1497366754035-f200968a6e72',
	},
	{
		id: 'p29',
		albumIds: ['documents', 'travel'],
		imageId: 'photo-1526772662000-3f88f10405ff',
	},
	{
		id: 'p30',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1484291470158-b8f8d608850d',
	},
	{
		id: 'p31',
		albumIds: ['production'],
		imageId: 'photo-1513828583688-c52646db42da',
	},
	{
		id: 'p32',
		albumIds: ['documents'],
		imageId: 'photo-1499750310107-5fef28a66643',
	},
	{
		id: 'p33',
		albumIds: ['travel'],
		imageId: 'photo-1464822759023-fed622ff2c3b',
	},
	{
		id: 'p34',
		albumIds: ['production'],
		imageId: 'photo-1720036237193-ea82bdac7be0',
	},
	{
		id: 'p35',
		albumIds: ['favorites', 'travel'],
		favorite: true,
		imageId: 'photo-1468413253725-0d5181091126',
	},
	{
		id: 'p36',
		albumIds: ['documents'],
		imageId: 'photo-1501504905252-473c47e087f8',
	},
];

function createPhoto({ imageId, ...seed }: PhotoSeed): GalleryPhoto {
	return {
		...seed,
		width: PHOTO_SIZE,
		height: PHOTO_SIZE,
		imageSrc: photoUrl(imageId),
	};
}

export const galleryPhotos = photoSeeds.map(createPhoto);

export const favoritePhotos = galleryPhotos.filter((photo) => photo.favorite);

export const galleryAlbums: GalleryAlbum[] = [
	{ id: 'all', title: 'Все снимки', tone: '#f2eee4', photos: galleryPhotos },
	{ id: 'favorites', title: 'Избранное', tone: '#eee5d4', photos: favoritePhotos },
	{
		id: 'production',
		title: 'Делишки',
		tone: '#e2e9e2',
		photos: galleryPhotos.filter((photo) => photo.albumIds.includes('production')),
	},
	{
		id: 'documents',
		title: 'Коллеги',
		tone: '#e3e8ec',
		photos: galleryPhotos.filter((photo) => photo.albumIds.includes('documents')),
	},
	{
		id: 'travel',
		title: 'Путешествия',
		tone: '#e8e1dc',
		photos: galleryPhotos.filter((photo) => photo.albumIds.includes('travel')),
	},
];
