import type { CSSProperties } from 'react';
import { cn } from '../../ui/lib/cn';

export const DAILY_GOAL_DEFAULT = 15;
export const DAILY_PROGRESS_DEFAULT = 10;
export const GOAL_SETUP_PROGRESS_PREVIEW = 8;
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
	markerValue?: number;
	showCount?: boolean;
	variant?: 'header' | 'goal';
	className?: string;
	ariaLabel?: string;
};

export function TaskProgressMeter({
	value,
	max,
	markerValue = value,
	showCount = true,
	variant = 'header',
	className,
	ariaLabel = 'Прогресс дневной нормы',
}: TaskProgressMeterProps) {
	const segmentCount = Math.max(max, 1);
	const normalizedValue = clampProgress(value, segmentCount);
	const normalizedMarker = clampProgress(markerValue, segmentCount);
	const markerLeft = `${(normalizedMarker / segmentCount) * 100}%`;
	const segments = Array.from({ length: segmentCount }, (_, index) => index);

	return (
		<div
			className={cn(
				'reminders-progress',
				`reminders-progress--${variant}`,
				showCount ? 'reminders-progress--with-count' : '',
				className,
			)}
			style={{ '--reminders-progress-marker-left': markerLeft } as CSSProperties}
			role="img"
			aria-label={`${ariaLabel}: ${normalizedValue} из ${segmentCount}`}
		>
			<div className="reminders-progress__track" aria-hidden="true">
				{segments.map((segment) => (
					<span
						key={segment}
						className={cn(
							'reminders-progress__segment',
							segment < normalizedValue ? 'is-complete' : '',
						)}
					/>
				))}
				<span className="reminders-progress__marker" />
			</div>
			{showCount ? (
				<span className="reminders-progress__count" aria-hidden="true">
					<span>{normalizedValue}</span>
					<span>/{segmentCount}</span>
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
