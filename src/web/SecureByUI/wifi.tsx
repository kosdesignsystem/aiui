import { useEffect, useMemo, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
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
	trusted?: boolean;
};

const AVAILABLE_NETWORKS: WifiItem[] = [
	{ id: 'alexey', name: 'Alexey iPhone', secured: true, trusted: false },
	{ id: 'teschin', name: 'Teschin Home', trusted: false },
	{ id: 'tebya', name: 'ne dlya tebya wifi podklucha.', trusted: false },
	{ id: 'rostelecom', name: 'I love Rostelecom', trusted: false },
	{ id: 'mama', name: 'Mama', trusted: false },
	{ id: 'parol', name: 'ParolNeDam', secured: true, trusted: false },
	{ id: 'pupupu', name: 'Pupupu', secured: true, trusted: false },
	{ id: 'ki-secure', name: 'Kaspersky Secure Network', secured: true, trusted: true },
];

const SHEET_ANIMATION_MS = 280;

function WifiRow({ item, onClick }: { item: WifiItem; onClick?: () => void }) {
	return (
		<Cell
			onClick={onClick}
			title={<Text variant="medium-18">{item.name}</Text>}
			subtitle={
				item.isConnected ? (
					<Text variant="regular-14" color="accent">Подключено</Text>
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
					<Icon name="status-info-outline" width={22} height={22} colorToken="content-primary" aria-hidden />
				</Avatar>
			}
		/>
	);
}

export default function SecureByUIWifiPage() {
	const [isPolicySheetMounted, setIsPolicySheetMounted] = useState(false);
	const [isPolicySheetVisible, setIsPolicySheetVisible] = useState(false);
	const [isWifiEnabled, setIsWifiEnabled] = useState(true);
	const [isSecureModeEnabled, setIsSecureModeEnabled] = useState(false);
	const [isSecureSheetMounted, setIsSecureSheetMounted] = useState(false);
	const [isSecureSheetVisible, setIsSecureSheetVisible] = useState(false);
	const hideTimerRef = useRef<number | null>(null);

	const visibleNetworks = useMemo(
		() => (isSecureModeEnabled ? AVAILABLE_NETWORKS.filter((network) => network.trusted) : AVAILABLE_NETWORKS),
		[isSecureModeEnabled],
	);

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

	const closeSecureSheet = () => {
		setIsSecureSheetVisible(false);
		window.setTimeout(() => setIsSecureSheetMounted(false), SHEET_ANIMATION_MS);
	};

	const handleSecureModeToggle = (checked: boolean) => {
		setIsSecureModeEnabled(checked);
		if (checked) {
			setIsSecureSheetMounted(true);
			window.requestAnimationFrame(() => setIsSecureSheetVisible(true));
		}
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
			<section
				className={`secure-ui secure-ui__wifi-page${isSecureModeEnabled ? ' is-secure-mode' : ''}`}
				aria-label="Secure by UI - Wi-Fi"
			>
				<div className="secure-ui__secure-glow" aria-hidden />
				<Header
					title="Wi‑Fi"
					button={<IconButton size={60} variant="primary" aria-label="Назад"><Icon name="arrow-left" width={24} height={24} aria-hidden /></IconButton>}
					action={<IconButton size={60} variant="primary" aria-label="Обновить"><Icon name="arrow-history" width={24} height={24} aria-hidden /></IconButton>}
				/>

				<div className="secure-ui__wifi-switches">
					<div className="secure-ui__wifi-switch">
						<Text variant="medium-20">Wi‑Fi</Text>
						<Switch checked={isWifiEnabled} onChange={(event) => setIsWifiEnabled(event.target.checked)} aria-label="Wi-Fi" />
					</div>
					<div className="secure-ui__wifi-switch">
						<Text variant="medium-20">Secure Network Mode</Text>
						<Switch checked={isSecureModeEnabled} onChange={(event) => handleSecureModeToggle(event.target.checked)} aria-label="Secure Network Mode" />
					</div>
				</div>

				<div className="secure-ui__wifi-lists">
					<List title="Текущая сеть">
						<WifiRow item={{ id: 'corp', name: 'KI Corp', secured: true, isConnected: true }} />
						{isSecureModeEnabled ? <Text variant="regular-14" color="accent">Защищено</Text> : null}
					</List>
					<List title="Доступные сети">
						<div className="secure-ui__wifi-networks-wrap">
							{visibleNetworks.map((network) => (
								<div key={network.id} className="secure-ui__wifi-network-item">
									<WifiRow item={network} onClick={network.id === 'alexey' ? openPolicySheet : undefined} />
								</div>
							))}
						</div>
					</List>
				</div>

				{isPolicySheetMounted ? (
					<div className={`secure-ui__policy-backdrop${isPolicySheetVisible ? ' is-visible' : ''}`} role="dialog" aria-modal="true" aria-label="Предупреждение о небезопасной сети">
						<button type="button" className="secure-ui__policy-dismiss" onClick={closePolicySheet} aria-label="Закрыть шторку" />
						<div className="secure-ui__policy-sheet"><WifiPolicySheetContent onCancel={closePolicySheet} /></div>
					</div>
				) : null}

				{isSecureSheetMounted ? (
					<div className={`secure-ui__policy-backdrop${isSecureSheetVisible ? ' is-visible' : ''}`} role="dialog" aria-modal="true" aria-label="Безопасная сеть активирована">
						<button type="button" className="secure-ui__policy-dismiss" onClick={closeSecureSheet} aria-label="Закрыть шторку безопасности" />
						<div className="secure-ui__policy-sheet secure-ui__secure-sheet">
							<Text variant="semiBold-32">Вы в безопасной сети</Text>
							<Text variant="regular-18" color="secondary">Небезопасные подключения скрыты. Передача данных защищена — можно работать без риска.</Text>
							<div className="secure-ui__secure-card">
								<Icon name="wifi-lock" width={28} height={28} colorToken="accent-primary" aria-hidden />
								<div>
									<Text variant="medium-18">Kaspersky Secure Network</Text>
									<Text variant="regular-14" color="secondary">Безопасное подключение</Text>
								</div>
							</div>
							<div className="secure-ui__secure-actions">
								<Button size={60} variant="accent" onClick={closeSecureSheet}>Ок</Button>
								<Button size={60} variant="secondary" onClick={() => setIsSecureModeEnabled(false)}>Показать все сети</Button>
							</div>
						</div>
					</div>
				) : null}
			</section>
		</App>
	);
}
