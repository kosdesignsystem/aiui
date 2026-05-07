import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { ScreenScaffold } from '../../ui/ScreenScaffold';
import { View } from '../../ui/View';
import './screen.scss';

type ActivityEvent = {
	id: string;
	title: string;
	meta: string;
	time: string;
	icon: IconName;
	variant?: 'success' | 'muted' | 'active';
	progress?: number;
};

const activityEvents: ActivityEvent[] = [
	{
		id: 'download',
		title: 'Documentation package downloading',
		meta: '74% · 136 of 184.2 MB · 4.8 MB/s',
		time: 'Now',
		icon: 'folder-download-outline',
		variant: 'active',
		progress: 74,
	},
	{
		id: 'complete',
		title: 'Transfer completed',
		meta: 'Blueprints exported to Ava’s MacBook Pro',
		time: '09:42',
		icon: 'done',
		variant: 'success',
	},
	{
		id: 'device',
		title: 'Device discovered nearby',
		meta: 'Studio iPad · 192.168.0.24 · signal −42 dBm',
		time: '09:41',
		icon: 'network-outline',
	},
	{
		id: 'secure',
		title: 'Encrypted channel established',
		meta: 'AES-256 channel · private key rotated',
		time: '09:39',
		icon: 'shield-done-outline',
	},
	{
		id: 'paused',
		title: 'Sync paused — waiting for connection',
		meta: 'Cloud queue suspended while offline mode is active',
		time: '09:38',
		icon: 'clock-disable-outline',
		variant: 'muted',
	},
];

function StatusBanner() {
	return (
		<div className="offline-transfer__status-banner">
			<Cell
				variant="primary"
				leading={
					<span className="offline-transfer__banner-icon" aria-hidden="true">
						<Icon name="wifi-off" width={20} height={20} alt="" aria-hidden="true" />
					</span>
				}
				title={
					<Text variant="medium-16" color="primary">
						Offline Mode Activated
					</Text>
				}
				subtitle={
					<Text variant="regular-12" color="secondary">
						You can continue working and transfer files over local network
					</Text>
				}
				trailing={<span className="offline-transfer__status-dot" aria-label="Local transfer is active" />}
			/>
		</div>
	);
}

function ActivityCell({ event }: { event: ActivityEvent }) {
	const isMuted = event.variant === 'muted';

	return (
		<Cell
			className={`offline-transfer__activity-cell offline-transfer__activity-cell--${event.variant ?? 'default'}`}
			leading={
				<span className="offline-transfer__activity-icon" aria-hidden="true">
					<Icon name={event.icon} width={22} height={22} alt="" aria-hidden="true" />
				</span>
			}
			title={
				<div className="offline-transfer__activity-title">
					<Text variant="medium-16" color={isMuted ? 'secondary' : 'primary'}>
						{event.title}
					</Text>
					<Text variant="regular-12" color="secondary" family="mono">
						{event.time}
					</Text>
				</div>
			}
			subtitle={
				<div className="offline-transfer__activity-meta">
					<Text variant="regular-12" color="secondary">
						{event.meta}
					</Text>
					{event.progress !== undefined ? (
						<div className="offline-transfer__progress" aria-label={`${event.progress}% complete`}>
							<span style={{ width: `${event.progress}%` }} />
						</div>
					) : null}
				</div>
			}
		/>
	);
}

export default function OfflineTransferMainPage() {
	return (
		<ScreenScaffold
			className="offline-transfer"
			header={<StatusBanner />}
			bottomActions={
				<div className="offline-transfer__bottom-actions">
					<Nav
						ariaLabel="Offline transfer navigation"
						items={[
							{
								id: 'activity',
								label: 'Activity',
								active: true,
								icon: <Icon name="signal-search" width={20} height={20} alt="" aria-hidden="true" />,
							},
							{
								id: 'devices',
								label: 'Devices',
								icon: <Icon name="router-outline" width={20} height={20} alt="" aria-hidden="true" />,
							},
							{
								id: 'vault',
								label: 'Vault',
								icon: <Icon name="shield-outline" width={20} height={20} alt="" aria-hidden="true" />,
							},
						]}
					/>
				</div>
			}
		>
			<View className="offline-transfer__view">
				<Header
					className="offline-transfer__header"
					title="Network Activity"
					meta={
						<Text variant="regular-14" color="secondary">
							Local-only workspace · encrypted transfer channel
						</Text>
					}
					action={
						<IconButton size={52} variant="primary" aria-label="Open local network settings">
							<Icon name="settings-outline" width={22} height={22} alt="" aria-hidden="true" />
						</IconButton>
					}
				/>

				<section className="offline-transfer__summary" aria-label="Local network summary">
					<div>
						<Text family="mono" variant="regular-12" color="secondary">
							LAN STATUS
						</Text>
						<Text as="p" variant="semiBold-32" color="primary">
							3 devices
						</Text>
					</div>
					<Button
						size={52}
						variant="accent"
						leftIcon={<Icon name="send-outline" width={18} height={18} alt="" aria-hidden="true" />}
					>
						Transfer
					</Button>
				</section>

				<ListContainer className="offline-transfer__activity-list">
					<List title="Activity journal">
						{activityEvents.map((event) => (
							<ActivityCell event={event} key={event.id} />
						))}
					</List>
				</ListContainer>
			</View>
		</ScreenScaffold>
	);
}
