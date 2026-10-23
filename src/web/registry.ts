import { componentsAppDefinition } from './Components';
import { sashaAppDefinition } from './Sasha';
import { testAppDefinition } from './Test';
import { galleryAppDefinition } from './Gallery';

export {
	createAppScreenPath,
	findAppScreen,
	flattenAppScreens,
	getDefaultAppScreenPath,
	type AppDefinition,
	type AppFlowDefinition,
	type AppScreenDefinition,
	type AppScreenEntry,
	type ScreenScenario,
} from './definition';

export const appRegistry = [
	sashaAppDefinition,
	testAppDefinition,
	galleryAppDefinition,
	componentsAppDefinition,
];
