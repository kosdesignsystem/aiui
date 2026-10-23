import { defineApp, defineFlow, defineScreen } from '../definition';
import { AlbumsScreen } from './albums';
import { GalleryScreen } from './all';

export const secureGalleryAppDefinition = defineApp({
	id: 'SecureGallery',
	title: 'NC — Галерея: чувствительный контент',
	businessGoal:
		'Показывать медиатеку и скрывать чувствительные фото под шумом и частицами до ввода код-пароля.',
	flows: [
		defineFlow({
			id: 'photo-browser',
			title: 'Медиатека',
			businessGoal: 'Просматривать фотографии и альбомы, защищая конфиденциальные снимки.',
			screens: [
				defineScreen({
					id: 'all',
					title: 'Все фото',
					scenario: 'browse',
					businessGoal:
						'Показать сетку фото, скрытые чувствительные снимки и вход в просмотрщик с код-паролем.',
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
