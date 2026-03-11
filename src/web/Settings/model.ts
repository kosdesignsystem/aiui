export type SettingsItem = {
	id: string;
	icon: string;
	title: string;
	subtitle?: string;
	path?: string;
};

export const settingsRoutes = {
	main: '/app/Settings/main',
	security: '/app/Settings/security',
} as const;

export const connectivityItems: SettingsItem[] = [
	{
		id: 'cellular',
		icon: 'signal-cellular-100',
		title: 'Сотовая связь',
		subtitle: 'MTS',
	},
	{
		id: 'wifi',
		icon: 'wifi',
		title: 'Wi-Fi',
		subtitle: 'KLCorp',
	},
];

export const preferencesItems: SettingsItem[] = [
	{
		id: 'security',
		icon: 'shield',
		title: 'Безопасность',
		subtitle: 'Защита устройства и данных',
		path: settingsRoutes.security,
	},
	{
		id: 'passcode',
		icon: 'pincode',
		title: 'Код-пароль',
	},
	{
		id: 'notifications',
		icon: 'notification-outline',
		title: 'Уведомления',
	},
	{
		id: 'display',
		icon: 'settings-outline',
		title: 'Экран',
	},
	{
		id: 'sound',
		icon: 'speaker',
		title: 'Звук и вибрация',
	},
	{
		id: 'storage',
		icon: 'folder-outline',
		title: 'Память',
	},
];
