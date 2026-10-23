import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	useSyncExternalStore,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import { Spoiler } from 'spoiled';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Icon, type IconName } from '../../ui/Icon';
import { galleryPhotos, type GalleryPhoto } from './model';
import '../../animate/noise.scss';
import './sensitive.scss';

// Демо-код для прототипа: 4 цифры, как в PinPad приложения Launcher.
export const SENSITIVE_PASSCODE = '1234';

const PASSCODE_LENGTH = SENSITIVE_PASSCODE.length;
const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

// Длительность растворения/сборки частиц на фото.
export const SENSITIVE_TRANSITION_MS = 1400;

// Состояние общее для всех экранов приложения в рамках сессии:
// какие фото отмечены чувствительными и какие из них уже открыты код-паролем.
type SensitiveState = {
	sensitiveIds: ReadonlySet<string>;
	revealedIds: ReadonlySet<string>;
};

let sensitiveState: SensitiveState = {
	sensitiveIds: new Set(galleryPhotos.filter((photo) => photo.sensitive).map((photo) => photo.id)),
	revealedIds: new Set(),
};
const listeners = new Set<() => void>();

function setSensitiveState(update: (state: SensitiveState) => SensitiveState) {
	sensitiveState = update(sensitiveState);
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

function withId(ids: ReadonlySet<string>, id: string) {
	return new Set(ids).add(id);
}

function withoutId(ids: ReadonlySet<string>, id: string) {
	const next = new Set(ids);
	next.delete(id);
	return next;
}

export function useSensitiveAccess() {
	const state = useSyncExternalStore(subscribe, () => sensitiveState);
	const isSensitive = (photo: GalleryPhoto) => state.sensitiveIds.has(photo.id);
	const isLocked = (photo: GalleryPhoto) => isSensitive(photo) && !state.revealedIds.has(photo.id);

	return {
		isSensitive,
		isLocked,
		hasLocked: Array.from(state.sensitiveIds).some((id) => !state.revealedIds.has(id)),
		// Код-пароль открывает все чувствительные фото.
		unlockAll: () =>
			setSensitiveState((current) => ({ ...current, revealedIds: new Set(current.sensitiveIds) })),
		hide: (photo: GalleryPhoto) =>
			setSensitiveState((current) => ({
				...current,
				revealedIds: withoutId(current.revealedIds, photo.id),
			})),
		markSensitive: (photo: GalleryPhoto) =>
			setSensitiveState((current) => ({
				sensitiveIds: withId(current.sensitiveIds, photo.id),
				revealedIds: withoutId(current.revealedIds, photo.id),
			})),
		unmarkSensitive: (photo: GalleryPhoto) =>
			setSensitiveState((current) => ({
				sensitiveIds: withoutId(current.sensitiveIds, photo.id),
				revealedIds: withoutId(current.revealedIds, photo.id),
			})),
	};
}

export type LockTransition = 'dissolve' | 'assemble' | null;

type LockTransitionState = {
	photoId: string | null;
	locked: boolean;
	visualLocked: boolean;
	transition: LockTransition;
	runId: number;
};

/**
 * Превращает смену блокировки в анимацию: при открытии пелена растворяется,
 * при скрытии частицы собираются на фото. Во время анимации фото под canvas
 * уже/ещё видно, а пелена и спойлер включаются только в конце сборки.
 */
export function useLockTransition(photoId: string | null, locked: boolean) {
	const [state, setState] = useState<LockTransitionState>({
		photoId,
		locked,
		visualLocked: locked,
		transition: null,
		runId: 0,
	});
	let current = state;

	if (state.photoId !== photoId) {
		current = { photoId, locked, visualLocked: locked, transition: null, runId: state.runId };
		setState(current);
	} else if (state.locked !== locked) {
		current = {
			photoId,
			locked,
			visualLocked: false,
			transition: locked ? 'assemble' : 'dissolve',
			runId: state.runId + 1,
		};
		setState(current);
	}

	useEffect(() => {
		if (!state.transition) {
			return undefined;
		}

		const timeout = window.setTimeout(() => {
			setState((latest) =>
				latest.runId === state.runId
					? { ...latest, transition: null, visualLocked: latest.locked }
					: latest,
			);
		}, SENSITIVE_TRANSITION_MS);

		return () => window.clearTimeout(timeout);
	}, [state.runId, state.transition]);

	return {
		visualLocked: current.visualLocked,
		transition: current.transition,
		runId: current.runId,
	};
}

const stopPointer = (event: ReactPointerEvent) => {
	event.stopPropagation();
};

const VEIL_FILTER = 'blur(22px) grayscale(0.85) brightness(0.62)';
const DISSOLVE_CELL = 5;
const DISSOLVE_SPREAD = 0.55;
const DISSOLVE_LIFE = 0.42;

type DissolveCell = {
	x: number;
	y: number;
	color: string;
	start: number;
	vx: number;
	vy: number;
	spark: boolean;
};

function easeOutCubic(value: number) {
	return 1 - (1 - value) ** 3;
}

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject;
		image.src = src;
	});
}

function createCells(image: HTMLImageElement, width: number, height: number) {
	const source = document.createElement('canvas');
	source.width = width;
	source.height = height;
	const sourceContext = source.getContext('2d', { willReadFrequently: true });

	if (!sourceContext) {
		return [];
	}

	// Пелена: то же фото, растянутое по cover, размытое и обесцвеченное.
	const scale = Math.max(width / image.width, height / image.height) * 1.08;
	const drawWidth = image.width * scale;
	const drawHeight = image.height * scale;
	sourceContext.fillStyle = '#2a2c30';
	sourceContext.fillRect(0, 0, width, height);
	sourceContext.filter = VEIL_FILTER;
	sourceContext.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);

	const pixels = sourceContext.getImageData(0, 0, width, height).data;
	const centerX = width / 2;
	const centerY = height / 2;
	const maxDistance = Math.hypot(centerX, centerY);
	const cells: DissolveCell[] = [];

	for (let y = 0; y < height; y += DISSOLVE_CELL) {
		for (let x = 0; x < width; x += DISSOLVE_CELL) {
			const offset = (Math.min(y + 2, height - 1) * width + Math.min(x + 2, width - 1)) * 4;
			const dx = x - centerX;
			const dy = y - centerY;
			const distance = Math.hypot(dx, dy) / maxDistance;
			const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 1.2;
			const speed = 40 + Math.random() * 90;
			const spark = Math.random() < 0.12;

			cells.push({
				x,
				y,
				color: spark
					? 'rgba(255, 255, 255, 0.95)'
					: `rgb(${pixels[offset]}, ${pixels[offset + 1]}, ${pixels[offset + 2]})`,
				start: distance * DISSOLVE_SPREAD + Math.random() * 0.18,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed - 30 - Math.random() * 40,
				spark,
			});
		}
	}

	return cells;
}

/**
 * Растворение пелены в частицы (Thanos-snap / Telegram-эффект) и обратная сборка.
 * Пелена режется на клетки 5×5, каждая клетка с задержкой от центра превращается
 * в частицу, разлетается и гаснет. Сборка — то же самое, проигранное назад.
 */
function DissolveCanvas({ photo, direction }: { photo: GalleryPhoto; direction: 'dissolve' | 'assemble' }) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useLayoutEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		if (!canvas || !context) {
			return undefined;
		}

		const width = Math.max(1, Math.round(canvas.clientWidth));
		const height = Math.max(1, Math.round(canvas.clientHeight));
		canvas.width = width;
		canvas.height = height;

		if (direction === 'dissolve') {
			// Первый кадр — сплошная пелена, чтобы фото не мелькнуло до старта частиц.
			context.fillStyle = '#5a5c60';
			context.fillRect(0, 0, width, height);
		}

		let frame = 0;
		let cancelled = false;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		loadImage(photo.imageSrc).then((image) => {
			if (cancelled) {
				return;
			}

			const cells = createCells(image, width, height);
			const startedAt = performance.now();
			const duration = reducedMotion ? 1 : SENSITIVE_TRANSITION_MS - 80;

			const render = (now: number) => {
				const elapsed = Math.min((now - startedAt) / duration, 1);
				const time = direction === 'dissolve' ? elapsed : 1 - elapsed;
				const timeScale = DISSOLVE_SPREAD + 0.18 + DISSOLVE_LIFE;
				const t = time * timeScale;

				context.clearRect(0, 0, width, height);

				for (const cell of cells) {
					const progress = (t - cell.start) / DISSOLVE_LIFE;

					if (progress >= 1) {
						continue;
					}

					context.fillStyle = cell.color;

					if (progress <= 0) {
						if (!cell.spark) {
							context.fillRect(cell.x, cell.y, DISSOLVE_CELL, DISSOLVE_CELL);
						}
						continue;
					}

					const eased = easeOutCubic(progress);
					const size = cell.spark ? 2 : DISSOLVE_CELL * (1 - progress * 0.7);
					context.globalAlpha = 1 - progress;
					context.fillRect(cell.x + cell.vx * eased, cell.y + cell.vy * eased, size, size);
					context.globalAlpha = 1;
				}

				if (elapsed < 1) {
					frame = window.requestAnimationFrame(render);
				}
			};

			frame = window.requestAnimationFrame(render);
		});

		return () => {
			cancelled = true;
			window.cancelAnimationFrame(frame);
		};
	}, [direction, photo.imageSrc]);

	return <canvas ref={canvasRef} className="sensitive-media__dissolve" aria-hidden="true" />;
}

type SensitiveMediaProps = {
	photo: GalleryPhoto;
	locked: boolean;
	variant: 'thumb' | 'viewer';
	transition?: LockTransition;
	transitionKey?: number;
	alt?: string;
	className?: string;
};

/**
 * Скрывает фото под размытием, анимированным шумом и облаком частиц (как спойлер в Telegram).
 * Частицы рисует библиотека `spoiled` (https://github.com/molefrog/spoiled),
 * растворение и сборку пелены — DissolveCanvas.
 */
export function SensitiveMedia({
	photo,
	locked,
	variant,
	transition = null,
	transitionKey,
	alt = '',
	className,
}: SensitiveMediaProps) {
	return (
		<div
			className={`sensitive-media is-${variant}${locked ? ' is-locked' : ''}${
				className ? ` ${className}` : ''
			}`}
		>
			<img
				className="sensitive-media__veil"
				src={photo.imageSrc}
				alt=""
				aria-hidden="true"
				draggable={false}
			/>
			<span className="sensitive-media__noise animation-noise" aria-hidden="true" />
			<Spoiler
				tagName="div"
				className="sensitive-media__spoiler"
				hidden={locked}
				revealOn={false}
				transition={variant === 'viewer' ? 'none' : 'iris'}
				noiseFadeDuration={variant === 'viewer' ? 0.6 : undefined}
				theme="dark"
				accentColor="#ffffff"
				density={variant === 'viewer' ? 0.16 : 0.22}
				fps={variant === 'viewer' ? 30 : 20}
			>
				<img
					className="sensitive-media__image"
					src={photo.imageSrc}
					alt={locked ? '' : alt}
					aria-hidden={locked ? true : undefined}
					draggable={false}
				/>
			</Spoiler>
			{transition ? <DissolveCanvas key={transitionKey} photo={photo} direction={transition} /> : null}
		</div>
	);
}

export function SensitiveThumbMark({ locked }: { locked: boolean }) {
	return (
		<Icon
			name={locked ? 'lock' : 'eye-hidden'}
			width={locked ? 24 : 20}
			height={locked ? 24 : 20}
			className={`sensitive-thumb-mark${locked ? ' is-locked' : ''}`}
			colorToken="content-constant"
			aria-hidden="true"
		/>
	);
}

export function SensitiveNotice({ onEnterCode }: { onEnterCode: () => void }) {
	return (
		<div
			className="sensitive-notice"
			role="alert"
			onPointerDown={stopPointer}
			onDoubleClick={(event) => event.stopPropagation()}
		>
			<Icon
				name="status-warning-triangle"
				width={48}
				height={48}
				colorToken="system-warning-primary"
				aria-hidden="true"
			/>
			<Text as="div" variant="semiBold-20" className="sensitive-notice__title">
				Чувствительные данные
			</Text>
			<Text as="p" variant="regular-14" className="sensitive-notice__text">
				Это фото может содержать конфиденциальную информацию. Для просмотра введите
				код-пароль
			</Text>
			<Button variant="secondary" size={44} className="sensitive-notice__button" onClick={onEnterCode}>
				Ввести код-пароль
			</Button>
		</div>
	);
}

export function SensitiveBadge({ onHide }: { onHide: () => void }) {
	return (
		<button
			type="button"
			className="sensitive-badge"
			aria-label="Чувствительный контент. Скрыть снова"
			onPointerDown={stopPointer}
			onDoubleClick={(event) => event.stopPropagation()}
			onClick={onHide}
		>
			<Icon name="status-warning-triangle" width={20} height={20} colorToken="hsl(0 0% 8%)" aria-hidden="true" />
		</button>
	);
}

type SensitiveMenuProps = {
	sensitive: boolean;
	locked: boolean;
	onClose: () => void;
	onMark: () => void;
	onUnmark: () => void;
	onHide: () => void;
	onEnterCode: () => void;
};

type SensitiveMenuItem = {
	id: string;
	icon: IconName;
	label: string;
	onSelect: () => void;
};

export function SensitiveMenu({
	sensitive,
	locked,
	onClose,
	onMark,
	onUnmark,
	onHide,
	onEnterCode,
}: SensitiveMenuProps) {
	const items: SensitiveMenuItem[] = !sensitive
		? [{ id: 'mark', icon: 'lock-outline', label: 'Сделать чувствительным', onSelect: onMark }]
		: locked
			? [{ id: 'code', icon: 'unlock-outline', label: 'Ввести код-пароль', onSelect: onEnterCode }]
			: [
					{ id: 'hide', icon: 'eye-hidden-outline', label: 'Скрыть снова', onSelect: onHide },
					{
						id: 'unmark',
						icon: 'lock-remove-outline',
						label: 'Убрать из чувствительных',
						onSelect: onUnmark,
					},
				];

	return (
		<>
			<button
				type="button"
				className="sensitive-menu__backdrop"
				aria-label="Закрыть меню"
				onClick={onClose}
			/>
			<div className="sensitive-menu" role="menu" aria-label="Действия с фото">
				{items.map((item) => (
					<button
						key={item.id}
						type="button"
						role="menuitem"
						className="sensitive-menu__item"
						onClick={() => {
							onClose();
							item.onSelect();
						}}
					>
						<Icon name={item.icon} width={24} height={24} aria-hidden="true" />
						<Text as="span" variant="regular-16">
							{item.label}
						</Text>
					</button>
				))}
			</div>
		</>
	);
}

type PasscodeScreenProps = {
	backdrop?: GalleryPhoto | null;
	onBack: () => void;
	onSuccess: () => void;
};

/**
 * Экран ввода код-пароля — перенесён из `PinPad` приложения Launcher (ветка member/MK):
 * стеклянные клавиши, точки, «Не помню», SOS / Отменить. Фон — размытое текущее фото.
 */
export function PasscodeScreen({ backdrop, onBack, onSuccess }: PasscodeScreenProps) {
	const [code, setCode] = useState('');
	const [error, setError] = useState(false);
	const [shakeKey, setShakeKey] = useState(0);

	const pressDigit = (digit: string) => {
		setError(false);
		setCode((current) => (current.length >= PASSCODE_LENGTH ? current : current + digit));
	};

	useEffect(() => {
		if (code.length < PASSCODE_LENGTH) {
			return undefined;
		}

		const timeout = window.setTimeout(() => {
			if (code === SENSITIVE_PASSCODE) {
				onSuccess();
				return;
			}

			setError(true);
			setShakeKey((current) => current + 1);
			setCode('');
		}, 220);

		return () => window.clearTimeout(timeout);
	}, [code, onSuccess]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			event.stopPropagation();

			if (/^\d$/.test(event.key)) {
				pressDigit(event.key);
			} else if (event.key === 'Backspace') {
				setCode((current) => current.slice(0, -1));
			} else if (event.key === 'Escape') {
				onBack();
			}
		};

		window.addEventListener('keydown', handleKeyDown, true);
		return () => window.removeEventListener('keydown', handleKeyDown, true);
	}, [onBack]);

	return (
		<div className="sensitive-passcode" role="dialog" aria-modal="true" aria-label="Ввод код-пароля">
			{backdrop ? (
				<img className="sensitive-passcode__backdrop" src={backdrop.imageSrc} alt="" aria-hidden="true" />
			) : null}
			<div className="sensitive-passcode__pin">
				<Icon name="lock" width={22} height={22} aria-hidden="true" />
				<h1>Введите код-пароль</h1>
				<div
					key={shakeKey}
					className={`sensitive-passcode__dots${error ? ' is-error' : ''}`}
					aria-label={`Введено цифр: ${code.length}`}
				>
					{Array.from({ length: PASSCODE_LENGTH }, (_, index) => (
						<span key={index} className={index < code.length ? 'is-filled' : undefined} />
					))}
				</div>
				<button className="sensitive-passcode__forgot" type="button">
					{error ? 'Неверный код-пароль' : 'Не помню'}
				</button>
				<div className="sensitive-passcode__keys">
					{KEYPAD_DIGITS.map((digit) => (
						<button
							key={digit}
							className={digit === '0' ? 'is-zero' : undefined}
							type="button"
							onClick={() => pressDigit(digit)}
						>
							{digit}
						</button>
					))}
				</div>
				<div className="sensitive-passcode__actions">
					<button type="button">SOS</button>
					<button type="button" onClick={onBack}>
						Отменить
					</button>
				</div>
			</div>
		</div>
	);
}
