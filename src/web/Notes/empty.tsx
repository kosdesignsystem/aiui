import { NotesListScreen } from './screen';

export default function NotesEmptyPage() {
	return <NotesListScreen filter="all" notes={[]} />;
}
