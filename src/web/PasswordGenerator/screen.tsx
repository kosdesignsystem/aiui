import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { List, ListContainer } from '../../ui/List';
import { View } from '../../ui/View';
import { PasswordOptions } from './model';
import './screen.scss';

type PasswordGeneratorScreenProps = {
	password: string;
	options: PasswordOptions;
	onLengthChange: (length: number) => void;
	onToggleOption: (option: keyof Omit<PasswordOptions, 'length'>) => void;
	onRegenerate: () => void;
	onCopyPassword: () => void;
	copyLabel: string;
};

function ToggleRow({
	label,
	description,
	checked,
	onChange,
}: {
	label: string;
	description: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<label className="password-generator__toggle-row">
			<div>
				<Text as="p" variant="medium-16" color="primary">
					{label}
				</Text>
				<Text as="p" variant="regular-14" color="secondary">
					{description}
				</Text>
			</div>
			<input type="checkbox" checked={checked} onChange={onChange} className="password-generator__switch" />
		</label>
	);
}

export function PasswordGeneratorScreen({
	password,
	options,
	onLengthChange,
	onToggleOption,
	onRegenerate,
	onCopyPassword,
	copyLabel,
}: PasswordGeneratorScreenProps) {
	const activeRules = [
		options.includeUppercase,
		options.includeLowercase,
		options.includeDigits,
		options.includeSymbols,
	].filter(Boolean).length;

	return (
		<App>
			<div className="password-generator">
				<Header title="Генератор паролей" />

				<View>
					<div className="password-generator__content">
						<div className="password-generator__result-card">
							<Text as="p" variant="regular-14" color="secondary">
								Сгенерированный пароль
							</Text>

							<Text as="p" variant="mono-18" color="primary" className="password-generator__password">
								{password || 'Выберите хотя бы один тип символов'}
							</Text>

							<div className="password-generator__actions">
								<Button type="button" size={44} variant="secondary" onClick={onRegenerate}>
									Обновить
								</Button>
								<Button type="button" size={44} variant="primary" onClick={onCopyPassword} disabled={!password}>
									<Icon name="copy-outline" width={16} height={16} alt="" aria-hidden="true" />
									{copyLabel}
								</Button>
							</div>
						</div>

						<ListContainer>
							<List title="Настройки">
								<div className="password-generator__list">
									<div className="password-generator__length-row">
										<div className="password-generator__length-head">
											<Text as="p" variant="medium-16" color="primary">
												Длина
											</Text>
											<Text as="p" variant="regular-14" color="secondary">
												{options.length} символов
											</Text>
										</div>
										<input
											type="range"
											min={8}
											max={40}
											value={options.length}
											onChange={(event) => onLengthChange(Number(event.target.value))}
										/>
									</div>

									<ToggleRow
										label="Заглавные буквы"
										description="A, B, C"
										checked={options.includeUppercase}
										onChange={() => onToggleOption('includeUppercase')}
									/>
									<ToggleRow
										label="Строчные буквы"
										description="a, b, c"
										checked={options.includeLowercase}
										onChange={() => onToggleOption('includeLowercase')}
									/>
									<ToggleRow
										label="Цифры"
										description="1, 2, 3"
										checked={options.includeDigits}
										onChange={() => onToggleOption('includeDigits')}
									/>
									<ToggleRow
										label="Символы"
										description="!, %, @"
										checked={options.includeSymbols}
										onChange={() => onToggleOption('includeSymbols')}
									/>
								</div>
							</List>
						</ListContainer>

						<Text as="p" variant="regular-14" color="secondary">
							Активных правил: {activeRules}
						</Text>
					</div>
				</View>
			</div>
		</App>
	);
}
