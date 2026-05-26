import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { contactsAppDefinition } from './Contacts';
import { galleryAppDefinition } from './Gallery';
import { remindersAppDefinition } from './Reminders';

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
	contactsAppDefinition,
	componentsAppDefinition,
	callsAppDefinition,
	galleryAppDefinition,
	remindersAppDefinition,
];
