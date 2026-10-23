import { useEffect, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from 'react';
import { Spoiler } from 'spoiled';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import type { GalleryPhoto } from './model';
import '../../animate/noise.scss';
import './sensitive.scss';

// Демо-код для прототипа: 8 цифр, как на макете.
export const SENSITIVE_PASSCODE = '12345678';

const PASSCODE_LENGTH = SENSITIVE_PASSCODE.length;
const KEYPAD_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Доступ к чувствительному контенту общий для всех экранов приложения в рамках сессии.
let sensitiveUnlocked = false;
const listeners = new Set<() => void>();

function setSensitiveUnlocked(value: boolean) {
	sensitiveUnlocked = value;
	listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function useSensitiveAccess() {
	const unlocked = useSyncExternalStore(subscribe, () => sensitiveUnlocked);

	return {
		unlocked,
		unlock: () => setSensitiveUnlocked(true),
		lock: () => setSensitiveUnlocked(false),
	};
}

export function isPhotoLocked(photo: GalleryPhoto, unlocked: boolean) {
	return Boolean(photo.sensitive) && !unlocked;
}

const stopPointer = (event: ReactPointerEvent) => {
	event.stopPropagation();
};

type SensitiveMediaProps = {
	photo: GalleryPhoto;
	locked: boolean;
	variant: 'thumb' | 'viewer';
	alt?: string;
	className?: string;
};

/**
 * Скрывает фото под размытием, анимированным шумом и облаком частиц (как спойлер в Telegram).
 * Частицы рисует библиотека `spoiled` (https://github.com/molefrog/spoiled),
 * при снятии блокировки фото проявляется iris-переходом.
 */
export function SensitiveMedia({ photo, locked, variant, alt = '', className }: SensitiveMediaProps) {
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
				transition="iris"
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

type PasscodeScreenProps = {
	onBack: () => void;
	onSuccess: () => void;
};

export function PasscodeScreen({ onBack, onSuccess }: PasscodeScreenProps) {
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
		}, 160);

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
			<div className="sensitive-passcode__top">
				<IconButton variant="primary" aria-label="Назад" onClick={onBack}>
					<Icon name="arrow-left" width={24} height={24} aria-hidden="true" />
				</IconButton>
			</div>

			<div className="sensitive-passcode__head">
				<Icon name="lock" width={24} height={24} aria-hidden="true" />
				<Text as="div" variant="semiBold-20">
					Введите код-пароль
				</Text>
				<div
					key={shakeKey}
					className={`sensitive-passcode__dots${error ? ' is-error' : ''}`}
					aria-label={`Введено ${code.length} из ${PASSCODE_LENGTH} цифр`}
				>
					{Array.from({ length: PASSCODE_LENGTH }, (_, index) => (
						<span
							key={index}
							className={`sensitive-passcode__dot${index < code.length ? ' is-filled' : ''}`}
						/>
					))}
				</div>
				<Text
					as="div"
					variant="regular-12"
					color="secondary"
					className={`sensitive-passcode__hint${error ? ' is-error' : ''}`}
				>
					{error ? 'Неверный код-пароль' : `Демо-код: ${SENSITIVE_PASSCODE}`}
				</Text>
			</div>

			<div className="sensitive-passcode__keypad">
				{KEYPAD_DIGITS.map((digit) => (
					<button
						key={digit}
						type="button"
						className="sensitive-passcode__key"
						onClick={() => pressDigit(digit)}
					>
						<Text as="span" variant="medium-24">
							{digit}
						</Text>
					</button>
				))}
				<button
					type="button"
					className="sensitive-passcode__key is-text"
					onClick={() => setCode((current) => current.slice(0, -1))}
				>
					<Text as="span" variant="medium-14">
						Не помню
					</Text>
				</button>
				<button
					type="button"
					className="sensitive-passcode__key"
					onClick={() => pressDigit('0')}
				>
					<Text as="span" variant="medium-24">
						0
					</Text>
				</button>
				<button type="button" className="sensitive-passcode__key is-text">
					<Text as="span" variant="medium-14">
						SOS
					</Text>
				</button>
			</div>
		</div>
	);
}
