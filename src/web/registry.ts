import CallsMainPage from './Calls/main';
import CallsMissedPage from './Calls/missed';
import CallsSearchPage from './Calls/search';
import CallsDialpadPage from './Calls/dialpad';
import { componentsAppDefinition } from './Components';
import OfflineTransferMainPage from './OfflineTransfer/main';
import NikitaMainPage from './Nikita/main';
import PasswordGeneratorMainPage from './PasswordGenerator/main';
import SecureByUIMainPage from './SecureByUI/main';
import SecureByUIPolicyPage from './SecureByUI/policy';
import SecureByUIWifiPage from './SecureByUI/wifi';
import { defineApp, defineFlow, defineScreen } from './definition';

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

const nikitaAppDefinition = defineApp({
	id: 'Nikita',
	title: 'Никита',
	businessGoal: 'Показать минимальное мобильное приложение с красным фоном.',
	flows: [
		defineFlow({
			id: 'main',
			title: 'Основной сценарий',
			businessGoal: 'Открыть главный экран приложения.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Показать полноэкранный красный фон.',
					Component: NikitaMainPage,
				}),
			],
		}),
	],
});

const offlineTransferAppDefinition = defineApp({
	id: 'OfflineTransfer',
	title: 'Offline Transfer',
	businessGoal: 'Preview a premium offline mode and local network transfer dashboard.',
	flows: [
		defineFlow({
			id: 'local-network',
			title: 'Local Network',
			businessGoal: 'Show network activity while cloud connectivity is unavailable.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Network Activity',
					scenario: 'preview',
					businessGoal: 'Show offline mode status, local transfer progress, and secure mesh activity.',
					Component: OfflineTransferMainPage,
				}),
			],
		}),
	],
});

const callsAppDefinition = defineApp({
	id: 'Calls',
	title: 'Звонки',
	businessGoal: 'Проверять сценарии звонков и быстрых действий.',
	flows: [
		defineFlow({
			id: 'calls',
			title: 'Звонки',
			businessGoal: 'Показать ключевые состояния приложения звонков.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'browse',
					businessGoal: 'Показать основной список звонков.',
					Component: CallsMainPage,
				}),
				defineScreen({
					id: 'missed',
					title: 'Пропущенные',
					scenario: 'browse',
					businessGoal: 'Показать список пропущенных звонков.',
					Component: CallsMissedPage,
				}),
				defineScreen({
					id: 'search',
					title: 'Поиск',
					scenario: 'search',
					businessGoal: 'Показать поиск по звонкам.',
					Component: CallsSearchPage,
				}),
				defineScreen({
					id: 'dialpad',
					title: 'Набор',
					scenario: 'preview',
					businessGoal: 'Показать экран набора номера с тактильной клавиатурой.',
					Component: CallsDialpadPage,
				}),
			],
		}),
	],
});

const secureByUIAppDefinition = defineApp({
	id: 'SecureByUI',
	title: 'Secure by UI',
	businessGoal: 'Проверять сценарии безопасности и политик.',
	flows: [
		defineFlow({
			id: 'secure-by-ui',
			title: 'Secure by UI',
			businessGoal: 'Показать основные состояния Secure by UI.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'browse',
					businessGoal: 'Показать основной экран безопасности.',
					Component: SecureByUIMainPage,
				}),
				defineScreen({
					id: 'policy',
					title: 'Шторка политики',
					scenario: 'inspect',
					businessGoal: 'Показать детали политики.',
					Component: SecureByUIPolicyPage,
				}),
				defineScreen({
					id: 'wifi',
					title: 'Wi-Fi экран',
					scenario: 'inspect',
					businessGoal: 'Показать настройки Wi-Fi.',
					Component: SecureByUIWifiPage,
				}),
			],
		}),
	],
});

const passwordGeneratorAppDefinition = defineApp({
	id: 'PasswordGenerator',
	title: 'Генератор паролей',
	businessGoal: 'Проверять генерацию и настройку паролей.',
	flows: [
		defineFlow({
			id: 'password-generator',
			title: 'Генератор паролей',
			businessGoal: 'Показать основной сценарий генерации пароля.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Показать главный экран генератора.',
					Component: PasswordGeneratorMainPage,
				}),
			],
		}),
	],
});

export const appRegistry = [
	nikitaAppDefinition,
	offlineTransferAppDefinition,
	componentsAppDefinition,
	callsAppDefinition,
	secureByUIAppDefinition,
	passwordGeneratorAppDefinition,
];
