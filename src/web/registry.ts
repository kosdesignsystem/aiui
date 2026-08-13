import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { contactsAppDefinition } from './Contacts';
import { galleryAppDefinition } from './Gallery';
import { remindersAppDefinition } from './Reminders';
import { radioAppDefinition } from './Radio';

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
	radioAppDefinition,
	contactsAppDefinition,
	componentsAppDefinition,
	callsAppDefinition,
	galleryAppDefinition,
	remindersAppDefinition,
];
