import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { getReminderList } from './model';
import {
	clampProgress,
	DAILY_GOAL_DEFAULT,
	TaskProgressMeter,
	WeekdayPlan,
} from './progress';
import { getDefaultCreateTaskListId } from './store';

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

function clampGoal(value: number) {
	return Math.max(1, clampProgress(value, DAILY_GOAL_DEFAULT));
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

export function normalizeGoal(value: number) {
	return clampGoal(value);
}

export function GoalSetupModal({
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
				<h2 id="reminders-goal-title">Продуктивность</h2>

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
					<p>Не нужно героизма: поставьте реалистичную норму на день.</p>
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
					<p>Мы будем показывать прогресс и вовремя отмечать закрытые дела.</p>
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

export function CongratulationsModal({
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
				<h2 id="reminders-congrats-title">Сегодня вы правда продвинулись</h2>
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
				Продолжить
			</Button>
		</div>
	);
}

export function CreateTaskModal({
	title,
	onChangeTitle,
	onSubmit,
	onClose,
}: {
	title: string;
	onChangeTitle: (value: string) => void;
	onSubmit: () => void;
	onClose: () => void;
}) {
	const list = getReminderList(getDefaultCreateTaskListId());
	const trimmedTitle = title.trim();

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!trimmedTitle) {
			return;
		}

		onSubmit();
	};

	return (
		<form
			className="reminders-screen__sheet reminders-screen__create-task-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="reminders-create-task-title"
			onSubmit={handleSubmit}
		>
			<div className="reminders-screen__create-task-panel">
				<div className="reminders-screen__create-task-header">
					<h2 id="reminders-create-task-title">Новая задача</h2>
					<IconButton
						size={32}
						variant="primary"
						type="button"
						aria-label="Закрыть создание задачи"
						onClick={onClose}
					>
						<Icon name="close" width={16} height={16} alt="" aria-hidden="true" />
					</IconButton>
				</div>

				<input
					className="reminders-screen__create-task-input"
					type="text"
					value={title}
					autoFocus
					placeholder="Название задачи"
					aria-label="Название задачи"
					onChange={(event) => onChangeTitle(event.target.value)}
				/>

				<div
					className="reminders-screen__create-task-controls"
					aria-label="Параметры задачи"
				>
					<button
						className="reminders-screen__create-task-chip"
						type="button"
						disabled
						aria-label="Дата выбрана автоматически: сегодня"
					>
						<Icon
							name="calendar-today-outline"
							width={18}
							height={18}
							alt=""
							aria-hidden="true"
						/>
						<span>Сегодня</span>
					</button>
					<button
						className="reminders-screen__create-task-chip"
						type="button"
						disabled
						aria-label={`Категория выбрана автоматически: ${list.label}`}
					>
						<Icon name={list.icon} width={18} height={18} alt="" aria-hidden="true" />
						<span>{list.label}</span>
					</button>
				</div>
			</div>

			<Button
				className="reminders-screen__modal-button reminders-screen__create-task-submit"
				type="submit"
				size={60}
				variant="accent"
				disabled={!trimmedTitle}
			>
				Создать
			</Button>
		</form>
	);
}
