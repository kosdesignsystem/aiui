import { useState } from 'react';
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
import { connectivityItems, preferencesItems } from './model';

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

export function SettingsMainScreen() {
	const navigate = useNavigate();
	const [airplaneModeEnabled, setAirplaneModeEnabled] = useState(false);

	return (
		<App>
			<Header title="Настройки" />
			<View>
				<List title="Сети и подключения">
					<Cell
						leading={
							<Avatar>
								<Icon
									name="avia"
									alt=""
									width={20}
									height={20}
									aria-hidden="true"
								/>
							</Avatar>
						}
						title={<Text variant="medium-18">Авиарежим</Text>}
						trailing={
							<ToggleButton
								enabled={airplaneModeEnabled}
								onToggle={() => setAirplaneModeEnabled((prev) => !prev)}
								ariaLabel="Переключить авиарежим"
							/>
						}
					/>

					{connectivityItems.map((item) => (
						<Cell
							key={item.id}
							leading={
								<Avatar>
									<Icon
										name={item.icon}
										alt=""
										width={20}
										height={20}
										aria-hidden="true"
									/>
								</Avatar>
							}
							title={<Text variant="regular-18">{item.title}</Text>}
							subtitle={
								item.subtitle ? (
									<Text variant="regular-14" color="accent">
										{item.subtitle}
									</Text>
								) : undefined
							}
						/>
					))}
				</List>

				<List title="Основные настройки">
					{preferencesItems.map((item) => (
						<Cell
							key={item.id}
							onClick={item.path ? () => navigate(item.path) : undefined}
							leading={
								<Avatar>
									<Icon
										name={item.icon}
										alt=""
										width={20}
										height={20}
										aria-hidden="true"
									/>
								</Avatar>
							}
							title={<Text variant="regular-18">{item.title}</Text>}
							subtitle={
								item.subtitle ? (
									<Text variant="regular-14" color="secondary">
										{item.subtitle}
									</Text>
								) : undefined
							}
							trailing={
								item.path ? (
									<Icon
										name="chevron-right"
										alt=""
										width={20}
										height={20}
										aria-hidden="true"
										colorToken="content-secondary"
									/>
								) : undefined
							}
						/>
					))}
				</List>
			</View>
			<SearchBar placeholder="Поиск настроек" aria-label="Поиск настроек" />
		</App>
	);
}
