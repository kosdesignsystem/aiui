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
			</section>
		</App>
	);
}
