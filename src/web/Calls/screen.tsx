import { ChangeEvent, KeyboardEvent, ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { SearchBar } from '../../ui/SearchBar';
import { ScreenScaffold } from '../../ui/ScreenScaffold';
import { Tabs } from '../../ui/Tabs';
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

function getCallDirectionMeta(direction: CallDirection) {
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
				) : null}

				<ScreenScaffold
					header={
						isSearchMode ? undefined : <Header title={title} />
					}
					topActions={
						isSearchMode ? undefined : (
							<Tabs
								tabs={callsFilterTabs}
								value={filter}
								onChange={(tabId) =>
									navigate(
										tabId === 'missed' ? callsRoutes.missed : callsRoutes.main,
									)
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
						)
					}
					bottomActions={
						<Nav
							items={callsNavItems.map((item) => {
								const path = item.path;

								return {
									id: item.id,
									label: item.label,
									active: item.id === 'calls',
									onClick: path ? () => navigate(path) : undefined,
									icon: (
										<Icon
											name={item.icon}
											width={20}
											height={20}
											alt=""
											aria-hidden="true"
											colorToken={
												item.id === 'calls'
													? 'content-primary'
													: 'content-secondary'
											}
										/>
									),
								};
							})}
						/>
					}
				>
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
				</ScreenScaffold>
			</div>
		</App>
	);
}
