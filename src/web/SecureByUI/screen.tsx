import { TouchEvent, useEffect, useRef, useState } from 'react';
import { AppIcon } from '../../ui/AppIcon';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import './screen.scss';

type ActionItem = {
	id: string;
	label: string;
	icon: 'message-send' | 'folder-send-outline' | 'copy-outline' | 'pencil' | 'delete-outline';
};

const ACTIONS: ActionItem[] = [
	{ id: 'messenger', label: 'Отправить в Мессенджер', icon: 'message-send' },
	{ id: 'move', label: 'Переместить', icon: 'folder-send-outline' },
	{ id: 'copy', label: 'Копировать', icon: 'copy-outline' },
	{ id: 'rename', label: 'Изменить название', icon: 'pencil' },
	{ id: 'delete', label: 'Удалить', icon: 'delete-outline' },
];

const SHEET_ANIMATION_MS = 280;

export function SecureByUIScreen() {
	const [isMessengerSheetMounted, setIsMessengerSheetMounted] = useState(false);
	const [isMessengerSheetVisible, setIsMessengerSheetVisible] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [isDraggingSheet, setIsDraggingSheet] = useState(false);
	const hideTimerRef = useRef<number | null>(null);
	const touchStartYRef = useRef<number | null>(null);

	const openMessengerSheet = () => {
		if (hideTimerRef.current !== null) {
			window.clearTimeout(hideTimerRef.current);
			hideTimerRef.current = null;
		}

		setDragOffset(0);
		setIsDraggingSheet(false);
		setIsMessengerSheetMounted(true);
		window.requestAnimationFrame(() => setIsMessengerSheetVisible(true));
	};

	const closeMessengerSheet = () => {
		setDragOffset(0);
		setIsDraggingSheet(false);
		setIsMessengerSheetVisible(false);

		hideTimerRef.current = window.setTimeout(() => {
			setIsMessengerSheetMounted(false);
			hideTimerRef.current = null;
		}, SHEET_ANIMATION_MS);
	};

	const handleSheetTouchStart = (event: TouchEvent<HTMLDivElement>) => {
		touchStartYRef.current = event.touches[0]?.clientY ?? null;
		setIsDraggingSheet(false);
	};

	const handleSheetTouchMove = (event: TouchEvent<HTMLDivElement>) => {
		if (touchStartYRef.current === null) {
			return;
		}

		const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
		const nextOffset = Math.max(0, currentY - touchStartYRef.current);

		if (nextOffset > 0) {
			setIsDraggingSheet(true);
			setDragOffset(nextOffset);
		}
	};

	const handleSheetTouchEnd = () => {
		touchStartYRef.current = null;

		if (dragOffset > 90) {
			closeMessengerSheet();
			return;
		}

		setIsDraggingSheet(false);
		setDragOffset(0);
	};

	useEffect(() => {
		return () => {
			if (hideTimerRef.current !== null) {
				window.clearTimeout(hideTimerRef.current);
			}
		};
	}, []);

	return (
		<App>
			<section className="secure-ui" aria-label="Secure by UI - файл и действия">
				<div className="secure-ui__mock-content" aria-hidden="true">
					<div className="secure-ui__mock-header">
						<Text variant="semiBold-40" color="primary">
							Файлы
						</Text>
					</div>
					<div className="secure-ui__mock-list">
						<div className="secure-ui__mock-row" />
						<div className="secure-ui__mock-row" />
						<div className="secure-ui__mock-row" />
					</div>
				</div>

				<div className="secure-ui__sheet" role="dialog" aria-modal="true" aria-label="Действия с файлом">
					<div className="secure-ui__file">
						<Cell
							onClick={() => undefined}
							title={
								<Text variant="medium-20" color="primary">
									Заявка на патент_Дизайн.
								</Text>
							}
							subtitle={
								<Text variant="regular-14" color="secondary">
									906 KB · 14.04.2024
								</Text>
							}
							leading={<AppIcon name="pdf" width={56} height={56} alt="PDF" />}
							trailing={
								<Icon
									name="chevron-down"
									width={28}
									height={28}
									colorToken="content-secondary"
									alt="Свернуть"
								/>
							}
						/>
					</div>

					<div className="secure-ui__actions">
						<List>
							{ACTIONS.map((action) => (
								<Cell
									key={action.id}
									title={<Text variant="regular-18">{action.label}</Text>}
									onClick={() => {
										if (action.id === 'messenger') {
											openMessengerSheet();
										}
									}}
									leading={
										action.id === 'messenger' ? (
											<Avatar size={56} background="content-background">
												<AppIcon name="messenger" width={48} height={48} alt="Мессенджер" />
											</Avatar>
										) : (
											<Avatar size={56} background="content-background">
												<Icon
													name={action.icon}
													width={24}
													height={24}
													alt=""
													aria-hidden="true"
													colorToken="content-primary"
												/>
											</Avatar>
										)
									}
								/>
							))}
						</List>
					</div>
				</div>

				{isMessengerSheetMounted ? (
					<div
						className={`secure-ui__policy-backdrop${isMessengerSheetVisible ? ' is-visible' : ''}`}
						role="dialog"
						aria-modal="true"
						aria-label="Ограничение отправки"
					>
						<button
							type="button"
							className="secure-ui__policy-dismiss"
							onClick={closeMessengerSheet}
							aria-label="Закрыть информационную шторку"
						/>
						<div
							className={`secure-ui__policy-sheet${isDraggingSheet ? ' is-dragging' : ''}`}
							onTouchStart={handleSheetTouchStart}
							onTouchMove={handleSheetTouchMove}
							onTouchEnd={handleSheetTouchEnd}
							onTouchCancel={handleSheetTouchEnd}
							style={isDraggingSheet ? { transform: `translateY(${dragOffset}px)` } : undefined}
						>
							<div className="secure-ui__policy-head">
								<div className="secure-ui__policy-icon-wrap" aria-hidden="true">
									<Icon name="shield-done" width={30} height={30} colorToken="accent-primary" />
								</div>

								<Text as="p" variant="semiBold-24" color="primary">
									Файл защищён политикой безопасности
								</Text>

								<Text as="p" variant="regular-16" color="secondary">
									Этот файл нельзя отправить в выбранное приложение, так как он содержит
									конфиденциальные данные. Выберите безопасный способ отправки:
								</Text>
							</div>

							<List>
								<Cell
									title={<Text variant="regular-18">Корпоративный Squadus</Text>}
									onClick={() => undefined}
									leading={
										<Avatar size={48} background="accent-background">
											<Icon name="message-send" width={22} height={22} colorToken="accent-primary" />
										</Avatar>
									}
								/>
								<Cell
									title={<Text variant="regular-18">Корпоративная почта</Text>}
									onClick={() => undefined}
									leading={
										<Avatar size={48} background="accent-background">
											<Icon name="at" width={22} height={22} colorToken="accent-primary" />
										</Avatar>
									}
								/>
							</List>

							<Button size={52} variant="primary" onClick={closeMessengerSheet}>
								Отмена
							</Button>
						</div>
					</div>
				) : null}
			</section>
		</App>
	);
}
