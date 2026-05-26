import { cn } from '../../ui/lib/cn';

export const DAILY_GOAL_DEFAULT = 15;
export const SUCCESS_GOAL_PREVIEW = 3;

export const weekDayOptions = [
	{ id: 0, label: 'ПН' },
	{ id: 1, label: 'ВТ' },
	{ id: 2, label: 'СР' },
	{ id: 3, label: 'ЧТ' },
	{ id: 4, label: 'ПТ' },
	{ id: 5, label: 'СБ' },
	{ id: 6, label: 'ВС' },
] as const;

export function clampProgress(value: number, max: number) {
	return Math.min(Math.max(value, 0), max);
}

type TaskProgressMeterProps = {
	value: number;
	max: number;
	showCount?: boolean;
	variant?: 'header' | 'goal';
	className?: string;
	ariaLabel?: string;
};

export function TaskProgressMeter({
	value,
	max,
	showCount = true,
	variant = 'header',
	className,
	ariaLabel = 'Прогресс дневной нормы',
}: TaskProgressMeterProps) {
	const normalizedMax = Math.max(max, 1);
	const normalizedValue = Math.max(value, 0);
	const completedSegmentCount = clampProgress(normalizedValue, normalizedMax);
	const segments = Array.from({ length: normalizedMax }, (_, index) => index);

	return (
		<div
			className={cn(
				'reminders-progress',
				`reminders-progress--${variant}`,
				className,
			)}
			role="img"
			aria-label={`${ariaLabel}: ${normalizedValue} из ${normalizedMax}`}
		>
			<div className="reminders-progress__track" aria-hidden="true">
				{segments.map((segment) => {
					const isComplete = segment < completedSegmentCount;
					const isActive = variant === 'goal' && segment === completedSegmentCount - 1;

					return (
						<span
							key={segment}
							className={cn(
								'reminders-progress__segment',
								isComplete ? 'is-complete' : '',
								isActive ? 'is-active' : '',
							)}
						/>
					);
				})}
			</div>
			{showCount ? (
				<span className="reminders-progress__count" aria-hidden="true">
					<span>{normalizedValue}</span>
					<span>/{normalizedMax}</span>
				</span>
			) : null}
		</div>
	);
}

type WeekdayPlanProps = {
	selectedDays: number[];
	disabledDays?: number[];
	count?: number;
	total?: number;
	interactive?: boolean;
	className?: string;
	onToggleDay?: (dayId: number) => void;
};

export function WeekdayPlan({
	selectedDays,
	disabledDays = [],
	count = selectedDays.length,
	total = weekDayOptions.length,
	interactive = false,
	className,
	onToggleDay,
}: WeekdayPlanProps) {
	return (
		<div
			className={cn(
				'reminders-weekdays',
				interactive ? 'reminders-weekdays--interactive' : '',
				className,
			)}
		>
			<div className="reminders-weekdays__days" aria-label="План на неделю">
				{weekDayOptions.map((day) => {
					const isSelected = selectedDays.includes(day.id);
					const isDisabled = disabledDays.includes(day.id);
					const dayClassName = cn(
						'reminders-weekdays__day',
						isSelected ? 'is-selected' : '',
						isDisabled ? 'is-disabled' : '',
					);

					if (interactive) {
						return (
							<button
								key={day.id}
								type="button"
								className={dayClassName}
								aria-pressed={isSelected}
								onClick={() => onToggleDay?.(day.id)}
							>
								{day.label}
							</button>
						);
					}

					return (
						<span key={day.id} className={dayClassName}>
							{day.label}
						</span>
					);
				})}
			</div>
			<span className="reminders-weekdays__count" aria-label={`${count} из ${total}`}>
				<span>{count}</span>
				<span>/{total}</span>
			</span>
		</div>
	);
}
