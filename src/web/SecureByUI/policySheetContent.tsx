import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import { Cell } from '../../ui/Cell';

type SecurePolicySheetContentProps = {
	onCancel: () => void;
};

export function SecurePolicySheetContent({ onCancel }: SecurePolicySheetContentProps) {
	return (
		<>
			<div className="secure-ui__policy-head">
				<div className="secure-ui__policy-icon-wrap" aria-hidden="true">
					<Icon name="shield-done" width={30} height={30} colorToken="accent-primary" />
				</div>

				<Text as="p" variant="semiBold-24" color="primary">
					Файл защищён политикой безопасности
				</Text>

				<Text as="p" variant="regular-16" color="secondary">
					Этот файл нельзя отправить в выбранное приложение, так как он содержит
					конфиденциальные данные.
				</Text>
			</div>

			<Text as="p" variant="regular-16" color="secondary">
				Выберите безопасный способ отправки:
			</Text>

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

			<Button size={52} variant="primary" onClick={onCancel}>
				Отмена
			</Button>
		</>
	);
}
