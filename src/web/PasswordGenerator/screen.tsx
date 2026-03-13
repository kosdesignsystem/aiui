import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { View } from '../../ui/View';
import { getSecurityLevel, PasswordOptions, SecurityLevel } from './model';
import './screen.scss';

type PasswordGeneratorScreenProps = {
	password: string;
	options: PasswordOptions;
	onLengthChange: (length: number) => void;
	onToggleOption: (option: keyof Omit<PasswordOptions, 'length'>) => void;
	onRegenerate: () => void;
	onCopyPassword: () => void;
	onApplySecurityLevel: (level: SecurityLevel) => void;
	copyLabel: string;
};

function ToggleRow({
	icon,
	label,
	checked,
	onChange,
}: {
	icon: string;
	label: string;
	checked: boolean;
	onChange: () => void;
}) {
	return (
		<label className="password-generator__toggle-row">
			<div className="password-generator__toggle-meta">
				<Text as="span" variant="medium-20" color="accent">
					{icon}
				</Text>
				<Text as="span" variant="regular-20" color="primary">
					{label}
				</Text>
			</div>
			<span className="password-generator__switch-wrap">
				<input type="checkbox" checked={checked} onChange={onChange} className="password-generator__switch" />
				<span className="password-generator__switch-ui" aria-hidden="true" />
			</span>
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
	onApplySecurityLevel,
	copyLabel,
}: PasswordGeneratorScreenProps) {
	const currentLevel = getSecurityLevel(options);
	const levels: Array<{ id: SecurityLevel; label: string }> = [
		{ id: 'weak', label: 'Слабый' },
		{ id: 'medium', label: 'Средний' },
		{ id: 'strong', label: 'Сильный' },
	];

	return (
		<App>
			<div className="password-generator">
				<Header title="Генератор паролей" />
				<View>
					<div className="password-generator__content">
						<Text as="p" variant="medium-24" color="primary">
							Сгенерировать случайный пароль
						</Text>

						<section className="password-generator__section">
							<Text as="p" variant="medium-20" color="primary">
								Уровень надежности
							</Text>
							<div className="password-generator__security" role="tablist" aria-label="Уровень надежности">
								{levels.map((level) => {
									const isActive = currentLevel === level.id;
									return (
										<button
											key={level.id}
											type="button"
											className={`password-generator__security-tab${isActive ? ' is-active' : ''}`}
											onClick={() => onApplySecurityLevel(level.id)}
										>
											<Text variant="medium-18" color={isActive ? 'primary' : 'secondary'}>
												{level.label}
											</Text>
										</button>
									);
								})}
							</div>
						</section>

						<section className="password-generator__section">
							<div className="password-generator__length-head">
								<Text as="p" variant="medium-20" color="primary">
									Длина пароля
								</Text>
								<Text as="p" variant="medium-20" color="primary">
									{options.length}
								</Text>
							</div>
							<input
								type="range"
								min={6}
								max={40}
								value={options.length}
								onChange={(event) => onLengthChange(Number(event.target.value))}
								className="password-generator__range"
							/>
						</section>

						<section className="password-generator__options" aria-label="Параметры генерации">
							<ToggleRow
								icon="Aa"
								label="Заглавные буквы"
								checked={options.includeUppercase}
								onChange={() => onToggleOption('includeUppercase')}
							/>
							<ToggleRow
								icon="Aa"
								label="Строчные буквы"
								checked={options.includeLowercase}
								onChange={() => onToggleOption('includeLowercase')}
							/>
							<ToggleRow
								icon="123"
								label="Цифры"
								checked={options.includeDigits}
								onChange={() => onToggleOption('includeDigits')}
							/>
							<ToggleRow
								icon="!="
								label="Символы"
								checked={options.includeSymbols}
								onChange={() => onToggleOption('includeSymbols')}
							/>
						</section>

						<section className="password-generator__result-card">
							<Text as="p" variant="regular-16" color="secondary">
								Сгенерированный пароль
							</Text>
							<div className="password-generator__password-row">
								<Text as="p" variant="regular-20" color="primary" family="mono">
									{password || 'Нажмите «Сгенерировать новый»'}
								</Text>
								<Button
									type="button"
									size={44}
									variant="secondary"
									onClick={onCopyPassword}
									disabled={!password}
									aria-label={copyLabel}
								>
									<Icon name="copy-outline" width={24} height={24} alt="" aria-hidden="true" />
								</Button>
							</div>
						</section>

						<Button type="button" size={60} variant="success" onClick={onRegenerate}>
							Сгенерировать новый
						</Button>

						<div className="password-generator__footer-actions">
							<Button type="button" size={52} variant="secondary">
								Отмена
							</Button>
							<Button type="button" size={52} variant="primary" disabled>
								ОК
							</Button>
						</div>
					</div>
				</View>
			</div>
		</App>
	);
}
