import {
	CSSProperties,
	KeyboardEvent,
	PointerEvent,
	ReactNode,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon, type IconName } from '../../ui/Icon';
import './SecuritySheet.scss';

export type SecurityTone = 'danger' | 'warning' | 'info' | 'success';

/** Тона кнопок совпадают с Alert. */
export type SecuritySheetActionTone = 'accent' | 'danger' | 'neutral';

export type SecuritySheetAction = {
	label: string;
	tone?: SecuritySheetActionTone;
	/** Может вернуть Promise — пока он не завершится, кнопки заблокированы. */
	onSelect?: () => void | Promise<void>;
};

export type SecuritySheetFact = {
	label: string;
	value: string;
};

/** Вариант выбора в виде системной ячейки: иконка, подпись, шеврон. */
export type SecuritySheetOption = {
	icon: IconName;
	label: string;
	onSelect?: () => void | Promise<void>;
};

export type SecuritySheetProps = {
	icon: IconName;
	tone: SecurityTone;
	title: string;
	description: string;
	facts?: ReadonlyArray<SecuritySheetFact>;
	/** Подводка над списком вариантов, например «Выберите способ отправки:». */
	prompt?: string;
	options?: ReadonlyArray<SecuritySheetOption>;
	actions?: ReadonlyArray<SecuritySheetAction>;
	children?: ReactNode;
	onClose: () => void;
};

// Тайминги Alert: появление 200 мс, закрытие 150 мс, ввод блокируется на 300 мс.
const inputGuardMs = 300;
const exitDurationMs = 150;
const dismissDistancePx = 96;
const dismissVelocityPxPerMs = 0.6;

export function SecuritySheet({
	icon,
	tone,
	title,
	description,
	facts,
	prompt,
	options,
	actions = [],
	children,
	onClose,
}: SecuritySheetProps) {
	const panelRef = useRef<HTMLDivElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const returnFocusRef = useRef<HTMLElement | null>(null);
	const dragRef = useRef<{ startY: number; startTime: number; pointerId: number } | null>(null);
	const [canInteract, setCanInteract] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [pendingIndex, setPendingIndex] = useState<number | null>(null);
	const [dragOffset, setDragOffset] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const titleId = useId();
	const descriptionId = useId();

	useEffect(() => {
		returnFocusRef.current = document.activeElement as HTMLElement | null;
		titleRef.current?.focus({ preventScroll: true });
		const inputTimer = window.setTimeout(() => setCanInteract(true), inputGuardMs);

		return () => {
			window.clearTimeout(inputTimer);
			returnFocusRef.current?.focus({ preventScroll: true });
		};
	}, []);

	const close = () => {
		if (!canInteract || isClosing) {
			return;
		}

		setIsClosing(true);
		window.setTimeout(onClose, exitDurationMs);
	};

	const handleAction = async (
		action: Pick<SecuritySheetAction, 'onSelect'>,
		index: number,
	) => {
		if (!canInteract || isClosing || pendingIndex !== null) {
			return;
		}

		const result = action.onSelect?.();
		if (result instanceof Promise) {
			setPendingIndex(index);
			await result;
			setPendingIndex(null);
		}

		setIsClosing(true);
		window.setTimeout(onClose, exitDurationMs);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
			return;
		}

		if (event.key !== 'Tab') {
			return;
		}

		const focusable = Array.from(
			panelRef.current?.querySelectorAll<HTMLElement>(
				'button:not(:disabled), [role="button"][tabindex="0"]',
			) ?? [],
		);

		if (focusable.length === 0) {
			event.preventDefault();
			titleRef.current?.focus({ preventScroll: true });
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!canInteract || isClosing || pendingIndex !== null) {
			return;
		}

		dragRef.current = {
			startY: event.clientY,
			startTime: event.timeStamp,
			pointerId: event.pointerId,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
		setIsDragging(true);
	};

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) {
			return;
		}

		const delta = event.clientY - drag.startY;
		// Вверх тянется с сопротивлением, вниз — один к одному.
		setDragOffset(delta >= 0 ? delta : delta / 4);
	};

	const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) {
			return;
		}

		dragRef.current = null;
		setIsDragging(false);
		const delta = event.clientY - drag.startY;
		const velocity = delta / Math.max(event.timeStamp - drag.startTime, 1);

		if (delta > dismissDistancePx || (delta > 16 && velocity > dismissVelocityPxPerMs)) {
			setIsClosing(true);
			window.setTimeout(onClose, exitDurationMs);
			return;
		}

		setDragOffset(0);
	};

	const panelHeight = panelRef.current?.offsetHeight ?? 1;
	const scrimOpacity = isClosing ? 0 : 1 - Math.min(Math.max(dragOffset, 0) / panelHeight, 1);
	const isBusy = pendingIndex !== null;

	return (
		<div
			className={`security-sheet${isClosing ? ' is-closing' : ''}${isDragging ? ' is-dragging' : ''}`}
			onKeyDown={handleKeyDown}
		>
			<div
				className="security-sheet__scrim"
				aria-hidden="true"
				style={{ opacity: scrimOpacity }}
				onClick={isBusy ? undefined : close}
			/>
			<div
				ref={panelRef}
				className={`security-sheet__panel security-sheet__panel--${tone}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				style={{ '--security-sheet-drag': `${dragOffset}px` } as CSSProperties}
			>
				<div
					className="security-sheet__grabber"
					onPointerDown={handlePointerDown}
					onPointerMove={handlePointerMove}
					onPointerUp={handlePointerEnd}
					onPointerCancel={handlePointerEnd}
				>
					<Icon name={icon} width={48} height={48} className="security-sheet__icon" aria-hidden />
				</div>

				<div className="security-sheet__body">
					<h2 id={titleId} ref={titleRef} className="security-sheet__title" tabIndex={-1}>
						{title}
					</h2>
					<p id={descriptionId} className="security-sheet__description">
						{description}
					</p>

					{facts && facts.length > 0 ? (
						<div className="security-sheet__cells">
							{facts.map((fact) => (
								<Cell
									key={fact.label}
									title={<Text variant="regular-16" color="secondary">{fact.label}</Text>}
									trailing={<Text variant="medium-16">{fact.value}</Text>}
								/>
							))}
						</div>
					) : null}

					{prompt ? (
						<p className="security-sheet__prompt">{prompt}</p>
					) : null}

					{options && options.length > 0 ? (
						<div className="security-sheet__cells">
							{options.map((option, index) => (
								<Cell
									key={option.label}
									aria-disabled={isBusy || undefined}
									leading={
										<span className="security-sheet__option-icon" aria-hidden="true">
											{pendingIndex === actions.length + index ? (
												<span className="security-sheet__spinner" />
											) : (
												<Icon name={option.icon} width={24} height={24} aria-hidden />
											)}
										</span>
									}
									title={<Text variant="regular-16">{option.label}</Text>}
									trailing={<Icon name="chevron-right" width={24} height={24} aria-hidden />}
									onClick={() => void handleAction(option, actions.length + index)}
								/>
							))}
						</div>
					) : null}

					{children}
				</div>

				{actions.length > 0 ? (
					<div className="security-sheet__actions">
						{actions.map((action, index) => (
							<button
								key={action.label}
								type="button"
								className={`security-sheet__button security-sheet__button--${action.tone ?? (index === 0 ? 'accent' : 'neutral')}`}
								disabled={isBusy}
								onClick={() => void handleAction(action, index)}
							>
								{pendingIndex === index ? (
									<span className="security-sheet__spinner" aria-label="Выполняется" />
								) : (
									action.label
								)}
							</button>
						))}
					</div>
				) : (
					<div className="security-sheet__bottom-space" aria-hidden="true" />
				)}
			</div>
		</div>
	);
}
