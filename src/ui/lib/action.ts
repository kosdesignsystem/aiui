import { cn } from './cn';

export const actionSizes = [60, 52, 44, 32] as const;
export type ActionSize = (typeof actionSizes)[number];

export const actionVariants = [
	'accent',
	'danger',
	'success',
	'primary',
	'secondary',
	'link',
	'ghost',
] as const;
export type ActionVariant = (typeof actionVariants)[number];
export type ResolvedActionVariant = Exclude<ActionVariant, 'ghost'>;

export function resolveActionVariant(variant: ActionVariant): ResolvedActionVariant {
	return variant === 'ghost' ? 'link' : variant;
}

type ActionClassNameOptions = {
	baseClassName: string;
	size: ActionSize;
	variant: ActionVariant;
	className?: string;
	iconOnly?: boolean;
	modifiers?: Array<string | false | null | undefined>;
};

export function getActionClassName({
	baseClassName,
	size,
	variant,
	className,
	iconOnly = false,
	modifiers = [],
}: ActionClassNameOptions) {
	return cn(
		baseClassName,
		`${baseClassName}--${resolveActionVariant(variant)}`,
		`${baseClassName}--h${size}`,
		iconOnly ? `${baseClassName}--icon-only` : '',
		...modifiers,
		className,
	);
}
