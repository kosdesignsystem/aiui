import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { SearchBar } from '../../ui/SearchBar';
import { View } from '../../ui/View';
import { FilesFolderTone, FilesRecentKind, filesFolders, filesRecent } from './model';
import './screen.scss';

function RowAction({ label }: { label: string }) {
	return (
		<button type="button" className="files-row__action" aria-label={label}>
			<Icon name="more-horizontal" width={20} height={20} alt="" aria-hidden="true" />
		</button>
	);
}

function FolderIcon({ tone }: { tone: FilesFolderTone }) {
	return <span className={`files-folder-icon files-folder-icon--${tone}`} aria-hidden="true" />;
}

function FileIcon({ kind }: { kind: FilesRecentKind }) {
	if (kind === 'html') {
		return (
			<span className={`files-file-icon files-file-icon--${kind}`} aria-hidden="true">
				<Icon name="language" width={18} height={18} alt="" aria-hidden="true" />
			</span>
		);
	}

	return (
		<span className={`files-file-icon files-file-icon--${kind}`} aria-hidden="true">
			{kind === 'pdf' ? 'PDF' : 'W'}
		</span>
	);
}

export function FilesMainScreen() {
	return (
		<App>
			<div className="files-screen">
				<Header title="Файлы" />

				<View>
					<div className="files-screen__content">
						<section className="files-section" aria-label="Папки">
							<Text as="p" variant="regular-24" color="secondary">
								Папки
							</Text>

							<div className="files-section__rows">
								{filesFolders.map((folder) => (
									<div key={folder.id} className="files-row">
										<FolderIcon tone={folder.tone} />

										<div className="files-row__meta">
											<Text as="p" variant="regular-20" color="primary">
												{folder.name}
											</Text>
										</div>

										<RowAction label={`Действия: ${folder.name}`} />
									</div>
								))}
							</div>
						</section>

						<section className="files-section" aria-label="Недавние">
							<Text as="p" variant="regular-24" color="secondary">
								Недавние
							</Text>

							<div className="files-section__rows">
								{filesRecent.map((file) => (
									<div key={file.id} className="files-row">
										<FileIcon kind={file.kind} />

										<div className="files-row__meta">
											<Text as="p" variant="regular-20" color="primary">
												{file.name}
											</Text>

											<Text as="p" variant="regular-16" color="secondary">
												{file.size}
											</Text>
										</div>

										<RowAction label={`Действия: ${file.name}`} />
									</div>
								))}
							</div>
						</section>
					</div>
				</View>

				<div className="files-screen__search">
					<SearchBar placeholder="Поиск" aria-label="Поиск файлов" readOnly />
				</div>
			</div>
		</App>
	);
}
