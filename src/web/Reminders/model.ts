export type ReminderTask = {
	id: string;
	title: string;
	timeLabel: string;
	details: string;
	done: boolean;
};

export const remindersSeed: ReminderTask[] = [
	{
		id: 'grape-1',
		title: 'Подготовить место для винограда',
		timeLabel: 'Сегодня, 09:00',
		details: 'Выбрать солнечный участок и проверить, чтобы не было застоя воды.',
		done: false,
	},
	{
		id: 'grape-2',
		title: 'Подготовить посадочные ямы',
		timeLabel: 'Сегодня, 12:30',
		details: 'Выкопать ямы 60×60 см, добавить дренаж и плодородную смесь.',
		done: false,
	},
	{
		id: 'grape-3',
		title: 'Посадить саженцы винограда',
		timeLabel: 'Завтра, 08:00',
		details: 'Расположить корни, присыпать грунтом и сформировать поливочный круг.',
		done: false,
	},
	{
		id: 'grape-4',
		title: 'Полить и замульчировать посадки',
		timeLabel: 'Завтра, 18:00',
		details: 'Сделать обильный полив и укрыть почву мульчей для сохранения влаги.',
		done: true,
	},
];
