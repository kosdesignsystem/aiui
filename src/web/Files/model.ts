export type FilesFolderTone = 'blue' | 'gray';

export type FilesFolderItem = {
	id: string;
	name: string;
	tone: FilesFolderTone;
};

export type FilesRecentKind = 'pdf' | 'html' | 'word';

export type FilesRecentItem = {
	id: string;
	name: string;
	size: string;
	kind: FilesRecentKind;
};

export const filesFolders: FilesFolderItem[] = [
	{ id: 'plain-folder', name: 'Просто папка', tone: 'blue' },
	{ id: 'documents-folder', name: 'Документы', tone: 'blue' },
	{ id: 'deleted-folder', name: 'Удаленные', tone: 'gray' },
];

export const filesRecent: FilesRecentItem[] = [
	{ id: 'screen-pdf', name: 'Снимок экрана 2025-03...', size: '906 КБ', kind: 'pdf' },
	{ id: 'index-html', name: '1.html', size: '23 КБ', kind: 'html' },
	{ id: 'patent-1', name: 'Заявка на патент_Дизай...', size: '1 МБ', kind: 'word' },
	{ id: 'patent-2', name: 'Заявка на патент_Дизай...', size: '1 МБ', kind: 'word' },
];
