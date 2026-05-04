import { useEffect, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Switch } from '../../ui/Switch';
import './screen.scss';
import { WifiPolicySheetContent } from './wifiPolicySheetContent';

type WifiItem = {
	id: string;
	name: string;
	secured?: boolean;
	isConnected?: boolean;
};

const AVAILABLE_NETWORKS: WifiItem[] = [
	{ id: 'alexey', name: 'Alexey iPhone', secured: true },
	{ id: 'teschin', name: 'Teschin Home' },
	{ id: 'tebya', name: 'ne dlya tebya wifi podklucha.' },
	{ id: 'rostelecom', name: 'I love Rostelecom' },
	{ id: 'mama', name: 'Mama' },
	{ id: 'parol', name: 'ParolNeDam', secured: true },
	{ id: 'pupupu', name: 'Pupupu', secured: true },
];

const SHEET_ANIMATION_MS = 280;

function WifiRow({ item, onClick }: { item: WifiItem; onClick?: () => void }) {
	return (
		<Cell
			onClick={onClick}
			title={<Text variant="medium-18">{item.name}</Text>}
			subtitle={
				item.isConnected ? (
					<Text variant="regular-14" color="accent">
						Подключено
					</Text>
				) : undefined
			}
			leading={
				<span className="secure-ui__wifi-leading">
					<Icon
						name={item.secured ? 'wifi-lock' : 'wifi'}
						width={28}
						height={28}
						colorToken={item.isConnected ? 'accent-primary' : 'content-tertiary'}
						aria-hidden
					/>
				</span>
			}
			trailing={
				<Avatar size={44} background="background-primary">
					<Icon
						name="status-info-outline"
						width={22}
						height={22}
						colorToken="content-primary"
						aria-hidden
					/>
				</Avatar>
			}
		/>
	);
}

export default function SecureByUIWifiPage() {
	const [isPolicySheetMounted, setIsPolicySheetMounted] = useState(false);
	const [isPolicySheetVisible, setIsPolicySheetVisible] = useState(false);
	const [isWifiEnabled, setIsWifiEnabled] = useState(true);
	const hideTimerRef = useRef<number | null>(null);

	const openPolicySheet = () => {
		if (hideTimerRef.current !== null) {
			window.clearTimeout(hideTimerRef.current);
			hideTimerRef.current = null;
		}

		setIsPolicySheetMounted(true);
		window.requestAnimationFrame(() => setIsPolicySheetVisible(true));
	};

	const closePolicySheet = () => {
		setIsPolicySheetVisible(false);

		hideTimerRef.current = window.setTimeout(() => {
			setIsPolicySheetMounted(false);
			hideTimerRef.current = null;
		}, SHEET_ANIMATION_MS);
	};

	useEffect(() => {
		return () => {
			if (hideTimerRef.current !== null) {
				window.clearTimeout(hideTimerRef.current);
			}
		};
	}, []);

	return (
		<App>
			<section className="secure-ui secure-ui__wifi-page" aria-label="Secure by UI - Wi-Fi">
				<Header
					title="Wi‑Fi"
					button={
						<IconButton size={60} variant="primary" aria-label="Назад">
							<Icon name="arrow-left" width={24} height={24} aria-hidden />
						</IconButton>
					}
					action={
						<IconButton size={60} variant="primary" aria-label="Обновить">
							<Icon name="arrow-history" width={24} height={24} aria-hidden />
						</IconButton>
					}
				/>

				<div className="secure-ui__wifi-switch">
					<Text variant="medium-20">Wi‑Fi</Text>
					<Switch
						checked={isWifiEnabled}
						onChange={(event) => setIsWifiEnabled(event.target.checked)}
						aria-label={`Wi-Fi ${isWifiEnabled ? 'включён' : 'выключен'}`}
					/>
				</div>

				<div className="secure-ui__wifi-lists">
					<List title="Текущая сеть">
						<WifiRow item={{ id: 'corp', name: 'KI Corp', secured: true, isConnected: true }} />
					</List>

					<List title="Доступные сети" action={<Text variant="regular-14" color="secondary">Сканируется…</Text>}>
						{AVAILABLE_NETWORKS.map((network) => (
							<WifiRow
								key={network.id}
								item={network}
								onClick={network.id === 'alexey' ? openPolicySheet : undefined}
							/>
						))}
					</List>
				</div>

				{isPolicySheetMounted ? (
					<div
						className={`secure-ui__policy-backdrop${isPolicySheetVisible ? ' is-visible' : ''}`}
						role="dialog"
						aria-modal="true"
						aria-label="Предупреждение о небезопасной сети"
					>
						<button
							type="button"
							className="secure-ui__policy-dismiss"
							onClick={closePolicySheet}
							aria-label="Закрыть шторку"
						/>
						<div className="secure-ui__policy-sheet">
							<WifiPolicySheetContent onCancel={closePolicySheet} />
						</div>
					</div>
				) : null}
			</section>
		</App>
	);
}
