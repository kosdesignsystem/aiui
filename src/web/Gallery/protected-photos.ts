// Illustrative Unsplash demo photos, not documentary photos of Beer Party Club.
import type { GalleryPhoto } from './model';
import photo01 from '../../assets/gallery/private-demo/party-01.jpg';
import photo02 from '../../assets/gallery/private-demo/party-02.jpg';
import photo03 from '../../assets/gallery/private-demo/party-03.jpg';
import photo04 from '../../assets/gallery/private-demo/party-04.jpg';
import photo05 from '../../assets/gallery/private-demo/party-05.jpg';
import photo06 from '../../assets/gallery/private-demo/party-06.jpg';
import photo07 from '../../assets/gallery/private-demo/party-07.jpg';
import photo08 from '../../assets/gallery/private-demo/party-08.jpg';
import photo09 from '../../assets/gallery/private-demo/party-09.jpg';
import photo10 from '../../assets/gallery/private-demo/party-10.jpg';
import photo11 from '../../assets/gallery/private-demo/party-11.jpg';
import photo12 from '../../assets/gallery/private-demo/party-12.jpg';

export const privatePhotos: GalleryPhoto[] = [
	{ id: 'private-01', title: 'Общий стол', takenAtLabel: '23 октября 2026 20:01', albumIds: ['object-1'], width: 1000, height: 668, imageSrc: photo01 },
	{ id: 'private-02', title: 'Свет и музыка', takenAtLabel: '23 октября 2026 20:02', albumIds: ['object-1'], width: 1000, height: 750, imageSrc: photo02 },
	{ id: 'private-03', title: 'Танцы у сцены', takenAtLabel: '23 октября 2026 20:03', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo03 },
	{ id: 'private-04', title: 'Вечер в клубе', takenAtLabel: '23 октября 2026 20:04', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo04 },
	{ id: 'private-05', title: 'Тост за команду', takenAtLabel: '23 октября 2026 20:05', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo05 },
	{ id: 'private-06', title: 'Групповое фото', takenAtLabel: '23 октября 2026 20:06', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo06 },
	{ id: 'private-07', title: 'Коллеги за ужином', takenAtLabel: '23 октября 2026 20:07', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo07 },
	{ id: 'private-08', title: 'Разговоры у бара', takenAtLabel: '23 октября 2026 20:08', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo08 },
	{ id: 'private-09', title: 'Праздничное конфетти', takenAtLabel: '23 октября 2026 20:09', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo09 },
	{ id: 'private-10', title: 'Украшения вечеринки', takenAtLabel: '23 октября 2026 20:10', albumIds: ['object-1'], width: 1000, height: 667, imageSrc: photo10 },
	{ id: 'private-11', title: 'Напитки', takenAtLabel: '23 октября 2026 20:11', albumIds: ['object-1'], width: 1000, height: 668, imageSrc: photo11 },
	{ id: 'private-12', title: 'Вечер в баре', takenAtLabel: '23 октября 2026 20:12', albumIds: ['object-1'], width: 1000, height: 750, imageSrc: photo12 },
];
