import { NotesListScreen } from './screen';
import { getNotesByFilter, notesSeed } from './model';

export default function NotesFavoritesPage() {
	return <NotesListScreen filter="favorites" notes={getNotesByFilter(notesSeed, 'favorites')} />;
}
