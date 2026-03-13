export type FamilyContact = {
	id: string;
	name: string;
	relation: string;
	emoji: string;
	color: string;
};

export const familyContacts: FamilyContact[] = [
	{ id: 'mom', name: 'Мама', relation: 'Всегда на связи', emoji: '👩', color: '#FF8FA3' },
	{ id: 'dad', name: 'Папа', relation: 'Позвонить после садика', emoji: '👨', color: '#75A8FF' },
	{ id: 'grandma', name: 'Бабушка', relation: 'Почитать сказку', emoji: '👵', color: '#9E88FF' },
	{ id: 'grandpa', name: 'Дедушка', relation: 'Пожелать спокойной ночи', emoji: '👴', color: '#6FD6AE' },
];

export const safetyActions = [
	{ id: 'voice', label: 'Голосовое', icon: '🎤' },
	{ id: 'video', label: 'Видео', icon: '📹' },
	{ id: 'help', label: 'SOS', icon: '🆘' },
];
