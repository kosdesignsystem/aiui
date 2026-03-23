import { useMemo, useState } from 'react';
import {
	defaultPasswordOptions,
	generatePassword,
	PasswordOptions,
	securityLevelPresets,
	SecurityLevel,
} from './model';
import {
	PasswordGeneratorScreen,
	PasswordSheetDraft,
	PasswordTab,
	SavedPasswordItem,
} from './screen';

const emptyDraft: PasswordSheetDraft = {
	password: '',
	login: '',
	service: '',
};

export default function PasswordGeneratorMainPage() {
	const [options, setOptions] = useState<PasswordOptions>(defaultPasswordOptions);
	const [refreshKey, setRefreshKey] = useState(0);
	const [copyLabel, setCopyLabel] = useState('Копировать');
	const [activeTab, setActiveTab] = useState<PasswordTab>('generate');
	const [savedPasswords, setSavedPasswords] = useState<SavedPasswordItem[]>([]);
	const [sheetDraft, setSheetDraft] = useState<PasswordSheetDraft>(emptyDraft);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const password = useMemo(() => generatePassword(options), [options, refreshKey]);

	const handleToggleOption = (option: keyof Omit<PasswordOptions, 'length'>) => {
		setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
	};

	const copyToClipboard = async (value: string) => {
		if (!value) {
			return;
		}

		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(value);
		} else {
			const textarea = document.createElement('textarea');
			textarea.value = value;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
		}
	};

	const handleCopyPassword = async () => {
		await copyToClipboard(password);
		setCopyLabel('Скопировано');
		window.setTimeout(() => setCopyLabel('Копировать'), 1400);
	};

	const handleApplySecurityLevel = (level: SecurityLevel) => {
		setOptions(securityLevelPresets[level]);
	};

	const handleOpenCreateSheet = () => {
		if (!password) {
			return;
		}

		setSheetDraft({
			password,
			login: '',
			service: '',
		});
		setIsSheetOpen(true);
	};

	const handleOpenEditSheet = (id: string) => {
		const item = savedPasswords.find((entry) => entry.id === id);
		if (!item) {
			return;
		}

		setSheetDraft(item);
		setIsSheetOpen(true);
	};

	const handleSubmitSheet = () => {
		if (!sheetDraft.password) {
			return;
		}

		setSavedPasswords((prev) => {
			if (sheetDraft.id) {
				return prev.map((entry) => (entry.id === sheetDraft.id ? { ...sheetDraft, id: sheetDraft.id } : entry));
			}

			return [{ ...sheetDraft, id: `password-${Date.now()}` }, ...prev];
		});
		setIsSheetOpen(false);
	};

	return (
		<PasswordGeneratorScreen
			password={password}
			options={options}
			copyLabel={copyLabel}
			activeTab={activeTab}
			savedPasswords={savedPasswords}
			sheetDraft={sheetDraft}
			isSheetOpen={isSheetOpen}
			onLengthChange={(length) => setOptions((prev) => ({ ...prev, length }))}
			onToggleOption={handleToggleOption}
			onRegenerate={() => setRefreshKey((prev) => prev + 1)}
			onCopyPassword={() => void handleCopyPassword()}
			onApplySecurityLevel={handleApplySecurityLevel}
			onTabChange={setActiveTab}
			onOpenCreateSheet={handleOpenCreateSheet}
			onOpenEditSheet={handleOpenEditSheet}
			onSheetChange={(patch) => setSheetDraft((prev) => ({ ...prev, ...patch }))}
			onSheetClose={() => setIsSheetOpen(false)}
			onSheetSubmit={handleSubmitSheet}
		/>
	);
}
