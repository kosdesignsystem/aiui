import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';

type WifiPolicySheetContentProps = {
	onCancel: () => void;
};

export function WifiPolicySheetContent({ onCancel }: WifiPolicySheetContentProps) {
	return (
		<>
			<div className="secure-ui__policy-head">
				<div className="secure-ui__policy-icon-wrap" aria-hidden="true">
					<Icon name="shield-warning" width={30} height={30} colorToken="accent-primary" />
				</div>

				<Text as="p" variant="semiBold-24" color="primary">
					Небезопасная сеть Wi‑Fi
				</Text>

				<div className="secure-ui__policy-copy">
					<Text as="p" variant="regular-16" color="secondary">
						Вы подключаетесь к сети, которая не защищена. Передача данных может быть
						перехвачена.
					</Text>
					<Text as="p" variant="regular-16" color="secondary">
						Рекомендуем использовать защищённое подключение:
					</Text>
				</div>
			</div>

			<List>
				<Cell
					onClick={() => undefined}
					title={
						<Text variant="medium-18" color="primary">
							Подключиться к Kaspersky Secure Network (KI Corp)
						</Text>
					}
					subtitle={
						<Text variant="regular-14" color="accent">
							Безопасная сеть
						</Text>
					}
					leading={
						<span className="secure-ui__wifi-leading">
							<Icon name="wifi-lock" width={28} height={28} colorToken="accent-primary" aria-hidden />
						</span>
					}
					trailing={
						<Avatar size={44} background="background-primary">
							<Icon
								name="status-info-outline"
								width={22}
								height={22}
								colorToken="content-primary"
								aria-hidden
							/>
						</Avatar>
					}
				/>
			</List>

			<Button size={52} variant="primary" onClick={onCancel}>
				Отмена
			</Button>
		</>
	);
}
