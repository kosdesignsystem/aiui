import { defineApp, defineFlow, defineScreen } from '../definition';
import { AlbumsScreen } from './albums';
import { GalleryScreen } from './screen';

export const galleryAppDefinition = defineApp({
	id: 'Gallery',
	title: 'Галерея',
	businessGoal: 'Показывать медиатеку и переводить пользователя в режим просмотра снимка.',
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
					businessGoal: 'Показать сетку фотографий и вход в просмотрщик.',
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
