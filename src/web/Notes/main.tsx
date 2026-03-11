import { NotesListScreen } from './screen';
import { getNotesByFilter, notesSeed } from './model';

export default function NotesMainPage() {
	return <NotesListScreen filter="all" notes={getNotesByFilter(notesSeed, 'all')} />;
}
