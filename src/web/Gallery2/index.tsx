import { defineApp, defineFlow, defineScreen } from '../definition';
import { AlbumsScreen } from './albums';
import { GalleryScreen } from './screen';

export const gallery2AppDefinition = defineApp({
	id: 'Gallery2',
	title: 'Галерея 2',
	businessGoal: 'Просматривать медиатеку в масштабе от компактной плитки до полноширинной ленты.',
	flows: [
		defineFlow({
			id: 'photo-browser',
			title: 'Медиатека',
			businessGoal: 'Просматривать фотографии и собранные из них альбомы.',
			screens: [
				defineScreen({
					id: 'all',
					title: 'Все фото',
					scenario: 'browse',
					businessGoal: 'Менять масштаб плитки и просматривать снимки вертикально или горизонтально.',
					Component: GalleryScreen,
				}),
				defineScreen({
					id: 'albums',
					title: 'Альбомы',
					scenario: 'browse',
					businessGoal: 'Показать избранные фотографии и личные альбомы.',
					Component: AlbumsScreen,
				}),
			],
		}),
	],
});
