import {
	KeyboardEvent,
	ReactNode,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Switch } from '../../ui/Switch';
import { FlowPage } from '../FlowPage';
import './playground.scss';

type AlertVariant = 'system' | 'destructive' | 'informative';
type AlertState = 'idle' | 'loading' | 'error';
type ActionCount = '1' | '2' | '3';

type AlertCopy = {
	title: string;
	description: string;
	action: string;
	secondary: string;
	dismiss: string;
	help: string;
};

const variantOptions: ReadonlyArray<{ value: AlertVariant; label: string }> = [
	{ value: 'system', label: 'Системный' },
	{ value: 'destructive', label: 'Деструктивный' },
	{ value: 'informative', label: 'Информирующий' },
];

const stateOptions: ReadonlyArray<{ value: AlertState; label: string }> = [
	{ value: 'idle', label: 'Обычное' },
	{ value: 'loading', label: 'Выполнение' },
	{ value: 'error', label: 'Ошибка' },
];

const actionCountOptions: ReadonlyArray<{ value: ActionCount; label: string }> = [
	{ value: '1', label: '1 кнопка' },
	{ value: '2', label: '2 кнопки' },
	{ value: '3', label: '3 кнопки' },
];

const copyByVariant: Record<AlertVariant, AlertCopy> = {
	system: {
		title: 'Разрешить доступ к микрофону?',
		description: 'Приложение «Звонки» сможет использовать микрофон во время разговора.',
		action: 'Разрешить',
		secondary: 'Только при использовании',
		dismiss: 'Не сейчас',
		help: 'Как используется доступ',
	},
	destructive: {
		title: 'Удалить копию «Телефон»?',
		description: 'Копия размером 2,4 ГБ будет удалена без возможности восстановления.',
		action: 'Удалить',
		secondary: 'Сохранить в архиве',
		dismiss: 'Отмена',
		help: 'Подробнее о резервных копиях',
	},
	informative: {
		title: 'Необходимо обновить ПО',
		description: 'Вы можете запустить обновление вручную в течение 24 часов.',
		action: 'Обновить',
		secondary: 'Обновить ночью',
		dismiss: 'Отложить',
		help: 'Что изменится',
	},
};

const errorCopy: AlertCopy = {
	title: 'Не удалось выполнить действие',
	description: 'Сервис временно не отвечает. Проверьте подключение и повторите попытку.',
	action: 'Повторить',
	secondary: 'Открыть настройки',
	dismiss: 'Закрыть',
	help: 'Как решить проблему',
};

type SelectControlProps<T extends string> = {
	label: string;
	description: string;
	value: T;
	options: ReadonlyArray<{ value: T; label: string }>;
	onChange: (value: T) => void;
};

function SelectControl<T extends string>({
	label,
	description,
	value,
	options,
	onChange,
}: SelectControlProps<T>) {
	return (
		<Cell
			title={<Text variant="regular-16">{label}</Text>}
			subtitle={
				<Text variant="regular-12" color="secondary">
					{description}
				</Text>
			}
			trailing={
				<select
					className="alert-app__select"
					value={value}
					onChange={(event) => onChange(event.target.value as T)}
					aria-label={label}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			}
		/>
	);
}

type ToggleControlProps = {
	label: string;
	description: string;
	checked: boolean;
	onChange: (value: boolean) => void;
};

function ToggleControl({
	label,
	description,
	checked,
	onChange,
}: ToggleControlProps) {
	return (
		<Cell
			title={<Text variant="regular-16">{label}</Text>}
			subtitle={
				<Text variant="regular-12" color="secondary">
					{description}
				</Text>
			}
			trailing={
				<Switch
					checked={checked}
					onChange={() => onChange(!checked)}
					aria-label={label}
				/>
			}
			onClick={() => onChange(!checked)}
		/>
	);
}

type AlertCardProps = {
	variant: AlertVariant;
	state: AlertState;
	actionCount: ActionCount;
	showDescription: boolean;
	showAttachments: boolean;
	showHelp: boolean;
	interactive?: boolean;
	onAction?: () => void;
	onDismiss?: () => void;
};

function AlertCard({
	variant,
	state,
	actionCount,
	showDescription,
	showAttachments,
	showHelp,
	interactive = false,
	onAction,
	onDismiss,
}: AlertCardProps) {
	const copy = state === 'error' ? errorCopy : copyByVariant[variant];
	const resolvedActionCount = Number(actionCount);
	const actionTone =
		state === 'error' || variant === 'informative'
			? 'accent'
			: variant === 'destructive'
				? 'danger'
				: 'neutral';
	const actionsDisabled = state === 'loading';

	return (
		<div className={`alert-card alert-card--${variant} alert-card--${state}`}>
		<h2 className="alert-card__title" tabIndex={-1}>
			{copy.title}
		</h2>
		{showDescription ? <p className="alert-card__description">{copy.description}</p> : null}
		{showAttachments ? (
			<div className="alert-card__attachments" aria-hidden="true">
				<span />
				<span />
				<span />
				<b>+2</b>
			</div>
		) : null}
		<div className="alert-card__actions">
			<button
				type="button"
				className={`alert-card__button alert-card__button--${actionTone}`}
				disabled={actionsDisabled}
				onClick={interactive && !actionsDisabled ? onAction : undefined}
				tabIndex={interactive ? undefined : -1}
			>
				{state === 'loading' ? <span className="alert-card__spinner" aria-label="Выполняется" /> : copy.action}
			</button>
			{resolvedActionCount >= 3 ? (
				<button
					type="button"
					className="alert-card__button alert-card__button--neutral"
					disabled={actionsDisabled}
					tabIndex={interactive ? undefined : -1}
				>
					{copy.secondary}
				</button>
			) : null}
			{resolvedActionCount >= 2 ? (
				<button
					type="button"
					className="alert-card__button alert-card__button--neutral"
					disabled={actionsDisabled}
					onClick={interactive && !actionsDisabled ? onDismiss : undefined}
					tabIndex={interactive ? undefined : -1}
				>
					{copy.dismiss}
				</button>
			) : null}
		</div>
		{showHelp ? (
			<button
				type="button"
				className="alert-card__help"
				disabled={actionsDisabled}
				tabIndex={interactive ? undefined : -1}
			>
				{copy.help}
			</button>
		) : null}
	</div>
	);
}

type LiveAlertProps = AlertCardProps & {
	onClose: () => void;
	onStateChange: (state: AlertState) => void;
};

function LiveAlert({ onClose, onStateChange, ...cardProps }: LiveAlertProps) {
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const returnFocusRef = useRef<HTMLElement | null>(null);
	const [isClosing, setIsClosing] = useState(false);
	const [canInteract, setCanInteract] = useState(false);
	const titleId = useId();

	useEffect(() => {
		returnFocusRef.current = document.activeElement as HTMLElement | null;
		dialogRef.current?.querySelector<HTMLElement>('.alert-card__title')?.focus();
		const inputTimer = window.setTimeout(() => setCanInteract(true), 300);

		return () => {
			window.clearTimeout(inputTimer);
			returnFocusRef.current?.focus();
		};
	}, []);

	const close = () => {
		if (!canInteract || isClosing) {
			return;
		}

		setIsClosing(true);
		window.setTimeout(onClose, 150);
	};

	const handleAction = () => {
		if (!canInteract || cardProps.state === 'loading') {
			return;
		}

		onStateChange('loading');
		window.setTimeout(() => onStateChange('error'), 900);
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
			dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? [],
		);

		if (focusable.length === 0) {
			event.preventDefault();
			dialogRef.current?.querySelector<HTMLElement>('.alert-card__title')?.focus();
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	return (
		<div
			className={`alert-live${isClosing ? ' is-closing' : ''}`}
			onKeyDown={handleKeyDown}
		>
			<div className="alert-live__scrim" aria-hidden="true" />
			<div
				ref={dialogRef}
				className="alert-live__dialog"
				role="alertdialog"
				aria-modal="true"
				aria-labelledby={titleId}
			>
				<div id={titleId} className="alert-live__title-proxy">
					{cardProps.state === 'error' ? errorCopy.title : copyByVariant[cardProps.variant].title}
				</div>
				<AlertCard
					{...cardProps}
					interactive
					onAction={handleAction}
					onDismiss={close}
				/>
			</div>
		</div>
	);
}

function Metric({ value, label }: { value: string; label: string }) {
	return (
		<div className="alert-app__metric">
			<Text variant="medium-20">{value}</Text>
			<Text variant="regular-12" color="secondary">
				{label}
			</Text>
		</div>
	);
}

export default function AlertPlaygroundPage() {
	const [variant, setVariant] = useState<AlertVariant>('destructive');
	const [state, setState] = useState<AlertState>('idle');
	const [actionCount, setActionCount] = useState<ActionCount>('2');
	const [showDescription, setShowDescription] = useState(true);
	const [showAttachments, setShowAttachments] = useState(false);
	const [showHelp, setShowHelp] = useState(false);
	const [isLiveOpen, setIsLiveOpen] = useState(false);
	const [liveState, setLiveState] = useState<AlertState>('idle');

	const previewLabel = useMemo(
		() => `${variantOptions.find((item) => item.value === variant)?.label} · ${stateOptions.find((item) => item.value === state)?.label}`,
		[variant, state],
	);

	const reset = () => {
		setVariant('destructive');
		setState('idle');
		setActionCount('2');
		setShowDescription(true);
		setShowAttachments(false);
		setShowHelp(false);
	};

	const liveAlert: ReactNode = isLiveOpen ? (
		<LiveAlert
			variant={variant}
			state={liveState}
			actionCount={actionCount}
			showDescription={showDescription}
			showAttachments={showAttachments}
			showHelp={showHelp}
			onStateChange={setLiveState}
			onClose={() => setIsLiveOpen(false)}
		/>
	) : undefined;

	return (
		<FlowPage
			header={
				<div className="alert-app__header">
					<div>
						<Text as="p" variant="medium-24">Alert</Text>
						<Text as="p" variant="regular-12" color="secondary">
							Интерактивная спецификация
						</Text>
					</div>
					<IconButton
						type="button"
						size={44}
						variant="primary"
						aria-label="Сбросить настройки"
						title="Сбросить настройки"
						onClick={reset}
					>
						<Icon name="arrow-history" width={20} height={20} alt="" aria-hidden="true" />
					</IconButton>
				</div>
			}
			overlayClassName="alert-app__overlay"
			overlay={liveAlert}
		>
			<div className="alert-app">
				<section className="alert-app__preview" aria-label={`Предпросмотр: ${previewLabel}`}>
					<div className="alert-app__preview-label">
						<span>Preview</span>
						<strong>{previewLabel}</strong>
					</div>
					<AlertCard
						variant={variant}
						state={state}
						actionCount={actionCount}
						showDescription={showDescription}
						showAttachments={showAttachments}
						showHelp={showHelp}
					/>
					<Button
						size={52}
						variant="secondary"
						className="alert-app__open-button"
						onClick={() => {
							setLiveState(state);
							setIsLiveOpen(true);
						}}
					>
						Показать на экране
					</Button>
				</section>

				<ListContainer>
					<List title="Конфигурация">
						<SelectControl
							label="Вариант"
							description="Определяет смысл основной кнопки"
							value={variant}
							options={variantOptions}
							onChange={setVariant}
						/>
						<SelectControl
							label="Состояние"
							description="Покой, выполнение или ошибка"
							value={state}
							options={stateOptions}
							onChange={setState}
						/>
						<SelectControl
							label="Действия"
							description="Три кнопки — максимальное количество"
							value={actionCount}
							options={actionCountOptions}
							onChange={setActionCount}
						/>
					</List>

					<List title="Слоты" collapsible>
						<ToggleControl
							label="Поясняющий текст"
							description="Только последствия, которых нет в заголовке"
							checked={showDescription}
							onChange={setShowDescription}
						/>
						<ToggleControl
							label="Вложения"
							description="До пяти объектов, затем счётчик"
							checked={showAttachments}
							onChange={setShowAttachments}
						/>
						<ToggleControl
							label="Третичная ссылка"
							description="Справка, которая не отвечает на вопрос"
							checked={showHelp}
							onChange={setShowHelp}
						/>
					</List>

					<List title="Метрики" collapsible defaultCollapsed>
						<div className="alert-app__metrics">
							<Metric value="328" label="max width" />
							<Metric value="24" label="padding" />
							<Metric value="52" label="button" />
							<Metric value="16" label="radius" />
							<Metric value="200 ms" label="появление" />
							<Metric value="150 ms" label="закрытие" />
						</div>
					</List>

					<List title="Неподвижные правила" collapsible defaultCollapsed>
						<Cell
							title={<Text variant="regular-16">Текст всегда слева</Text>}
							subtitle={<Text variant="regular-12" color="secondary">Заголовок содержит имя объекта</Text>}
						/>
						<Cell
							title={<Text variant="regular-16">Действие всегда первое</Text>}
							subtitle={<Text variant="regular-12" color="secondary">Отклоняющая кнопка — последняя</Text>}
						/>
						<Cell
							title={<Text variant="regular-16">Scrim не закрывает Alert</Text>}
							subtitle={<Text variant="regular-12" color="secondary">Нет свайпа и автоматического таймаута</Text>}
						/>
					</List>
				</ListContainer>
			</div>
		</FlowPage>
	);
}
