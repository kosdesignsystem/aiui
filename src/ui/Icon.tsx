import { useId } from 'react';
import { iconDefinitions, iconIdPrefixToken, iconNames } from '../generated/icons';

export type IconName = string;

export type IconProps = {
	name: IconName;
	alt?: string;
	width?: number;
	height?: number;
	colorToken?: string;
	'aria-hidden'?: boolean | 'true' | 'false';
};

function resolveColorValue(colorToken: string) {
	if (colorToken.startsWith('var(') || colorToken.startsWith('#') || colorToken.startsWith('rgb') || colorToken.startsWith('hsl')) {
		return colorToken;
	}

	if (colorToken.startsWith('--')) {
		return `var(${colorToken})`;
	}

	return `var(--${colorToken})`;
}

export function Icon({
	name,
	alt,
	width = 20,
	height = 20,
	colorToken = 'content-primary',
	'aria-hidden': ariaHidden = false,
}: IconProps) {
	const definition = iconDefinitions[name] ?? null;

	if (!definition) {
		return null;
	}

	const isAriaHidden = ariaHidden === true || ariaHidden === 'true';
	const resolvedAlt = alt ?? (isAriaHidden ? '' : name);
	const color = resolveColorValue(colorToken);
	const iconIdPrefix = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const body = definition.body.replaceAll(iconIdPrefixToken, `${iconIdPrefix}-`);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={definition.viewBox}
			width={width}
			height={height}
			style={{
				display: 'inline-block',
				color,
				flexShrink: 0,
				verticalAlign: 'middle',
			}}
			focusable="false"
			aria-hidden={isAriaHidden || resolvedAlt === '' ? true : undefined}
			role={isAriaHidden || resolvedAlt === '' ? undefined : 'img'}
			aria-label={isAriaHidden || resolvedAlt === '' ? undefined : resolvedAlt}
			dangerouslySetInnerHTML={{ __html: body }}
		/>
	);
}
