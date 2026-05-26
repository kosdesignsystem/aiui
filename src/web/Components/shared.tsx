import {
	ChangeEvent,
	InputHTMLAttributes,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useEffect,
	useState,
} from 'react';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Switch } from '../../ui/Switch';
import { cn } from '../../ui/lib/cn';
import './catalog.scss';

export type PromptSpecValue = string | number | boolean | null | undefined;

export type SelectOption<T extends string = string> = {
	value: T;
	label: string;
};

export async function copyTextToClipboard(text: string) {
	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return;
		} catch {
			// Fallback below for browsers without clipboard permissions.
		}
	}

	const textarea = document.createElement('textarea');
	textarea.value = text;
	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
}

function formatPromptValue(value: PromptSpecValue) {
	if (typeof value === 'string') {
		return JSON.stringify(value);
	}

	if (value === null) {
		return 'null';
	}

	return String(value);
}

export function buildPromptSpec(
	componentName: string,
	props: Record<string, PromptSpecValue>,
) {
	const serializedProps = Object.entries(props)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}: ${formatPromptValue(value)}`)
		.join(', ');

	return `${componentName}({ ${serializedProps} })`;
}

type ComponentSectionProps = {
	title: string;
	copyText: string;
	description?: ReactNode;
	children: ReactNode;
	className?: string;
	contentClassName?: string;
};

export function ComponentSection({
	title,
	copyText,
	description,
	children,
	className,
	contentClassName,
}: ComponentSectionProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) {
			return undefined;
		}

		const timerId = window.setTimeout(() => setCopied(false), 1400);

		return () => window.clearTimeout(timerId);
	}, [copied]);

	return (
		<List
			title={title}
			className={className}
			contentClassName={contentClassName}
			action={
				<IconButton
					size={32}
					variant="secondary"
					className="components-catalog__title-copy"
					aria-label={`Скопировать конфигурацию ${title}`}
					title={copied ? 'Скопировано' : 'Скопировать конфигурацию'}
					onClick={() => {
						void copyTextToClipboard(copyText)
							.then(() => setCopied(true))
							.catch(() => setCopied(false));
					}}
				>
					<Icon name="copy-outline" width={20} height={20} alt="" aria-hidden="true" />
				</IconButton>
			}
		>
			{description ? (
				<Text
					as="p"
					variant="regular-14"
					color="secondary"
					className="components-catalog__section-note"
				>
					{description}
				</Text>
			) : null}
			{children}
		</List>
	);
}

type ToggleCellProps = {
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export function ToggleCell({
	label,
	description,
	checked,
	onChange,
}: ToggleCellProps) {
	const toggle = () => onChange(!checked);
	const stopPropagation = (
		event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
	) => {
		event.stopPropagation();
	};

	return (
		<Cell
			title={
				<Text as="p" variant="regular-18" color="primary">
					{label}
				</Text>
			}
			subtitle={
				description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : undefined
			}
			trailing={
				<div
					className="components-catalog__switch"
					onClick={stopPropagation}
					onKeyDown={stopPropagation}
				>
					<Switch checked={checked} onChange={() => toggle()} aria-label={label} />
				</div>
			}
			onClick={toggle}
		/>
	);
}

type SelectCellProps<T extends string> = {
	label: string;
	description?: string;
	value: T;
	options: readonly SelectOption<T>[];
	onChange: (value: T) => void;
};

export function SelectCell<T extends string>({
	label,
	description,
	value,
	options,
	onChange,
}: SelectCellProps<T>) {
	return (
		<Cell
			title={
				<Text as="p" variant="regular-18" color="primary">
					{label}
				</Text>
			}
			subtitle={
				description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : undefined
			}
			trailing={
				<select
					className="components-catalog__select"
					value={value}
					onChange={(event) => onChange(event.target.value as T)}
					aria-label={label}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			}
		/>
	);
}

type InputCellProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'onChange' | 'value'
> & {
	label: string;
	description?: string;
	value: string | number;
	onChange: (value: string) => void;
};

export function InputCell({
	label,
	description,
	value,
	onChange,
	className,
	...inputProps
}: InputCellProps) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
	};

	return (
		<Cell
			title={
				<Text as="p" variant="regular-18" color="primary">
					{label}
				</Text>
			}
			subtitle={
				description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : undefined
			}
			trailing={
				<input
					{...inputProps}
					className={cn('components-catalog__field', className)}
					value={value}
					onChange={handleChange}
					aria-label={label}
				/>
			}
		/>
	);
}

type PreviewSurfaceProps = {
	children: ReactNode;
	className?: string;
	centered?: boolean;
	stack?: boolean;
};

export function PreviewSurface({
	children,
	className,
	centered = false,
	stack = false,
}: PreviewSurfaceProps) {
	return (
		<div
			className={cn(
				'components-catalog__preview',
				centered ? 'components-catalog__preview--center' : '',
				stack ? 'components-catalog__preview--stack' : '',
				className,
			)}
		>
			{children}
		</div>
	);
}
