import { useState } from 'react';
import { Button, type ButtonSize, type ButtonVariant } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { actionSizes, actionVariants } from '../../ui/lib/action';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	buildPromptSpec,
	ComponentSection,
	PreviewSurface,
	SelectCell,
	ToggleCell,
	type SelectOption,
} from './shared';

type ActionSizeValue = `${typeof actionSizes[number]}`;
type ButtonContentMode = 'text' | 'left-icon' | 'right-icon' | 'both-icons' | 'icon-only';
type PlaygroundIconName = 'add' | 'filter' | 'search' | 'settings';
type BackgroundValue =
	| 'default'
	| 'accent-background'
	| 'background-primary'
	| 'content-background';

const sizeOptions: readonly SelectOption<ActionSizeValue>[] = actionSizes.map((size) => ({
	value: String(size) as ActionSizeValue,
	label: `${size}px`,
}));

const variantOptions: readonly SelectOption<ButtonVariant>[] = actionVariants.map((variant) => ({
	value: variant,
	label: `${variant[0].toUpperCase()}${variant.slice(1)}`,
}));

const contentOptions: readonly SelectOption<ButtonContentMode>[] = [
	{ value: 'text', label: 'Text' },
	{ value: 'left-icon', label: 'Left icon' },
	{ value: 'right-icon', label: 'Right icon' },
	{ value: 'both-icons', label: 'Both icons' },
	{ value: 'icon-only', label: 'Icon only' },
];

const iconOptions: readonly SelectOption<PlaygroundIconName>[] = [
	{ value: 'search', label: 'Search' },
	{ value: 'add', label: 'Add' },
	{ value: 'filter', label: 'Filter' },
	{ value: 'settings', label: 'Settings' },
];

const backgroundOptions: readonly SelectOption<BackgroundValue>[] = [
	{ value: 'default', label: 'Default' },
	{ value: 'content-background', label: 'content-background' },
	{ value: 'accent-background', label: 'accent-background' },
	{ value: 'background-primary', label: 'background-primary' },
];

function renderIcon(name: PlaygroundIconName, size = 20) {
	return <Icon name={name} width={size} height={size} alt="" aria-hidden="true" />;
}

export default function ComponentsActionsPage() {
	const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('accent');
	const [buttonSize, setButtonSize] = useState<ActionSizeValue>('60');
	const [buttonContent, setButtonContent] = useState<ButtonContentMode>('text');
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const [iconButtonVariant, setIconButtonVariant] = useState<ButtonVariant>('primary');
	const [iconButtonSize, setIconButtonSize] = useState<ActionSizeValue>('52');
	const [iconButtonIcon, setIconButtonIcon] = useState<PlaygroundIconName>('search');
	const [iconButtonBackground, setIconButtonBackground] =
		useState<BackgroundValue>('default');
	const [iconButtonDisabled, setIconButtonDisabled] = useState(false);

	const resolvedButtonSize = Number(buttonSize) as ButtonSize;
	const resolvedIconButtonSize = Number(iconButtonSize) as ButtonSize;
	const buttonLabel = buttonContent === 'icon-only' ? undefined : 'Сохранить';
	const buttonLeftIcon =
		buttonContent === 'left-icon' ||
		buttonContent === 'both-icons' ||
		buttonContent === 'icon-only'
			? renderIcon('search', 18)
			: undefined;
	const buttonRightIcon =
		buttonContent === 'right-icon' || buttonContent === 'both-icons'
			? renderIcon('add', 18)
			: undefined;

	return (
		<FlowPage title="Actions">
			<FlowPageList>
				<ComponentSection
					title="Button"
					copyText={buildPromptSpec('Button', {
						variant: buttonVariant,
						size: resolvedButtonSize,
						content: buttonContent,
						disabled: buttonDisabled,
					})}
					description="Основная action-кнопка для экранов и блоков."
				>
					<SelectCell
						label="Variant"
						value={buttonVariant}
						options={variantOptions}
						onChange={setButtonVariant}
					/>
					<SelectCell
						label="Size"
						value={buttonSize}
						options={sizeOptions}
						onChange={setButtonSize}
					/>
					<SelectCell
						label="Content"
						value={buttonContent}
						options={contentOptions}
						onChange={setButtonContent}
					/>
					<ToggleCell
						label="Disabled"
						checked={buttonDisabled}
						onChange={setButtonDisabled}
					/>

					<PreviewSurface centered>
						<Button
							size={resolvedButtonSize}
							variant={buttonVariant}
							leftIcon={buttonLeftIcon}
							rightIcon={buttonRightIcon}
							disabled={buttonDisabled}
						>
							{buttonLabel}
						</Button>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="IconButton"
					copyText={buildPromptSpec('IconButton', {
						variant: iconButtonVariant,
						size: resolvedIconButtonSize,
						icon: iconButtonIcon,
						background: iconButtonBackground,
						disabled: iconButtonDisabled,
					})}
					description="Компактная кнопка для иконок в хедерах и локальных тулбарах."
				>
					<SelectCell
						label="Variant"
						value={iconButtonVariant}
						options={variantOptions}
						onChange={setIconButtonVariant}
					/>
					<SelectCell
						label="Size"
						value={iconButtonSize}
						options={sizeOptions}
						onChange={setIconButtonSize}
					/>
					<SelectCell
						label="Icon"
						value={iconButtonIcon}
						options={iconOptions}
						onChange={setIconButtonIcon}
					/>
					<SelectCell
						label="Background"
						value={iconButtonBackground}
						options={backgroundOptions}
						onChange={setIconButtonBackground}
					/>
					<ToggleCell
						label="Disabled"
						checked={iconButtonDisabled}
						onChange={setIconButtonDisabled}
					/>

					<PreviewSurface centered>
						<IconButton
							size={resolvedIconButtonSize}
							variant={iconButtonVariant}
							background={
								iconButtonBackground === 'default'
									? undefined
									: iconButtonBackground
							}
							disabled={iconButtonDisabled}
							aria-label="Playground icon button"
						>
							{renderIcon(iconButtonIcon, 24)}
						</IconButton>
					</PreviewSurface>
				</ComponentSection>
			</FlowPageList>
		</FlowPage>
	);
}
