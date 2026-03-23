import { useEffect, useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
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
	const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);
	const currentLevel = getSecurityLevel(options);

	const spoilerParticles = useMemo(
		() =>
			Array.from({ length: 110 }, (_, index) => ({
				id: index,
				x: Math.random() * 100,
				y: Math.random() * 100,
				size: Math.random() * 2 + 1,
				delay: Math.random() * 0.24,
			})),
		[password],
	);

	useEffect(() => {
		setIsPasswordRevealed(false);
	}, [password]);

	const levels: Array<{ id: SecurityLevel; label: string }> = [
		{ id: 'weak', label: 'Слабый' },
		{ id: 'medium', label: 'Средний' },
		{ id: 'strong', label: 'Сильный' },
	];

	const handlePasswordClick = () => {
		if (!password) {
			return;
		}

		if (!isPasswordRevealed) {
			setIsPasswordRevealed(true);
			return;
		}

		onCopyPassword();
	};

	return (
		<App>
			<div className="password-generator">
				<Header title="Генератор паролей" />
				<View>
					<div className="password-generator__content">
						<section className="password-generator__section">
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
							<button
								type="button"
								onClick={handlePasswordClick}
								disabled={!password}
								className="password-generator__password-touch"
								aria-label={isPasswordRevealed ? copyLabel : 'Показать пароль'}
							>
								{password ? (
									isPasswordRevealed ? (
										<Text as="p" variant="regular-20" color="primary" family="mono">
											{password}
										</Text>
									) : (
										<span className="password-generator__spoiler" aria-hidden="true">
											{spoilerParticles.map((particle) => (
												<span
													key={particle.id}
													className="password-generator__spoiler-particle"
													style={{
														left: `${particle.x}%`,
														top: `${particle.y}%`,
														width: `${particle.size}px`,
														height: `${particle.size}px`,
														animationDelay: `${particle.delay}s`,
													}}
												/>
											))}
										</span>
									)
								) : (
									<Text as="p" variant="regular-20" color="primary" family="mono">
										Нажмите «Сгенерировать новый»
									</Text>
								)}
							</button>
						</section>

						<Button type="button" size={60} variant="success" onClick={onRegenerate}>
							Сгенерировать новый
						</Button>

						<Button
							type="button"
							size={52}
							variant="primary"
							onClick={onCopyPassword}
							disabled={!password}
						>
							{copyLabel}
						</Button>
					</div>
				</View>
			</div>
		</App>
	);
}
