import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import './screen.scss';

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

function WifiRow({ item }: { item: WifiItem }) {
	return (
		<Cell
			onClick={() => undefined}
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
						<Icon name="status-info-outline" width={22} height={22} colorToken="content-primary" aria-hidden />
					</Avatar>
				}
			/>
	);
}

export default function SecureByUIWifiPage() {
	return (
		<App>
			<section className="secure-ui secure-ui__wifi-page" aria-label="Secure by UI - Wi-Fi">
				<header className="secure-ui__wifi-topbar">
					<button type="button" className="secure-ui__wifi-nav-button" aria-label="Назад">
						<Icon name="arrow-left" width={36} height={36} aria-hidden />
					</button>
					<Text variant="semiBold-40">Wi‑Fi</Text>
					<button type="button" className="secure-ui__wifi-nav-button" aria-label="Обновить">
						<Icon name="arrow-history" width={36} height={36} aria-hidden />
					</button>
				</header>

				<section className="secure-ui__wifi-switch" aria-label="Wi-Fi включён">
					<Text variant="medium-20">Включено</Text>
					<div className="secure-ui__wifi-switch-control" aria-hidden>
						<div className="secure-ui__wifi-switch-thumb" />
					</div>
				</section>

				<div className="secure-ui__wifi-lists">
					<List>
						<WifiRow item={{ id: 'corp', name: 'KI Corp', secured: true, isConnected: true }} />
					</List>

					<Text variant="regular-20" color="secondary">
						Доступные сети
					</Text>

					<List>
						{AVAILABLE_NETWORKS.map((network) => (
							<WifiRow key={network.id} item={network} />
						))}
					</List>

					<button type="button" className="secure-ui__wifi-more">
						<Text variant="medium-20">Еще доступные сети</Text>
						<Icon name="chevron-down" width={26} height={26} aria-hidden />
					</button>
				</div>
			</section>
		</App>
	);
}
