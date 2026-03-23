import { useEffect, useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { View } from '../../ui/View';
import { getSecurityLevel, PasswordOptions, SecurityLevel } from './model';
import './screen.scss';

export type PasswordTab = 'generate' | 'saved';

export type SavedPasswordItem = {
	id: string;
	password: string;
	service: string;
	login: string;
};

export type PasswordSheetDraft = {
	id?: string;
	password: string;
	service: string;
	login: string;
};

type PasswordGeneratorScreenProps = {
	password: string;
	options: PasswordOptions;
	copyLabel: string;
	activeTab: PasswordTab;
	savedPasswords: SavedPasswordItem[];
	sheetDraft: PasswordSheetDraft;
	isSheetOpen: boolean;
	onLengthChange: (length: number) => void;
	onToggleOption: (option: keyof Omit<PasswordOptions, 'length'>) => void;
	onRegenerate: () => void;
	onCopyPassword: () => void;
	onApplySecurityLevel: (level: SecurityLevel) => void;
	onTabChange: (tab: PasswordTab) => void;
	onOpenCreateSheet: () => void;
	onOpenEditSheet: (id: string) => void;
	onSheetChange: (patch: Partial<PasswordSheetDraft>) => void;
	onSheetClose: () => void;
	onSheetSubmit: () => void;
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
			<Cell
				leading={
					<Text as="span" variant="medium-20" color="accent">
						{icon}
					</Text>
				}
				title={
					<Text as="span" variant="regular-18" color="primary">
						{label}
					</Text>
				}
				trailing={
					<span className="password-generator__switch-wrap">
						<input type="checkbox" checked={checked} onChange={onChange} className="password-generator__switch" />
						<span className="password-generator__switch-ui" aria-hidden="true" />
					</span>
				}
			/>
		</label>
	);
}

export function PasswordGeneratorScreen({
	password,
	options,
	copyLabel,
	activeTab,
	savedPasswords,
	sheetDraft,
	isSheetOpen,
	onLengthChange,
	onToggleOption,
	onRegenerate,
	onCopyPassword,
	onApplySecurityLevel,
	onTabChange,
	onOpenCreateSheet,
	onOpenEditSheet,
	onSheetChange,
	onSheetClose,
	onSheetSubmit,
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
				<Header title="Password" />
				<View>
					<div className="password-generator__content">
						{activeTab === 'generate' ? (
							<>
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
									<Cell
										title={<Text variant="medium-18">Длина пароля</Text>}
										trailing={
											<Text variant="medium-18" color="primary">
												{options.length}
											</Text>
										}
									/>
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
												<span className="password-generator__password-value">
													<Text as="span" variant="regular-20" color="primary" family="mono">
														{password}
													</Text>
												</span>
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
											<span className="password-generator__password-value">
												<Text as="span" variant="regular-20" color="primary" family="mono">
													Нажмите «Сгенерировать новый»
												</Text>
											</span>
										)}
									</button>
								</section>

								<Button type="button" size={60} variant="success" onClick={onRegenerate}>
									Сгенерировать новый
								</Button>
								<Button type="button" size={52} variant="primary" onClick={onCopyPassword} disabled={!password}>
									{copyLabel}
								</Button>
								<Button type="button" size={52} variant="secondary" onClick={onOpenCreateSheet} disabled={!password}>
									Сохранить
								</Button>
							</>
						) : (
							<ListContainer>
								<List title="Сохраненные пароли">
									{savedPasswords.length === 0 ? (
										<Cell
											title={<Text variant="medium-18">Пусто</Text>}
											subtitle={<Text variant="regular-14" color="secondary">Сохраните пароль с вкладки генератора</Text>}
										/>
									) : (
										savedPasswords.map((item) => (
											<Cell
												key={item.id}
												title={<Text variant="regular-18">{item.service || 'Без названия'}</Text>}
												subtitle={<Text variant="regular-14" color="secondary">{item.login || 'Без логина'}</Text>}
												trailing={<Icon name="chevron-right" width={20} height={20} aria-hidden colorToken="content-secondary" />}
												onClick={() => onOpenEditSheet(item.id)}
											/>
										))
									)}
								</List>
							</ListContainer>
						)}
					</div>
				</View>

				<Nav
					items={[
						{
							id: 'generate',
							label: 'Генератор',
							active: activeTab === 'generate',
							onClick: () => onTabChange('generate'),
							icon: <Icon name="lock-outline" width={20} height={20} aria-hidden colorToken={activeTab === 'generate' ? 'content-primary' : 'content-secondary'} />,
						},
						{
							id: 'saved',
							label: 'Сохраненные',
							active: activeTab === 'saved',
							onClick: () => onTabChange('saved'),
							icon: <Icon name="copy-outline" width={20} height={20} aria-hidden colorToken={activeTab === 'saved' ? 'content-primary' : 'content-secondary'} />,
						},
					]}
				/>

				{isSheetOpen ? (
					<div className="password-generator__sheet-backdrop" role="dialog" aria-modal="true" aria-label="Редактирование пароля">
						<div className="password-generator__sheet">
							<Text as="p" variant="medium-20">Карточка пароля</Text>
							<label className="password-generator__field">
								<Text as="span" variant="regular-14" color="secondary">Пароль</Text>
								<input
									type="text"
									value={sheetDraft.password}
									onChange={(event) => onSheetChange({ password: event.target.value })}
								/>
							</label>
							<label className="password-generator__field">
								<Text as="span" variant="regular-14" color="secondary">Логин</Text>
								<input
									type="text"
									value={sheetDraft.login}
									onChange={(event) => onSheetChange({ login: event.target.value })}
								/>
							</label>
							<label className="password-generator__field">
								<Text as="span" variant="regular-14" color="secondary">Сервис</Text>
								<input
									type="text"
									value={sheetDraft.service}
									onChange={(event) => onSheetChange({ service: event.target.value })}
								/>
							</label>
							<div className="password-generator__sheet-actions">
								<Button type="button" size={44} variant="secondary" onClick={onSheetClose}>Отмена</Button>
								<Button type="button" size={44} variant="accent" onClick={onSheetSubmit}>Сохранить</Button>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</App>
	);
}
