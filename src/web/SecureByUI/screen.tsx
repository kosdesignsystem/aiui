import { useState } from 'react';
import { AppIcon } from '../../ui/AppIcon';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import { App } from '../../ui/App';
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

export function SecureByUIScreen() {
	const [isMessengerSheetOpen, setIsMessengerSheetOpen] = useState(false);

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
											setIsMessengerSheetOpen(true);
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

				{isMessengerSheetOpen ? (
					<div className="secure-ui__policy-backdrop" role="dialog" aria-modal="true" aria-label="Ограничение отправки">
						<button
							type="button"
							className="secure-ui__policy-dismiss"
							onClick={() => setIsMessengerSheetOpen(false)}
							aria-label="Закрыть информационную шторку"
						/>
						<div className="secure-ui__policy-sheet">
							<Text as="p" variant="medium-20" color="primary">
								Интерфейс не даёт совершить действие по умолчанию:
							</Text>
							<ul className="secure-ui__policy-list">
								<li>блокирует отправку в небезопасное приложение</li>
								<li>показывает причину: «данные защищены политикой»</li>
								<li>предлагает безопасный канал (корпоративный чат / почта)</li>
							</ul>
							<List>
								<Cell
									title={<Text variant="regular-18">Корпоративный чат</Text>}
									leading={
										<Avatar size={48} background="accent-background">
											<Icon name="message-send" width={22} height={22} colorToken="accent-primary" />
										</Avatar>
									}
								/>
								<Cell
									title={<Text variant="regular-18">Корпоративная почта</Text>}
									leading={
										<Avatar size={48} background="accent-background">
											<Icon name="at" width={22} height={22} colorToken="accent-primary" />
										</Avatar>
									}
								/>
							</List>
						</div>
					</div>
				) : null}
			</section>
		</App>
	);
}
