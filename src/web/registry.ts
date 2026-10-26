import { callsAppDefinition } from './Calls';
import { componentsAppDefinition } from './Components';
import { contactsAppDefinition } from './Contacts';
import { galleryAppDefinition } from './Gallery';
import { gallery2AppDefinition } from './Gallery2';
import { gallery3AppDefinition } from './Gallery3';
import { galleryCatalogAppDefinition } from './GalleryCatalog';
import { loadingAppDefinition } from './LoadingApp';
import { myPhoneAppDefinition } from './MyPhone';
import { remindersAppDefinition } from './Reminders';
import { voiceAssistantAppDefinition } from './VoiceAssistant/definition';
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
	myPhoneAppDefinition,
	contactsAppDefinition,
	componentsAppDefinition,
	callsAppDefinition,
	galleryAppDefinition,
	gallery2AppDefinition,
	gallery3AppDefinition,
	galleryCatalogAppDefinition,
	loadingAppDefinition,
	remindersAppDefinition,
	testAppDefinition,
	voiceAssistantAppDefinition,
];
