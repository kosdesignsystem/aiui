import type { IconName } from '../../ui/Icon';

export type CallsFilter = 'all' | 'missed';

export type CallDirection = 'incoming' | 'outgoing' | 'missed';

export type CallsNavItem = {
	id: string;
	label: string;
	icon: IconName;
	path?: string;
};

export type CallLogEntry = {
	id: string;
	contact: string;
	timeLabel: string;
	direction: CallDirection;
	group: 'today' | 'earlier';
	repeats?: number;
};

export const callsRoutes = {
	main: '/app/Calls/main',
	missed: '/app/Calls/missed',
	search: '/app/Calls/search',
	dialpad: '/app/Calls/dialpad',
} as const;

export const callsFilterTabs = [
	{ id: 'all', label: 'Все' },
	{ id: 'missed', label: 'Пропущенные' },
] as const;

export const callsNavItems: CallsNavItem[] = [
	{ id: 'calls', label: 'Вызовы', icon: 'phone', path: callsRoutes.main },
	{ id: 'contacts', label: 'Контакты', icon: 'persone-outline' },
	{ id: 'dialpad', label: 'Набор', icon: 'dialpad', path: callsRoutes.dialpad },
];

export const callsLog: CallLogEntry[] = [
	{
		id: 'call-1',
		contact: '+7 927 238-80-22',
		timeLabel: '23:04',
		direction: 'incoming',
		repeats: 3,
		group: 'today',
	},
	{
		id: 'call-2',
		contact: '+7 931 342-60-31',
		timeLabel: '14:02',
		direction: 'missed',
		group: 'today',
	},
	{
		id: 'call-3',
		contact: 'Константин Петрович',
		timeLabel: '22:00',
		direction: 'outgoing',
		repeats: 2,
		group: 'today',
	},
	{
		id: 'call-4',
		contact: 'Дмитрий Бурдько',
		timeLabel: '18 сентября, 23:04',
		direction: 'incoming',
		group: 'earlier',
	},
	{
		id: 'call-5',
		contact: 'Наталья Юдина',
		timeLabel: '17 сентября, 18:12',
		direction: 'missed',
		group: 'earlier',
	},
	{
		id: 'call-6',
		contact: 'Евгений Романов',
		timeLabel: '12:47',
		direction: 'outgoing',
		group: 'today',
	},
	{
		id: 'call-7',
		contact: '+7 916 445-11-03',
		timeLabel: '11:19',
		direction: 'incoming',
		group: 'today',
	},
	{
		id: 'call-8',
		contact: 'Мария Лебедева',
		timeLabel: '10:05',
		direction: 'missed',
		repeats: 2,
		group: 'today',
	},
	{
		id: 'call-9',
		contact: 'Служба доставки',
		timeLabel: '09:22',
		direction: 'incoming',
		group: 'today',
	},
	{
		id: 'call-10',
		contact: '+7 905 778-34-90',
		timeLabel: 'Вчера, 21:40',
		direction: 'outgoing',
		group: 'earlier',
	},
	{
		id: 'call-11',
		contact: 'Александра Васильева',
		timeLabel: '16 сентября, 09:11',
		direction: 'incoming',
		group: 'earlier',
	},
	{
		id: 'call-12',
		contact: '+7 903 120-55-44',
		timeLabel: '15 сентября, 14:36',
		direction: 'missed',
		group: 'earlier',
	},
	{
		id: 'call-13',
		contact: 'Илья Никифоров',
		timeLabel: '14 сентября, 19:58',
		direction: 'outgoing',
		repeats: 2,
		group: 'earlier',
	},
	{
		id: 'call-14',
		contact: 'Офис',
		timeLabel: '13 сентября, 08:30',
		direction: 'incoming',
		group: 'earlier',
	},
	{
		id: 'call-15',
		contact: 'Неизвестный номер',
		timeLabel: '12 сентября, 22:14',
		direction: 'missed',
		group: 'earlier',
	},
];

export function getCallsByFilter(filter: CallsFilter) {
	if (filter === 'missed') {
		return callsLog.filter((entry) => entry.direction === 'missed');
	}

	return callsLog;
}

export function splitCallsByGroup(calls: CallLogEntry[]) {
	return {
		today: calls.filter((call) => call.group === 'today'),
		earlier: calls.filter((call) => call.group === 'earlier'),
	};
}

const SEARCH_SPECIAL_CHARS = /[\s()+-]+/g;

function normalizeSearchValue(value: string) {
	return value.toLocaleLowerCase('ru-RU').trim();
}

function normalizeCompactSearchValue(value: string) {
	return normalizeSearchValue(value).replace(SEARCH_SPECIAL_CHARS, '');
}

export function searchCalls(calls: CallLogEntry[], rawQuery: string) {
	const query = normalizeSearchValue(rawQuery);
	const compactQuery = normalizeCompactSearchValue(rawQuery);

	if (!query) {
		return [];
	}

	return calls.filter((call) => {
		const contact = normalizeSearchValue(call.contact);
		const compactContact = normalizeCompactSearchValue(call.contact);

		return contact.includes(query) || (compactQuery.length > 0 && compactContact.includes(compactQuery));
	});
}
