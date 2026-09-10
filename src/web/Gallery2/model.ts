import { createAppScreenPath } from '../definition';

export const GALLERY2_APP_ID = 'Gallery2';

export const gallery2Routes = {
	all: createAppScreenPath(GALLERY2_APP_ID, 'all'),
	albums: createAppScreenPath(GALLERY2_APP_ID, 'albums'),
} as const;
