import { defineApp, defineFlow, defineScreen } from '../definition';
import { AlbumsScreen } from './albums';
import { GalleryScreen } from './screen';

export const galleryCatalogAppDefinition = defineApp({
	id: 'GalleryCatalog',
	title: 'Фотокарточки',
	businessGoal: 'Дать пространственную картотеку альбомов и фотографий.',
	flows: [
		defineFlow({
			id: 'card-catalog',
			title: 'Фотокарточки',
			businessGoal: 'Листать альбомы как папки, а фотографии как физические карточки.',
			screens: [
				defineScreen({
					id: 'all',
					title: 'Все снимки',
					scenario: 'browse',
					businessGoal: 'Открыть картотеку на полной коллекции.',
					Component: GalleryScreen,
				}),
				defineScreen({
					id: 'albums',
					title: 'Альбомы',
					scenario: 'browse',
					businessGoal: 'Открыть картотеку на избранном альбоме.',
					Component: AlbumsScreen,
				}),
			],
		}),
	],
});
