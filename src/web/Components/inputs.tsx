import { ChangeEvent, useState } from 'react';
import { Field } from '../../ui/Field';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Search } from '../../ui/Search';
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

type SearchTypeValue = 'search' | 'text';
type ActionPosition = 'none' | 'left' | 'right';

const searchTypeOptions: readonly SelectOption<SearchTypeValue>[] = [
	{ value: 'search', label: 'search' },
	{ value: 'text', label: 'text' },
];

const actionPositionOptions: readonly SelectOption<ActionPosition>[] = [
	{ value: 'none', label: 'None' },
	{ value: 'left', label: 'Left' },
	{ value: 'right', label: 'Right' },
];

export default function ComponentsInputsPage() {
	const [switchChecked, setSwitchChecked] = useState(true);
	const [switchDisabled, setSwitchDisabled] = useState(false);

	const [fieldValue, setFieldValue] = useState('Иван Петров');
	const [fieldLabel, setFieldLabel] = useState(true);
	const [fieldLeading, setFieldLeading] = useState(true);
	const [fieldTrailing, setFieldTrailing] = useState(false);
	const [fieldInvalid, setFieldInvalid] = useState(false);
	const [fieldDisabled, setFieldDisabled] = useState(false);
	const [fieldReadOnly, setFieldReadOnly] = useState(false);

	const [searchValue, setSearchValue] = useState('Дизайн-система');
	const [searchType, setSearchType] = useState<SearchTypeValue>('search');
	const [searchActionPosition, setSearchActionPosition] =
		useState<ActionPosition>('right');
	const [searchClearButton, setSearchClearButton] = useState(true);
	const [searchHideIcon, setSearchHideIcon] = useState(false);
	const [searchDisabled, setSearchDisabled] = useState(false);
	const [searchReadOnly, setSearchReadOnly] = useState(false);

	const handleFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFieldValue(event.target.value);
	};

	const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	const sideActionButton =
		searchActionPosition === 'none' ? null : (
			<IconButton
				size={60}
				variant="primary"
				aria-label="Дополнительное действие"
				title="Дополнительное действие"
			>
				<Icon
					name={searchActionPosition === 'left' ? 'filter' : 'add'}
					width={24}
					height={24}
					alt=""
					aria-hidden="true"
				/>
			</IconButton>
		);

	return (
		<FlowPage title="Inputs">
			<FlowPageList>
				<ComponentSection
					title="Switch"
					copyText={buildPromptSpec('Switch', {
						checked: switchChecked,
						disabled: switchDisabled,
					})}
					description="Бинарный переключатель для локальных настроек."
				>
					<ToggleCell
						label="Checked"
						checked={switchChecked}
						onChange={setSwitchChecked}
					/>
					<ToggleCell
						label="Disabled"
						checked={switchDisabled}
						onChange={setSwitchDisabled}
					/>

					<PreviewSurface centered>
						<Switch
							checked={switchChecked}
							disabled={switchDisabled}
							onChange={(event) => setSwitchChecked(event.target.checked)}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Field"
					copyText={buildPromptSpec('Field', {
						label: fieldLabel,
						leading: fieldLeading,
						trailing: fieldTrailing,
						invalid: fieldInvalid,
						disabled: fieldDisabled,
						readOnly: fieldReadOnly,
						value: fieldValue,
					})}
					description="Базовое текстовое поле с лейблом и adornments."
				>
					<InputCell label="Value" value={fieldValue} onChange={setFieldValue} />
					<ToggleCell label="Label" checked={fieldLabel} onChange={setFieldLabel} />
					<ToggleCell
						label="Leading icon"
						checked={fieldLeading}
						onChange={setFieldLeading}
					/>
					<ToggleCell
						label="Trailing icon"
						checked={fieldTrailing}
						onChange={setFieldTrailing}
					/>
					<ToggleCell
						label="Invalid"
						checked={fieldInvalid}
						onChange={setFieldInvalid}
					/>
					<ToggleCell
						label="Disabled"
						checked={fieldDisabled}
						onChange={setFieldDisabled}
					/>
					<ToggleCell
						label="Read only"
						checked={fieldReadOnly}
						onChange={setFieldReadOnly}
					/>

					<PreviewSurface stack>
						<Field
							label={fieldLabel ? 'Контакт' : undefined}
							leading={
								fieldLeading ? (
									<Icon
										name="search"
										width={20}
										height={20}
										alt=""
										aria-hidden="true"
									/>
								) : undefined
							}
							trailing={
								fieldTrailing ? (
									<Icon
										name="close"
										width={20}
										height={20}
										alt=""
										aria-hidden="true"
									/>
								) : undefined
							}
							value={fieldValue}
							onChange={handleFieldValueChange}
							placeholder="Введите имя"
							invalid={fieldInvalid}
							disabled={fieldDisabled}
							readOnly={fieldReadOnly}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Search"
					copyText={buildPromptSpec('Search', {
						type: searchType,
						actionPosition: searchActionPosition,
						clearButton: searchClearButton,
						hideSearchIcon: searchHideIcon,
						disabled: searchDisabled,
						readOnly: searchReadOnly,
						value: searchValue,
					})}
					description="Готовая поисковая строка с кнопками по краям и встроенным action."
				>
					<InputCell label="Value" value={searchValue} onChange={setSearchValue} />
					<SelectCell
						label="Type"
						value={searchType}
						options={searchTypeOptions}
						onChange={setSearchType}
					/>
					<SelectCell
						label="Side action"
						value={searchActionPosition}
						options={actionPositionOptions}
						onChange={setSearchActionPosition}
					/>
					<ToggleCell
						label="Clear button"
						checked={searchClearButton}
						onChange={setSearchClearButton}
					/>
					<ToggleCell
						label="Hide search icon"
						checked={searchHideIcon}
						onChange={setSearchHideIcon}
					/>
					<ToggleCell
						label="Disabled"
						checked={searchDisabled}
						onChange={setSearchDisabled}
					/>
					<ToggleCell
						label="Read only"
						checked={searchReadOnly}
						onChange={setSearchReadOnly}
					/>

					<PreviewSurface stack>
						<Search
							type={searchType}
							placeholder="Поиск по компонентам"
							value={searchValue}
							onChange={handleSearchValueChange}
							before={searchActionPosition === 'left' ? sideActionButton : undefined}
							after={searchActionPosition === 'right' ? sideActionButton : undefined}
							inputTrailing={
								searchClearButton && searchValue ? (
									<IconButton
										size={32}
										variant="primary"
										aria-label="Очистить поиск"
										onClick={() => setSearchValue('')}
									>
										<Icon
											name="close"
											width={16}
											height={16}
											alt=""
											aria-hidden="true"
										/>
									</IconButton>
								) : undefined
							}
							hideSearchIcon={searchHideIcon}
							disabled={searchDisabled}
							readOnly={searchReadOnly}
						/>
					</PreviewSurface>
				</ComponentSection>
			</FlowPageList>
		</FlowPage>
	);
}
