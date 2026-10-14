import { defineApp, defineFlow, defineScreen } from '../definition';
import { AlbumsScreen } from './albums';
import { GalleryScreen } from './screen';

export const gallery3AppDefinition = defineApp({
	id: 'Gallery3',
	title: 'Галерея 3',
	businessGoal: 'Просматривать медиатеку в полноэкранной сетке с управляемой плотностью.',
	flows: [
		defineFlow({
			id: 'photo-browser',
			title: 'Медиатека',
			businessGoal: 'Быстро менять масштаб сетки и переходить между фотографиями и альбомами.',
			screens: [
				defineScreen({
					id: 'all',
					title: 'Все фото',
					scenario: 'browse',
					businessGoal: 'Просматривать все фотографии в полноэкранной адаптивной сетке.',
					Component: GalleryScreen,
				}),
				defineScreen({
					id: 'albums',
					title: 'Альбомы',
					scenario: 'browse',
					businessGoal: 'Открывать тематические подборки фотографий.',
					Component: AlbumsScreen,
				}),
			],
		}),
	],
});
