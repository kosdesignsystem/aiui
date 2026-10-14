import { useState } from 'react';
import { AppIcon, appIconNames } from '../../ui/AppIcon';
import { Avatar, type AvatarBackground } from '../../ui/Avatar';
import { Cell, type CellVariant } from '../../ui/Cell';
import {
	fontFamilies,
	type FontFamily,
	type FontVariant,
	type TextColor,
	Text,
	textVariantsByFamily,
} from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Switch } from '../../ui/Switch';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	buildPromptSpec,
	ComponentSection,
	InputCell,
	PreviewSurface,
	SelectCell,
	ToggleCell,
	type SelectOption,
} from './shared';

type AvatarContent = 'initials' | 'icon';
type AvatarSizeValue = '32' | '44' | '60' | '72';
type AppIconSizeValue = '48' | '60' | '72' | '96';
type LeadingValue = 'none' | 'avatar' | 'icon';
type TrailingValue = 'none' | 'icon' | 'switch';

const cellVariantOptions: readonly SelectOption<CellVariant>[] = [
	{ value: 'default', label: 'Default' },
	{ value: 'primary', label: 'Primary' },
	{ value: 'accent', label: 'Accent' },
];

const leadingOptions: readonly SelectOption<LeadingValue>[] = [
	{ value: 'none', label: 'None' },
	{ value: 'avatar', label: 'Avatar' },
	{ value: 'icon', label: 'Icon' },
];

const trailingOptions: readonly SelectOption<TrailingValue>[] = [
	{ value: 'none', label: 'None' },
	{ value: 'icon', label: 'Icon' },
	{ value: 'switch', label: 'Switch' },
];

const avatarSizeOptions: readonly SelectOption<AvatarSizeValue>[] = [
	{ value: '32', label: '32px' },
	{ value: '44', label: '44px' },
	{ value: '60', label: '60px' },
	{ value: '72', label: '72px' },
];

const avatarBackgroundOptions: readonly SelectOption<AvatarBackground>[] = [
	{ value: 'content-background', label: 'content-background' },
	{ value: 'accent-background', label: 'accent-background' },
	{ value: 'accent-primary', label: 'accent-primary' },
];

const avatarContentOptions: readonly SelectOption<AvatarContent>[] = [
	{ value: 'initials', label: 'Initials' },
	{ value: 'icon', label: 'Icon' },
];

const preferredAppIconNames = [
	'calendar',
	'camera',
	'contacts',
	'folder',
	'browser',
	'incoming',
];

const availableAppIconNames = (() => {
	const preferred = preferredAppIconNames.filter((name) => appIconNames.includes(name));

	return preferred.length > 0 ? preferred : appIconNames.slice(0, 6);
})();

const appIconOptions: readonly SelectOption<string>[] = availableAppIconNames.map((name) => ({
	value: name,
	label: name,
}));

const appIconSizeOptions: readonly SelectOption<AppIconSizeValue>[] = [
	{ value: '48', label: '48px' },
	{ value: '60', label: '60px' },
	{ value: '72', label: '72px' },
	{ value: '96', label: '96px' },
];

const fontFamilyOptions: readonly SelectOption<FontFamily>[] = [
	{ value: 'sansText', label: 'sansText' },
	{ value: 'clock', label: 'clock' },
	{ value: 'mono', label: 'mono' },
];

const fontVariantOptions: readonly SelectOption<FontVariant>[] = (
	Object.values(textVariantsByFamily).flat() as FontVariant[]
).map((variant) => ({
	value: variant,
	label: variant,
}));

const textColorOptions: readonly SelectOption<TextColor>[] = [
	{ value: 'primary', label: 'primary' },
	{ value: 'secondary', label: 'secondary' },
	{ value: 'disabled', label: 'disabled' },
	{ value: 'accent', label: 'accent' },
];

export default function ComponentsContentPage() {
	const [cellVariant, setCellVariant] = useState<CellVariant>('default');
	const [cellSubtitle, setCellSubtitle] = useState(true);
	const [cellLeading, setCellLeading] = useState<LeadingValue>('avatar');
	const [cellTrailing, setCellTrailing] = useState<TrailingValue>('icon');
	const [cellInteractive, setCellInteractive] = useState(true);

	const [listTitle, setListTitle] = useState(true);
	const [listAction, setListAction] = useState(true);
	const [listCollapsible, setListCollapsible] = useState(true);
	const [listCollapsed, setListCollapsed] = useState(false);

	const [avatarSize, setAvatarSize] = useState<AvatarSizeValue>('60');
	const [avatarBackground, setAvatarBackground] =
		useState<AvatarBackground>('content-background');
	const [avatarContent, setAvatarContent] = useState<AvatarContent>('initials');

	const [appIconName, setAppIconName] = useState<string>(availableAppIconNames[0] ?? 'calendar');
	const [appIconSize, setAppIconSize] = useState<AppIconSizeValue>('72');

	const [sampleText, setSampleText] = useState('AI UI component catalog');
	const [textFamily, setTextFamily] = useState<FontFamily>('sansText');
	const [textVariant, setTextVariant] = useState<FontVariant>('medium-24');
	const [textColor, setTextColor] = useState<TextColor>('primary');

	const resolvedAvatarSize = Number(avatarSize);
	const resolvedAppIconSize = Number(appIconSize);
	const familyClassName = fontFamilies[textFamily];

	return (
		<FlowPage title="Content">
			<FlowPageList>
				<ComponentSection
					title="Cell"
					copyText={buildPromptSpec('Cell', {
						variant: cellVariant,
						subtitle: cellSubtitle,
						leading: cellLeading,
						trailing: cellTrailing,
						interactive: cellInteractive,
					})}
					description="Основной кирпичик списка с leading/trailing слотами."
				>
					<SelectCell
						label="Variant"
						value={cellVariant}
						options={cellVariantOptions}
						onChange={setCellVariant}
					/>
					<SelectCell
						label="Leading"
						value={cellLeading}
						options={leadingOptions}
						onChange={setCellLeading}
					/>
					<SelectCell
						label="Trailing"
						value={cellTrailing}
						options={trailingOptions}
						onChange={setCellTrailing}
					/>
					<ToggleCell
						label="Subtitle"
						checked={cellSubtitle}
						onChange={setCellSubtitle}
					/>
					<ToggleCell
						label="Interactive"
						checked={cellInteractive}
						onChange={setCellInteractive}
					/>

					<PreviewSurface stack>
						<Cell
							variant={cellVariant}
							title={
								<Text as="p" variant="regular-18" color="primary">
									Новый компонент
								</Text>
							}
							subtitle={
								cellSubtitle ? (
									<Text as="p" variant="regular-14" color="secondary">
										Последнее обновление 2 минуты назад
									</Text>
								) : undefined
							}
							leading={
								cellLeading === 'avatar' ? (
									<Avatar size={44}>AI</Avatar>
								) : cellLeading === 'icon' ? (
									<Icon
										name="folder"
										width={24}
										height={24}
										alt=""
										aria-hidden="true"
									/>
								) : undefined
							}
							trailing={
								cellTrailing === 'icon' ? (
									<Icon
										name="chevron-right"
										width={20}
										height={20}
										alt=""
										aria-hidden="true"
									/>
								) : cellTrailing === 'switch' ? (
									<Switch checked onChange={() => undefined} aria-label="Toggle" />
								) : undefined
							}
							onClick={cellInteractive ? () => undefined : undefined}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="List"
					copyText={buildPromptSpec('List', {
						title: listTitle,
						action: listAction,
						collapsible: listCollapsible,
						collapsed: listCollapsed,
					})}
					description="Группирует связанные элементы и умеет сворачиваться."
				>
					<ToggleCell label="Title" checked={listTitle} onChange={setListTitle} />
					<ToggleCell label="Action" checked={listAction} onChange={setListAction} />
					<ToggleCell
						label="Collapsible"
						checked={listCollapsible}
						onChange={setListCollapsible}
					/>
					<ToggleCell
						label="Collapsed"
						checked={listCollapsed}
						onChange={setListCollapsed}
					/>

					<PreviewSurface stack>
						<List
							title={listTitle ? 'Раздел настроек' : undefined}
							collapsible={listCollapsible}
							collapsed={listCollapsible ? listCollapsed : undefined}
							onCollapsedChange={setListCollapsed}
							action={
								listAction ? (
									<IconButton size={32} variant="secondary" aria-label="Добавить">
										<Icon
											name="add"
											width={20}
											height={20}
											alt=""
											aria-hidden="true"
										/>
									</IconButton>
								) : undefined
							}
						>
							<Cell
								title={
									<Text as="p" variant="regular-18" color="primary">
										Основной экран
									</Text>
								}
								subtitle={
									<Text as="p" variant="regular-14" color="secondary">
										3 варианта состояния
									</Text>
								}
							/>
							<Cell
								title={
									<Text as="p" variant="regular-18" color="primary">
										Модальное окно
									</Text>
								}
							/>
						</List>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Avatar"
					copyText={buildPromptSpec('Avatar', {
						size: resolvedAvatarSize,
						background: avatarBackground,
						content: avatarContent,
					})}
					description="Локальный контейнер для инициалов, иконки или изображения."
				>
					<SelectCell
						label="Size"
						value={avatarSize}
						options={avatarSizeOptions}
						onChange={setAvatarSize}
					/>
					<SelectCell
						label="Background"
						value={avatarBackground}
						options={avatarBackgroundOptions}
						onChange={setAvatarBackground}
					/>
					<SelectCell
						label="Content"
						value={avatarContent}
						options={avatarContentOptions}
						onChange={setAvatarContent}
					/>

					<PreviewSurface centered>
						<Avatar size={resolvedAvatarSize} background={avatarBackground}>
							{avatarContent === 'initials' ? (
								'AI'
							) : (
								<Icon
									name="chat"
									width={Math.max(20, resolvedAvatarSize / 2)}
									height={Math.max(20, resolvedAvatarSize / 2)}
									alt=""
									aria-hidden="true"
								/>
							)}
						</Avatar>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="AppIcon"
					copyText={buildPromptSpec('AppIcon', {
						name: appIconName,
						size: resolvedAppIconSize,
					})}
					description="Иконка приложения для launcher, сеток и подборок."
				>
					<SelectCell
						label="Name"
						value={appIconName}
						options={appIconOptions}
						onChange={setAppIconName}
					/>
					<SelectCell
						label="Size"
						value={appIconSize}
						options={appIconSizeOptions}
						onChange={setAppIconSize}
					/>

					<PreviewSurface centered>
						<div className="components-catalog__app-icon-shell">
							<AppIcon
								name={appIconName}
								width={resolvedAppIconSize}
								height={resolvedAppIconSize}
								aria-hidden="true"
								alt=""
							/>
						</div>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Text"
					copyText={buildPromptSpec('Text', {
						family: textFamily,
						variant: textVariant,
						color: textColor,
						text: sampleText,
					})}
					description="Типографический примитив для подписей, текстов и заголовков."
				>
					<InputCell label="Text" value={sampleText} onChange={setSampleText} />
					<SelectCell
						label="Family"
						value={textFamily}
						options={fontFamilyOptions}
						onChange={setTextFamily}
					/>
					<SelectCell
						label="Variant"
						value={textVariant}
						options={fontVariantOptions}
						onChange={setTextVariant}
					/>
					<SelectCell
						label="Color"
						value={textColor}
						options={textColorOptions}
						onChange={setTextColor}
					/>

					<PreviewSurface stack className="components-catalog__preview-text">
						<Text as="p" family={textFamily} variant={textVariant} color={textColor}>
							{sampleText}
						</Text>
						<Text as="p" variant="regular-14" color="secondary">
							Family token: {familyClassName}
						</Text>
					</PreviewSurface>
				</ComponentSection>
			</FlowPageList>
		</FlowPage>
	);
}
