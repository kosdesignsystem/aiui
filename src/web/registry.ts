import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { alertAppDefinition } from './Alert';
import { securityAppDefinition } from './Security';

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
	alertAppDefinition,
	securityAppDefinition,
];
