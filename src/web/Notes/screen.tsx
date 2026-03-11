import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { SearchBar } from '../../ui/SearchBar';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { View } from '../../ui/View';
import { NoteEntry, NotesFilter, notesFilterTabs, notesRoutes } from './model';
import './notes.scss';

type NotesListScreenProps = {
	filter: NotesFilter;
	notes: NoteEntry[];
};

function NotesRow({ note, onOpen }: { note: NoteEntry; onOpen: () => void }) {
	return (
		<Cell
			onClick={onOpen}
			title={
				<div className="notes-row__title-wrap">
					<Text variant="medium-18" color="primary">
						<span className="notes-row__title">{note.title}</span>
					</Text>
				</div>
			}
			subtitle={
				note.preview ? (
					<Text variant="regular-14" color="secondary">
						<span className="notes-row__preview">{note.preview}</span>
					</Text>
				) : undefined
			}
			trailing={
				<Text variant="regular-12" color="secondary">
					{note.dateLabel}
				</Text>
			}
		/>
	);
}

export function NotesListScreen({ filter, notes }: NotesListScreenProps) {
	const navigate = useNavigate();
	const visibleNotes = useMemo(() => notes, [notes]);
	const emptyLabel = filter === 'favorites' ? 'Нет избранных заметок' : 'Нет заметок';

	return (
		<App>
			<div className="notes-screen">
				<Header
					title="Заметки"
					button={
						<IconButton
							type="button"
							size={44}
							variant="secondary"
							aria-label="Меню"
						>
							<Icon name="more-vertical" alt="" width={24} height={24} aria-hidden="true" />
						</IconButton>
					}
				/>

				<div className="notes-screen__search">
					<SearchBar placeholder="Поиск" aria-label="Поиск заметок" />
				</div>

				<SegmentedTabs
					tabs={notesFilterTabs}
					value={filter}
					onChange={(tabId) =>
						navigate(tabId === 'favorites' ? notesRoutes.favorites : notesRoutes.main)
					}
				/>

				<View>
					{visibleNotes.length === 0 ? (
						<div className="notes-screen__empty">
							<Text variant="regular-20" color="secondary">
								{emptyLabel}
							</Text>
						</div>
					) : (
						<ListContainer>
							<List>
								{visibleNotes.map((note) => (
									<NotesRow
										key={note.id}
										note={note}
										onOpen={() => navigate(notesRoutes.create)}
									/>
								))}
							</List>
						</ListContainer>
					)}
				</View>

				<div className="notes-screen__fab">
					<IconButton
						type="button"
						size={52}
						aria-label="Создать заметку"
						onClick={() => navigate(notesRoutes.create)}
					>
						<Icon name="add" alt="" width={22} height={22} aria-hidden="true" />
					</IconButton>
				</div>
			</div>
		</App>
	);
}

type MarkButton = {
	id: 'bold' | 'italic' | 'underline' | 'strikethrough';
	label: string;
};

const markButtons: MarkButton[] = [
	{ id: 'bold', label: 'Жирный' },
	{ id: 'italic', label: 'Курсив' },
	{ id: 'underline', label: 'Подчеркивание' },
	{ id: 'strikethrough', label: 'Зачеркивание' },
];

export function NotesCreateScreen() {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [activeMarks, setActiveMarks] = useState<Set<MarkButton['id']>>(new Set(['italic']));

	const toggleMark = (markId: MarkButton['id']) => {
		setActiveMarks((prev) => {
			const next = new Set(prev);
			if (next.has(markId)) {
				next.delete(markId);
			} else {
				next.add(markId);
			}
			return next;
		});
	};

	return (
		<App>
			<div className="note-editor">
				<div className="note-editor__toolbar">
					<IconButton
						type="button"
						size={44}
						variant="secondary"
						aria-label="Назад"
						onClick={() => navigate(-1)}
					>
						<Icon name="arrow-left" alt="" width={24} height={24} aria-hidden="true" />
					</IconButton>

					<div className="note-editor__toolbar-actions">
						<IconButton type="button" size={44} variant="secondary" aria-label="Отменить">
							<Icon name="undo" alt="" width={22} height={22} aria-hidden="true" />
						</IconButton>
						<IconButton
							type="button"
							size={44}
							variant="secondary"
							aria-label="Повторить"
						>
							<Icon name="redo" alt="" width={22} height={22} aria-hidden="true" />
						</IconButton>
						<IconButton
							type="button"
							size={44}
							variant="secondary"
							aria-label="Меню"
						>
							<Icon name="more-vertical" alt="" width={22} height={22} aria-hidden="true" />
						</IconButton>
					</div>
				</div>

				<div className="note-editor__meta">
					<Text variant="regular-14" color="secondary">
						7 июня 2021 г. в 17:45
					</Text>
				</div>

				<div className="note-editor__title">
					<SearchBar
						hideSearchIcon
						type="text"
						placeholder="Название"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						aria-label="Название заметки"
					/>
				</div>

				<div className="note-editor__body">
					<textarea
						className="note-editor__textarea"
						value={content}
						onChange={(event) => setContent(event.target.value)}
						placeholder=""
						aria-label="Текст заметки"
					/>
				</div>

				<div className="note-editor__formatting" role="toolbar" aria-label="Форматирование">
					{markButtons.map((button) => (
						<Button
							key={button.id}
							type="button"
							size={32}
							variant={activeMarks.has(button.id) ? 'primary' : 'secondary'}
							onClick={() => toggleMark(button.id)}
							aria-label={button.label}
						>
							<Icon name={button.id} alt="" width={16} height={16} aria-hidden="true" />
						</Button>
					))}
				</div>
			</div>
		</App>
	);
}
