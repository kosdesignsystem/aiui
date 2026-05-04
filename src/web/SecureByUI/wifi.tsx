import { useEffect, useState } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Switch } from '../../ui/Switch';
import './screen.scss';

const SHEET_ANIMATION_MS = 280;

export default function SecureByUIWifiPage() {
	const [isSecureNetworkEnabled, setIsSecureNetworkEnabled] = useState(true);
	const [isConnectedToSecureNetwork, setIsConnectedToSecureNetwork] = useState(false);
	const [isSecureSheetMounted, setIsSecureSheetMounted] = useState(false);
	const [isSecureSheetVisible, setIsSecureSheetVisible] = useState(false);

	useEffect(() => {
		if (!isSecureNetworkEnabled) {
			setIsConnectedToSecureNetwork(false);
			setIsSecureSheetVisible(false);
			setIsSecureSheetMounted(false);
			return;
		}

		const connectTimer = window.setTimeout(() => {
			setIsConnectedToSecureNetwork(true);
			setIsSecureSheetMounted(true);
			window.requestAnimationFrame(() => setIsSecureSheetVisible(true));
		}, 1100);

		return () => window.clearTimeout(connectTimer);
	}, [isSecureNetworkEnabled]);

	const closeSecureSheet = () => {
		setIsSecureSheetVisible(false);
		window.setTimeout(() => setIsSecureSheetMounted(false), SHEET_ANIMATION_MS);
	};

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
				/>

				<div className="secure-ui__wifi-switches">
					<div className="secure-ui__wifi-switch">
						<div className="secure-ui__wifi-switch-copy">
							<Text variant="medium-20">Безопасная сеть</Text>
							<Text variant="regular-14" color="secondary">
								Подключение только к проверенным и защищённым сетям
							</Text>
							{isConnectedToSecureNetwork ? (
								<Text variant="regular-14" color="accent">Подключено к защищённой сети</Text>
							) : null}
						</div>
						<Switch
							checked={isSecureNetworkEnabled}
							onChange={(event) => setIsSecureNetworkEnabled(event.target.checked)}
							aria-label="Безопасная сеть"
						/>
					</div>
				</div>

				<div className="secure-ui__wifi-empty-state" aria-live="polite">
					<div className="secure-ui__wifi-empty-icon" aria-hidden>
						<Icon name="wifi-lock" width={32} height={32} colorToken="accent-primary" />
					</div>
					<Text variant="medium-20">Ожидание защищённого подключения</Text>
					<Text variant="regular-14" color="secondary">
						Небезопасные сети не отображаются и недоступны для подключения
					</Text>
				</div>

				{isSecureSheetMounted ? (
					<div
						className={`secure-ui__policy-backdrop${isSecureSheetVisible ? ' is-visible' : ''}`}
						role="dialog"
						aria-modal="true"
						aria-label="Подключение к безопасной сети"
					>
						<button
							type="button"
							className="secure-ui__policy-dismiss"
							onClick={closeSecureSheet}
							aria-label="Закрыть шторку безопасности"
						/>
						<div className="secure-ui__policy-sheet secure-ui__secure-sheet">
							<Text variant="semiBold-32">Вы подключены к безопасной сети</Text>
							<Text variant="regular-18" color="secondary">
								Передача данных защищена. Все действия выполняются в безопасной среде.
							</Text>
							<div className="secure-ui__secure-card">
								<Icon name="wifi-lock" width={28} height={28} colorToken="accent-primary" aria-hidden />
								<div>
									<Text variant="medium-18">Kaspersky Secure Network</Text>
									<Text variant="regular-14" color="secondary">Защищённое подключение</Text>
								</div>
							</div>
							<Button size={60} variant="accent" onClick={closeSecureSheet}>Понятно</Button>
						</div>
					</div>
				) : null}
			</section>
		</App>
	);
}
