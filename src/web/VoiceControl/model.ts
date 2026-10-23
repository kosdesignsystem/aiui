import type { IconName } from '../../ui/Icon';

export const demoCommands = [
	'Поставь будильник на 7:30',
	'Напомни мне позвонить завтра в 12:00',
	'Включи тёмную тему',
	'Открой настройки',
	'Напиши Анне: буду через 10 минут',
	'Позвони Анне',
	'Какая погода завтра?',
] as const;

export type CommandResult = {
	kind: 'alarm' | 'reminder' | 'theme' | 'app' | 'message' | 'call' | 'weather';
	icon: IconName;
	title: string;
	value: string;
	detail: string;
};

// Pure demo adapter: replace this boundary when real system actions are available.
export function resolveCommand(command: string): CommandResult | null {
	const text = command.toLocaleLowerCase('ru-RU').replace(/ё/g, 'е').trim();
	if (/будильник/.test(text)) {
		const time = text.match(/(?:на\s+)(\d{1,2})[:\s](\d{2})(?!\d)/);
		if (!time || Number(time[1]) > 23 || Number(time[2]) > 59) return null;
		return { kind: 'alarm', icon: 'alarm-clock-outline', title: 'Будильник установлен',
			value: `${time[1].padStart(2, '0')}:${time[2]}`, detail: 'Завтра' };
	}
	if (/напомни.*позвонить.*завтра.*12:00/.test(text)) {
		return { kind: 'reminder', icon: 'calendar-done-outline', title: 'Напоминание создано', value: 'Позвонить', detail: 'Завтра, 12:00' };
	}
	if (/включи.*темную тему/.test(text)) {
		return { kind: 'theme', icon: 'settings-outline', title: 'Настройка применена', value: 'Тёмная тема', detail: 'Демонстрационный режим' };
	}
	if (/открой настройки/.test(text)) {
		return { kind: 'app', icon: 'settings-outline', title: 'Открываю настройки', value: 'Настройки', detail: 'Демонстрация · без перехода' };
	}
	if (/напиши анне\s*:/.test(text)) {
		const message = command.slice(command.indexOf(':') + 1).trim();
		if (!message) return null;
		return { kind: 'message', icon: 'message-outline', title: 'Предпросмотр сообщения', value: 'Анна', detail: message[0].toLocaleUpperCase('ru-RU') + message.slice(1) };
	}
	if (/позвони анне/.test(text)) {
		return { kind: 'call', icon: 'phone-outline', title: 'Демонстрация вызова', value: 'Анна', detail: 'Вызов подготовлен · без звонка' };
	}
	if (/погод.*завтра/.test(text)) {
		return { kind: 'weather', icon: 'cloud', title: 'Погода на завтра', value: '+22°', detail: 'Переменная облачность · демоданные' };
	}
	return null;
}
