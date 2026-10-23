import { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Field } from '../../ui/Field';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { matchesDemoPin } from './private-session';
import './private-album.scss';

type PinSheetProps = {
	onClose: () => void;
	onUnlock: () => void;
};

export function PinSheet({ onClose, onUnlock }: PinSheetProps) {
	const [pin, setPin] = useState('');
	const [hasError, setHasError] = useState(false);
	const sheetRef = useRef<HTMLElement>(null);
	const dragStartRef = useRef<number | null>(null);
	const actionsRef = useRef({ onClose, onUnlock });
	actionsRef.current = { onClose, onUnlock };

	useEffect(() => {
		const previousFocus = document.activeElement as HTMLElement | null;
		sheetRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
		return () => {
			queueMicrotask(() => {
				if (previousFocus?.isConnected && !previousFocus.closest('[inert]')) previousFocus.focus();
			});
		};
	}, []);

	useEffect(() => {
		if (pin.length !== 4) return;
		const timer = window.setTimeout(() => {
			if (matchesDemoPin(pin)) {
				actionsRef.current.onUnlock();
			} else {
				setPin('');
				setHasError(true);
			}
		}, 180);
		return () => window.clearTimeout(timer);
	}, [pin]);

	const updatePin = (value: string) => {
		setPin(value.replace(/\D/g, '').slice(0, 4));
		setHasError(false);
	};

	return (
		<div className="gallery-pin-overlay">
			<button className="gallery-pin-overlay__backdrop" aria-label="Закрыть окно ввода кода" onClick={onClose} tabIndex={-1} />
			<section
				ref={sheetRef}
				className="gallery-pin-sheet"
				role="dialog"
				aria-modal="true"
				aria-labelledby="gallery-pin-title"
				aria-describedby="gallery-pin-description"
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault();
						onClose();
					} else if (event.key === 'Tab') {
						const items = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input') ?? []);
						const first = items[0];
						const last = items[items.length - 1];
						if (event.shiftKey && document.activeElement === first) {
							event.preventDefault(); last?.focus();
						} else if (!event.shiftKey && document.activeElement === last) {
							event.preventDefault(); first?.focus();
						}
					} else if (!(event.target instanceof HTMLInputElement) && !event.ctrlKey && !event.metaKey && !event.altKey) {
						if (/^\d$/.test(event.key)) {
							event.preventDefault(); updatePin(pin + event.key);
						} else if (event.key === 'Backspace' || event.key === 'Delete') {
							event.preventDefault(); updatePin(pin.slice(0, -1));
						}
					}
				}}
			>
				<div
					className="gallery-pin-sheet__handle"
					aria-hidden="true"
					onPointerDown={(event) => { dragStartRef.current = event.clientY; event.currentTarget.setPointerCapture(event.pointerId); }}
					onPointerUp={(event) => {
						if (dragStartRef.current !== null && event.clientY - dragStartRef.current > 64) onClose();
						dragStartRef.current = null;
					}}
					onPointerCancel={() => { dragStartRef.current = null; }}
				/>
				<IconButton className="gallery-pin-sheet__close" variant="secondary" size={32} aria-label="Закрыть" onClick={onClose}>
					<Icon name="close" aria-hidden="true" />
				</IconButton>
				<div className="gallery-pin-sheet__intro">
					<Icon name="shield-warning" width={44} height={44} color="system-error-primary" aria-hidden="true" />
					<div id="gallery-pin-title">
						<Text as="div" variant="medium-24">Введите код доступа<br />к папке</Text>
					</div>
					<div id="gallery-pin-description">
						<Text as="p" variant="regular-16" color="secondary">Доступ ограничен администратором</Text>
					</div>
					<Field
						className="gallery-pin-sheet__input"
						label="Код доступа, 4 цифры"
						type="password"
						inputMode="numeric"
						autoComplete="off"
						maxLength={4}
						value={pin}
						invalid={hasError}
						aria-describedby="gallery-pin-error"
						onChange={(event) => updatePin(event.target.value)}
					/>
					<div className="gallery-pin-sheet__dots" aria-hidden="true">
						{[0, 1, 2, 3].map((index) => <span key={index} className={index < pin.length ? 'is-filled' : ''} />)}
					</div>
					<div id="gallery-pin-error" className="gallery-pin-sheet__error" role="status" aria-live="polite">
						{hasError ? 'Неверный код доступа' : '\u00a0'}
					</div>
				</div>
				<div className="gallery-pin-sheet__keypad" aria-label="Цифровая клавиатура">
					{['1', '2', '3', '4', '5', '6', '7', '8', '9', null, '0', 'delete'].map((key, index) =>
						key === null ? <span key={index} /> : (
							<Button
								key={key}
								variant="primary"
								size={44}
								className="gallery-pin-sheet__key"
								aria-label={key === 'delete' ? 'Удалить последнюю цифру' : key}
								onClick={() => updatePin(key === 'delete' ? pin.slice(0, -1) : pin + key)}
							>
								{key === 'delete' ? <Icon name="keyboard-delite" width={24} height={24} aria-hidden="true" /> : <Text variant="medium-24">{key}</Text>}
							</Button>
						),
					)}
				</div>
			</section>
		</div>
	);
}
