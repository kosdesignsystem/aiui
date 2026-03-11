export type NotesFilter = 'all' | 'favorites';

export type NoteEntry = {
	id: string;
	title: string;
	preview: string;
	dateLabel: string;
	favorite: boolean;
};

export const notesRoutes = {
	empty: '/app/Notes/empty',
	main: '/app/Notes/main',
	favorites: '/app/Notes/favorites',
	create: '/app/Notes/create',
} as const;

export const notesFilterTabs = [
	{ id: 'all', label: 'Все' },
	{ id: 'favorites', label: 'Избранные' },
] as const;

export const notesSeed: NoteEntry[] = [
	{
		id: 'note-1',
		title: 'Вопросы для интервью',
		preview: 'Чему прокачаться за последний год. Основные скиллы которые приобрел.',
		dateLabel: '22 июня',
		favorite: false,
	},
	{
		id: 'note-2',
		title: 'Алексей 26 руководитель направления',
		preview: 'Список задач, действительно разнообразный исходя из этого нам важно.',
		dateLabel: '12 мая',
		favorite: true,
	},
	{
		id: 'note-3',
		title: 'Без названия',
		preview: 'Разбор кейсов. Обратного планирования.',
		dateLabel: '01 апр.',
		favorite: true,
	},
	{
		id: 'note-4',
		title: 'Полезные ссылки',
		preview: 'https://uxdesign.cc/the-12-step-designers-journey-694de2568153',
		dateLabel: '01 апр.',
		favorite: false,
	},
	{
		id: 'note-5',
		title: 'Правки по DS 15 июня',
		preview: 'Проработать темную тему. Разные оттенки. Поменять шапки.',
		dateLabel: '01 апр.',
		favorite: true,
	},
	{
		id: 'note-6',
		title: 'Наташа привет. Принято',
		preview: 'Список задач, действительно разнообразный исходя из этого нам важно.',
		dateLabel: '01 апр.',
		favorite: false,
	},
	{
		id: 'note-7',
		title: 'Telegram: @nikitadizer',
		preview: '',
		dateLabel: '01 апр.',
		favorite: false,
	},
];

export function getNotesByFilter(notes: NoteEntry[], filter: NotesFilter) {
	if (filter === 'favorites') {
		return notes.filter((note) => note.favorite);
	}

	return notes;
}
