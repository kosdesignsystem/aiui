import { ChangeEvent, KeyboardEvent, ReactNode, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { SearchBar } from '../../ui/SearchBar';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { View } from '../../ui/View';
import {
	CallDirection,
	CallLogEntry,
	CallsFilter,
	callsFilterTabs,
	callsNavItems,
	callsRoutes,
	getCallsByFilter,
	searchCalls,
	splitCallsByGroup,
} from './model';
import './screen.scss';

type CallsScreenProps = {
	title: string;
	filter: CallsFilter;
	mode?: 'default' | 'search';
};

type DialpadKey = { value: string; hint?: string };

const dialpadKeys: DialpadKey[] = [
	{ value: '1' },
	{ value: '2' },
	{ value: '3' },
	{ value: '4' },
	{ value: '5' },
	{ value: '6' },
	{ value: '7' },
	{ value: '8' },
	{ value: '9' },
	{ value: '*', hint: ';' },
	{ value: '0', hint: '+' },
	{ value: '#', hint: ',' },
] as const;

const dtmfFrequencies: Record<string, [number, number]> = {
	'1': [697, 1209],
	'2': [697, 1336],
	'3': [697, 1477],
	'4': [770, 1209],
	'5': [770, 1336],
	'6': [770, 1477],
	'7': [852, 1209],
	'8': [852, 1336],
	'9': [852, 1477],
	'*': [941, 1209],
	'0': [941, 1336],
	'#': [941, 1477],
};

function formatDialedNumber(value: string) {
	if (!value) {
		return '8 927 088 94 45';
	}

	return value.replace(/(.{1})(.{3})(.{3})(.{2})(.{0,2}).*/, (_, a, b, c, d, e) =>
		[a, b, c, d, e].filter(Boolean).join(' '),
	);
}

function useDialTone() {
	const audioContextRef = useRef<AudioContext | null>(null);

	return (value: string) => {
		if (typeof window === 'undefined') {
			return;
		}

		const AudioContextClass =
			window.AudioContext ??
			(window as typeof window & { webkitAudioContext?: typeof AudioContext })
				.webkitAudioContext;
		if (!AudioContextClass) {
			return;
		}

		const frequencies = dtmfFrequencies[value];
		if (!frequencies) {
			return;
		}

		const context = audioContextRef.current ?? new AudioContextClass();
		audioContextRef.current = context;

		const now = context.currentTime;
		const output = context.createGain();
		output.gain.setValueAtTime(0.0001, now);
		output.gain.exponentialRampToValueAtTime(0.11, now + 0.012);
		output.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);
		output.connect(context.destination);

		frequencies.forEach((frequency) => {
			const oscillator = context.createOscillator();
			const toneGain = context.createGain();

			oscillator.type = 'sine';
			oscillator.frequency.value = frequency;
			toneGain.gain.value = 0.5;
			oscillator.connect(toneGain);
			toneGain.connect(output);
			oscillator.start(now);
			oscillator.stop(now + 0.18);
		});
	};
}

function CallsNav({ active, navigate }: { active: string; navigate: ReturnType<typeof useNavigate> }) {
	return (
		<Nav
			items={callsNavItems.map((item) => {
				const path = item.path;

				return {
					id: item.id,
					label: item.label,
					active: item.id === active,
					onClick: path ? () => navigate(path) : undefined,
					icon: (
						<Icon
							name={item.icon}
							width={20}
							height={20}
							alt=""
							aria-hidden="true"
							colorToken={
								item.id === active ? 'content-primary' : 'content-secondary'
							}
						/>
					),
				};
			})}
		/>
	);
}

function getCallDirectionMeta(direction: CallDirection): { icon: IconName; iconColor: string; iconBg: string } {
	if (direction === 'incoming') {
		return {
			icon: 'phone-received',
			iconColor: 'system-success-primary',
			iconBg: 'system-success-background',
		};
	}

	if (direction === 'outgoing') {
		return {
			icon: 'phone-made',
			iconColor: 'accent-primary',
			iconBg: 'accent-background',
		};
	}

	return {
		icon: 'phone-missed',
		iconColor: 'system-error-primary',
		iconBg: 'system-error-background',
	};
}

function formatContactName(call: CallLogEntry) {
	if (!call.repeats) {
		return call.contact;
	}

	return `${call.contact} (${call.repeats})`;
}

function renderHighlightedText(value: string, rawQuery: string): ReactNode {
	const query = rawQuery.trim();

	if (!query) {
		return value;
	}

	const lowerValue = value.toLocaleLowerCase('ru-RU');
	const lowerQuery = query.toLocaleLowerCase('ru-RU');
	const chunks: ReactNode[] = [];
	let cursor = 0;
	let matchIndex = lowerValue.indexOf(lowerQuery, cursor);

	if (matchIndex === -1) {
		return value;
	}

	while (matchIndex !== -1) {
		if (matchIndex > cursor) {
			chunks.push(value.slice(cursor, matchIndex));
		}

		const end = matchIndex + query.length;
		chunks.push(
			<span key={`${matchIndex}-${end}`} className="calls-screen__match">
				{value.slice(matchIndex, end)}
			</span>,
		);

		cursor = end;
		matchIndex = lowerValue.indexOf(lowerQuery, cursor);
	}

	if (cursor < value.length) {
		chunks.push(value.slice(cursor));
	}

	return chunks;
}

function CallRow({ call, searchQuery }: { call: CallLogEntry; searchQuery?: string }) {
	const meta = getCallDirectionMeta(call.direction);
	const contactName = formatContactName(call);

	return (
		<Cell
			title={
				<Text variant="medium-18" color="primary">
					<span className="calls-screen__contact">
						{searchQuery
							? renderHighlightedText(contactName, searchQuery)
							: contactName}
					</span>
				</Text>
			}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{call.timeLabel}
				</Text>
			}
			leading={
				<Avatar background={meta.iconBg}>
					<Icon
						name={meta.icon}
						width={20}
						height={20}
						alt=""
						aria-hidden="true"
						colorToken={meta.iconColor}
					/>
				</Avatar>
			}
			trailing={
				<IconButton size={44} variant="secondary" aria-label="Информация о вызове">
					<Icon
						name="status-info-outline"
						width={20}
						height={20}
						alt=""
						aria-hidden="true"
						colorToken="content-secondary"
					/>
				</IconButton>
			}
		/>
	);
}

function CallSection({
	title,
	calls,
	searchQuery,
}: {
	title: string;
	calls: CallLogEntry[];
	searchQuery?: string;
}) {
	if (calls.length === 0) {
		return null;
	}

	return (
		<List title={title}>
			{calls.map((call) => (
				<CallRow key={call.id} call={call} searchQuery={searchQuery} />
			))}
		</List>
	);
}

function EmptyCallsState({ filter }: { filter: CallsFilter }) {
	return (
		<List title="История">
			<Cell
				leading={
					<Avatar background="content-background">
						<Icon
							name="phone-outline"
							width={20}
							height={20}
							alt=""
							aria-hidden="true"
						/>
					</Avatar>
				}
				title={
					<Text variant="medium-18" color="primary">
						{filter === 'missed' ? 'Пропущенных вызовов нет' : 'История вызовов пуста'}
					</Text>
				}
				subtitle={
					<Text variant="regular-14" color="secondary">
						{filter === 'missed'
							? 'Новые пропущенные вызовы появятся здесь.'
							: 'Совершите звонок, чтобы увидеть его в списке.'}
					</Text>
				}
			/>
		</List>
	);
}

export function CallsScreen({ title, filter, mode = 'default' }: CallsScreenProps) {
	const navigate = useNavigate();
	const isSearchMode = mode === 'search';
	const [searchQuery, setSearchQuery] = useState('');

	const filteredCalls = useMemo(() => getCallsByFilter(filter), [filter]);
	const { today, earlier } = useMemo(() => splitCallsByGroup(filteredCalls), [filteredCalls]);
	const activeSearchQuery = searchQuery.trim();
	const searchResults = useMemo(
		() => searchCalls(filteredCalls, activeSearchQuery),
		[filteredCalls, activeSearchQuery],
	);

	const handleOpenSearch = () => {
		setSearchQuery('');
		navigate(callsRoutes.search);
	};

	const handleCloseSearch = () => {
		setSearchQuery('');
		navigate(filter === 'missed' ? callsRoutes.missed : callsRoutes.main);
	};

	const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Escape') {
			return;
		}

		event.preventDefault();
		handleCloseSearch();
	};

	return (
		<App>
			<div className={`calls-screen${isSearchMode ? ' is-search-mode' : ''}`}>
				{isSearchMode ? (
					<div className="calls-screen__search">
						<SearchBar
							type="search"
							hideSearchIcon={true}
							autoFocus
							placeholder="Поиск"
							aria-label="Поиск по вызовам"
							value={searchQuery}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setSearchQuery(event.target.value)
							}
							onKeyDown={handleSearchKeyDown}
							fieldRightButton={
								<IconButton
									size={32}
									variant="primary"
									onClick={handleCloseSearch}
									aria-label="Назад"
								>
									<Icon
										name="close"
										width={16}
										height={16}
										alt=""
										aria-hidden="true"
									/>
								</IconButton>
							}
						/>
					</div>
				) : (
					<>
						<Header title={title} />
						<SegmentedTabs
							tabs={callsFilterTabs}
							value={filter}
							onChange={(tabId) =>
								navigate(tabId === 'missed' ? callsRoutes.missed : callsRoutes.main)
							}
							buttonPosition="left"
							button={
								<IconButton
									size={60}
									aria-label="Поиск"
									background="content-background"
									onClick={handleOpenSearch}
								>
									<Icon name="search" alt="" width={24} height={24} />
								</IconButton>
							}
						/>
					</>
				)}

				<View>
					{isSearchMode ? (
						<div className="calls-screen__search-content">
							{activeSearchQuery.length === 0 ? null : searchResults.length === 0 ? (
								<div className="calls-screen__search-empty">
									<Text variant="regular-20" color="secondary">
										Ничего не найдено
									</Text>
								</div>
							) : (
								<ListContainer>
									<List>
										{searchResults.map((call) => (
											<CallRow
												key={call.id}
												call={call}
												searchQuery={activeSearchQuery}
											/>
										))}
									</List>
								</ListContainer>
							)}
						</div>
					) : (
						<ListContainer>
							{filteredCalls.length === 0 ? (
								<EmptyCallsState filter={filter} />
							) : null}
							<CallSection title="Сегодня" calls={today} />
							<CallSection title="Ранее" calls={earlier} />
						</ListContainer>
					)}
				</View>

				<CallsNav active="calls" navigate={navigate} />
			</div>
		</App>
	);
}


export function DialpadScreen() {
	const navigate = useNavigate();
	const [dialedNumber, setDialedNumber] = useState('89270889445');
	const playDialTone = useDialTone();

	const handleKeyPress = (value: string) => {
		setDialedNumber((current) => `${current}${value}`);
	};

	const handleBackspace = () => {
		setDialedNumber((current) => current.slice(0, -1));
	};

	return (
		<App className="calls-dialpad-app">
			<div className="calls-dialpad-screen">
				<div className="calls-dialpad-screen__display" aria-live="polite">
					<div className="calls-dialpad-screen__number">{formatDialedNumber(dialedNumber)}</div>
					<button type="button" className="calls-dialpad-screen__add-contact">
						Добавить контакт
					</button>
				</div>

				<div className="calls-dialpad-screen__keys" aria-label="Клавиатура набора номера">
					{dialpadKeys.map((key) => (
						<button
							key={key.value}
							type="button"
							className="calls-dialpad-screen__key"
							onPointerDown={() => playDialTone(key.value)}
							onClick={() => handleKeyPress(key.value)}
							onKeyDown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									playDialTone(key.value);
								}
							}}
							aria-label={`Клавиша ${key.value}`}
						>
							<span className="calls-dialpad-screen__key-value">{key.value}</span>
							{key.hint ? (
								<span className="calls-dialpad-screen__key-hint">{key.hint}</span>
							) : null}
						</button>
					))}
				</div>

				<div className="calls-dialpad-screen__actions">
					<div />
					<button type="button" className="calls-dialpad-screen__call" aria-label="Позвонить">
						<Icon name="phone" width={20} height={20} alt="" aria-hidden="true" colorToken="content-constant" />
					</button>
					<button
						type="button"
						className="calls-dialpad-screen__backspace"
						onClick={handleBackspace}
						aria-label="Удалить символ"
					>
						<Icon name="delete-close" width={24} height={24} alt="" aria-hidden="true" colorToken="content-secondary" />
					</button>
				</div>

				<CallsNav active="dialpad" navigate={navigate} />
			</div>
		</App>
	);
}
