import { useMemo, useRef, useState } from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon, type IconName } from '../../ui/Icon';
import { List, ListContainer } from '../../ui/List';
import { FlowPage } from '../FlowPage';
import {
	SecuritySheet,
	type SecuritySheetAction,
	type SecuritySheetActionTone,
	type SecuritySheetFact,
	type SecuritySheetOption,
	type SecurityTone,
} from './SecuritySheet';
import './overview.scss';
import { typograph } from './typography';

type SecurityCheck = {
	id: string;
	icon: IconName;
	title: string;
	issue: string;
	resolved: string;
	tone: Exclude<SecurityTone, 'success'>;
	sheetTitle: string;
	description: string;
	facts?: ReadonlyArray<SecuritySheetFact>;
	fixLabel?: string;
	fixTone?: SecuritySheetActionTone;
	laterLabel?: string;
	/** Если заданы — вместо кнопок шит предлагает выбор безопасного способа. */
	prompt?: string;
	options?: ReadonlyArray<Pick<SecuritySheetOption, 'icon' | 'label'>>;
	resolvedDescription: string;
	/** Шит решённой угрозы без кнопки «Понятно»: закрывается фоном, свайпом или Esc. */
	resolvedWithoutAction?: boolean;
};

const securityChecks: ReadonlyArray<SecurityCheck> = [
	{
		id: 'dlp',
		icon: 'shield-done',
		title: 'Отправка файла',
		issue: '«Отчёт Q3.xlsx» не отправлен',
		resolved: 'Отправлен через Squadus',
		tone: 'info',
		sheetTitle: 'Файл защищён политикой безопасности',
		description:
			'Этот файл нельзя отправить в выбранное приложение, так как он содержит конфиденциальные данные.',
		prompt: 'Выберите безопасный способ отправки:',
		options: [
			{ icon: 'message-send', label: 'Squadus' },
			{ icon: 'chat', label: 'Корпоративная почта' },
		],
		resolvedDescription: 'Файл отправлен по защищённому каналу. Получатель увидит его только внутри корпоративных приложений.',
	},
	{
		id: 'app',
		icon: 'shield-warning',
		title: 'Подозрительное приложение',
		issue: '«Фонарик Pro» отправляет SMS',
		resolved: 'Приложение удалено',
		tone: 'danger',
		sheetTitle: 'Удалить «Фонарик Pro»?',
		description:
			'Приложение отправляет SMS на платные номера без вашего ведома. Деньги списываются со счёта телефона.',
		facts: [
			{ label: 'Установлено', value: '12 октября' },
			{ label: 'Отправлено SMS', value: '14' },
			{ label: 'Источник', value: 'Неизвестный' },
		],
		fixLabel: 'Удалить приложение',
		fixTone: 'danger',
		laterLabel: 'Оставить',
		resolvedDescription: 'Приложение и его данные удалены. Платные подписки, оформленные через него, стоит проверить у оператора.',
	},
	{
		id: 'link',
		icon: 'link',
		title: 'Фишинговая ссылка',
		issue: 'Заблокирована в «Сообщениях»',
		resolved: 'Отправитель заблокирован',
		tone: 'danger',
		sheetTitle: 'Ссылка ведёт на поддельный сайт банка',
		description:
			'Сайт копирует страницу входа и собирает логины и пароли. Мы не дали ему открыться.',
		facts: [
			{ label: 'Адрес', value: 'sber-bonus.top' },
			{ label: 'Отправитель', value: '+7 900 ••• 12 48' },
		],
		fixLabel: 'Заблокировать отправителя',
		fixTone: 'danger',
		laterLabel: 'Не сейчас',
		resolvedDescription: 'Сообщения с этого номера больше не придут. Ссылка останется заблокированной.',
	},
	{
		id: 'wifi',
		icon: 'wifi-unlock',
		title: 'Открытая сеть Wi‑Fi',
		issue: '«Cafe_Free» без пароля',
		resolved: 'Защищённое соединение',
		tone: 'warning',
		sheetTitle: 'Сеть «Cafe_Free» не защищена',
		description:
			'Трафик в открытой сети может перехватить любой, кто к ней подключён. Включите защищённое соединение или отключитесь.',
		facts: [
			{ label: 'Шифрование', value: 'Нет' },
			{ label: 'Подключено', value: '18 минут' },
		],
		fixLabel: 'Включить защищённое соединение',
		fixTone: 'accent',
		laterLabel: 'Отключиться от сети',
		resolvedDescription: 'Весь трафик идёт через зашифрованный туннель, пока вы подключены к открытым сетям.',
	},
	{
		id: 'lock',
		icon: 'lock-disable',
		title: 'Блокировка экрана',
		issue: 'Не задан PIN-код',
		resolved: 'PIN-код и отпечаток',
		tone: 'warning',
		sheetTitle: 'Задайте блокировку экрана',
		description:
			'Без PIN-кода любой, у кого окажется телефон, получит доступ к почте, банку и фотографиям.',
		facts: [{ label: 'Сейчас', value: 'Свайп' }],
		fixLabel: 'Задать PIN-код',
		fixTone: 'accent',
		laterLabel: 'Позже',
		resolvedDescription: 'Телефон блокируется через 30 секунд бездействия. Разблокировать можно PIN-кодом или отпечатком.',
		resolvedWithoutAction: true,
	},
	{
		id: 'mic',
		icon: 'microphone',
		title: 'Доступ к микрофону',
		issue: '3 приложения в фоне',
		resolved: 'Только во время использования',
		tone: 'info',
		sheetTitle: '3 приложения слушают микрофон в фоне',
		description:
			'Им не нужен микрофон, когда вы ими не пользуетесь. Ограничьте доступ — работа приложений не изменится.',
		facts: [
			{ label: 'Погода', value: 'Всегда' },
			{ label: 'Магазин', value: 'Всегда' },
			{ label: 'Карты', value: 'Всегда' },
		],
		fixLabel: 'Ограничить доступ',
		fixTone: 'accent',
		laterLabel: 'Оставить как есть',
		resolvedDescription: 'Приложения получают доступ к микрофону только на экране. В фоне он закрыт.',
	},
];

type SheetState =
	| { kind: 'check'; id: string }
	| { kind: 'scan'; found: number }
	| null;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function toneIcon(tone: SecurityTone): IconName {
	switch (tone) {
		case 'danger':
			return 'shield-remove';
		case 'warning':
			return 'shield-warning';
		case 'info':
			return 'shield-info';
		default:
			return 'shield-done';
	}
}

export default function SecurityOverviewPage() {
	const [resolvedIds, setResolvedIds] = useState<ReadonlySet<string>>(new Set());
	const [sheet, setSheet] = useState<SheetState>(null);
	const [isScanning, setIsScanning] = useState(false);
	const [lastScan, setLastScan] = useState('сегодня, 09:41');
	// Шит, который откроется после анимации закрытия текущего.
	const nextSheetRef = useRef<SheetState>(null);

	const openChecks = useMemo(
		() => securityChecks.filter((check) => !resolvedIds.has(check.id)),
		[resolvedIds],
	);
	const doneChecks = useMemo(
		() => securityChecks.filter((check) => resolvedIds.has(check.id)),
		[resolvedIds],
	);

	const heroTone: SecurityTone = openChecks.some((check) => check.tone === 'danger')
		? 'danger'
		: openChecks.some((check) => check.tone === 'warning')
			? 'warning'
			: openChecks.length > 0
				? 'info'
				: 'success';
	const heroTitle = openChecks.length === 0 ? 'Устройство защищено' : pluralizeIssues(openChecks.length);

	const resolve = (id: string) => {
		setResolvedIds((current) => new Set(current).add(id));
	};

	const runScan = async () => {
		if (isScanning) {
			return;
		}

		setIsScanning(true);
		await wait(1400);
		setIsScanning(false);
		const now = new Date();
		setLastScan(`сегодня, ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`);
		setSheet({ kind: 'scan', found: openChecks.length });
	};

	const renderSheet = () => {
		if (!sheet) {
			return undefined;
		}

		const close = () => {
			setSheet(nextSheetRef.current);
			nextSheetRef.current = null;
		};

		if (sheet.kind === 'scan') {
			const found = sheet.found;
			const firstOpen = openChecks[0];
			const actions: SecuritySheetAction[] =
				found > 0 && firstOpen
					? [
						{
							label: 'Показать первую',
							onSelect: () => {
								nextSheetRef.current = { kind: 'check', id: firstOpen.id };
							},
						},
						{ label: 'Закрыть', tone: 'neutral' },
					]
					: [{ label: 'Готово' }];

			return (
				<SecuritySheet
					key="scan"
					icon={found > 0 ? 'shield-warning' : 'shield-done'}
					tone={found > 0 ? 'warning' : 'success'}
					title={found > 0 ? `Найдено: ${pluralizeIssues(found)}` : 'Угроз не найдено'}
					description={
						found > 0
							? 'Начните с красных пунктов — они угрожают деньгам и данным прямо сейчас.'
							: 'Приложения, сети и настройки в порядке. Следующая проверка — завтра ночью.'
					}
					facts={[
						{ label: 'Проверено приложений', value: '86' },
						{ label: 'Файлов', value: '12 408' },
						{ label: 'Длительность', value: '1,4 с' },
					]}
					actions={actions}
					onClose={close}
				/>
			);
		}

		const check = securityChecks.find((item) => item.id === sheet.id);
		if (!check) {
			return undefined;
		}

		if (resolvedIds.has(check.id)) {
			return (
				<SecuritySheet
					key={`${check.id}-resolved`}
					icon={check.icon}
					tone="success"
					title={check.title}
					description={check.resolvedDescription}
					facts={[{ label: 'Статус', value: check.resolved }]}
					actions={check.resolvedWithoutAction ? undefined : [{ label: 'Понятно' }]}
					onClose={close}
				/>
			);
		}

		return (
			<SecuritySheet
				key={check.id}
				icon={check.icon}
				tone={check.tone}
				title={check.sheetTitle}
				description={check.description}
				facts={check.facts}
				prompt={check.prompt}
				options={check.options?.map((option) => ({
					...option,
					onSelect: async () => {
						await wait(900);
						resolve(check.id);
					},
				}))}
				actions={check.options ? undefined : [
					{
						label: check.fixLabel ?? 'Исправить',
						tone: check.fixTone ?? 'accent',
						onSelect: async () => {
							await wait(900);
							resolve(check.id);
						},
					},
					{ label: check.laterLabel ?? 'Позже', tone: 'neutral' },
				]}
				onClose={close}
			/>
		);
	};

	return (
		<FlowPage
			header={
				<div className="security-app__header">
					<Text as="p" variant="medium-24">Безопасность</Text>
					<Text as="p" variant="regular-12" color="secondary">
						Последняя проверка: {lastScan}
					</Text>
				</div>
			}
			overlayClassName="security-app__overlay"
			overlay={renderSheet()}
		>
			<div className="security-app">
				<section className={`security-app__hero security-app__hero--${heroTone}`} aria-live="polite">
					<div className="security-app__hero-badge" aria-hidden="true">
						<Icon name={toneIcon(heroTone)} width={56} height={56} aria-hidden />
					</div>
					<Text as="p" variant="medium-24" className="security-app__hero-title">
						{heroTitle}
					</Text>
					<Text as="p" variant="regular-14" color="secondary">
						{openChecks.length === 0
							? 'Все проверки пройдены'
							: `Решено ${doneChecks.length} из ${securityChecks.length}`}
					</Text>
					<Button
						size={52}
						variant="secondary"
						className="security-app__scan"
						disabled={isScanning}
						onClick={() => void runScan()}
					>
						{isScanning ? 'Проверяем…' : 'Проверить снова'}
					</Button>
				</section>

				<ListContainer>
					{openChecks.length > 0 ? (
						<List title="Требует внимания" className="security-app__list">
							{openChecks.map((check) => (
								<Cell
									key={check.id}
									leading={<CheckBadge icon={check.icon} tone={check.tone} />}
									title={<Text variant="medium-16">{typograph(check.title)}</Text>}
									subtitle={
										<Text variant="regular-14" color="secondary">
											{typograph(check.issue)}
										</Text>
									}
									trailing={<Icon name="chevron-right" width={20} height={20} aria-hidden />}
									onClick={() => setSheet({ kind: 'check', id: check.id })}
								/>
							))}
						</List>
					) : null}

					{doneChecks.length > 0 ? (
						<List title="Под защитой" className="security-app__list">
							{doneChecks.map((check) => (
								<Cell
									key={check.id}
									leading={<CheckBadge icon={check.icon} tone="success" />}
									title={<Text variant="medium-16">{typograph(check.title)}</Text>}
									subtitle={
										<Text variant="regular-14" color="secondary">
											{typograph(check.resolved)}
										</Text>
									}
									trailing={<Icon name="done" width={20} height={20} aria-hidden />}
									onClick={() => setSheet({ kind: 'check', id: check.id })}
								/>
							))}
						</List>
					) : null}

					<List title="Сброс" collapsible defaultCollapsed className="security-app__list">
						<Cell
							title={<Text variant="medium-16">Вернуть угрозы</Text>}
							subtitle={
								<Text variant="regular-14" color="secondary">
									{typograph('Для повторной проверки сценариев')}
								</Text>
							}
							trailing={<Icon name="arrow-history" width={20} height={20} aria-hidden />}
							onClick={() => setResolvedIds(new Set())}
						/>
					</List>
				</ListContainer>
			</div>
		</FlowPage>
	);
}

function CheckBadge({ icon, tone }: { icon: IconName; tone: SecurityTone }) {
	return (
		<span className={`security-app__badge security-app__badge--${tone}`} aria-hidden="true">
			<Icon name={icon} width={24} height={24} aria-hidden />
		</span>
	);
}

function pluralizeIssues(count: number) {
	const mod10 = count % 10;
	const mod100 = count % 100;
	const noun =
		mod10 === 1 && mod100 !== 11
			? 'проблема'
			: mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
				? 'проблемы'
				: 'проблем';
	return `${count} ${noun}`;
}
