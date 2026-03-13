import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { SearchBar } from '../../ui/SearchBar';
import { View } from '../../ui/View';
import { settingsRoutes } from './model';

type SecurityToggleKey =
	| 'biometrics'
	| 'simLock'
	| 'usbLock'
	| 'vpnAlwaysOn'
	| 'unsafeWifiAlerts'
	| 'encryptedBackups'
	| 'clipboardAlerts';

type SecurityToggleState = Record<SecurityToggleKey, boolean>;

const defaultSecurityState: SecurityToggleState = {
	biometrics: true,
	simLock: true,
	usbLock: false,
	vpnAlwaysOn: true,
	unsafeWifiAlerts: true,
	encryptedBackups: true,
	clipboardAlerts: false,
};

const recommendationMap: Record<SecurityToggleKey, string> = {
	biometrics: 'Включите биометрию для ускоренного и безопасного входа.',
	simLock: 'Активируйте блокировку SIM, чтобы защитить номер при замене карты.',
	usbLock: 'Заблокируйте передачу данных по USB, когда устройство закрыто.',
	vpnAlwaysOn: 'Переведите VPN в режим "всегда включено" для внешних сетей.',
	unsafeWifiAlerts: 'Добавьте предупреждения о небезопасных Wi-Fi сетях.',
	encryptedBackups: 'Шифруйте резервные копии для защиты данных при восстановлении.',
	clipboardAlerts: 'Включите уведомления о доступе приложений к буферу обмена.',
};

function ToggleButton({
	enabled,
	onToggle,
	ariaLabel,
}: {
	enabled: boolean;
	onToggle: () => void;
	ariaLabel: string;
}) {
	return (
		<IconButton
			type="button"
			size={44}
			variant={enabled ? 'accent' : 'primary'}
			aria-label={ariaLabel}
			onClick={onToggle}
		>
			<Icon
				name={enabled ? 'done' : 'close'}
				alt=""
				width={20}
				height={20}
				aria-hidden="true"
				colorToken="var(--ui-icon-button-color)"
			/>
		</IconButton>
	);
}

function SecurityToggleCell({
	icon,
	title,
	subtitle,
	enabled,
	onToggle,
}: {
	icon: string;
	title: string;
	subtitle: string;
	enabled: boolean;
	onToggle: () => void;
}) {
	return (
		<Cell
			leading={
				<Avatar>
					<Icon name={icon} alt="" width={20} height={20} aria-hidden="true" />
				</Avatar>
			}
			title={<Text variant="regular-18">{title}</Text>}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{subtitle}
				</Text>
			}
			trailing={
				<ToggleButton
					enabled={enabled}
					onToggle={onToggle}
					ariaLabel={`Переключить параметр: ${title}`}
				/>
			}
		/>
	);
}

export function SettingsSecurityScreen() {
	const navigate = useNavigate();
	const [security, setSecurity] = useState<SecurityToggleState>(defaultSecurityState);

	const toggleEntries = useMemo(() => Object.entries(security), [security]);
	const enabledCount = toggleEntries.filter(([, enabled]) => enabled).length;
	const totalCount = toggleEntries.length;
	const securityScore = Math.round((enabledCount / totalCount) * 100);

	const statusText =
		securityScore >= 85
			? 'Высокий уровень защиты'
			: securityScore >= 70
				? 'Рекомендуется усилить часть параметров'
				: 'Защита снижена, требуется настройка';

	const pendingRecommendations = (Object.keys(security) as SecurityToggleKey[])
		.filter((key) => !security[key])
		.map((key) => recommendationMap[key]);

	const handleToggle = (key: SecurityToggleKey) => {
		setSecurity((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	return (
		<App>
			<Header
				title="Безопасность"
				button={
					<IconButton
						type="button"
						variant="primary"
						size={44}
						aria-label="Назад к настройкам"
						onClick={() => navigate(settingsRoutes.main)}
					>
						<Icon name="arrow-left" alt="" width={20} height={20} aria-hidden="true" />
					</IconButton>
				}
			/>

			<View>
				<List title="Статус защиты">
					<Cell
						leading={
							<Avatar background="accent-background">
								<Icon
									name="shield-done"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
									colorToken="accent-primary"
								/>
							</Avatar>
						}
						title={
							<Text variant="medium-18">
								Защищено на {securityScore}%
							</Text>
						}
						subtitle={
							<Text variant="regular-14" color="secondary">
								{statusText}
							</Text>
						}
						trailing={
							<Text variant="medium-14" color="accent">
								{enabledCount}/{totalCount}
							</Text>
						}
					/>
					<Cell
						leading={
							<Avatar background="accent-background">
								<Icon
									name="lock-outline"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
									colorToken="accent-primary"
								/>
							</Avatar>
						}
						title={<Text variant="regular-18">Шифрование устройства</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								Шифрование диска включено по умолчанию и всегда активно — данные на
								телефоне защищены
							</Text>
						}
						trailing={
							<Text variant="medium-14" color="accent">
								Включено
							</Text>
						}
					/>
				</List>

				<List title="Доступ к устройству">
					<SecurityToggleCell
						icon="persone-circle-outline"
						title="Биометрия"
						subtitle="Вход по лицу или отпечатку"
						enabled={security.biometrics}
						onToggle={() => handleToggle('biometrics')}
					/>
					<Cell
						leading={
							<Avatar>
								<Icon name="pincode" alt="" width={20} height={20} aria-hidden="true" />
							</Avatar>
						}
						title={<Text variant="regular-18">Код-пароль</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								6-значный, автосброс после 10 попыток
							</Text>
						}
						trailing={
							<Text variant="medium-14" color="accent">
								Активен
							</Text>
						}
					/>
					<SecurityToggleCell
						icon="sim-card-outline"
						title="Блокировка SIM"
						subtitle="PIN при перезапуске устройства"
						enabled={security.simLock}
						onToggle={() => handleToggle('simLock')}
					/>
					<SecurityToggleCell
						icon="lock-outline"
						title="USB-защита"
						subtitle="Блокировать передачу данных в спящем режиме"
						enabled={security.usbLock}
						onToggle={() => handleToggle('usbLock')}
					/>
				</List>

				<List title="Сеть и данные">
					<SecurityToggleCell
						icon="shield-outline"
						title="VPN всегда включен"
						subtitle="Трафик шифруется при выходе в интернет"
						enabled={security.vpnAlwaysOn}
						onToggle={() => handleToggle('vpnAlwaysOn')}
					/>
					<SecurityToggleCell
						icon="wifi-lock"
						title="Оповещения о небезопасном Wi-Fi"
						subtitle="Предупреждать о сетях без шифрования"
						enabled={security.unsafeWifiAlerts}
						onToggle={() => handleToggle('unsafeWifiAlerts')}
					/>
					<SecurityToggleCell
						icon="archive-outline"
						title="Шифрование резервных копий"
						subtitle="Копии защищены дополнительным паролем"
						enabled={security.encryptedBackups}
						onToggle={() => handleToggle('encryptedBackups')}
					/>
				</List>

				<List title="Разрешения приложений">
					<Cell
						leading={
							<Avatar>
								<Icon
									name="microphone-outline"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
								/>
							</Avatar>
						}
						title={<Text variant="regular-18">Микрофон</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								Доступ только при использовании: 4 приложения
							</Text>
						}
					/>
					<Cell
						leading={
							<Avatar>
								<Icon name="photo-outline" alt="" width={20} height={20} aria-hidden="true" />
							</Avatar>
						}
						title={<Text variant="regular-18">Камера</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								Разрешена для 3 проверенных приложений
							</Text>
						}
					/>
					<SecurityToggleCell
						icon="copy-outline"
						title="Контроль буфера обмена"
						subtitle="Уведомлять о чтении буфера в фоне"
						enabled={security.clipboardAlerts}
						onToggle={() => handleToggle('clipboardAlerts')}
					/>
				</List>

				<List title="Журнал безопасности">
					<Cell
						leading={
							<Avatar>
								<Icon
									name="status-info-outline"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
								/>
							</Avatar>
						}
						title={<Text variant="regular-18">Последняя проверка</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								Сегодня, 11:42 • Угроз не найдено
							</Text>
						}
					/>
					<Cell
						leading={
							<Avatar>
								<Icon
									name="status-warning-outline"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
								/>
							</Avatar>
						}
						title={<Text variant="regular-18">Попытки входа</Text>}
						subtitle={
							<Text variant="regular-14" color="secondary">
								2 неуспешные попытки за 7 дней
							</Text>
						}
					/>
				</List>

				<List title="Рекомендации">
					{pendingRecommendations.length === 0 ? (
						<Cell
							leading={
								<Avatar background="system-success-background">
									<Icon
										name="status-done-outline"
										alt=""
										width={20}
										height={20}
										aria-hidden="true"
										colorToken="system-success-primary"
									/>
								</Avatar>
							}
							title={<Text variant="regular-18">Критичных замечаний нет</Text>}
							subtitle={
								<Text variant="regular-14" color="secondary">
									Все основные параметры защиты активированы
								</Text>
							}
						/>
					) : (
						pendingRecommendations.map((recommendation, index) => (
							<Cell
								key={`${recommendation}-${index}`}
								leading={
									<Avatar background="system-error-background">
										<Icon
											name="status-warning-outline"
											alt=""
											width={20}
											height={20}
											aria-hidden="true"
											colorToken="system-error-primary"
										/>
									</Avatar>
								}
								title={<Text variant="regular-18">Рекомендуется включить</Text>}
								subtitle={
									<Text variant="regular-14" color="secondary">
										{recommendation}
									</Text>
								}
							/>
						))
					)}
				</List>
			</View>

			<SearchBar placeholder="Поиск в безопасности" aria-label="Поиск в безопасности" />
		</App>
	);
}
