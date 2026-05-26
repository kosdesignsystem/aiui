import { defineApp, defineFlow, defineScreen } from '../definition';
import { ContactsScreen } from './screen';

const contactsMainScreen = () => <ContactsScreen />;

export const contactsAppDefinition = defineApp({
	id: 'Contacts',
	title: 'Контакты',
	businessGoal: 'Показать концепт картотеки контактов с физическими каталогами.',
	flows: [
		defineFlow({
			id: 'card-catalog',
			title: 'Картотека',
			businessGoal: 'Дать ощущение живой стопки каталогов и мягкой работы с выбранными людьми.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Картотека',
					scenario: 'browse',
					businessGoal: 'Визуальный концепт контактов с каталогами Организация, Избранные и Все.',
					Component: contactsMainScreen,
				}),
			],
		}),
	],
});
