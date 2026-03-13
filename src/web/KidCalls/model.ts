import momPhoto from '../../assets/kid_calls/mom.svg';
import dadPhoto from '../../assets/kid_calls/dad.svg';
import grandmaPhoto from '../../assets/kid_calls/grandma.svg';
import petyaPhoto from '../../assets/kid_calls/petya.svg';

export type FamilyContact = {
	id: string;
	name: string;
	emoji: string;
	color: string;
	photo: string;
};

export type ChatMessage = {
	id: string;
	from: 'child' | 'contact';
	text: string;
	time: string;
};

export const familyContacts: FamilyContact[] = [
	{ id: 'mom', name: 'Мама', emoji: '👩', color: '#ff5da2', photo: momPhoto },
	{ id: 'dad', name: 'Папа', emoji: '👨', color: '#4da6ff', photo: dadPhoto },
	{ id: 'grandma', name: 'Бабушка', emoji: '👵', color: '#9f74ff', photo: grandmaPhoto },
	{ id: 'petya', name: 'Петя', emoji: '🧒', color: '#55d3ae', photo: petyaPhoto },
];

export const chatByContact: Record<string, ChatMessage[]> = {
	mom: [
		{ id: 'm1', from: 'contact', text: 'Привет, солнышко! Как дела?', time: '15:12' },
		{ id: 'm2', from: 'child', text: 'Хорошо 😊', time: '15:13' },
	],
	dad: [
		{ id: 'd1', from: 'contact', text: 'Я уже еду домой', time: '16:45' },
		{ id: 'd2', from: 'child', text: 'Жду тебя!', time: '16:46' },
	],
	grandma: [{ id: 'g1', from: 'contact', text: 'Почитаем сказку вечером?', time: '18:10' }],
	petya: [{ id: 'p1', from: 'contact', text: 'Пойдём гулять завтра?', time: '14:01' }],
};
