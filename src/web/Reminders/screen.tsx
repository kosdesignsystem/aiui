import {
	ChangeEvent,
	CSSProperties,
	KeyboardEvent,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Search } from '../../ui/Search';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	createReminderScreenState,
	getReminderList,
	groupReminders,
	reminderFilterTabs,
	reminderSeeds,
	remindersRoutes,
	searchReminders,
	type Reminder,
	type ReminderFilter,
	type ReminderListId,
	type ReminderSectionId,
} from './model';
import {
	clampProgress,
	DAILY_GOAL_DEFAULT,
	TaskProgressMeter,
	WeekdayPlan,
} from './progress';
import {
	defaultSelectedGoalDays,
	goalSetupModalResetEventName,
	getStoredCompletedReminderIds,
	getStoredPlanGoal,
	getStoredSelectedDays,
	hasShownGoalSetupModalInSession,
	markGoalSetupModalShownInSession,
	saveCompletedReminderIdsInSession,
	savePlanGoalInSession,
	saveSelectedDaysInSession,
} from './session';
import './screen.scss';

type RemindersScreenProps = {
	title: string;
	filter: ReminderFilter;
	mode?: 'default' | 'search';
	modalPreview?: 'goal-setup' | 'success';
	previewGoal?: number;
	autoShowGoalSetup?: boolean;
};

type PreparedReminder = {
	title: string;
	dateOffset: number | null;
	dueTime?: string;
	listId: ReminderListId;
};

type RouteState = {
	from?: string;
};

type ConfettiPiece = {
	x: string;
	y: string;
	endX: string;
	endY: string;
	rotate: string;
	delay: string;
	color: string;
	shape: 'dot' | 'square' | 'strip';
};

type ConfettiStyle = CSSProperties & {
	'--confetti-x': string;
	'--confetti-y': string;
	'--confetti-end-x': string;
	'--confetti-end-y': string;
	'--confetti-rotate': string;
	'--confetti-delay': string;
	'--confetti-color': string;
};

const preparedReminders: PreparedReminder[] = [
	{
		title: 'Подготовить статус по проекту',
		dateOffset: 0,
		dueTime: '12:00',
		listId: 'work',
	},
	{
		title: 'Оплатить интернет',
		dateOffset: 1,
		dueTime: '19:00',
		listId: 'home',
	},
	{
		title: 'Записаться к врачу',
		dateOffset: 3,
		dueTime: '10:00',
		listId: 'personal',
	},
	{
		title: 'Отнести документы в офис',
		dateOffset: 7,
		dueTime: '09:30',
		listId: 'work',
	},
	{
		title: 'Разобрать список покупок',
		dateOffset: null,
		listId: 'home',
	},
];

const celebrationConfetti: ConfettiPiece[] = [
	{ x: '-118px', y: '-130px', endX: '-126px', endY: '250px', rotate: '-330deg', delay: '8ms', color: '#ff4d6d', shape: 'strip' },
	{ x: '-92px', y: '-206px', endX: '-108px', endY: '300px', rotate: '240deg', delay: '28ms', color: '#ffd166', shape: 'square' },
	{ x: '-52px', y: '-250px', endX: '-82px', endY: '342px', rotate: '-190deg', delay: '0ms', color: '#34c759', shape: 'dot' },
	{ x: '-10px', y: '-294px', endX: '-40px', endY: '376px', rotate: '310deg', delay: '18ms', color: '#45a3ff', shape: 'strip' },
	{ x: '42px', y: '-278px', endX: '18px', endY: '410px', rotate: '-260deg', delay: '38ms', color: '#ff8a00', shape: 'square' },
	{ x: '92px', y: '-230px', endX: '72px', endY: '394px', rotate: '290deg', delay: '12ms', color: '#9b5cff', shape: 'dot' },
	{ x: '136px', y: '-176px', endX: '136px', endY: '370px', rotate: '-230deg', delay: '48ms', color: '#00c2a8', shape: 'strip' },
	{ x: '184px', y: '-112px', endX: '202px', endY: '330px', rotate: '350deg', delay: '64ms', color: '#ff8ab3', shape: 'dot' },
	{ x: '-128px', y: '-60px', endX: '-138px', endY: '404px', rotate: '-275deg', delay: '72ms', color: '#f9d423', shape: 'strip' },
	{ x: '-84px', y: '-120px', endX: '-116px', endY: '438px', rotate: '210deg', delay: '54ms', color: '#1dd1a1', shape: 'square' },
	{ x: '-24px', y: '-164px', endX: '-60px', endY: '454px', rotate: '-180deg', delay: '68ms', color: '#54a0ff', shape: 'dot' },
	{ x: '36px', y: '-152px', endX: '26px', endY: '462px', rotate: '340deg', delay: '82ms', color: '#ff6b6b', shape: 'strip' },
	{ x: '94px', y: '-128px', endX: '102px', endY: '448px', rotate: '-390deg', delay: '92ms', color: '#5f27cd', shape: 'square' },
	{ x: '156px', y: '-72px', endX: '180px', endY: '422px', rotate: '265deg', delay: '112ms', color: '#48dbfb', shape: 'square' },
	{ x: '214px', y: '-26px', endX: '248px', endY: '382px', rotate: '-300deg', delay: '98ms', color: '#ff9f43', shape: 'dot' },
	{ x: '-106px', y: '-268px', endX: '-130px', endY: '210px', rotate: '420deg', delay: '104ms', color: '#ee5253', shape: 'strip' },
	{ x: '-62px', y: '-314px', endX: '-86px', endY: '246px', rotate: '-250deg', delay: '116ms', color: '#2ed573', shape: 'square' },
	{ x: '8px', y: '-338px', endX: '-18px', endY: '286px', rotate: '300deg', delay: '126ms', color: '#ffdd59', shape: 'dot' },
	{ x: '76px', y: '-304px', endX: '52px', endY: '322px', rotate: '-210deg', delay: '146ms', color: '#70a1ff', shape: 'strip' },
	{ x: '140px', y: '-246px', endX: '132px', endY: '360px', rotate: '230deg', delay: '136ms', color: '#ff4757', shape: 'square' },
	{ x: '198px', y: '-164px', endX: '210px', endY: '402px', rotate: '-320deg', delay: '152ms', color: '#7bed9f', shape: 'dot' },
	{ x: '238px', y: '-84px', endX: '270px', endY: '436px', rotate: '290deg', delay: '164ms', color: '#ffa502', shape: 'strip' },
	{ x: '-138px', y: '8px', endX: '-142px', endY: '486px', rotate: '-390deg', delay: '178ms', color: '#ff6bcb', shape: 'strip' },
	{ x: '230px', y: '22px', endX: '276px', endY: '498px', rotate: '360deg', delay: '188ms', color: '#22a6b3', shape: 'square' },
	{ x: '-76px', y: '-28px', endX: '-104px', endY: '520px', rotate: '260deg', delay: '202ms', color: '#c8ff00', shape: 'dot' },
	{ x: '-8px', y: '-64px', endX: '-34px', endY: '532px', rotate: '-340deg', delay: '214ms', color: '#ff3838', shape: 'strip' },
	{ x: '58px', y: '-54px', endX: '62px', endY: '524px', rotate: '410deg', delay: '226ms', color: '#17c0eb', shape: 'square' },
	{ x: '124px', y: '-18px', endX: '150px', endY: '500px', rotate: '-260deg', delay: '238ms', color: '#ffb8b8', shape: 'dot' },
	{ x: '188px', y: '42px', endX: '230px', endY: '472px', rotate: '220deg', delay: '250ms', color: '#32ff7e', shape: 'strip' },
	{ x: '-150px', y: '-192px', endX: '-156px', endY: '318px', rotate: '-240deg', delay: '34ms', color: '#18dcff', shape: 'square' },
	{ x: '-128px', y: '-248px', endX: '-144px', endY: '358px', rotate: '330deg', delay: '44ms', color: '#ffaf40', shape: 'dot' },
	{ x: '-22px', y: '-224px', endX: '-8px', endY: '506px', rotate: '-300deg', delay: '58ms', color: '#cd84f1', shape: 'strip' },
	{ x: '28px', y: '-236px', endX: '48px', endY: '548px', rotate: '270deg', delay: '76ms', color: '#fff200', shape: 'square' },
	{ x: '108px', y: '-198px', endX: '118px', endY: '536px', rotate: '-360deg', delay: '88ms', color: '#ff4f81', shape: 'dot' },
	{ x: '174px', y: '-218px', endX: '194px', endY: '516px', rotate: '385deg', delay: '108ms', color: '#00d2d3', shape: 'strip' },
	{ x: '254px', y: '-126px', endX: '296px', endY: '454px', rotate: '-290deg', delay: '122ms', color: '#ff9ff3', shape: 'square' },
	{ x: '292px', y: '-42px', endX: '330px', endY: '396px', rotate: '250deg', delay: '142ms', color: '#feca57', shape: 'dot' },
	{ x: '-118px', y: '-20px', endX: '-154px', endY: '552px', rotate: '-225deg', delay: '158ms', color: '#1dd1a1', shape: 'square' },
	{ x: '-42px', y: '18px', endX: '-74px', endY: '578px', rotate: '320deg', delay: '172ms', color: '#54a0ff', shape: 'strip' },
	{ x: '24px', y: '28px', endX: '20px', endY: '586px', rotate: '-280deg', delay: '186ms', color: '#ff6b6b', shape: 'dot' },
	{ x: '92px', y: '34px', endX: '104px', endY: '572px', rotate: '340deg', delay: '196ms', color: '#5f27cd', shape: 'strip' },
	{ x: '164px', y: '72px', endX: '196px', endY: '536px', rotate: '-310deg', delay: '208ms', color: '#48dbfb', shape: 'square' },
	{ x: '248px', y: '86px', endX: '304px', endY: '494px', rotate: '270deg', delay: '222ms', color: '#ff9f43', shape: 'dot' },
	{ x: '-166px', y: '-102px', endX: '-172px', endY: '420px', rotate: '300deg', delay: '62ms', color: '#ee5253', shape: 'strip' },
	{ x: '310px', y: '-96px', endX: '344px', endY: '372px', rotate: '-340deg', delay: '84ms', color: '#2ed573', shape: 'strip' },
	{ x: '-186px', y: '-6px', endX: '-198px', endY: '504px', rotate: '-260deg', delay: '132ms', color: '#ffdd59', shape: 'dot' },
	{ x: '330px', y: '10px', endX: '366px', endY: '450px', rotate: '330deg', delay: '156ms', color: '#70a1ff', shape: 'square' },
];

let reminderStore = reminderSeeds;
let preparedReminderCursor = 0;

function clampGoal(value: number) {
	return Math.max(1, clampProgress(value, DAILY_GOAL_DEFAULT));
}

function hasCompletedPlan(previousCount: number, nextCount: number, planGoal: number) {
	return planGoal > 0 && previousCount < planGoal && nextCount >= planGoal;
}

function getConfettiStyle(piece: ConfettiPiece): ConfettiStyle {
	return {
		'--confetti-x': piece.x,
		'--confetti-y': piece.y,
		'--confetti-end-x': piece.endX,
		'--confetti-end-y': piece.endY,
		'--confetti-rotate': piece.rotate,
		'--confetti-delay': piece.delay,
		'--confetti-color': piece.color,
	};
}

function getCompletedReminderIds(reminders: Reminder[]) {
	return reminders
		.filter((reminder) => reminder.completed)
		.map((reminder) => reminder.id);
}

function syncRemindersWithCompletedIds(reminders: Reminder[], completedReminderIds: string[]) {
	const completedReminderIdSet = new Set(completedReminderIds);

	return reminders.map((reminder) => {
		const shouldBeCompleted = completedReminderIdSet.has(reminder.id);

		if (shouldBeCompleted === reminder.completed) {
			return reminder;
		}

		if (shouldBeCompleted) {
			return {
				...reminder,
				completed: true,
				activeSection: reminder.section as Exclude<ReminderSectionId, 'completed'>,
				section: 'completed',
			};
		}

		return {
			...reminder,
			completed: false,
			section: reminder.activeSection ?? restoreReminderSection(reminder),
		};
	});
}

function useReminderStore() {
	const [reminders, setReminderState] = useState(() => {
		const nextReminders = syncRemindersWithCompletedIds(
			reminderStore,
			getStoredCompletedReminderIds(),
		);

		reminderStore = nextReminders;
		return nextReminders;
	});

	const setReminders = (updater: SetStateAction<Reminder[]>) => {
		setReminderState((current) => {
			const nextReminders =
				typeof updater === 'function'
					? (updater as (value: Reminder[]) => Reminder[])(current)
					: updater;

			reminderStore = nextReminders;
			return nextReminders;
		});
	};

	return [reminders, setReminders] as const;
}

function getFilterRoute(filter: ReminderFilter) {
	if (filter === 'all') {
		return remindersRoutes.all;
	}

	return remindersRoutes.today;
}

function toDateKey(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function getTomorrow(date: Date) {
	const tomorrow = new Date(date);
	tomorrow.setDate(date.getDate() + 1);

	return tomorrow;
}

function getDateByOffset(offset: number) {
	const date = new Date();
	date.setDate(date.getDate() + offset);

	return date;
}

function formatReminderDateLabel(dateKey: string) {
	if (!dateKey) {
		return 'Без срока';
	}

	const today = new Date();
	const tomorrow = getTomorrow(today);

	if (dateKey === toDateKey(today)) {
		return 'Сегодня';
	}

	if (dateKey === toDateKey(tomorrow)) {
		return 'Завтра';
	}

	const [year, month, day] = dateKey.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(date);
}

function getReminderSection(dateKey: string): Exclude<ReminderSectionId, 'completed'> {
	if (!dateKey) {
		return 'no-date';
	}

	const todayKey = toDateKey(new Date());

	if (dateKey < todayKey) {
		return 'overdue';
	}

	if (dateKey === todayKey) {
		return 'today';
	}

	return 'upcoming';
}

function getPreparedReminderDateKey(preset: PreparedReminder) {
	if (preset.dateOffset === null) {
		return '';
	}

	return toDateKey(getDateByOffset(preset.dateOffset));
}

function restoreReminderSection(reminder: Reminder): Exclude<ReminderSectionId, 'completed'> {
	if (reminder.dueLabel === 'Вчера') {
		return 'overdue';
	}

	if (reminder.dueLabel === 'Сегодня') {
		return 'today';
	}

	if (reminder.dueLabel === 'Без срока') {
		return 'no-date';
	}

	return 'upcoming';
}

function createReminderFromPreset(preset: PreparedReminder): Reminder {
	const dateKey = getPreparedReminderDateKey(preset);
	const section = getReminderSection(dateKey);

	return {
		id: `reminder-${Date.now()}-${preparedReminderCursor}`,
		title: preset.title,
		note: '',
		listId: preset.listId,
		section,
		activeSection: section,
		dueLabel: formatReminderDateLabel(dateKey),
		dueTime: preset.dueTime,
		priority: 'normal',
		completed: false,
	};
}

function formatReminderMeta(reminder: Reminder) {
	const list = getReminderList(reminder.listId);
	const segments = [
		reminder.dueTime ? `${reminder.dueLabel}, ${reminder.dueTime}` : reminder.dueLabel,
		list.label,
		reminder.repeatLabel,
	].filter(Boolean);

	return segments.join(' · ');
}

function getPlanProgress(reminders: Reminder[]) {
	return {
		completedCount: reminders.filter((reminder) => reminder.completed).length,
	};
}

function PlanProgress({
	filter,
	completedCount,
	planGoal,
	selectedDays,
}: {
	filter: ReminderFilter;
	completedCount: number;
	planGoal: number;
	selectedDays: number[];
}) {
	if (filter === 'all') {
		return (
			<section className="reminders-screen__plan" aria-label="Прогресс недели">
				<WeekdayPlan
					selectedDays={selectedDays}
					disabledDays={[5, 6]}
					className="reminders-screen__week-stat"
				/>
			</section>
		);
	}

	return (
		<section className="reminders-screen__plan" aria-label="Прогресс дневной нормы">
			<TaskProgressMeter value={completedCount} max={planGoal} />
		</section>
	);
}

function GoalSetupModal({
	initialGoal,
	initialSelectedDays,
	onSave,
}: {
	initialGoal: number;
	initialSelectedDays: number[];
	onSave: (goal: number, selectedDays: number[]) => void;
}) {
	const [draftGoal, setDraftGoal] = useState(clampGoal(initialGoal));
	const [selectedDays, setSelectedDays] = useState(initialSelectedDays);

	useEffect(() => {
		setDraftGoal(clampGoal(initialGoal));
		setSelectedDays(initialSelectedDays);
	}, [initialGoal, initialSelectedDays]);

	const toggleWeekday = (dayId: number) => {
		setSelectedDays((current) => {
			if (current.includes(dayId)) {
				return current.filter((selectedDay) => selectedDay !== dayId);
			}

			return [...current, dayId].sort((left, right) => left - right);
		});
	};

	return (
		<div
			className="reminders-screen__sheet reminders-screen__goal-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="reminders-goal-title"
		>
			<div className="reminders-screen__goal-panel">
				<h2 id="reminders-goal-title">Настройка задач</h2>

				<section className="reminders-screen__goal-section">
					<div className="reminders-screen__setting-row">
						<h3>Количество задач в день</h3>
						<span>{draftGoal}</span>
					</div>
					<div className="reminders-screen__goal-range">
						<TaskProgressMeter
							value={draftGoal}
							max={DAILY_GOAL_DEFAULT}
							showCount={false}
							variant="goal"
							ariaLabel="Количество задач в день"
						/>
						<input
							type="range"
							min="1"
							max={DAILY_GOAL_DEFAULT}
							value={draftGoal}
							aria-label="Количество задач в день"
							onChange={(event) => setDraftGoal(Number(event.target.value))}
						/>
					</div>
					<p>Не нужно героизма. Поставьте реалистичную норму</p>
				</section>

				<section className="reminders-screen__goal-section">
					<div className="reminders-screen__setting-row">
						<h3>План на неделю</h3>
						<span>{selectedDays.length}</span>
					</div>
					<WeekdayPlan
						selectedDays={selectedDays}
						interactive
						onToggleDay={toggleWeekday}
						className="reminders-screen__goal-weekdays"
					/>
					<p>а мы будем показывать прогресс и вовремя отпразднуем закрытые дела.</p>
				</section>
			</div>
			<Button
				className="reminders-screen__modal-button"
				type="button"
				size={60}
				variant="accent"
				onClick={() => onSave(draftGoal, selectedDays)}
			>
				Начать
			</Button>
		</div>
	);
}

function CongratulationsModal({
	completedCount,
	planGoal,
	onClose,
}: {
	completedCount: number;
	planGoal: number;
	onClose: () => void;
}) {
	return (
		<div
			className="reminders-screen__sheet reminders-screen__congrats-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="reminders-congrats-title"
		>
			<div className="reminders-screen__congrats-panel">
				<div className="reminders-screen__achievement">
					<div className="reminders-screen__achievement-icon" aria-hidden="true">
						<span className="reminders-screen__achievement-emoji">🎉</span>
						<div className="reminders-screen__confetti-burst">
							{celebrationConfetti.map((piece, index) => (
								<span
									key={`${piece.x}-${piece.y}-${index}`}
									className={`reminders-screen__confetti-piece is-${piece.shape}`}
									style={getConfettiStyle(piece)}
								/>
							))}
						</div>
					</div>
					<span className="reminders-screen__achievement-badge">
						{completedCount} из {planGoal}
					</span>
				</div>
				<h2 id="reminders-congrats-title">Сегодня вы правда продвинулись.</h2>
				<p>
					Можно продолжать, а можно зафиксировать этот маленький, но честный выигрыш.
				</p>
			</div>
			<Button
				className="reminders-screen__modal-button"
				type="button"
				size={60}
				variant="accent"
				onClick={onClose}
			>
				Начать
			</Button>
		</div>
	);
}

function ReminderRow({ reminder, onToggle }: { reminder: Reminder; onToggle: () => void }) {
	const isDone = reminder.completed;

	return (
		<Cell
			className={isDone ? 'reminders-screen__cell is-completed' : 'reminders-screen__cell'}
			leading={
				<button
					className={
						isDone
							? 'reminders-screen__checkbox is-checked'
							: 'reminders-screen__checkbox'
					}
					type="button"
					role="checkbox"
					aria-checked={isDone}
					aria-label={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					title={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					onClick={onToggle}
				>
					<Avatar
						size={32}
						background={isDone ? 'accent-primary' : 'background-primary'}
						className="reminders-screen__checkbox-avatar"
					>
						{isDone ? (
							<Icon
								name="done"
								width={20}
								height={20}
								alt=""
								aria-hidden="true"
								colorToken="content-constant"
							/>
						) : null}
					</Avatar>
				</button>
			}
			title={
				<Text variant="medium-18" color={isDone ? 'secondary' : 'primary'}>
					<span className="reminders-screen__title">{reminder.title}</span>
				</Text>
			}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{formatReminderMeta(reminder)}
				</Text>
			}
		/>
	);
}

function EmptyRemindersState({ filter }: { filter: ReminderFilter }) {
	const title = filter === 'today' ? 'На сегодня пусто' : 'Список пуст';
	const description =
		filter === 'today'
			? 'Новые задачи на сегодня появятся здесь.'
			: 'Добавьте первое напоминание.';

	return (
		<List title="Напоминания">
			<Cell
				leading={
					<Avatar background="content-background">
						<Icon
							name="list-check"
							width={22}
							height={22}
							alt=""
							aria-hidden="true"
							colorToken="content-secondary"
						/>
					</Avatar>
				}
				title={
					<Text variant="medium-18" color="primary">
						{title}
					</Text>
				}
				subtitle={
					<Text variant="regular-14" color="secondary">
						{description}
					</Text>
				}
			/>
		</List>
	);
}

function SearchEmptyState() {
	return (
		<div className="reminders-screen__search-empty">
			<Text variant="regular-20" color="secondary">
				Ничего не найдено
			</Text>
		</div>
	);
}

export function RemindersScreen({
	title,
	filter,
	mode = 'default',
	modalPreview,
	previewGoal,
	autoShowGoalSetup = false,
}: RemindersScreenProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const routeState = (location.state ?? {}) as RouteState;
	const isSearchMode = mode === 'search';
	const [reminders, setReminders] = useReminderStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [planGoal, setPlanGoal] = useState(() =>
		previewGoal ?? clampGoal(getStoredPlanGoal(DAILY_GOAL_DEFAULT)),
	);
	const [selectedDays, setSelectedDays] = useState(() =>
		modalPreview ? defaultSelectedGoalDays : getStoredSelectedDays(),
	);
	const [activeModal, setActiveModal] = useState(modalPreview);
	const { filteredReminders, groupedReminders } = useMemo(
		() => createReminderScreenState(reminders, filter),
		[filter, reminders],
	);
	const planProgress = useMemo(() => getPlanProgress(reminders), [reminders]);
	const searchResults = useMemo(
		() => searchReminders(reminders, searchQuery),
		[reminders, searchQuery],
	);
	const groupedSearchResults = useMemo(() => groupReminders(searchResults), [searchResults]);

	useEffect(() => {
		if (modalPreview) {
			setActiveModal(modalPreview);
			return;
		}

		if (!autoShowGoalSetup || hasShownGoalSetupModalInSession()) {
			return;
		}

		markGoalSetupModalShownInSession();
		setActiveModal('goal-setup');
	}, [autoShowGoalSetup, modalPreview]);

	useEffect(() => {
		if (modalPreview || typeof window === 'undefined') {
			return undefined;
		}

		const handleGoalSetupReset = () => {
			setPlanGoal(DAILY_GOAL_DEFAULT);
			setSelectedDays(defaultSelectedGoalDays);
			setReminders((current) => syncRemindersWithCompletedIds(current, []));

			if (autoShowGoalSetup) {
				markGoalSetupModalShownInSession();
				setActiveModal('goal-setup');
			}
		};

		window.addEventListener(goalSetupModalResetEventName, handleGoalSetupReset);

		return () => window.removeEventListener(goalSetupModalResetEventName, handleGoalSetupReset);
	}, [autoShowGoalSetup, modalPreview]);

	const handleSaveGoal = (goal: number, nextSelectedDays: number[]) => {
		const nextGoal = clampGoal(goal);

		setPlanGoal(nextGoal);
		setSelectedDays(nextSelectedDays);

		if (!modalPreview) {
			savePlanGoalInSession(nextGoal);
			saveSelectedDaysInSession(nextSelectedDays);
		}

		if (!modalPreview) {
			setActiveModal(undefined);
		}
	};

	const handleOpenSearch = () => {
		setSearchQuery('');
		navigate(remindersRoutes.search, { state: { from: getFilterRoute(filter) } });
	};

	const handleCloseSearch = () => {
		setSearchQuery('');
		navigate(routeState.from ?? remindersRoutes.today);
	};

	const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Escape') {
			return;
		}

		event.preventDefault();
		handleCloseSearch();
	};

	const handleCreateTask = () => {
		const preset = preparedReminders[preparedReminderCursor % preparedReminders.length];
		preparedReminderCursor += 1;
		const nextReminder = createReminderFromPreset(preset);

		setReminders((current) => [nextReminder, ...current]);
		navigate(
			nextReminder.section === 'today' || nextReminder.section === 'overdue'
				? remindersRoutes.today
				: remindersRoutes.all,
		);
	};

	const toggleReminder = (reminderId: string) => {
		setReminders((current) => {
			const previousCompletedCount = getPlanProgress(current).completedCount;
			let completedTask = false;
			const nextReminders = current.map((reminder) => {
				if (reminder.id !== reminderId) {
					return reminder;
				}

				if (reminder.completed) {
					return {
						...reminder,
						completed: false,
						section: reminder.activeSection ?? restoreReminderSection(reminder),
					};
				}

				completedTask = true;

				return {
					...reminder,
					completed: true,
					activeSection: reminder.section as Exclude<ReminderSectionId, 'completed'>,
					section: 'completed',
				};
			});
			const nextCompletedCount = getPlanProgress(nextReminders).completedCount;

			if (
				completedTask &&
				!modalPreview &&
				hasCompletedPlan(previousCompletedCount, nextCompletedCount, planGoal)
			) {
				setActiveModal('success');
			}

			if (!modalPreview) {
				saveCompletedReminderIdsInSession(getCompletedReminderIds(nextReminders));
			}

			return nextReminders;
		});
	};

	const bottomActions = (
		<div className="reminders-screen__bottom">
			{!isSearchMode ? (
				<Button
					className="reminders-screen__add-task"
					type="button"
					size={60}
					variant="accent"
					onClick={handleCreateTask}
				>
					Создать задачу
				</Button>
			) : null}
		</div>
	);

	const modalOverlay = (
		<>
			{activeModal === 'goal-setup' ? (
				<GoalSetupModal
					initialGoal={planGoal}
					initialSelectedDays={selectedDays}
					onSave={handleSaveGoal}
				/>
			) : null}
			{activeModal === 'success' ? (
				<CongratulationsModal
					completedCount={modalPreview ? planGoal : planProgress.completedCount}
					planGoal={planGoal}
					onClose={() => {
						if (!modalPreview) {
							setActiveModal(undefined);
						}
					}}
				/>
			) : null}
		</>
	);
	const modalOverlayClassName = activeModal
		? `reminders-screen__modal-layer${activeModal === 'success' ? ' is-celebration' : ''}`
		: undefined;

	return (
		<FlowPage
			title={isSearchMode ? undefined : title}
			header={
				isSearchMode ? undefined : (
					<Header
						title={title}
						meta={
							<PlanProgress
								filter={filter}
								completedCount={planProgress.completedCount}
								planGoal={planGoal}
								selectedDays={selectedDays}
							/>
						}
					/>
				)
			}
			topActions={
				isSearchMode ? (
					<div className="reminders-screen__search">
						<Search
							type="search"
							hideSearchIcon={true}
							autoFocus
							placeholder="Поиск"
							aria-label="Поиск по напоминаниям"
							value={searchQuery}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setSearchQuery(event.target.value)
							}
							onKeyDown={handleSearchKeyDown}
							inputTrailing={
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
					<SegmentedTabs
						className="reminders-screen__tabs"
						tabs={reminderFilterTabs}
						value={filter}
						onChange={(tabId) => navigate(getFilterRoute(tabId as ReminderFilter))}
						ariaLabel="Фильтр напоминаний"
						action={{
							position: 'left',
							element: (
								<IconButton
									size={60}
									variant="primary"
									aria-label="Поиск"
									onClick={handleOpenSearch}
								>
									<Icon name="search" alt="" width={24} height={24} />
								</IconButton>
							),
						}}
					/>
				)
			}
			bottomActions={bottomActions}
			overlayClassName={modalOverlayClassName}
			overlay={modalOverlay}
		>
			{isSearchMode ? (
				<div className="reminders-screen__search-content">
					{searchQuery.trim().length === 0 ? null : searchResults.length === 0 ? (
						<SearchEmptyState />
					) : (
						<FlowPageList>
							{groupedSearchResults.map((section) => (
								<List key={section.id} title={section.title}>
									{section.reminders.map((reminder) => (
										<ReminderRow
											key={reminder.id}
											reminder={reminder}
											onToggle={() => toggleReminder(reminder.id)}
										/>
									))}
								</List>
							))}
						</FlowPageList>
					)}
				</div>
			) : (
				<FlowPageList>
					{filteredReminders.length === 0 ? (
						<EmptyRemindersState filter={filter} />
					) : null}
					{groupedReminders.map((section) => (
						<List
							key={section.id}
							title={section.title}
							collapsible={filter === 'all' && section.id === 'completed'}
							defaultCollapsed={filter === 'all' && section.id === 'completed'}
						>
							{section.reminders.map((reminder) => (
								<ReminderRow
									key={reminder.id}
									reminder={reminder}
									onToggle={() => toggleReminder(reminder.id)}
								/>
							))}
						</List>
					))}
				</FlowPageList>
			)}
		</FlowPage>
	);
}
