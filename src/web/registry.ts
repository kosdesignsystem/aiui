import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { cameraAppDefinition } from './Camera';
import { voiceControlAppDefinition } from './VoiceControl';

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
	voiceControlAppDefinition,
	cameraAppDefinition,
];
