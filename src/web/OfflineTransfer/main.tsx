import './screen.scss';

const activityEvents = [
	{
		status: 'active',
		eyebrow: 'DOCS / 184.2 MB',
		title: 'Documentation package downloading',
		meta: '74% · 136 MB received · 4.8 MB/s',
		time: 'Now',
		icon: 'pulse',
		progress: 74,
	},
	{
		status: 'success',
		eyebrow: 'ARCHIVE / 12 FILES',
		title: 'Transfer completed',
		meta: 'Blueprints exported to Ava’s MacBook Pro',
		time: '09:42',
		icon: 'check',
	},
	{
		status: 'discover',
		eyebrow: 'LOCAL MESH',
		title: 'Device discovered nearby',
		meta: 'Studio iPad · 192.168.0.24 · signal −42 dBm',
		time: '09:41',
		icon: 'network',
	},
	{
		status: 'secure',
		eyebrow: 'E2E / AES-256',
		title: 'Encrypted channel established',
		meta: 'Private key rotation completed',
		time: '09:39',
		icon: 'shield',
	},
	{
		status: 'muted',
		eyebrow: 'SYNC STATE',
		title: 'Sync paused — waiting for connection',
		meta: 'Cloud queue suspended while offline mode is active',
		time: '09:38',
		icon: 'pause',
	},
] as const;

function OfflineIcon() {
	return (
		<span className="offline-transfer__offline-icon" aria-hidden="true">
			<span />
			<span />
			<span />
		</span>
	);
}

function ActivityIcon({ type }: { type: (typeof activityEvents)[number]['icon'] }) {
	return (
		<span className={`offline-transfer__event-icon offline-transfer__event-icon--${type}`} aria-hidden="true">
			{type === 'check' ? '✓' : null}
			{type === 'shield' ? '◈' : null}
			{type === 'pause' ? 'Ⅱ' : null}
			{type === 'network' ? (
				<>
					<i />
					<i />
					<i />
				</>
			) : null}
			{type === 'pulse' ? <b /> : null}
		</span>
	);
}

export default function OfflineTransferMainPage() {
	return (
		<section className="offline-transfer" aria-label="Offline Mode Local Network Transfer">
			<div className="offline-transfer__grain" aria-hidden="true" />

			<div className="offline-transfer__banner">
				<OfflineIcon />
				<div className="offline-transfer__banner-copy">
					<strong>Offline Mode Activated</strong>
					<span>You can continue working and transfer files over local network</span>
				</div>
				<span className="offline-transfer__status-dot" aria-label="Offline transfer status active" />
			</div>

			<header className="offline-transfer__hero">
				<div>
					<p className="offline-transfer__kicker">LOCAL / SECURE / 09:44</p>
					<h1>Network Activity</h1>
				</div>
				<div className="offline-transfer__signal-card" aria-label="Local transfer pulse">
					<div className="offline-transfer__signal-orbit">
						<span />
						<span />
						<span />
					</div>
					<div className="offline-transfer__signal-label">
						<span>LAN</span>
						<strong>3</strong>
					</div>
				</div>
			</header>

			<div className="offline-transfer__ruler" aria-hidden="true">
				{Array.from({ length: 42 }, (_, index) => (
					<span key={index} className={index % 5 === 0 ? 'is-major' : undefined} />
				))}
			</div>

			<main className="offline-transfer__journal" aria-label="Activity journal">
				{activityEvents.map((event) => (
					<article
						className={`offline-transfer__event offline-transfer__event--${event.status}`}
						key={event.title}
					>
						<div className="offline-transfer__timeline-node">
							<ActivityIcon type={event.icon} />
						</div>
						<div className="offline-transfer__event-body">
							<div className="offline-transfer__event-topline">
								<span>{event.eyebrow}</span>
								<time>{event.time}</time>
							</div>
							<h2>{event.title}</h2>
							<p>{event.meta}</p>
							{'progress' in event ? (
								<div className="offline-transfer__progress" aria-label="Download progress 74 percent">
									<span style={{ width: `${event.progress}%` }} />
								</div>
							) : null}
						</div>
					</article>
				))}
			</main>

			<button className="offline-transfer__fab" type="button" aria-label="Start local network transfer">
				<span />
			</button>

			<nav className="offline-transfer__nav" aria-label="Offline transfer navigation">
				<a className="is-active" href="#activity">Activity</a>
				<a href="#devices">Devices</a>
				<a href="#vault">Vault</a>
			</nav>
		</section>
	);
}
