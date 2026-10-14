import type { IconName } from '../../ui/Icon';
import { createAppScreenPath } from '../definition';

export const CONTACTS_APP_ID = 'Contacts';

export type ContactCatalogId =
	| 'organization'
	| 'favorites'
	| 'all'
	| 'blocked'
	| 'recent';

export type ContactEntry = {
	id: string;
	name: string;
	role?: string;
	group: string;
	initials: string;
	tone: 'blue' | 'green' | 'rose' | 'amber' | 'violet' | 'graphite';
	favorite?: boolean;
	organization?: boolean;
	blocked?: boolean;
	recent?: boolean;
};

export type ContactCatalog = {
	id: ContactCatalogId;
	title: string;
	count: number;
	icon: IconName;
	contactIds: string[];
};

export const contactsRoutes = {
	main: createAppScreenPath(CONTACTS_APP_ID, 'main'),
} as const;

export const contacts: ContactEntry[] = [
	{
		id: 'alexander-kogan',
		name: 'Александр Коган',
		role: 'Product Design Lead',
		group: 'А',
		initials: 'АК',
		tone: 'blue',
		favorite: true,
		organization: true,
		recent: true,
	},
	{
		id: 'alexey-m',
		name: 'Алексей М.',
		role: 'Design Systems',
		group: 'А',
		initials: 'АМ',
		tone: 'graphite',
		organization: true,
	},
	{
		id: 'boris-ivanov',
		name: 'Борис Иванов',
		role: 'Senior Developer',
		group: 'Б',
		initials: 'БИ',
		tone: 'green',
		favorite: true,
		organization: true,
		recent: true,
	},
	{
		id: 'bronckina',
		name: 'Бронкина Оксана',
		role: 'HR Partner',
		group: 'Б',
		initials: 'БО',
		tone: 'rose',
		organization: true,
	},
	{
		id: 'boris',
		name: 'Борис',
		role: 'Личный контакт',
		group: 'Б',
		initials: 'Б',
		tone: 'amber',
		favorite: true,
		recent: true,
	},
	{
		id: 'veronika',
		name: 'Вероника Николаевна',
		role: 'Finance',
		group: 'В',
		initials: 'ВН',
		tone: 'violet',
		organization: true,
	},
	{
		id: 'vasily',
		name: 'Василий Петрович',
		role: 'Office',
		group: 'В',
		initials: 'ВП',
		tone: 'blue',
		organization: true,
	},
	{
		id: 'daria',
		name: 'Дарья',
		role: 'Мобильный',
		group: 'Д',
		initials: 'Д',
		tone: 'rose',
		recent: true,
	},
	{
		id: 'digital-service',
		name: 'Диджитал сервис',
		role: 'Служебный номер',
		group: 'Д',
		initials: 'ДС',
		tone: 'graphite',
		blocked: true,
	},
	{
		id: 'elena-smirnova',
		name: 'Елена Смирнова',
		role: 'Account Manager',
		group: 'Е',
		initials: 'ЕС',
		tone: 'green',
	},
	{
		id: 'igor-volkov',
		name: 'Игорь Волков',
		role: 'Backend Engineer',
		group: 'И',
		initials: 'ИВ',
		tone: 'blue',
	},
	{
		id: 'irina-belova',
		name: 'Ирина Белова',
		role: 'Project Manager',
		group: 'И',
		initials: 'ИБ',
		tone: 'rose',
	},
	{
		id: 'kirill-orlov',
		name: 'Кирилл Орлов',
		role: 'QA Lead',
		group: 'К',
		initials: 'КО',
		tone: 'amber',
	},
	{
		id: 'maria-kuznetsova',
		name: 'Мария Кузнецова',
		role: 'Marketing',
		group: 'М',
		initials: 'МК',
		tone: 'violet',
	},
	{
		id: 'nikita-sokolov',
		name: 'Никита Соколов',
		role: 'Frontend Engineer',
		group: 'Н',
		initials: 'НС',
		tone: 'graphite',
	},
	{
		id: 'olga-morozova',
		name: 'Ольга Морозова',
		role: 'Legal',
		group: 'О',
		initials: 'ОМ',
		tone: 'green',
	},
	{
		id: 'pavel-egorov',
		name: 'Павел Егоров',
		role: 'DevOps',
		group: 'П',
		initials: 'ПЕ',
		tone: 'blue',
	},
	{
		id: 'sergey-fedorov',
		name: 'Сергей Федоров',
		role: 'Data Analyst',
		group: 'С',
		initials: 'СФ',
		tone: 'amber',
	},
	{
		id: 'sofia-lebedeva',
		name: 'София Лебедева',
		role: 'UX Researcher',
		group: 'С',
		initials: 'СЛ',
		tone: 'rose',
	},
	{
		id: 'timur-ahmetov',
		name: 'Тимур Ахметов',
		role: 'Support',
		group: 'Т',
		initials: 'ТА',
		tone: 'violet',
	},
	{
		id: 'yulia-romanova',
		name: 'Юлия Романова',
		role: 'Operations',
		group: 'Ю',
		initials: 'ЮР',
		tone: 'graphite',
	},
];

const allContactIds = contacts.map((contact) => contact.id);

export const contactCatalogs: ContactCatalog[] = [
	{
		id: 'organization',
		title: 'Организация',
		count: 201,
		icon: 'folder-outline',
		contactIds: contacts.filter((contact) => contact.organization).map((contact) => contact.id),
	},
	{
		id: 'favorites',
		title: 'Избранное',
		count: 24,
		icon: 'star-100',
		contactIds: contacts.filter((contact) => contact.favorite).map((contact) => contact.id),
	},
	{
		id: 'all',
		title: 'Все',
		count: 842,
		icon: 'persone-group-outline',
		contactIds: allContactIds,
	},
	{
		id: 'blocked',
		title: 'Заблокированные',
		count: 9,
		icon: 'block',
		contactIds: contacts.filter((contact) => contact.blocked).map((contact) => contact.id),
	},
	{
		id: 'recent',
		title: 'Недавние',
		count: 17,
		icon: 'arrow-history',
		contactIds: contacts.filter((contact) => contact.recent).map((contact) => contact.id),
	},
];

export function getContactsByIds(ids: string[]) {
	const contactsById = new Map(contacts.map((contact) => [contact.id, contact]));

	return ids
		.map((id) => contactsById.get(id))
		.filter((contact): contact is ContactEntry => Boolean(contact));
}
