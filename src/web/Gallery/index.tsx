import { defineApp, defineFlow, defineScreen } from '../definition';
import { GalleryScreen } from './screen';

export const galleryAppDefinition = defineApp({
	id: 'Gallery',
	title: 'Галерея',
	businessGoal: 'Показывать медиатеку и переводить пользователя в режим просмотра снимка.',
	flows: [
		defineFlow({
			id: 'photo-browser',
			title: 'Просмотр фотографий',
			businessGoal: 'Один сценарий: выбрать фото в сетке и открыть полноэкранный просмотр.',
			screens: [
				defineScreen({
					id: 'all',
					title: 'Все фото',
					scenario: 'browse',
					businessGoal: 'Показать сетку фотографий и вход в просмотрщик.',
					Component: GalleryScreen,
				}),
			],
		}),
	],
});
