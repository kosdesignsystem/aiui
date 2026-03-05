import { useMemo, useState } from 'react';
import { App } from '../../../ui/App';
import { Icon } from '../../../ui/Icon';
import './App.scss';

type CallType = 'incoming' | 'missed' | 'outgoing' | 'blocked';

type CallItem = {
	id: string;
	name: string;
	timeLabel: string;
	type: CallType;
	count?: number;
};

const todayCalls: CallItem[] = [
	{
		id: 'today-1',
		name: '+7 927 238-80-22',
		timeLabel: '23:04',
		type: 'incoming',
		count: 3,
	},
	{
		id: 'today-2',
		name: '+7 931 342-60-31',
		timeLabel: '14:02',
		type: 'missed',
	},
	{
		id: 'today-3',
		name: 'Константин Петрович',
		timeLabel: '22:00',
		type: 'outgoing',
		count: 2,
	},
	{
		id: 'today-4',
		name: '+7 931 342-60-31',
		timeLabel: '14:02',
		type: 'blocked',
	},
];

const previousCalls: CallItem[] = [
	{
		id: 'prev-1',
		name: 'Дмитрий Бурдько',
		timeLabel: '18 сентября, 23:04',
		type: 'incoming',
	},
	{
		id: 'prev-2',
		name: 'Константин Петрович',
		timeLabel: '17 сентября, 18:12',
		type: 'incoming',
	},
];

const missedTypes = new Set<CallType>(['missed', 'blocked']);

function getCallIcon(type: CallType) {
	switch (type) {
		case 'incoming':
			return {
				name: 'phone-received',
				colorToken: '#2CC98B',
			};
		case 'missed':
			return {
				name: 'phone-missed',
				colorToken: '#FF5B6A',
			};
		case 'outgoing':
			return {
				name: 'phone-made',
				colorToken: '#4E8DFF',
			};
		case 'blocked':
			return {
				name: 'phone-diasble',
				colorToken: '#FF5B6A',
			};
		default:
			return {
				name: 'phone',
				colorToken: '#767D89',
			};
	}
}

function formatCallName(call: CallItem) {
	if (!call.count) {
		return call.name;
	}

	return `${call.name} (${call.count})`;
}

function CallsSection({ title, calls }: { title: string; calls: CallItem[] }) {
	if (calls.length === 0) {
		return null;
	}

	return (
		<section className="calls-section" aria-label={title}>
			<h2 className="calls-section__title">{title}</h2>
			<div className="calls-list">
				{calls.map((call) => {
					const icon = getCallIcon(call.type);
					return (
						<button key={call.id} type="button" className="call-row">
							<span className={`call-row__icon call-row__icon--${call.type}`}>
								<Icon
									name={icon.name}
									alt=""
									aria-hidden="true"
									width={20}
									height={20}
									colorToken={icon.colorToken}
								/>
							</span>

							<span className="call-row__content">
								<span className="call-row__name">{formatCallName(call)}</span>
								<span className="call-row__time">{call.timeLabel}</span>
							</span>

							<span className="call-row__info" aria-hidden="true">
								<Icon
									name="status-info-outline"
									alt=""
									aria-hidden="true"
									width={22}
									height={22}
									colorToken="#2D3138"
								/>
							</span>
						</button>
					);
				})}
			</div>
		</section>
	);
}

export default function CallsApp() {
	const [filter, setFilter] = useState<'all' | 'missed'>('all');

	const filteredToday = useMemo(() => {
		if (filter === 'all') {
			return todayCalls;
		}

		return todayCalls.filter((call) => missedTypes.has(call.type));
	}, [filter]);

	const filteredPrevious = useMemo(() => {
		if (filter === 'all') {
			return previousCalls;
		}

		return previousCalls.filter((call) => missedTypes.has(call.type));
	}, [filter]);

	return (
		<App>
			<section className="calls-screen">
				<header className="calls-header">
					<h1 className="calls-header__title">Вызовы</h1>
				</header>

				<section className="calls-filters" aria-label="Фильтры звонков">
					<button type="button" className="calls-search" aria-label="Поиск звонков">
						<Icon name="search" alt="" aria-hidden="true" width={26} height={26} colorToken="#2D3138" />
					</button>

					<div className="calls-segmented" role="tablist" aria-label="Фильтр звонков">
						<button
							type="button"
							role="tab"
							tabIndex={filter === 'all' ? 0 : -1}
							aria-selected={filter === 'all'}
							className={`calls-segmented__tab${filter === 'all' ? ' is-active' : ''}`}
							onClick={() => setFilter('all')}
						>
							Все
						</button>

						<button
							type="button"
							role="tab"
							tabIndex={filter === 'missed' ? 0 : -1}
							aria-selected={filter === 'missed'}
							className={`calls-segmented__tab${filter === 'missed' ? ' is-active' : ''}`}
							onClick={() => setFilter('missed')}
						>
							Пропущенные
						</button>
					</div>
				</section>

				<div className="calls-content">
					<section className="calls-card">
						<CallsSection title="Сегодня" calls={filteredToday} />
						<CallsSection title="Ранее" calls={filteredPrevious} />
					</section>
				</div>

				<nav className="calls-nav" aria-label="Навигация приложения">
					<button type="button" className="calls-nav__item is-active">
						<Icon name="phone" alt="" aria-hidden="true" width={24} height={24} colorToken="#1E2229" />
						<span>Вызовы</span>
					</button>

					<button type="button" className="calls-nav__item">
						<Icon
							name="persone-outline"
							alt=""
							aria-hidden="true"
							width={24}
							height={24}
							colorToken="#8B919A"
						/>
						<span>Контакты</span>
					</button>

					<button type="button" className="calls-nav__item">
						<Icon name="dialpad" alt="" aria-hidden="true" width={24} height={24} colorToken="#8B919A" />
						<span>Набор</span>
					</button>
				</nav>
			</section>
		</App>
	);
}
