import { createAppScreenPath } from '../definition';

export const GALLERY3_APP_ID = 'Gallery3';

export const gallery3Routes = {
	all: createAppScreenPath(GALLERY3_APP_ID, 'all'),
	albums: createAppScreenPath(GALLERY3_APP_ID, 'albums'),
} as const;
