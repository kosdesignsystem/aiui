import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { test1NTAppDefinition } from './test1NT';

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
	componentsAppDefinition,
	callsAppDefinition,
	test1NTAppDefinition,
];
