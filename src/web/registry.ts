import { componentsAppDefinition } from './Components';
import { testAppDefinition } from './Test';

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
	testAppDefinition,
	componentsAppDefinition,
];
