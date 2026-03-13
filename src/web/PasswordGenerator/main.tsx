import { useMemo, useState } from 'react';
import { defaultPasswordOptions, generatePassword, PasswordOptions } from './model';
import { PasswordGeneratorScreen } from './screen';

export default function PasswordGeneratorMainPage() {
	const [options, setOptions] = useState<PasswordOptions>(defaultPasswordOptions);
	const [refreshKey, setRefreshKey] = useState(0);
	const [copyLabel, setCopyLabel] = useState('Копировать');

	const password = useMemo(() => generatePassword(options), [options, refreshKey]);

	const handleToggleOption = (option: keyof Omit<PasswordOptions, 'length'>) => {
		setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
	};

	const handleCopyPassword = async () => {
		if (!password) {
			return;
		}

		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(password);
		} else {
			const textarea = document.createElement('textarea');
			textarea.value = password;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
		}

		setCopyLabel('Скопировано');
		window.setTimeout(() => setCopyLabel('Копировать'), 1400);
	};

	return (
		<PasswordGeneratorScreen
			password={password}
			options={options}
			onLengthChange={(length) => setOptions((prev) => ({ ...prev, length }))}
			onToggleOption={handleToggleOption}
			onRegenerate={() => setRefreshKey((prev) => prev + 1)}
			onCopyPassword={() => void handleCopyPassword()}
			copyLabel={copyLabel}
		/>
	);
}
